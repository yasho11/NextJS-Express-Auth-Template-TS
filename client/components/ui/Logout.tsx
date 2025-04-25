import { useAuthStore } from "@/stores/useAuthStore";
import React from "react";
import { LogOut } from "lucide-react";


export const Logout = () => {


    const {signout} = useAuthStore();


    const handleLog = async(e:React.FormEvent) =>{
        signout();
    }


    return (
        <button className="flex gap-2 items-center" onClick={handleLog}>
        <LogOut className="size-5" />
        <span className="hidden sm:inline">Logout</span>
      </button>
  )
}
