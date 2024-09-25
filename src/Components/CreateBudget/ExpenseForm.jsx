import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./CreateBudgetStyle.css"

const ExpenseForm = () => {
  const initialValues = {
    amount: "",
    category: "",
    date: "",
  };

  const validationSchema = Yup.object({
    amount: Yup.number().required("Amount is required").positive(),
    category: Yup.string().required("Category is required"),
    date: Yup.date().required("Date is required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post("https://back-end-d6p7.onrender.com/expense/newexpense", values); 
      console.log(response.data);
      resetForm();
    } catch (error) {
      console.error("Failed to add expense:", error);
    }
  };

  return (
    <div className="expense-form">
      <h3 className="form-heading">Add Expense</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="form-class">
          <div>
            <label className="form-label">Amount:</label>
            <Field  name="amount" type="number"/>
            <ErrorMessage name="amount" component="div" className="error" />
          </div>
          <div>
            <label className="form-label">Category:</label>
            <Field name="category" type="text" />
            <ErrorMessage name="category" component="div" className="error" />
          </div>
          <div>
            <label className="form-label">Date:</label>
            <Field name="date" type="date" />
            <ErrorMessage name="date" component="div" className="error" />
          </div>
          <button type="submit" className="form-button">Add Expense</button>
        </Form>
      </Formik>
    </div>
  );
};

export default ExpenseForm;
