import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import "./StyleRegister.css";
import axios from "axios";

const PasswordResetComp = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const initialValues = {
    userName: "",
  };
  const validationSchema = yup.object().shape({
    userName: yup
      .string()
      .email("Invalid email format")
      .required("*UserName(Email) is required"),
  });
  const onSubmit = async (values, { resetForm }) => {
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const { userName } = values;
      const response = await axios.post(
        "http://localhost:4000/user/newuser/resetpassword",
        values
      );
      console.log(response.data);
      alert(response.data.message);
      resetForm();
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Server Error";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="card p-4 shadow-sm" style={{ width: "400px" }}>
          <h3 className="text-center">Reset Your Password</h3>

          {message && <p className="text-success">{message}</p>}
          {error && <p className="text-danger">{error}</p>}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {() => (
              <Form>
                <Field
                  name="userName"
                  type="email"
                  className="form-control"
                  placeholder="Enter your Email"
                  disabled={loading} // Disable input while loading
                />
                <ErrorMessage
                  name="userName"
                  component="div"
                  className="text-danger"
                />
                <button
                  type="submit"
                  className="btn btn-primary w-100 mt-3"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Submit"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetComp;
