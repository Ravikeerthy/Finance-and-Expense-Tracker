import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    return storedAuth === "true";
  });
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token")
  // console.log("storedUser in AUth: ", storedUser);
  

  // return storedUser ? JSON.parse(storedUser) : null

  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [token, setToken] = useState(storedToken);

  const login = (userData, userToken) => {
    setIsAuthenticated(true);
    setUser(userData);
    setToken(userToken)
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userToken)
    console.log("UserToken: ", userToken);
    
  };
  const logOut = () => {
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };


  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
