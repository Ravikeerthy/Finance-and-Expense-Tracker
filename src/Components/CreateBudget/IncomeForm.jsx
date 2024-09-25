import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./CreateBudgetStyle.css"

const IncomeForm = () => {
  const initialValues = {
    incomeAmount: "",
    incomeSource: "",
    date:""
  };

  const validationSchema = Yup.object({
    incomeAmount: Yup.number().required("Budget amount is required").positive(),
    incomeSource: Yup.string().required("Category is required"),
    date:  Yup.date().required("Date is required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post("https://back-end-d6p7.onrender.com/income/newincome", values,
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
      console.error("Failed to add budget:", error);
    }
  };
  return (
    <div>
      <div className="budget-form">
        <h3 className="form-heading">Add Income</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="form-class">
            <div>
              <label className="form-label">Budget Amount:</label>
              <Field name="incomeAmount" type="number" />
              <ErrorMessage name="incomeAmount" component="div" className="error" />
            </div>
            <div>
              <label className="form-label">Category:</label>
              <Field name="incomeSource" type="text" />
              <ErrorMessage name="incomeSource" component="div" className="error" />
            </div>
            <div>
            <label className="form-label">Date:</label>
            <Field name="date" type="date" />
            <ErrorMessage name="date" component="div" className="error" />
          </div>
            <button type="submit" className="form-button">Set Budget</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default IncomeForm;
