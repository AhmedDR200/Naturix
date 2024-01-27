// 3rd party libraries
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');

// Routes
const authRoute = require('./routes/authRoute.js');


// Config options
dotenv.config();


const app = express();


// Database connection
const dbConnection = require('./config/db.js');
dbConnection();


// Body Parser Middleware
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));


// Morgan Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
};


// Routes
app.use('/auth', authRoute);


// Localhost settings
const port = process.env.PORT || 4000;
const host = process.env.BASE_URL || 'http://localhost:';
app.listen(port, () => {
    console.log(`Server running ${process.env.NODE_ENV} on host ${host}${port}`);
});