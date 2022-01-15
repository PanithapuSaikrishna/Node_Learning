const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/playground").then(() => {
    console.log("Connected")
}).catch( err => console.log("Error connecting to DB", err))

// const courseSchema = mongoose.Schema();
const courseSchema = {
    name: String,
    author: String,
    tags: [String],
    date: {type: Date , default: Date.now},
    isPublished: Boolean
};

const Course = mongoose.model('Course', courseSchema);

async function createCourse(){
    const course = new Course({
        name: 'ANgular 8',
        author: 'Sai Krishna',
        tags: ['Angular js', 'Front end'],
        isPublished: true
    });
    
    const saved = await course.save();
    
};

async function getCources(){
    const courses = await Course.find();
    console.log(JSON.parse(JSON.stringify(courses)))
    // console.log(courses)
}
getCources();
// createCourse();
