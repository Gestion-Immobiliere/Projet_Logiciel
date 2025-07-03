import Bien from "../models/Bien.js";
import cloudinary from "cloudinary";
import fs from "fs";
import User from "../models/User.js";
import stripe from "../config/stripe.js";
import mongoose from "mongoose";
import Reservation from "../models/Reservation.js";

export const createBien = async (req, res) => {
  console.log("REQ FILES:", req.files);
  console.log("REQ BODY:", req.body);

  try {
    const { titre, description, prix, statut, type, categorie, localisation, surface, nombreChambres, nombreSallesBain } = req.body;
    const id = req.user.id;
    const role = req.user.role;

    if (!titre || !prix) {
      return res.status(400).json({ error: 'champ obligatoire manquant ou invalides' });
    }

    const images = [];
    let contratUrl = null;

    if (req.files?.images) {
      for (const file of req.files.images) {
        const result = await cloudinary.v2.uploader.upload(file.path);
        images.push(result.secure_url);
        fs.unlinkSync(file.path);
      }
    }

    if (req.files?.contrat) {
      const pdfFile = req.files.contrat[0];
      const result = await cloudinary.v2.uploader.upload(pdfFile.path, {
        resource_type: "raw"
      });
      contratUrl = result.secure_url;
      fs.unlinkSync(pdfFile.path);
    }

    const createdProduct = await stripe.products.create({
      name: titre,
      description: description || '',
      images: images?.length ? images : undefined,
    });

    const createdPrice = await stripe.prices.create({
      product: createdProduct.id,
      unit_amount: prix * 100,
      currency: 'xof',
    });

    const bienData = {
      titre, description, prix, statut, type, categorie, localisation,
      surface, nombreChambres, nombreSallesBain,
      images,
      contrat: contratUrl,
      stripeProductId: createdProduct.id,
      stripePriceId: createdPrice.id
    };

    if (role === 'admin') bienData.idAdmin = id;
    else if (role === 'agent') bienData.idAgent = id;
    else return res.status(403).json({ error: "Non autorisé à créer un bien" });

    const bien = await Bien.create(bienData);
    res.status(201).json(bien);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllBiens = async (req, res) => {
  try {
    const biens = await Bien.find().populate("type categorie localisation idAgent idAdmin");
    res.status(200).json(biens);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBienById = async (req, res) => {
  try {
    const bien = await Bien.findById(req.params.id).populate("type categorie localisation idAgent idAdmin");
    if (!bien) return res.status(404).json({ message: "Bien non trouvé" });
    res.status(200).json(bien);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteBien = async (req, res) => {
  try {
    const bien = await Bien.findByIdAndDelete(req.params.id);
    if (!bien) return res.status(404).json({ message: "Bien non trouvé" });
    res.status(200).json({ message: "Bien supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const filtrerBiens = async (req, res) => {
  try {
    const { type, categorie, localisation, prixMin, prixMax, statut, titre } = req.query;
    const { nombreChambres, nombreSallesBain, surfaceMin, surfaceMax } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filtre = {};

    if (type) filtre.type = type;
    if (categorie) filtre.categorie = categorie;
    if (localisation) filtre.localisation = localisation;
    if (statut) filtre.statut = statut;
    if (titre) filtre.titre = { $regex: titre, $options: 'i' };
    if (nombreChambres) filtre.nombreChambres = { $gte: parseInt(nombreChambres) };
    if (nombreSallesBain) filtre.nombreSallesBain = { $gte: parseInt(nombreSallesBain) };
    if (surfaceMin || surfaceMax) {
      filtre.surface = {};
      if (surfaceMin) filtre.surface.$gte = parseInt(surfaceMin);
      if (surfaceMax) filtre.surface.$lte = parseInt(surfaceMax);
    }
    if (prixMin || prixMax) {
      filtre.prix = {};
      if (prixMin) filtre.prix.$gte = parseInt(prixMin);
      if (prixMax) filtre.prix.$lte = parseInt(prixMax);
    }

    if (req.user) {
      if (req.user.role === 'agent') {
        filtre.idAgent = req.user.id;
      } else if (req.user.role === 'admin') {
        filtre.idAdmin = req.user.id;
      }
    }

    const total = await Bien.countDocuments(filtre);
    const biens = await Bien.find(filtre)
      .populate("type categorie localisation idAgent idAdmin")
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: biens
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateBien = async (req, res) => {
  try {
    const bien = await Bien.findById(req.params.id);
    if (!bien) return res.status(404).json({ message: "Bien non trouvé" });

    const { titre, description, prix, statut, type, categorie, localisation, surface, nombreChambres, nombreSallesBain } = req.body;

    if (titre) bien.titre = titre;
    if (description) bien.description = description;
    if (prix) bien.prix = prix;
    if (statut) bien.statut = statut;
    if (type) bien.type = type;
    if (categorie) bien.categorie = categorie;
    if (localisation) bien.localisation = localisation;
    if (surface) bien.surface = surface;
    if (nombreChambres) bien.nombreChambres = nombreChambres;
    if (nombreSallesBain) bien.nombreSallesBain = nombreSallesBain;

    if (req.files?.images && bien.images.length > 0) {
      for (const imageUrl of bien.images) {
        const publicId = imageUrl.split('/').pop().split('.')[0];
        await cloudinary.v2.uploader.destroy(publicId);
      }
    }
    if (req.files?.images) {
      const images = [];
      for (const file of req.files.images) {
        const result = await cloudinary.v2.uploader.upload(file.path);
        images.push(result.secure_url);
        fs.unlinkSync(file.path);
      }
      bien.images = images;
    }

    if (req.files?.contrat && bien.contrat) {
      const publicId = bien.contrat.split('/').pop().split('.')[0];
      await cloudinary.v2.uploader.destroy(publicId, { resource_type: 'raw' });
    }
    if (req.files?.contrat) {
      const pdfFile = req.files.contrat[0];
      const result = await cloudinary.v2.uploader.upload(pdfFile.path, {
        resource_type: "raw"
      });
      bien.contrat = result.secure_url;
      fs.unlinkSync(pdfFile.path);
    }

    const updated = await bien.save();
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const book = async (req, res) => {
  try {
    const { bien, montant, dureeValidite } = req.body;

    if (!bien || !montant || !dureeValidite) {
      return res.status(400).json({
        status: 'error',
        description: "Informations de réservation incomplètes"
      });
    }

    if (dureeValidite < 1) {
      return res.status(400).json({
        status: 'error',
        description: "La durée de validité doit être d'au moins 1 jour"
      });
    }

    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        description: "Authentification requise pour réserver"
      });
    }

    const bienData = await Bien.findById(bien).populate('type categorie localisation idAgent idAdmin');
    if (!bienData) {
      return res.status(404).json({ status: 'error', description: "Bien non trouvé" });
    }

    if (bienData.statut !== "disponible") {
      return res.status(400).json({
        status: 'error',
        description: 'Bien déjà réservé ou vendu'
      });
    }

    if (montant !== bienData.prix) {
      return res.status(400).json({
        status: 'error',
        description: 'Le montant ne correspond pas au prix du bien'
      });
    }

    // Créer la réservation en premier
    const reservation = new Reservation({
      bien,
      client: req.user.id,
      montant,
      status: 'en attente',
      datePaiement: new Date(),
      dureeValidite
    });

    await reservation.save();

    // Créer la session Stripe après avoir sauvegardé la réservation
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: bienData.stripePriceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success?reservationId=${reservation._id}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel?reservationId=${reservation._id}`,
      metadata: {
        reservationId: reservation._id.toString(),
        bienId: bienData._id.toString(),
        clientId: req.user.id
      },
    });

    // Mettre à jour la réservation avec l'ID de la session Stripe
    reservation.stripeSessionId = session.id;
    await reservation.save();

    // Mettre à jour le statut du bien
    bienData.statut = 'réservé';
    await bienData.save();

    return res.status(200).json({
      status: 'success',
      message: 'Réservation créée, redirection vers Stripe...',
      url: session.url,
      reservationId: reservation._id // Retourner l'ID pour les tests
    });
  } catch (error) {
    console.error("Erreur lors de la réservation :", error);
    if (error.type === 'StripeCardError') {
      return res.status(400).json({ status: 'error', description: error.message });
    }
    return res.status(500).json({ status: 'error', description: 'Erreur serveur lors de la réservation' });
  }
};