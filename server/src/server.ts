import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.config';
import authRoute from './routes/auth.Routes';

dotenv.config();


const app = express();
const port = process.env.PORT || 5000;

app.use('.api/auth', authRoute);


connectDB().then(()=>{
    app.listen(port, ()=>console.log(`Server running on port ${port}`));
});


