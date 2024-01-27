import { mongoose } from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const dbConnection = async () => {
    mongoose.connect(process.env.DB_URL)
    .then(() => console.log('DB Connected Successfully ...'))
    .catch(err => console.log(err));
};


export default dbConnection;