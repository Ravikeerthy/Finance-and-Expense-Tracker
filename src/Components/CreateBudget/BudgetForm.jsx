import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./CreateBudgetStyle.css"

const BudgetForm = () => {
 
    const initialValues = {
      budgetAmount: "",
      budgetCategory: "",
      budgetPeriod:"",
      startDate:"",
      endDate:""
    };

    const validationSchema = Yup.object({
      budgetAmount: Yup.number().required("Budget amount is required").positive(),
      budgetCategory: Yup.string().required("Category is required"),
      budgetPeriod:  Yup.string().required("Duration is required"),
      startDate: Yup.date().required("Date is required"),
      endDate: Yup.date().required("Date is required"),
    });

    const onSubmit = async (values, { resetForm }) => {
      try {
        const response = await axios.post("https://back-end-d6p7.onrender.com/budget/newbudget", values,
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
  
  return(
  <div className="budget-form">
    <h3 className="form-heading">Set Budget</h3>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className="form-class">
        <div>
          <label className="form-label">Budget Amount:</label>
          <Field name="budgetAmount" type="number" />
          <ErrorMessage name="budgetAmount" component="div" className="error" />
        </div>
        <div>
          <label className="form-label">Category:</label>
          <Field name="budgetCategory" type="text" />
          <ErrorMessage name="budgetCategory" component="div" className="error" />
        </div>
        <div>
          <label className="form-label">Category:</label>
          <Field name="budgetPeriod" type="text" />
          <ErrorMessage name="budgetPeriod" component="div" className="error" />
        </div>
        <div>
          <label className="form-label">Starting Date:</label>
          <Field name="startDate" type="date" />
          <ErrorMessage name="startDate" component="div" className="error" />
        </div>
        <div>
          <label className="form-label">Ending Date:</label>
          <Field name="endDate" type="date" />
          <ErrorMessage name="endDate" component="div" className="error" />
        </div>
        <button type="submit" className="form-button">Set Budget</button>
      </Form>
    </Formik>
  </div>
  );
};

export default BudgetForm;
