import Favoris from "../models/Favoris.js";

const addToFavourites = async (req, res) => {
    const { client, bien } = req.body;

    try {
        const favourites = await Favoris.findOne({ client });
        // let newBien = b
        if (favourites) {
            if (!favourites.biens.some((someBien) => someBien.toString() === bien)) {
                // const newBiens = [...favourites.biens, bien];
                favourites.biens.push(bien);
                await favourites.save();

                return res.status(200).json({
                    status: 'success',
                    message: 'Nouveau bien ajouté aux favoris'
                });
            } else {
                return res.status(200).json({
                    status: 'success',
                    message: 'Bien faisant déjà partie des favoris'
                })
            }

        } else {
            await Favoris.create({ client, biens: [bien] });
            return res.status(201).json({
                status: 'success',
                message: 'Favoris créé. Bien ajouté aux favoris'
            })
        }
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            message: 'Impossible de mettre à jour la liste des favoris'
        })
    }
}

const removeFromFavourites = async (req, res) => {
    const { client } = req.body;
    const { bienId } = req.params;
    try {
        const favorites = await Favoris.findOne({ client });
        if (!favorites) {
            return res.status(400).json({
                status: 'error',
                message: 'Aucun favoris trouvé pour ce client'
            })
        } else {
            const updatedBiens = favorites.biens.filter((bien) => bien.toString() != bienId);
            favorites.biens = updatedBiens;
            await favorites.save();
            return res.status(200).json({
                status: 'success',
                message: 'Bien retiré de la liste des favoris'
            })
        }
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            message: 'Impossible de mettre à jour la liste des favoris'
        })
    }
}

export { addToFavourites, removeFromFavourites };