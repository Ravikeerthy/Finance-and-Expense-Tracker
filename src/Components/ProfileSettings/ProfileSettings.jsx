import React, { useContext, useEffect, useState } from "react";
import "./SettingStyle.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthContext/AuthContext";

const ProfileSettings = () => {
  const { user } = useContext(AuthContext);
  const userId = user ? user._id : null;
  const navigate = useNavigate();

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme === "dark";
  });

  useEffect(() => {
    document.body.className = isDarkMode ? "dark" : "light"; // Set body class on mount
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", newTheme);
  };

  const handleDeleteAccount = async () => {
    if (!userId) return; // Prevent deletion if no user ID is available
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
