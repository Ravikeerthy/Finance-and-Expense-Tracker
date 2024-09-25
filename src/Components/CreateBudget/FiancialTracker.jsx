import React, { useState } from "react";
import IncomeForm from "./IncomeForm";
import ExpenseForm from "./ExpenseForm";
import BudgetForm from "./BudgetForm";
import SavingForm from "./SavingForm";
import Chart from "../chart/Chart";

const FinancialTracker = () => {
  const [data, setData] = useState({
    income: [],
    expense: [],
    budget: [],
    saving: []
  });

  const handleFormSubmit = (formType, value) => {
    setData((prevData) => ({
      ...prevData,
      [formType]: [...prevData[formType], value.amount]
    }));
  };

  return (
    <div className="financial-tracker">
      <h2>Financial Tracker</h2>
      <IncomeForm onSubmit={(value) => handleFormSubmit("income", value)} />
      <ExpenseForm onSubmit={(value) => handleFormSubmit("expense", value)} />
      <BudgetForm onSubmit={(value) => handleFormSubmit("budget", value)} />
      <SavingForm onSubmit={(value) => handleFormSubmit("saving", value)} />
      <Chart data={data} />
      <TableComponent data={data} />
    </div>
  );
};

export default FinancialTracker;
