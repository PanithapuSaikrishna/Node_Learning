const express = require('express');
const router = express.Router();

const courses = [
    { id: 1, name: 'Course1' },
    { id: 2, name: 'Course2' },
    { id: 3, name: 'Course3' },
]

router.get('/', (req, res) => {
    res.send(courses)
});
router.get('/:id', (req, res) => {
    // res.send(req.params.id);
    const course = courses.find(item => item.id === parseInt(req.params.id));
    if (!course) res.status(404).send('Course not found!!'); // Not found 404
    res.send(course);
});

router.post('/', (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message) // 400 for bad request
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

router.put('/:id', (req, res) => {
    const course = courses.find(item => item.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course not found!!'); // Not found 404

    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message) // 400 for bad request
        return;
    };
    course.name = req.body.name;

    res.send(course)
})

router.delete('/:id', (req, res) => {
    const course = courses.find(item => item.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course not found!!'); // Not found 404

    courses.splice(courses.indexOf(course), 1);
    res.send(course)
});

module.exports = router;