import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "./StyleRegister.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import "./RegisterStyle.css"

const Register = () => {
  // const [isSignUpActive, setIsSignUpActive] = useState(false); 
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [isLoginForm, setIsLoginForm] = useState(true);

  const toggleLogin = () => {
    setIsLoginForm(true);
  };

  const toggleSignup = () => {
    setIsLoginForm(false);
  };

  // const token = localStorage.getItem("token");

  // const handleSignUpClick = () => {
  //   setIsSignUpActive(true);
  // };

  // const handleSignInClick = () => {
  //   setIsSignUpActive(false);
  // };
  const signUpIntialValues = {
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    contactNumber: "",
  };
  const signupValidationSchema = yup.object().shape({
    firstName: yup.string().required("*First Name is required"),
    lastName: yup.string().required("*Last Name is required"),
    userName: yup.string().required("*User Name is required"),
    password: yup
      .string()
      .min(5, "*Password must be atleast 5 charcters")
      .max(15, "*Password must be atmost 15 charcters")
      .required("*Password is required"),
    contactNumber: yup
      .string()
      .required("*contactNumber is required")
      .matches(/^\d{10}$/, "*Contact Number must be exactly 10 digits"),
  });
  const handleSignupSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      const { firstName, lastName, userName, password, contactNumber } = values;
      const response = await axios.post(
        // "https://back-end-d6p7.onrender.com/user/newUser/register",
        "https://back-end-d6p7.onrender.com/user/newuser/register",
        values
      );
      console.log(response.data);

      const message = response.data.message;
      toast.success("User Registered Successfully");
      resetForm();
      navigate("/register");
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage);
      } else {
        toast.error("Internal Server Error");
      }
      console.error("Registration Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const logInInitialValues = {
    userName: "",
    password: "",
  };

  const loginValidationSchema = yup.object().shape({
    userName: yup.string().required("*User Name is required"),
    password: yup.string().required("*Password is required"),
  });

  const handleLoginSubmit = async (values, { resetForm }) => {
    setLoading(true);

    try {
      const { userName, password } = values;
      console.log("Login Values: ", values);

      let response = await axios.post(
        // "https://localhost:4000/user/newuser/login",
        "https://back-end-d6p7.onrender.com/user/newuser/login",
        values,
        {
          headers: {
            
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const { token } = response.data;
      const { user } = response.data;
      const message = response.data.message;
      console.log("Response login data: ", response.data);
      localStorage.setItem("token", token);
      login(user, token);
      resetForm();
      // toast.success(response.data.message || "Login Successful");
      alert("Login Successfull")
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Server Error");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate("/reset-password");
  };
  return (
    
    <div className="form-modal">
    <h1 className="register-title">Welcome to Finance Tracker</h1>
   <p className="register-description">
     Manage your finances with ease. Log in or sign up to track your income, expenses, and budgets.
   </p>
   <div className="form-toggle">
     <button
       className="toggle"
       id="login-toggle"
       onClick={toggleLogin}
       style={{
         backgroundColor: !isLoginForm ? "#b246b8" : "#D3D3D3",
         color: isLoginForm ? "#fff" : "#222",
       }}
     >
       Log In
     </button>
     <button
       id="signup-toggle"
       className="toggle"
       onClick={toggleSignup}
       style={{
         backgroundColor: !isLoginForm ? "#b246b8" : "#D3D3D3",
         color: !isLoginForm ? "#fff" : "#222",
       }}
     >
       Sign Up
     </button>
   </div>

   <div className="form-container">
     {/* Login Form */}
     <div
       id="login-form"
       className={`form-content ${isLoginForm ? "active" : ""}`}
     >
        <h1 className="register-title-1">Login</h1>
  
  
       <Formik
         initialValues={logInInitialValues}
         validationSchema={loginValidationSchema}
         onSubmit={handleLoginSubmit}
       >
         <Form>
           <div className="mb-3">
             <Field
               type="text"
               name="userName"
               className="form-control"
               placeholder="Enter email or username *"
             />
             <ErrorMessage
               name="userName"
               component="div"
               className="text-danger"
             />
           </div>
           <div className="mb-3">
             <Field
               type="password"
               name="password"
               className="form-control"
               placeholder="Enter password *"
             />
             <ErrorMessage
               name="password"
               component="div"
               className="text-danger"
             />
           </div>
           <div className="mb-3">
             <a href="#" onClick={handleForgotPassword}>Forgot password</a>
           </div>
           <button
                type="submit"
                className={`btn-1 ${loading ? "loading" : ""}`} 
                disabled={loading} 
              >
                {loading ? "Loading..." : "Log In"} 
              </button>
         </Form>
       </Formik>
     </div>

     {/* Signup Form */}
     <div
       id="signup-form"
       className={`form-content ${!isLoginForm ? "active" : ""}`}
     >
        <h1 className="register-title-1">Register</h1>
       <Formik
         initialValues={signUpIntialValues}
         validationSchema={signupValidationSchema}
         onSubmit={handleSignupSubmit}
       >
         <Form>
           <div className="mb-3">
             <Field
               type="text"
               name="firstName"
               className="form-control"
               placeholder="Enter your first name *"
             />
             <ErrorMessage
               name="firstName"
               component="div"
               className="text-danger"
             />
           </div>
           <div className="mb-3">
             <Field
               type="text"
               name="lastName"
               className="form-control"
               placeholder="Enter your last name *"
             />
             <ErrorMessage
               name="lastName"
               component="div"
               className="text-danger"
             />
           </div>
           <div className="mb-3">
             <Field
               type="email"
               name="userName"
               className="form-control"
               placeholder="Enter your email *"
             />
             <ErrorMessage
               name="userName"
               component="div"
               className="text-danger"
             />
           </div>
           <div className="mb-3">
             <Field
               type="password"
               name="password"
               className="form-control"
               placeholder="Enter your password *"
             />
             <ErrorMessage
               name="password"
               component="div"
               className="text-danger"
             />
           </div>
           <div className="mb-3">
             <Field
               type="text"
               name="contactNumber"
               className="form-control"
               placeholder="Enter your contact number *"
             />
             <ErrorMessage
               name="contactNumber"
               component="div"
               className="text-danger"
             />
           </div>
           <button
                type="submit"
                className={`btn-1 ${loading ? "loading" : ""}`} 
                disabled={loading}
              >
                {loading ? "Loading..." : "Create Account"} 
              </button>
         </Form>
       </Formik>
     </div>
   </div>
   <ToastContainer />
 </div>
  );
};

export default Register;
