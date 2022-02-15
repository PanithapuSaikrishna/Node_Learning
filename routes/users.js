const { User, validate } = require("../DB/schemasAndModels/user");
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    try {
        const result = validate(req.body);
        if (result.error) {
            res.status(400).send(result.error.details[0].message);
            return;
        };
        let user = await User.findOne({ email: req.body.email});
        if(user) return res.status(400).send("User already registered");
        
        user = new User(_.pick(req.body, ["name", "email", "password"]));

        // Hashing the passwords
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password , salt);
        
        const response = await user.save();
        res.send(_.pick(user, ["name", "email"]));
    } catch (error) {
        res.status(500).send("Something went wrong:: " + error);
    }
})

module.exports = router;