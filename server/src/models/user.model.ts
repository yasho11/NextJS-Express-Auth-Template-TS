import mongoose , {Document} from "mongoose";

interface IUser extends Document{
    username: string;
    email: string;
    password: string;
    profileImage: string | null;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: null
    }, 
},{
    timestamps: true,
}
 );

 const User = mongoose.model<IUser>('User', userSchema);

 export default User;




