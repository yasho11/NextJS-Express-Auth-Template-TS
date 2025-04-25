import { kStringMaxLength } from "buffer";
import mongoose, {Document, Schema } from "mongoose";
import { DefaultDeserializer } from "v8";

interface User extends Document{
    name: string;
    email: string;
    password: string;
    profileUrl: string;
}



const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
    },
    profileUrl: {
        type: String,
        required: false,
    }
}, {timestamps: true});


const User = mongoose.model<User> ('User', userSchema);


export default User;