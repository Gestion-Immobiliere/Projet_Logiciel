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

// Récupérer les messages à partir des ID utilisateurs
export const getMessages = async (req, res) => {
  const { userId1, userId2 } = req.params;
  const roomId = [userId1, userId2].sort().join('_');

  try {
    const messages = await Message.find({ room: roomId }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const getContacts = async (req, res) => {
  try {
    const currentUser = await User.findOne({ email: req.params.email });
    // console.log("Current",currentUser);
    if (!currentUser) return res.status(404).json({ error: 'User not found' });

    const messages = await Message.find({
      $or: [
        { senderId: currentUser._id },
        { recipientId: currentUser._id }
      ]
    });

    // console.log(messages)
    const contactIds = new Set();

    messages.forEach(msg => {
      // console.log(currentUser._id.toString())
      // console.log({...msg}._doc.senderId.toString())
      msg = { ...msg }._doc;
      console.log(msg)
      if (msg.senderId && msg.senderId.toString() !== currentUser._id.toString()) {
        contactIds.add(msg.senderId.toString());
      }
      if (msg.recipientId && msg.recipientId.toString() !== currentUser._id.toString()) {
        contactIds.add(msg.recipientId.toString());
      }
    });

    const contacts = await User.find({ _id: { $in: Array.from(contactIds) } });
    res.json(contacts);
    // console.log(contacts)
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


export const addType = addOne(Type)
export const getTypes = getAll(Type)

export const addCategorie = addOne(Categorie)
export const getCategories = getAll(Categorie)

export const addLocalisation = addOne(Localisation)
export const getLocalisations = getAll(Localisation)