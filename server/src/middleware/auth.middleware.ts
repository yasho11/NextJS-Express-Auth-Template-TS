import {Response , NextFunction} from "express";
import jwt from 'jsonwebtoken';
import User from '../models/users.model';
import { Types } from "mongoose";
import { AuthRequest } from "../Types/request.types";

export const protectRoute = async(req: AuthRequest , res: Response, next: NextFunction) =>{
    try {
        const token = req.cookies.jwt;

        if(!token){
            res.status(401).json({message: 'Unauthorized - No Token provided'})
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {Userid: string};
        
        if(!decoded || !decoded.Userid){
            res.status(401).json({message: 'Unauthorized - Invalid Token'});
            return;
        }

        if(!Types.ObjectId.isValid(decoded.Userid)){
            res.status(400).json({message: 'Invalid User Id'});
            return;
        }


        const userObj = new Types.ObjectId(decoded.Userid);


        const user = await User.findById(userObj).select("-password");


        if(!user){
            res.status(404).json({message: "User not found"});
            return;
        }


        req.user = user;


        next();



    } catch (error) {

        console.error("Authentication Error: ", error);
        res.status(500).json({message: "Internal Server Error"});
        
    }
};

