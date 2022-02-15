const mongoose = require('mongoose');

courseSchema = {
    name: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
};


const Course = mongoose.model('course', courseSchema);

module.exports = Course;