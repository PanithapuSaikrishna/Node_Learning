const express = require("express");
const Joi = require('joi');
const router = express.Router();
const Album = require('../DB/schemasAndModels/album');

router.get('/', async (req, res) => {
    try {
        const albums = await getAlbums();
        res.send(albums);
    } catch (error) {
        console.log("Error while fetching albums", error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);
        if (!album) res.status(404).send("Album not found!");
        res.send(album)
    } catch (error) {
        res.status(500).send("Something went wrong:: " + error);
    }
});

router.post('/', async (req, res) => {
    try {
        const schema = Joi.object({
            albumName: Joi.string().min(3).required(),
            description: Joi.string().max(50).required(),
            genre: Joi.string().min(3).required(),
            singer: Joi.string().min(3).required(),
            price: Joi.number().min(1).required(),
            tags: Joi.array().required()
        });
        const result = schema.validate(req.body);
        if(result.error){
            res.status(400).send(result.error.details[0].message);
            return;
        };
        const album = new Album(req.body);
        const response = await album.save();
        res.send(response)
        return;
    } catch (error) {
        res.status(500).send("Something went wrong:: " + error);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const schema = Joi.object({
            albumName: Joi.string().min(3).required(),
            description: Joi.string().max(50).required(),
            genre: Joi.string().min(3).required(),
            singer: Joi.string().min(3).required(),
            price: Joi.number().min(1).required(),
            tags: Joi.array().required()
        });
        const result = schema.validate(req.body);
        if(result.error){
            res.status(400).send(result.error.details[0].message);
            return;
        };
        const album = await Album.updateOne({ _id: req.params.id}, 
            {
                $set: {
                    ...req.body
                }
            }, { new: true });
        console.log("album", album)
        res.send(album);
    } catch (error) {
        res.status(500).send("Something went wrong:: " + error);
    }
});

async function getAlbums() {
    return await Album.find();
}


module.exports = router;