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
    
  };

  const validationSchema = Yup.object({
    expenseAmount: Yup.number().required("Amount is required").positive(),
    expenseCategory: Yup.string().required("Category is required"),
    expenseDescription: Yup.string().required("Description is required"),
    date: Yup.date().required("Date is required"),
    isRecurring: Yup.boolean().required("Check the Recurring"),
    frequency: Yup.string().required("Select the frequency"),
    
  });

  const expenseOnSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      const response = await axios.post(
        // "https://back-end-d6p7.onrender.com/expense/newexpense",
        "https://back-end-d6p7.onrender.com/expense/newexpense",
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
        
      };
      onSubmit(newExpenseData);
      resetForm();
      alert(response.data.message);
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
              <label className="form-label"><i class="bi bi-asterisk" ></i> Amount:</label>
              <Field name="expenseAmount" type="number" />
              <ErrorMessage
                name="expenseAmount"
                component="div"
                className="error"
              />
            </div>
            <div>
              <label className="form-label"><i class="bi bi-asterisk" ></i> Category:</label>
              <Field name="expenseCategory" type="text" />
              <ErrorMessage
                name="expenseCategory"
                component="div"
                className="error"
              />
            </div>
            <div>
              <label className="form-label"><i class="bi bi-asterisk" ></i> Description:</label>
              <Field name="expenseDescription" type="text" />
              <ErrorMessage
                name="expenseDescription"
                component="div"
                className="error"
              />
            </div>
            <div>
              <label className="form-label"><i class="bi bi-asterisk" ></i> Date:</label>
              <Field name="date" type="date" />
              <ErrorMessage name="date" component="div" className="error" />
            </div>

            <div>
              <label className="form-label"><i class="bi bi-asterisk" ></i> Is Recurring:</label>
              <Field name="isRecurring" type="checkbox" />
            </div>

            {values.isRecurring && (
              <div>
                <label className="form-label"><i class="bi bi-asterisk" ></i> Frequency:</label>
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
            <div className="form-button-container">
          <button type="submit" className="form-button" disabled={loading}>
            {loading ? "Submitting..." : "Add Expense"}
          </button>
        </div>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default ExpenseForm;
