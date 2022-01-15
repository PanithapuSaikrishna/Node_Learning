const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/mongo-exercises").
    then(() => console.log("Connected to DB"));

const schema = {
    name: String,
    author: String,
    tags: [String],
    date: Date,
    isPublished: Boolean,
    price: Number
}

const Course = mongoose.model("Course", schema);

// async function getCourses(){
//   return await Course
//               .find({ isPublished: true, tags: "backend"})
//               .sort("name")
//               .select({ name: 1, author: 1});
// }
// async function getCourses(){
//   return await Course
//               .find({ isPublished: true, tags: { $in: ["backend", "frontend"] } })
//               .sort("-price")
//               .select({ name: 1, author: 1, price: 1});
// }
async function getCourses() {
    return await Course
        .find({ isPublished: true })
        .or([
            {
                price: { $gte: 15 }
            },
            { name: /.*by.*/ }
        ])
        .sort("-price")
        .select("name author price");
}

async function run() {
    const cources = await getCourses();
    console.log(cources)
}

run();