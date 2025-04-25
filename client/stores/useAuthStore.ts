import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import axios from 'axios';


interface AuthStore {
    authUser: any;
    isLoading: boolean;
    isCheckingAuth: boolean;
    checkAuth: () => void;
    signin: (data: any) => void;
    signup: (data: any) => void;
    signout: () => void;
    updateProfile:(data: any) => void;   
}




export const useAuthStore = create<AuthStore> ((set, get) => ({
    authUser: null,
    isLoading: false,
    isCheckingAuth: true,

    //?-----------------------------------------------------
    //! @name: checkAuth
    //! @desc: This function is user to check if the user is authenticated


    checkAuth: async()=>{
        try{
            const response = await axiosInstance.get("/auth/check");

            set({authUser: response.data});

            console.log("Auth user: ", response.data);


            
        }catch(error){

            console.log("Error in checkAuth Auth store", error);
            set({authUser: null});

        } finally {
            set({isCheckingAuth: false});
        }
    },

    //?----------------------------------------------------------------
    //! @name: signup
    //! @desc: This a function to register the user 
    
    signup: async(data) =>{

        try {
            
            set({isLoading: true});
            const response = await axiosInstance.post("/auth/signup", data);
            set({authUser: response.data});
            toast.success("Account created succesfully!");
           
        } catch (error) {
            if(axios.isAxiosError(error)){
                console.error("Sign up error in  useAuthstore: ", error.response?.data);
                toast.error(error.response?.data?.message || "Signup failed!");
            }else{
                console.error("Unexpected error: ", error);
                toast.error("Something went wrong!");
            }
            
        }finally{
            set({isLoading: false});
        }

    },

    //?-------------------------------------------------------------------------
    //! @name: signin
    //! @desc: This is a function to login the user


    signin: async(data) =>{
        try{
            set({isLoading: true});

            const response = await axiosInstance.post("/auth/signin", data);
            set({authUser: response.data});
            const {authUser} = get();

            console.log("Login auth user: ", authUser);
            toast.success("Signed in successfully");
        }catch(error){
            if(axios.isAxiosError(error)){
                console.error("Signin error:", error.response?.data);
                toast.error(error.response?.data?.message || "Sign in failed");
            }else{
                console.error("Unexpected error:", error);
                toast.error("Something went wrong!");
            }

        }finally{
            set({isLoading: false});
        }

    },

    //?--------------------------------------------------------------------------------
    //! @name: signout
    //! @desc: This is the function to log out the user

    signout: async() => {
        try{
            set({isLoading: true});
            await axiosInstance.post("/auth/signout");
            set({authUser: null});
            toast.success("Signned out successfully!");
        }catch(error){
            console.error("Signout error: ", error);
            toast.error("Signout failed");
        }finally{
            set({isLoading: false});
        }
    },

    //?----------------------------------------------------------------
    //! @name: updateProfile
    //! @desc: this is the function to update the user


    updateProfile: async(data) =>{

        try {
            set({isLoading: true});
            const response = await axiosInstance.put("/auth/update-profile", data);
            set({authUser: response.data});
            toast.success("Profile updated successfully updated");
        } catch (error) {

            if(axios.isAxiosError(error)){
                console.error("Update profile error: ", error.response?.data);
                toast.error(error.response?.data?.message || "Update profile failed!");
            }else{
                console.error("Unexpected error: ", error);
                toast.error("Something went wrong!");
            }
            
        }finally{
            set({isLoading: false});
        }

    },

}))

