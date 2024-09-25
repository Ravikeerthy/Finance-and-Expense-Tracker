import React, { useEffect, useState } from "react";
import "./SettingStyle.css";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const ProfileSettings = () => {
  const [initialUsername, setInitialUsername] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedTheme = localStorage.getItem("theme");
    if (storedUsername) setInitialUsername(storedUsername);
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark");
    }
  }, []);

  const handleLogout = async() => {
    try {
      await axios.post("");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
   
  };

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", newTheme);
    document.body.className = newTheme;
  };

  const passwordSchema = Yup.object({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const emailSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  return (
    <div className="settings-page">
      <h2 className="setting-heading">Settings Page</h2>

      {/* Username Update */}
      <Formik
        initialValues={{ username: initialUsername }}
        validationSchema={Yup.object({
          username: Yup.string()
            .min(3, "Username must be at least 3 characters")
            .required("Username is required"),
        })}
        onSubmit={(values) => {
          localStorage.setItem("username", values.username);
          setInitialUsername(values.username);
          alert("Username updated!");
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="update-container">
              <label>Update Username:</label>
              <Field
                type="text"
                name="username"
                placeholder="Enter new username"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="error-message"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-button"
            >
              Update Username
            </button>
          </Form>
        )}
      </Formik>

      <Formik
        initialValues={{ email: "" }}
        validationSchema={emailSchema}
        onSubmit={(values) => {
          alert(`Email updated to: ${values.email}`);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="updatingEmail-container">
              <label>Update Email:</label>
              <Field type="email" name="email" placeholder="Enter new email" />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-button"
            >
              Update Email
            </button>
          </Form>
        )}
      </Formik>

      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={passwordSchema}
        onSubmit={(values) => {
          alert("Password changed successfully!");
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="changepwd-container">
              <label>Change Password:</label>
              <Field
                type="password"
                name="password"
                placeholder="Enter new password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />
            </div>
            <div className="changepwd-container">
              <label>Confirm Password:</label>
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Confirm new password"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="error-message"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-button"
            >
              Change Password
            </button>
          </Form>
        )}
      </Formik>     
     

      {/* Theme Toggle */}
      <div className="theme-toggle">
        <label>Theme:</label>
        <button onClick={toggleTheme} className="theme-button">
          {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>

      {/* Logout Button */}
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>

      <button className="delete-button" onClick={() => alert("Delete account functionality here!")}>
        Delete Account
      </button>
    </div>
  );
};

export default ProfileSettings;
