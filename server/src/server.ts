import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from 'cors';
import {connect} from './libs/db';
import authRoutes from './routes/auth.routes';



dotenv.config();


const PORT = process.env.PORT;
const app = express();


app.use(express.json({limit: '2mb'}));
app.use(express.urlencoded({limit: '2mb'}));
app.use(express.static("public"));
app.use(cookieParser());


app.use(
    cors({
      origin: "http://localhost:3000", // Explicitly allow frontend origin
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );
  

app.use('/api', authRoutes) 


connect();


app.listen(PORT, () =>{
    console.log(`Server is running on port : ${PORT}`);
})












