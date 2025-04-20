import Type from "../models/Type.js"
import Categorie from "../models/Categorie.js"
import Localisation from "../models/Localisation.js"

// ➕ Ajout générique
const addOne = (Model) => async (req, res) => {
  try {
    const item = await Model.create(req.body)
    res.status(201).json(item)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// 🔍 Récupérer tous
const getAll = (Model) => async (req, res) => {
  try {
    const items = await Model.find()
    res.status(200).json(items)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const addType = addOne(Type)
export const getTypes = getAll(Type)

export const addCategorie = addOne(Categorie)
export const getCategories = getAll(Categorie)

export const addLocalisation = addOne(Localisation)
export const getLocalisations = getAll(Localisation)
