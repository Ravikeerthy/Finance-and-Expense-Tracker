import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./CreateBudgetStyle.css";
import { toast } from "react-toastify";

const BudgetForm = ({onSubmit}) => {
  const initialValues = {
    budgetAmount: "",
    budgetCategory: "",
    budgetPeriod: "",
   
  };

  const validationSchema = Yup.object({
    budgetAmount: Yup.number().required("Budget amount is required").positive(),
    budgetCategory: Yup.string().required("Category is required"),
    budgetPeriod: Yup.string().required("Duration is required"),
   
  });

  const budgetOnSubmit = async (values, { resetForm }) => {
    console.log("Form Values:", values);
    try {
      const response = await axios.post(
        // "https://back-end-d6p7.onrender.com/budget/newbudget",
        "http://localhost:4000/budget/newbudget",
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
      const newBudgetData = {
        budgetAmount:values.budgetAmount,
        budgetCategory:values.budgetCategory,
        budgetPeriod:values.budgetPeriod,
           
       }
       console.log("newBudgetData: ", newBudgetData);
       
      onSubmit(newBudgetData);
      resetForm();
      toast.success(response.data.message)
    } catch (error) {
      console.error("Failed to add budget:", error);
      toast.error("Failed to add budget")
    }
  };

  return (
    <div className="budget-form">
      <h3 className="form-heading">Set Budget</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={budgetOnSubmit}
      >
        <Form className="form-class">
          <div>
            <label className="form-label">Budget Amount:</label>
            <Field name="budgetAmount" type="number" />
            <ErrorMessage
              name="budgetAmount"
              component="div"
              className="error"
            />
          </div>
          <div>
            <label className="form-label">Category:</label>
            <Field name="budgetCategory" type="text" />
            <ErrorMessage
              name="budgetCategory"
              component="div"
              className="error"
            />
          </div>
          <div>
            <label className="form-label">Budget Period:</label>
            <Field name="budgetPeriod" type="text" />
            <ErrorMessage
              name="budgetPeriod"
              component="div"
              className="error"
            />
          </div>
         
          <button type="submit" className="form-button">
            Set Budget
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default BudgetForm;
