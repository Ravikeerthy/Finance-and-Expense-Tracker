import React, { useContext, useEffect, useState } from "react";
import "./CreateBudgetStyle.css";
import ExpenseForm from "./ExpenseForm";
import SavingForm from "./SavingForm";
import IncomeForm from "./IncomeForm";
import BudgetForm from "./BudgetForm";
import TableComp from "./TableComp";
import Chart from "../chart/Chart";
import axios from "axios";
import { AuthContext } from "../AuthContext/AuthContext";

const CreateBudget = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState(null);

  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);
  const [budget, setBudget] = useState([]);
  const [saving, setSaving] = useState([]);

  const { user, isAuthenticated } = useContext(AuthContext);

  const userId = user ? user._id : null;
  console.log("UserId", userId);

  // const _id = localStorage.getItem("_id");
  const token = localStorage.getItem("token");

  // useEffect(() => {
  //   // if (userId) console.log("useEffect has been called");
  //   fetchAllData();
  // }, [userId]);

  // const fetchAllData = async () => {
  //   const headers = {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${token}`,
  //   };
  //   try {
  //     const incomeGetResponse = await axios.get(
  //       `http://localhost:4000/income/getIncomeByUserId/${userId}`,
  //       {headers, withCredentials: true,}
  //     );
  //     console.log("IncomeGetData", incomeGetResponse);

  //     const expenseGetResponse = await axios.get(
  //       `http://localhost:4000/expense/expenseuserId/${userId}`,
  //       {headers, withCredentials: true,}
  //     );
  //     console.log("ExpenseGetData", expenseGetResponse);

  //     const budgetGetResponse = await axios.get(
  //       `http://localhost:4000/budget/getBudgetById/${userId} `,
  //       {headers, withCredentials: true,}
  //     );
  //     console.log("BudgetGetData", budgetGetResponse);

  //     const savingGetResponse = await axios.get(
  //       `http://localhost:4000/savings/getbyid/${userId}`,
  //       {headers, withCredentials: true,}
  //     );
  //     console.log("SavingGetData", savingGetResponse);

      

  //     setIncome(incomeGetResponse.data);
  //     setExpense(expenseGetResponse.data);
  //     setBudget(budgetGetResponse.data);
  //     setSaving(savingGetResponse.data);
  //   } catch (error) {
  //     console.error("Error fetching data from the database", error);
  //   }
  // };
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
        setIncome((preIncome) => {
          if (Array.isArray(preIncome)) {
            return [...preIncome, values];
          } else {
            console.error("preIncome is not an array", preIncome);
            return [values];
          }
        });
        break;
      case "expense":
        setExpense((preExpense) => {
          if (Array.isArray(preExpense)) {
            return [...preExpense, values];
          } else {
            console.error("PreExpense is not an array", preExpense);
            return [values];
          }
        });

        break;
      case "budget":
        setBudget((preBudget) => {
          if (Array.isArray(preBudget)) {
            return [...preBudget, values];
          } else {
            console.error("PreBudget is not an array", preBudget);
            return [values];
          }
        });

        break;
      case "saving":
        setSaving((preSaving) => {
          if (Array.isArray(preSaving)) {
            return [...preSaving, values];
          } else {
            console.error("Presaving is not an array", preSaving);
          }
        });

        break;
      default:
        break;
    }

    closeModal();
  };

  const chartData = {
    labels:
      Array.isArray(expense) && expense.length > 0
        ? expense.map((exp) => exp.expenseCategory)
        : ["Other"],
    expenses: Array.isArray(expense)
      ? expense.map((exp) => exp.expenseAmount || 0)
      : [],
    income: Array.isArray(income)
      ? income.map((inc) => inc.incomeAmount || 0)
      : [],
    budget: Array.isArray(budget)
      ? budget.map((bud) => bud.budgetAmount || 0)
      : [],
    saving: Array.isArray(saving)
      ? saving.map((sav) => sav.savingAmount || 0)
      : [],
  };
  // console.log("chartData:", chartData);

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
