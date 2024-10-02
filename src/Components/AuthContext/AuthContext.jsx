import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [isAuthenticated, setIsAuthenticated ] = useState(()=>{
        const storedAuth = localStorage.getItem("isAuthenticated");
        return storedAuth === "true";
    });

    const login = () => {
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true");
    }
    const logOut = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("isAuthenticated", "true");
    }

    return(
        <AuthContext.Provider value={{isAuthenticated, login, logOut}}>
            {children}
        </AuthContext.Provider>
    );
};