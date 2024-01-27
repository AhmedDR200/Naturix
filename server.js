// 3rd party libraries
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';

dotenv.config();
const app = express();

import dbConnection from './config/db.js';
dbConnection();

app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));

// Morgan Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


const port = process.env.PORT || 4000;
const host = process.env.BASE_URL || 'http://localhost:';
app.listen(port, () => {
    console.log(`Server running ${process.env.NODE_ENV} on host ${host}${port}`);
});