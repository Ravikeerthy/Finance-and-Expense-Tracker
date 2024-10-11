import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./CreateBudgetStyle.css";
import { toast, ToastContainer } from "react-toastify";

const ExpenseForm = ({ onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const initialValues = {
    expenseAmount: "",
    expenseCategory: "",
    expenseDescription: "",
    date: "",
    isRecurring: false,
    frequency: "",
    // month: "",
  };

  const validationSchema = Yup.object({
    expenseAmount: Yup.number().required("Amount is required").positive(),
    expenseCategory: Yup.string().required("Category is required"),
    expenseDescription: Yup.string().required("Description is required"),
    date: Yup.date().required("Date is required"),
    isRecurring: Yup.boolean().required("Check the Recurring"),
    frequency: Yup.string().required("Select the frequency"),
    // month: Yup.string().required("Select a month"),
  });

  const expenseOnSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      const response = await axios.post(
        // "https://back-end-d6p7.onrender.com/expense/newexpense",
        "http://localhost:4000/expense/newexpense",
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

      const newExpenseData = {
        expenseAmount: values.expenseAmount,
        expenseCategory: values.expenseCategory,
        expenseDescription: values.expenseDescription,
        date: values.date,
        // month: values.month,
      };
      onSubmit(newExpenseData);
      resetForm();
      toast.success(response.data.message);
    } catch (error) {
      console.error("Failed to add expense:", error);
      toast.error("Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="expense-form">
      <h3 className="form-heading">Add Expense</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={expenseOnSubmit}
      >
        {({ values }) => (
          <Form className="form-class">
            <div>
              <label className="form-label">Amount:</label>
              <Field name="expenseAmount" type="number" />
              <ErrorMessage
                name="expenseAmount"
                component="div"
                className="error"
              />
            </div>
            <div>
              <label className="form-label">Category:</label>
              <Field name="expenseCategory" type="text" />
              <ErrorMessage
                name="expenseCategory"
                component="div"
                className="error"
              />
            </div>
            <div>
              <label className="form-label">Description:</label>
              <Field name="expenseDescription" type="text" />
              <ErrorMessage
                name="expenseDescription"
                component="div"
                className="error"
              />
            </div>
            <div>
              <label className="form-label">Date:</label>
              <Field name="date" type="date" />
              <ErrorMessage name="date" component="div" className="error" />
            </div>

            <div>
              <label className="form-label">Is Recurring:</label>
              <Field name="isRecurring" type="checkbox" />
            </div>

            {values.isRecurring && (
              <div>
                <label className="form-label">Frequency:</label>
                <Field as="select" name="frequency">
                  <option value="">Select Frequency</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </Field>
                <ErrorMessage
                  name="frequency"
                  component="div"
                  className="error"
                />
              </div>
            )}
            <button type="submit" className="form-button" disabled={loading}>
              {loading ? "Submitting..." : "Add Expense"}
            </button>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default ExpenseForm;
