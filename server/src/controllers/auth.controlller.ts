import { Request, Response } from "express";
import { AuthRequest } from "../Types/request.types";
import User from "../models/users.model";
import bcrypt from 'bcrypt';
import { generateToken } from "../libs/utils";
import cloudinary from "../libs/cloudinary";


//?-------------------------------------------------------------------------

//! @name: signup
//! @desc: Register a new user

export const signup = async(req: Request , res: Response)=>{
    const {name, password, email} = req.body;

    try{
        if(!name || !email|| !password){
            res.status(400).json({message: "All feilds are required"});
            return;
        }

        const ExistUser = await User.findOne({email});

        if(ExistUser){
            res.status(400).json({message: "User already exists"});
            return;
        }
        if(password.length < 4){
            res.status(400).json({message: "User already exists"})
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const newUser = new User({
            name, 
            email,
            password: hashedPassword,
            profileUrl: "",
        });

        if(newUser){
            generateToken(newUser._id as string, res);

            await newUser.save();

            res.status(201).json({message: "User created successfully", New_User: newUser});


        }
        

    }catch(error){
        console.error(error);
        res.status(500).json({message: "Internal server error", error_area: "signup"});
    }

};


//?----------------------------------------------------------------------------------------------------------------------

//! @name: signin
//! @desc: req, res


export const signin = async(req: Request, res:Response)=>{
    const {email, password} = req.body;

    try {
        const Existuser = await User.findOne({email});

        if(!Existuser){
            res.status(400).json({message: "User doesnt exist"});
            return;
        }

        const isValidPassword = await bcrypt.compare(password,Existuser.password);

        if(!isValidPassword){
            res.status(401).json({message: "Password invalid"})
        }

        generateToken(Existuser._id as string, res);

        res.status(200).json({message: "Signin successful", User: Existuser});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error", error_area: "signin"});
    }
}


//?-----------------------------------------------------------------------------------------------------------

//! @name: signout
//! @desc: signout user


export const signout = async(req: Request, res: Response): Promise<void> =>{
    try{
        res.clearCookie("jwt");
        res.status(200).json({message: "Signout successful"});
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Internal server error", error_area: "signout"});
    }
}


//?-------------------------------------------------------------------------------------------------------

//! @name: updateProfile
//! @desc: update user profile

export const updateProfile = async (req: AuthRequest , res:Response): Promise<void>=>{
    try {
        const {profileUrl} = req.body;

        const user = req.user;
        if(!user){
            res.status(401).json({message: 'Unauthorized'});
            return;
        }

        if(!profileUrl){
            res.status(400).json({message: 'Profile URL is required'});
            return;
        }

        const uploadRes = await cloudinary.uploader.upload(profileUrl)
        const updateUser = await User.findByIdAndUpdate(user._id, {profileUrl: uploadRes.secure_url}, {new:true});
        res.status(200).json({message: "Profile update successfully", User: updateUser});
    } catch (error) {

        console.error(error);
        res.status(500).json({message: 'Interval server error ', error_area: "update profile"});
        
    }
}



//?-----------------------------------------------------------------------------------------------------------------------

//! @name:  getUser
//! #desc: get user 


export const getUser = async (req: AuthRequest , res: Response) : Promise <void> =>{

    try{
        const user =  req.user;

        if(!user){
            res.status(401).json({message: "Unauthorized"});
            return;
        }

        res.status(200).json({User: user});

    }catch(error){

        console.error(error);
        res.status(500).json({message: "Internal server error", error_area: "getUser"});

    }

}


//?------------------------------------------------------------------------------------------------------------

//! @name: checkAuth 
//! @desc: Check if user is authenticated 


export const checkAuth = async (req: AuthRequest, res: Response ):Promise <void> => {
    try {
        const user = req.user;

        if(!user){
            res.status(401).json({message: "Unauthorized"});
            return;
        }

        res.status(200).json({User: user});
        console.log(user);

    } catch (error) {
        console.error(error);

        res.status(500).json({message: "Internal server error", error_area: "checkAuth"})

    }
}