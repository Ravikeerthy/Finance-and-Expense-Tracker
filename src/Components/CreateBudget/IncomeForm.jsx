import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./FormStyle.css";
import { toast, ToastContainer } from "react-toastify";

const IncomeForm = ({ onSubmit }) => {
  const [incomeDetails, setIncomeDetails] = useState([]);
  // const [loading, setLoading] = useState(true);

  const initialValues = {
    incomeAmount: "",
    incomeSource: "",
    date: "",
    isRecurring: false,
    frequency: "",
  };

  const validationSchema = Yup.object().shape({
    incomeAmount: Yup.number()
      .required("Income amount is required")
      .positive("Income amount must be positive"),
    incomeSource: Yup.string().required("Income source is required"),
    date: Yup.date().required("Date is required"),
    isRecurring: Yup.boolean().required("Check the recurring"),
    frequency: Yup.string().required("Select the frequency"),
  });

  const onSubmitHandler = async (values, { resetForm }) => {
    console.log("Submitted values:", values);

    try {
      const response = await axios.post(
        // "https://back-end-d6p7.onrender.com/income/newincome",
        "https://back-end-d6p7.onrender.com/income/newincome",
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

      const addedIncome = {
        incomeAmount: values.incomeAmount,
        incomeSource: values.incomeSource,
        date: values.date,
        frequency: values.frequency,
      };
      console.log("Income Form: ", addedIncome);

      onSubmit(addedIncome);
      setIncomeDetails((prevDetails) => {
        const updatedDetails = [...prevDetails, addedIncome];
        console.log("Updated Income Details:", updatedDetails);
        return updatedDetails;
      });
      resetForm();
      // toast.success(response.data.message);
      alert(response.data.message);
    } catch (error) {
      console.error("Failed to add budget:", error);
      // toast.error("Failed to add income. Please try again.");
    }
  };
  return (
    <div>
      <div className="budget-form">
        <h3 className="form-heading">Add Income</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmitHandler}
        >
          {({ values }) => (
            <Form className="form-class">
              <div>
                <label className="form-label">Income Amount:</label>
                <Field name="incomeAmount" type="number" />
                <ErrorMessage
                  name="incomeAmount"
                  component="div"
                  className="error"
                />
              </div>
              <div>
                <label className="form-label">Income Source:</label>
                <Field name="incomeSource" type="text" />
                <ErrorMessage
                  name="incomeSource"
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

              <button type="submit" className="form-button">
                Add Income
              </button>
            </Form>
          )}
        </Formik>
      </div>

      <ToastContainer />
    </div>
  );
};

export default IncomeForm;
