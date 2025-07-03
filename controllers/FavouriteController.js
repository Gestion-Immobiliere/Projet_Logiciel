import Favoris from "../models/Favoris.js";
import mongoose from "mongoose";

const addToFavourites = async (req, res) => {
  const { bien } = req.body;
  const client = req.user.id; // Utiliser req.user.id depuis requireAuth

  try {
    if (!mongoose.Types.ObjectId.isValid(bien)) {
      return res.status(400).json({
        status: 'error',
        message: 'ID du bien invalide'
      });
    }

    let favorites = await Favoris.findOne({ client });

    if (favorites) {
      if (!favorites.biens.some((someBien) => someBien.toString() === bien)) {
        favorites.biens.push(bien);
        await favorites.save();
        return res.status(200).json({
          status: 'success',
          message: 'Nouveau bien ajouté aux favoris'
        });
      } else {
        return res.status(200).json({
          status: 'success',
          message: 'Bien faisant déjà partie des favoris'
        });
      }
    } else {
      favorites = await Favoris.create({ client, biens: [bien] });
      return res.status(201).json({
        status: 'success',
        message: 'Favoris créé. Bien ajouté aux favoris'
      });
    }
  } catch (err) {
    console.error('Erreur lors de l\'ajout aux favoris :', err);
    return res.status(500).json({
      status: 'error',
      message: 'Impossible de mettre à jour la liste des favoris'
    });
  }
};

const removeFromFavourites = async (req, res) => {
  const client = req.user.id; // Utiliser req.user.id depuis requireAuth
  const { bienId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(bienId)) {
      return res.status(400).json({
        status: 'error',
        message: 'ID du bien invalide'
      });
    }

    const favorites = await Favoris.findOne({ client });
    if (!favorites) {
      return res.status(400).json({
        status: 'error',
        message: 'Aucun favoris trouvé pour ce client'
      });
    }

    const updatedBiens = favorites.biens.filter((bien) => bien.toString() !== bienId);
    if (updatedBiens.length === favorites.biens.length) {
      return res.status(400).json({
        status: 'error',
        message: 'Bien non trouvé dans les favoris'
      });
    }

    favorites.biens = updatedBiens;
    await favorites.save();
    return res.status(200).json({
      status: 'success',
      message: 'Bien retiré de la liste des favoris'
    });
  } catch (err) {
    console.error('Erreur lors de la suppression des favoris :', err);
    return res.status(500).json({
      status: 'error',
      message: 'Impossible de mettre à jour la liste des favoris'
    });
  }
};

const getFavourites = async (req, res) => {
  try {
    const favorites = await Favoris.findOne({ client: req.user.id }).populate({
      path: 'biens',
      populate: [
        { path: 'type' },
        { path: 'categorie' },
        { path: 'localisation' }
      ]
    });

    if (!favorites) {
      return res.status(200).json({
        status: 'success',
        data: []
      });
    }

    const mappedFavourites = favorites.biens.map(bien => ({
      id: bien._id,
      title: bien.titre,
      price: bien.prix,
      type: bien.type?.nom || 'Inconnu',
      location: bien.localisation?.ville || 'Inconnu',
      bedrooms: bien.nombreChambres,
      bathrooms: bien.nombreSallesBain,
      surface: bien.surface,
      images: bien.images || ['/placeholder.jpg'],
      rating: 4.5 // À ajuster si vous ajoutez un champ rating au modèle Bien
    }));

    return res.status(200).json({
      status: 'success',
      data: mappedFavourites
    });
  } catch (err) {
    console.error('Erreur lors de la récupération des favoris :', err);
    return res.status(500).json({
      status: 'error',
      message: 'Impossible de récupérer la liste des favoris'
    });
  }
};

export { addToFavourites, removeFromFavourites, getFavourites };