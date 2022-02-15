const mongoose = require('mongoose');
const Joi = require('joi');

const User = mongoose.model('User', {
    name: {
        required: true,
        type: String,
        minlength: 5,
        maxlength: 50
    },
    email: {
        required: true,
        type: String,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        required: true,
        type: String,
        minlength: 5,
        maxlength: 1024
    }
});

function validateUser(user){
    const schema = {
        name: Joi.string().min(5).max(55).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required(),
    };

    return Joi.object(schema).validate(user);
}

exports.User = User;
exports.validate = validateUser; 
