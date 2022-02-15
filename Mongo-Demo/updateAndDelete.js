const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/mongo-exercises").
    then(() => console.log("Connected to DB"));


const courseSchema = {
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number,
    tags: [String]
};

const Course = mongoose.model("Course", courseSchema);

async function updateCourse(id) {
    try {
        await Course.findByIdAndUpdate(id,
            {
                $set: {
                    author: "Sai"
                }
            },
            {
                new: true
            },
            (err, doc) => {
                console.log(doc)
            }
        );
    } catch (error) {
        console.log("Error", error)
    }
}

async function removeCourse(id){
    const course = await Course.findByIdAndDelete(id);
    console.log(course);
}

// updateCourse("5a68ff090c553064a218a547"); //Not working
// removeCourse("5a68ff090c553064a218a547");


