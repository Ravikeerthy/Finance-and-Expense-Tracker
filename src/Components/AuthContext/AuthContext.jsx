import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    return storedAuth === "true";
  });
  const storedUser = localStorage.getItem("user");
  // console.log("storedUser in AUth: ", storedUser);
  

  // return storedUser ? JSON.parse(storedUser) : null

  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user", JSON.stringify(userData));
  };
  const logOut = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
  };


  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
