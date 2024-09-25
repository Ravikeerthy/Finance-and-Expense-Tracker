import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./CreateBudgetStyle.css";

const SavingForm = () => {
  const initialValues = {
    savingAmount: "",
    targetDate: "",
    source: "",
  };

  const validationSchema = Yup.object({
    savingAmount: Yup.number().required("Amount is required").positive(),
    targetDate: Yup.date().required("Date is required"),
    source: Yup.string().required("Source is required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post(
        "https://back-end-d6p7.onrender.com/savings/newsaving",
        values,
        {
          headers: {
            // Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      resetForm();
    } catch (error) {
      console.error("Failed to add income:", error);
    }
  };
  return (
    <div className="saving-form">
      <h3 className="form-heading">Add Savings</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="form-class">
          <div>
            <label className="form-label">Amount:</label>
            <Field name="savingAmount" type="number" />
            <ErrorMessage
              name="savingAmount"
              component="div"
              className="error"
            />
          </div>

          <div>
            <label className="form-label">Date:</label>
            <Field name="targetDate" type="date" />
            <ErrorMessage name="targetDate" component="div" className="error" />
          </div>
          <div>
            <label className="form-label">Source:</label>
            <Field name="source" type="text" />
            <ErrorMessage name="source" component="div" className="error" />
          </div>
          <button type="submit" className="form-button">
            Add Saving
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default SavingForm;
