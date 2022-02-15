const mongoose = require("mongoose");

function connectToDB() {
    mongoose.connect("mongodb://localhost:27017/mongo-exercises")
        .then(() => console.log("Connected to DB"))
        .catch((err) => console.log("Error in connecting DB", err));
}

module.exports = connectToDB


