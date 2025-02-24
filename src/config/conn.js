import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectionToDb = () => {
    mongoose.connect(process.env.DBURL)
    .then(() => {
        console.log('Successfully connected to DB.')
    }).catch((error) => {
        console.log('Database Connection Failed.', error)
        process.exit(1);
    })
}

export default connectionToDb;