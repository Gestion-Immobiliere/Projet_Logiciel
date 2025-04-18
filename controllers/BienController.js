import Bien from "../models/Bien.js"
import cloudinary from "cloudinary"
import fs from "fs"

// 🔹 Créer un bien
export const createBien = async (req, res) => {
    console.log("REQ FILES:", req.files)
console.log("REQ BODY:", req.body)
  try {
    const { titre, description, prix, statut, type, categorie, localisation } = req.body
    const images = []

    if (req.files) {
      for (const file of req.files) {
        const result = await cloudinary.v2.uploader.upload(file.path)
        images.push(result.secure_url)
        fs.unlinkSync(file.path) // supprime localement
      }

    }

    const bien = await Bien.create({
      titre, description, prix, statut, type, categorie, localisation,
      images,
      postedBy: req.user.id // récupéré via middleware requireAuth
    })

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
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 10
      const skip = (page - 1) * limit
  
      const filtre = {}
  
      if (type) filtre.type = type
      if (categorie) filtre.categorie = categorie
      if (localisation) filtre.localisation = localisation
      if (statut) filtre.statut = statut
  
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
  
      const { titre, description, prix, statut, type, categorie, localisation } = req.body
  
      if (titre) bien.titre = titre
      if (description) bien.description = description
      if (prix) bien.prix = prix
      if (statut) bien.statut = statut
      if (type) bien.type = type
      if (categorie) bien.categorie = categorie
      if (localisation) bien.localisation = localisation
  
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
  
  
  
