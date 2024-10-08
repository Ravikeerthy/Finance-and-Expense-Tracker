import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "./StyleRegister.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContext";

const Register = () => {
  const [isSignUpActive, setIsSignUpActive] = useState(false); // State to toggle between Sign Up and Sign In
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUpActive(true);
  };

  const handleSignInClick = () => {
    setIsSignUpActive(false);
  };
  const initialValues = {
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    contactNumber: "",
  };
  const validationSchema = yup.object().shape({
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
  const onSubmit = async (values, { resetForm }) => {
    setLoading(true); 
    try {
      const { firstName, lastName, userName, password, contactNumber } = values;
      const response = await axios.post(
        "https://back-end-d6p7.onrender.com/user/newUser/register",
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
    }finally {
      setLoading(false);
    }
  };

  const initialLoginValues = {
    userName: "",
    password: "",
  };

  const loginValidationSchema = yup.object().shape({
    userName: yup.string().required("*User Name is required"),
    password: yup.string().required("*Password is required"),
  });

  const loginOnSubmit = async (values, { resetForm }) => {
    setLoading(true); 
    try {
      const { userName, password } = values;
      let response = await axios.post( "http://localhost:4000/user/newuser/login",
        // "https://back-end-d6p7.onrender.com/user/newUser/login",
        values,
        {
          headers: {
            // Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          withCredentials: true,
        }
      );
      const { token } = response.data;
      const {user} = response.data;
      const message = response.data.message;
      console.log(response.data);
      localStorage.setItem("token", token);
      login(user);
      resetForm();
      toast.success( response.data.message || "Login Successful");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Server Error");
    }finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () =>{
    navigate("/reset-password")
  }
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-gradient">
      <div
        className={`container bg-white shadow rounded-3 position-relative ${
          isSignUpActive ? "active" : ""
        }`}
      >
        {/* Sign Up Form */}
        <div className="form-container sign-up position-absolute w-50 h-100 p-4">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <h3>Create Account</h3>
              <span>or use your email for registration</span>
              <div className="form-group my-3">
                <Field
                  name="firstName"
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="form-group my-3">
                <Field
                  name="lastName"
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="form-group my-3">
                <Field
                  name="userName"
                  type="email"
                  className="form-control"
                  placeholder="User Name(Email)"
                />
                <ErrorMessage
                  name="userName"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="form-group my-3">
                <Field
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="form-group my-3">
                <Field
                  name="contactNumber"
                  type="text"
                  className="form-control"
                  placeholder="Contact Number"
                />
                <ErrorMessage
                  name="contactNumber"
                  component="div"
                  className="text-danger"
                />
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </Form>
          </Formik>
        </div>

        {/* Sign In Form */}
        <div className="form-container sign-in position-absolute w-50 h-100 p-4">
          <Formik
            initialValues={initialLoginValues}
            validationSchema={loginValidationSchema}
            onSubmit={loginOnSubmit}
          >
            <Form>
              <h1>Sign In</h1>
              <span>or use your email and password</span>
              <div className="form-group my-3">
                <Field
                  name="userName"
                  type="email"
                  className="form-control"
                  placeholder="User Name(Email)"
                />
                <ErrorMessage
                  name="userName"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="form-group my-3">
                <Field
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger"
                />
              </div>
              <a href="#" className="small" onClick={handleForgotPassword}>
                Forgot Your Password?
              </a>
              <button type="submit" className="btn btn-primary w-100 mt-3" disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </Form>
          </Formik>
        </div>

        {/* Toggle Panels */}
        <div className="toggle-container position-absolute w-50 h-100">
          <div className="toggle d-flex align-items-center justify-content-center bg-primary text-white h-100">
            <div className="toggle-panel toggle-left p-4">
              <h1>Welcome Back!</h1>
              <p>
                Enter your personal details to sign in and use all the site
                features
              </p>
              <button
                className="btn btn-outline-light"
                onClick={handleSignInClick}
              >
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right text-center p-4">
              <h1>Hello, Friends!</h1>
              <p>
                Register with your personal details to sign up and enjoy all the
                site features
              </p>
              <button
                className="btn btn-outline-light"
                onClick={handleSignUpClick}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
