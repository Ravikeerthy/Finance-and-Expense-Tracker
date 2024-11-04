import React, { useContext, useEffect } from "react";
import "./SettingStyle.css";
import { ThemeContext } from "../AuthContext/ThemeMode";

const ProfileSettings = () => {
 
  const {theme, toggleTheme} = useContext(ThemeContext);

  // const [isDarkMode, setIsDarkMode] = useState(() => {
  //   const storedTheme = localStorage.getItem("theme");
  //   return storedTheme === "dark";
  // });

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // const toggleDarkMode = () => {
  //   const newTheme = isDarkMode ? "light" : "dark";
  //   setIsDarkMode(!isDarkMode);
  //   localStorage.setItem("theme", newTheme);
  // };

  return (
    <div className={`settings-page ${theme}`}>
      <h2 className={`settings-page ${theme}`}>Settings Page</h2>

      <div className="theme-toggle">
        <label>Theme:</label>
        <button onClick={toggleTheme} className="theme-button">
          {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
