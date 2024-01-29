// 3rd party libraries
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

// Routes
const authRoute = require('./routes/authRoute.js');
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');
const uploadRoute = require('./routes/uploadRoute');


// Config options
dotenv.config();


const app = express();

// Static files
app.use(express.static('public'));
app.use('/images', express.static('images'));



// Database connection
const dbConnection = require('./config/db.js');
dbConnection();


// Body Parser Middleware
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));

// Cors Middleware
app.use(cors());

// Morgan Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
};


// Routes
app.use('/auth', authRoute);
app.use('/users', userRoute);
app.use('/posts', postRoute);
app.use('/upload', uploadRoute);


// Localhost settings
const port = process.env.PORT || 4000;
const host = process.env.BASE_URL || 'http://localhost:';
app.listen(port, () => {
    console.log(`Server running ${process.env.NODE_ENV} on host ${host}${port}`);
});