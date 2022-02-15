const coursesRouter = require('./routes/courses');
const albumRouter = require('./routes/album');
const connectToDB = require('./DB/mongodb');
const homeRouter = require('./routes/home');
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const express = require('express');
const appStartUpDebugger = require('debug')('app:startup');
const config = require('config');
const path = require('path');
const logger = require('./middleware/logger');
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
    app.use(morgan('common'));
    appStartUpDebugger('Morgan enabled..')
}
console.log(process.env.NODE_ENV);
console.log(app.get('env'));

// app.engine('pug', require('pug').__express)
// app.set('view engine', 'pug');
// app.set('views', path.join(__dirname, 'views')); //default // Not Working as expected
connectToDB();
app.use('/', homeRouter);
app.use('/api/courses', coursesRouter); // For CRUD operations old
// app.use('/api/courses', coursesRouter); // For CRUD operations new
app.use('/api/albums', albumRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
});