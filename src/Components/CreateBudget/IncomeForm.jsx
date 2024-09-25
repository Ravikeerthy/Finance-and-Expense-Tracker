import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./CreateBudgetStyle.css"

const IncomeForm = () => {
  const initialValues = {
    amount: "",
    category: "",
  };

  const validationSchema = Yup.object({
    amount: Yup.number().required("Budget amount is required").positive(),
    category: Yup.string().required("Category is required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post("/api/budget", values); 
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
              <Field name="amount" type="number" />
              <ErrorMessage name="amount" component="div" className="error" />
            </div>
            <div>
              <label className="form-label">Category:</label>
              <Field name="category" type="text" />
              <ErrorMessage name="category" component="div" className="error" />
            </div>
            <button type="submit" className="form-button">Set Budget</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default IncomeForm;
