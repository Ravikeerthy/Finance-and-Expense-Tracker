import React, { useContext, useEffect, useState } from "react";
import "./SettingStyle.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthContext/AuthContext";

const ProfileSettings = () => {
  const { userId, token } = useContext(AuthContext);
  // const userId = user ? user._id : null;
  const navigate = useNavigate();

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme === "dark";
  });

  useEffect(() => {
    document.body.className = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="settings-page">
      <h2 className="setting-heading">Settings Page</h2>

      <div className="theme-toggle">
        <label>Theme:</label>
        <button onClick={toggleDarkMode} className="theme-button">
          {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
