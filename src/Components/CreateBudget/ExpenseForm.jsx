import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./CreateBudgetStyle.css"

const ExpenseForm = () => {
  const initialValues = {
    expenseAmount: "",
    expenseCategory: "",
    expenseDescription:"",
    date: "",
  };

  const validationSchema = Yup.object({
    expenseAmount: Yup.number().required("Amount is required").positive(),
    expenseCategory: Yup.string().required("Category is required"),
    expenseDescription: Yup.string().required("Description is required"),
    date: Yup.date().required("Date is required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post("https://back-end-d6p7.onrender.com/expense/newexpense", values,
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
            <Field  name="expenseAmount" type="number"/>
            <ErrorMessage name="expenseAmount" component="div" className="error" />
          </div>
          <div>
            <label className="form-label">Category:</label>
            <Field name="expenseCategory" type="text" />
            <ErrorMessage name="expenseCategory" component="div" className="error" />
          </div>
          <div>
            <label className="form-label">Description:</label>
            <Field name="expenseDescription" type="text" />
            <ErrorMessage name="expenseDescription" component="div" className="error" />
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
