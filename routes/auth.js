const { User } = require("../DB/schemasAndModels/user");
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');

router.post('/', async (req, res) => {
    try {
        const result = validate(req.body);
        if (result.error) {
            res.status(400).send(result.error.details[0].message);
            return;
        };
        let user = await User.findOne({ email: req.body.email});
        if(!user) return res.status(400).send("Invalid email or password");
        
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) return res.status(400).send("Invalid email or password");

        res.send(true);
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong:: " + error);
    }
});

function validate(user){
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required(),
    };

    return Joi.object(schema).validate(user);
}

module.exports = router;