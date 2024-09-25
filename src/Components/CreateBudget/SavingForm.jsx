import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./CreateBudgetStyle.css"

const SavingForm = () => {
  const initialValues = {
    amount: "",
    source: "",
    date: "",
  };

  const validationSchema = Yup.object({
    amount: Yup.number().required("Amount is required").positive(),
    source: Yup.string().required("Source is required"),
    date: Yup.date().required("Date is required"),
  });

  const onSubmit = async (values, { resetForm }) => { 
    try {
      const response = await axios.post("https://back-end-d6p7.onrender.com/savings/newsaving", values,
        {
          headers: {
            // Authorization: `Bearer ${token}`,  
            'Content-Type': 'application/json'
          }}
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
            <Field name="amount" type="number" />
            <ErrorMessage name="amount" component="div" className="error" />
          </div>
          <div>
            <label className="form-label">Source:</label>
            <Field name="source" type="text" />
            <ErrorMessage name="source" component="div" className="error" />
          </div>
          <div>
            <label className="form-label">Date:</label>
            <Field name="date" type="date" />
            <ErrorMessage name="date" component="div" className="error" />
          </div>
          <button type="submit" className="form-button">Add Saving</button>
        </Form>
      </Formik>
    </div>
  );
};

export default SavingForm;
