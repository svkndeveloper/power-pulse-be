const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const authRouter = require('./routes/api/auth');
const exercisesRouter = require('./routes/api/exercises');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/v1/users', authRouter);
app.use('/api/v1/exercises', exercisesRouter);

app.use((req, res) => {
    res.status(404).json({ message: 'Not found!' });
});

app.use((err, req, res, next) => {
    const { status = 500, message = 'Internal Server Error!' } = err;
    res.status(status).json({ message });
});

module.exports = app;
