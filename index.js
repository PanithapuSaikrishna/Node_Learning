const express = require('express');
const appStartUpDebugger = require('debug')('app:startup');
const config = require('config');
const path = require('path');
const logger = require('./logger');
const helmet = require('helmet');
const morgan = require('morgan');
const authenticate = require('./authenticate');
const Joi = require('joi');
const app = express();

console.log('Application name: '+ config.get('name'));
console.log('Mail server: '+ config.get('mail.host'));
// console.log('Mail server: '+ config.get('mail.password')); // not working due to env variables in mac
app.use(express.json());

app.use(logger);

app.use(authenticate);

app.use(helmet());
if (app.get('env') === 'development') { // this is how we can tell that our app is in which env (dev,testing,prod)
    app.use(morgan('short'));
    appStartUpDebugger('Morgan enabled..')
}
console.log(process.env.NODE_ENV);
console.log(app.get('env'));

// app.engine('pug', require('pug').__express)
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views')); //default // Not Working as expected

const courses = [
    { id: 1, name: 'Course1' },
    { id: 2, name: 'Course2' },
    { id: 3, name: 'Course3' },
]

app.get('/', (req, res) => {
    // res.send('Hello World');
    res.render('index', { title: 'My express app', message: 'Hello'})
});
app.get('/api/courses', (req, res) => {
    res.send(courses)
});
app.get('/api/courses/:id', (req, res) => {
    // res.send(req.params.id);
    const course = courses.find(item => item.id === parseInt(req.params.id));
    if (!course) res.status(404).send('Course not found!!'); // Not found 404
    res.send(course);
});

app.post('/api/courses', (req, res) => {
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

app.put('/api/courses/:id', (req, res) => {
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

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(item => item.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course not found!!'); // Not found 404

    courses.splice(courses.indexOf(course), 1);
    res.send(course)
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
});