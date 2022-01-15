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

async function getCourses(){
  return await Course
              .find({ isPublished: true, tags: ["backend"]})
              .sort("name")
              .select({ name: 1, author: 1});
}

async function run(){
  const cources = await getCourses();
}

run();