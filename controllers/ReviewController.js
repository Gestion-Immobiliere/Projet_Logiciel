import Review from "../models/Review.js";

export const review = async (req, res) => {
    const { bien, client, note, commentaire } = req.body;

    const updateData = {};
    if (note !== undefined) {
        if (typeof note !== 'number' || note < 0 || note > 5) {
            return res.status(400).json({ status: 'error', message: 'La note doit être un nombre entre 0 et 5.' });
        }
        updateData.note = note;
    }
    if (commentaire) {
        updateData.commentaire = commentaire;
    }

    try {
        const review = await Review.updateOne({ bien, client }, updateData);
        if (review.matchedCount === 0) {
            await Review.create({ bien, client, ...updateData });
            return res.status(201).json({ status: 'success', message: 'Avis enregistré' });
        } else {
            return res.status(200).json({ status: 'success', message: 'Avis mis à jour' });
        }
    } catch (err) {
        return res.status(500).json({ status: 'error', message: 'Impossible de traiter l\'avis' });
    }
};
