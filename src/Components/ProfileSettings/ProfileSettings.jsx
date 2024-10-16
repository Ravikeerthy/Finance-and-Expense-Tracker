import React, { useContext, useEffect, useState } from "react";
import "./SettingStyle.css";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../AuthContext/ThemeMode";
import axios from "axios";
import { AuthContext } from "../AuthContext/AuthContext";

const ProfileSettings = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const userId = user ? user._id : null;

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", newTheme);
    document.body.className = newTheme;
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(
        `http://back-end-d6p7.onrender.com/user/newuser/delete/${userId}`
      );
      alert("Account deleted successfully.");
      navigate("/login"); 
    } catch (error) {
      console.log(error);
      alert("Error deleting account. Please try again.");
    }
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

      <button onClick={handleDeleteAccount} className="delete-button">
        Delete Account
      </button>
    </div>
  );
};

export default ProfileSettings;
