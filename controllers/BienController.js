import Bien from "../models/Bien.js"
import cloudinary from "cloudinary"
import fs from "fs"
import User from "../models/User.js"
import stripe from "../config/stripe.js"

// 🔹 Créer un bien
export const createBien = async (req, res) => {
  console.log("REQ FILES:", req.files)
  console.log("REQ BODY:", req.body)
  try {
    const { titre, description, prix, statut, type, categorie, localisation, surface, nombreChambres, nombreSallesBain } = req.body
    const id = req.user.id;
    const role = req.user.role;
    if (!titre || !prix) {
      return res.status(400).json({ error: 'champ obligatoire manquant ou invalides' });
    }

    const images = []

    if (req.files) {
      for (const file of req.files) {
        const result = await cloudinary.v2.uploader.upload(file.path)
        images.push(result.secure_url)
        fs.unlinkSync(file.path) // supprime localement
      }

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
      stripeProductId: createdProduct.id,
      stripePriceId: createdPrice.id
    }

    if (role === 'admin') bienData.idAdmin = id
    else if (role === 'agent') bienData.idAgent = id
    else return res.status(403).json({ error: "Non autorisé à créer un bien" })

    const bien = await Bien.create(bienData)
    res.status(201).json(bien)



  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// 🔹 Récupérer tous les biens
export const getAllBiens = async (req, res) => {
  try {
    const biens = await Bien.find().populate("type categorie localisation postedBy")
    res.status(200).json(biens)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// 🔹 Récupérer un bien
export const getBienById = async (req, res) => {
  try {
    const bien = await Bien.findById(req.params.id).populate("type categorie localisation postedBy")
    if (!bien) return res.status(404).json({ message: "Bien non trouvé" })
    res.status(200).json(bien)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// 🔹 Supprimer un bien
export const deleteBien = async (req, res) => {
  try {
    const bien = await Bien.findByIdAndDelete(req.params.id)
    if (!bien) return res.status(404).json({ message: "Bien non trouvé" })
    res.status(200).json({ message: "Bien supprimé avec succès" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
//filtrer les biens
export const filtrerBiens = async (req, res) => {
  try {
    const { type, categorie, localisation, prixMin, prixMax, statut } = req.query
    const { nombreChambres, nombreSallesBain, surfaceMin, surfaceMax } = req.query
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    const filtre = {}

    if (type) filtre.type = type
    if (categorie) filtre.categorie = categorie
    if (localisation) filtre.localisation = localisation
    if (statut) filtre.statut = statut

    if (nombreChambres) filtre.nombreChambres = { $gte: nombreChambres }
    if (nombreSallesBain) filtre.nombreSallesBain = { $gte: nombreSallesBain }

    if (surfaceMin || surfaceMax) {
      filtre.surface = {}
      if (surfaceMin) filtre.surface.$gte = surfaceMin
      if (surfaceMax) filtre.surface.$lte = surfaceMax
    }


    if (prixMin || prixMax) {
      filtre.prix = {}
      if (prixMin) filtre.prix.$gte = prixMin
      if (prixMax) filtre.prix.$lte = prixMax
    }

    const total = await Bien.countDocuments(filtre)

    const biens = await Bien.find(filtre)
      .populate("type categorie localisation postedBy")
      .skip(skip)
      .limit(limit)

    res.status(200).json({
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: biens
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

//Modifier un Bien 
export const updateBien = async (req, res) => {
  try {
    const bien = await Bien.findById(req.params.id)
    if (!bien) return res.status(404).json({ message: "Bien non trouvé" })

    const { titre, description, prix, statut, type, categorie, localisation, surface, nombreChambres, nombreSallesBain } = req.body

    if (titre) bien.titre = titre
    if (description) bien.description = description
    if (prix) bien.prix = prix
    if (statut) bien.statut = statut
    if (type) bien.type = type
    if (categorie) bien.categorie = categorie
    if (localisation) bien.localisation = localisation
    if (surface) bien.surface = surface
    if (nombreChambres) bien.nombreChambres = nombreChambres
    if (nombreSallesBain) bien.nombreSallesBain = nombreSallesBain


    // Si des fichiers sont envoyés, on remplace les anciennes images
    if (req.files && req.files.length > 0) {
      const images = []
      for (const file of req.files) {
        const result = await cloudinary.v2.uploader.upload(file.path)
        images.push(result.secure_url)
        fs.unlinkSync(file.path)
      }
      bien.images = images
    }

    const updated = await bien.save()
    res.status(200).json(updated)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}



