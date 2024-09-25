import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [isAuthenticated, setIsAuthenticated ] = useState(false);

    const login = () => setIsAuthenticated(true);
    const logOut = () => setIsAuthenticated(false);

    return(
        <AuthContext.Provider value={{isAuthenticated, login, logOut}}>
            {children}
        </AuthContext.Provider>
    );
};