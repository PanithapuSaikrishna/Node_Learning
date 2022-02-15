const mongoose = require('mongoose');

authorSchema = {
    name: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        required: true,
    }
};


const Author = mongoose.model('author', authorSchema);

module.exports = Author;