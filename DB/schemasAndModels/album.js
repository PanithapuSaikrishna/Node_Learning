const mongoose = require("mongoose");

/*
-Strings: minlength, maxlength, match, enum 
-Numbers: min, max
-Dates: min, max
-All types: required
******************************
Other useful SchemaType properties: 
-Strings: lowercase, uppercase, trim
-All types: get, set (to define a custom getter/setter)    
price: { type: Number, get: v => Math.round(v), set: v => Math.round(v) }
*/

const albumSchema = {
    albumName: {
        type: String,
        required: true,
        minlength: 3
    },
    description: {
        type: String,
        required: true,
        maxlength: 50
    },
    genre: {
        type: String,
        required: true,
        minlength: 3
    },
    singer: {
        type: String,
        required: true,
        minlength: 3
    },
    price: {
        type: Number,
        required: true,
        min: 1,
        max: 500
    },
    tags: {
        type: Array,
        required: true,
        validate: {
            validator: function (v) {
                return v && v.length > 0;
            },
            message: "A course should have at least 1 tag."
        }
    },

};

const Album = mongoose.model("Album", albumSchema);

module.exports = Album;
