import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';
import { JwtPayload } from '../types';
import dotenv from 'dotenv';

dotenv.config();



export const protect = (req: Request, res:Response, next: NextFunction) =>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
     res.status(401).json({message: 'Not authorized, no token'});
     return;   
    }
        const token = authHeader?.split(' ')[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
            req.user = decoded;
            next();
        } catch (error) {

            res.status(401).json({message: 'Invalid token', error});
            return;
            
        }
}





