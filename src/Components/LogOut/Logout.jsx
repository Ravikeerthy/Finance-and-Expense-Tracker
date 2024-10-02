import React, { useContext, useEffect } from 'react'
import {AuthContext} from "../AuthContext/AuthContext";
import { useNavigate } from 'react-router-dom';
import "./LogoutStyle.css"

const Logout = () => {
  const {logOut} = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(()=>{
    const handleLogOut = async() =>{
      await logOut();
      navigate("/register");
    };
    handleLogOut();
  },[logOut, navigate])
  return (
    <div>
        <div className="logout-container">
      <h1>Logging Out...</h1>
    </div>
    </div>
  )
}

export default Logout
