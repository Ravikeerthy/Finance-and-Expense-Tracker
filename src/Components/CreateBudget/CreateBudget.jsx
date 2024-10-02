import React, { useEffect, useState } from "react";
import "./CreateBudgetStyle.css";
import ExpenseForm from "./ExpenseForm";
import SavingForm from "./SavingForm";
import IncomeForm from "./IncomeForm";
import BudgetForm from "./BudgetForm";
import TableComp from "./TableComp";
import Chart from "../chart/Chart";
import axios from "axios";

const CreateBudget = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState(null);

  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);
  const [budget, setBudget] = useState([]);
  const [saving, setSaving] = useState([]);

  const _id = localStorage.getItem("_id");
  const token = localStorage.getItem("token");

  useEffect(() => {
    console.log("useEffect has been called");
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      withCredentials: true,
    };
    try {
      setLoading(true);
      const incomeGetResponse = await axios.get(
        `http://localhost:4000/income/getIncomeByUserId/${_id}`,
        headers
      );
      console.log("IncomeGetData", incomeGetResponse);

      const expenseGetResponse = await axios.get(
        `http://localhost:4000/expense/expenseuserId/${_id}`,
        headers
      );
      console.log("ExpenseGetData", expenseGetResponse);

      const budgetGetResponse = await axios.get(
        `http://localhost:4000/budget/getBudgetById/${_id} `,
        headers
      );
      console.log("BudgetGetData", budgetGetResponse);

      const savingGetResponse = await axios.get(
        `http://localhost:4000/savings/getbyid/${_id}`,
        headers
      );
      console.log("SavingGetData", savingGetResponse);

      setIncome(incomeGetResponse.data);
      setExpense(expenseGetResponse.data);
      setBudget(budgetGetResponse.data);
      setSaving(savingGetResponse.data);
    } catch (error) {
      console.error("Error fetching data from the database", error);
    } finally {
      setLoading(false);
    }
  };
  const openModal = (formType) => {
    console.log(`Opening modal for: ${formType}`);
    setCurrentForm(formType);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("Closing modal");
    setIsModalOpen(false);
    setCurrentForm(null);
  };

  const handleFormSubmit = (type, values) => {
    console.log(`Submitting ${type} with values:`, values);
    switch (type) {
      case "income":
        setIncome((preIncome) => [...preIncome, values]);
        console.log("Updated Income:", [...income, values]);
        break;
      case "expense":
        setExpense((preExpense) => [...preExpense, values]);
        console.log("Updated Expense:", [...expense, values]);
        break;
      case "budget":
        setBudget((preBudget) => [...preBudget, values]);
        console.log("Updated Budget:", [...budget, values]);
        break;
      case "saving":
        setSaving((preSaving) => [...preSaving, values]);
        console.log("Updated Saving:", [...saving, values]);
        break;
      default:
        break;
    }

    closeModal();
  };

  const chartData = {
    labels:
      expense.length > 0
        ? expense.map((exp) => exp.expenseCategory)
        : ["Other"],
    expenses: expense.map((exp) => exp.expenseAmount || 0),
    income: income.map((inc) => inc.incomeAmount || 0),
    budget: budget.map((bud) => bud.budgetAmount || 0),
    saving: saving.map((sav) => sav.savingAmount || 0),
  };
  console.log("chartData:", chartData);

  return (
    <div className="create-budget-container">
      <h2 className="create-heading">Create Financial Entries</h2>

      <div className="button-group">
        <button onClick={() => openModal("income")} className="create-button">
          Create New Income
        </button>
        <button onClick={() => openModal("budget")} className="create-button">
          Create New Budget
        </button>
        <button onClick={() => openModal("expense")} className="create-button">
          Create New Expense
        </button>
        <button onClick={() => openModal("saving")} className="create-button">
          Create New Saving
        </button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content animate-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={closeModal} className="close-button">
              <i className="fa-solid fa-xmark"></i>
            </button>

            {currentForm === "income" && (
              <IncomeForm
                onSubmit={(values) => handleFormSubmit("income", values)}
              />
            )}
            {currentForm === "budget" && (
              <BudgetForm
                onSubmit={(values) => handleFormSubmit("budget", values)}
              />
            )}
            {currentForm === "expense" && (
              <ExpenseForm
                onSubmit={(values) => handleFormSubmit("expense", values)}
              />
            )}
            {currentForm === "saving" && (
              <SavingForm
                onSubmit={(values) => handleFormSubmit("saving", values)}
              />
            )}
          </div>
        </div>
      )}
      <div className="chart-table-align">
        <div>
          <Chart chartData={chartData} />
        </div>
        <div>
          <TableComp
            income={income}
            expense={expense}
            budget={budget}
            saving={saving}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateBudget;
