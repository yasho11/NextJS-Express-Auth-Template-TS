import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (user: JwtPayload): string =>{
    return jwt.sign(user, process.env.JWT_SECRET!, {expiresIn: '7d'});
};