import {Request , Response} from 'express';
import User from '../models/user.model';
import { generateToken } from '../utils/generateToken';
import { comparePassword, hashPassword } from '../utils/password';



//?---------------------------------------------------------------------------------
//! @name: registerUser
//! @desc: Register a user

export const registerUser = async (req: Request, res: Response): Promise<void> =>{
   try {
    const {username, email, password} = req.body;

    const existingUser = await User.findOne({email});

    if(existingUser){
        res.status(400).json({message: 'User already register!'});
        return;
    }

    const hashedpassword = hashPassword(password);

    const newUser = await User.create({
        username, 
        email,
        password: hashedpassword,
    }) as { _id: string; username: string; email: string; password: string };

    const token = generateToken({id: newUser._id.toString(), email, username});

    res.status(201).json({token, user: {id: newUser._id, username, email}});



   } catch (error) {

    res.status(500).json({message: 'Server error', error});
    
   }
}


//?------------------------------------------------------------------------------------
//! @name: loginUser
//! @desc: Logging the user

export const loginUser = async(req: Request , res: Response) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email}) as { _id: string; username: string; email: string; password: string };

        if(!user) {
            res.status(404).json({message: 'No user found!'});
            return;
        }
        
        const isMatch = await comparePassword(password, user.password);

        if(!isMatch){
            res.status(400).json({message: 'Invalid password'})
        }

        const token = generateToken({id: user._id.toString(), email, username: user.username});

        res.status(200).json({token, user: {id: user._id, email, username: user.username}})

    } catch (error) {
        res.status(500).json({message: 'Server error: ', error});
    }
};



//?------------------------------------------------------------------------------------
//! @name: viewProfile
//! @desc: View your profile


export const viewProfile = async(req: Request , res: Response): Promise<void> =>{
    try{
        const user = await User.findById(req.user?.id).select('-password');
        if(!user) {
            res.status(404).json({message: 'User not found'});
            return;
        }
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({message: 'Error retrieving profile', error});
    }
};


//?------------------------------------------------------------------------------------

//! @name: editProfile
//! @desc: Update your profile


export const editProfile = async(req: Request , res: Response): Promise<void>=>{
    try {
        const {username, profileImage} = req.body;

        const user = await User.findByIdAndUpdate(
            req.user?.id,
            {username, profileImage},
            {new: true, runValidators: true}
        ).select('-password');

        if(!user){
            res.status(404).json({message: 'User not found'});
            return;
        }

        res.status(200).json({message: 'Profile updated', user});

    } catch (error) {
        res.status(500).json({message: 'Failed to update profile', error});
    }
};



