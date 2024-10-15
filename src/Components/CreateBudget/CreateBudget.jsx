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
import ExcelReport from "../Reports/ExcelReport";

const CreateBudget = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState(null);

  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);
  const [budget, setBudget] = useState([]);
  const [saving, setSaving] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [getIncome, setGetIncome] = useState({ userIncome: [] });
  const [getExpense, setGetExpense] = useState({ expenseByUserId: [] });
  const [getBudget, setGetBudget] = useState({ userBudget: [] });
  const [getSaving, setGetSaving] = useState({ savingGoals: [] });

  const [chartsData, setChartsData] = useState({
    labels: [],
    expenses: [],
    income: [],
    budget: [],
    saving: [],
  });

  const { user } = useContext(AuthContext);

  const userId = user ? user._id : null;
  // console.log("User ID from context:", userId);

  const token = localStorage.getItem("token");
  // console.log("Token", token);

  useEffect(() => {
    fetchAllData();
  }, [userId, token]);

  useEffect(() => {
    fetchChartData();
  }, [getExpense, getIncome, getBudget, getSaving]);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      // console.log(`Fetching Income for userId: ${userId}`);
      const incomeGetResponse = await axios.get(
        `https://back-end-d6p7.onrender.com/income/getIncomeByUserId/${userId}`,
        { headers, withCredentials: true }
      );
      setGetIncome(incomeGetResponse.data);
      console.log("IncomeGetData", incomeGetResponse.data);

      const expenseGetResponse = await axios.get(
        `https://back-end-d6p7.onrender.com/expense/expenseuserId/${userId}`,
        { headers, withCredentials: true }
      );
      setGetExpense(expenseGetResponse.data);
      console.log("ExpenseGetData", expenseGetResponse.data);

      const budgetGetResponse = await axios.get(
        `https://back-end-d6p7.onrender.com/budget/getBudgetByUserId/${userId} `,
        { headers, withCredentials: true }
      );
      setGetBudget(budgetGetResponse.data);
      console.log("BudgetGetData", budgetGetResponse.data);

      const savingGetResponse = await axios.get(
        `https://back-end-d6p7.onrender.com/savings/getbyid/${userId}`,
        { headers, withCredentials: true }
      );
      setGetSaving(savingGetResponse.data);
      console.log("SavingGetData", savingGetResponse.data);
      
    } catch (error) {
      console.error("Error fetching data from the database", error);
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchChartData = async () => {
    const currentMonth = new Date().getMonth();
    let totalExpenses = 0;
    let totalIncome = 0;

    const expenseLabelsSet = new Set();
    const incomeLabelsSet = new Set();

    const expensesByCategory = {};

    if (getExpense.expenseByUserId && getIncome.userIncome) {
      console.log("Monthly Expenses Data:", getExpense.expenseByUserId);
      console.log("Monthly Income Data:", getIncome.userIncome);

      getExpense.expenseByUserId.forEach((exp) => {
        const expenseDate = new Date(exp.date);
        if (expenseDate.getMonth() === currentMonth) {
          totalExpenses += exp.expenseAmount;
          const category = exp.expenseCategory || "Other";
          expenseLabelsSet.add(category);

          if (!expensesByCategory[category]) {
            expensesByCategory[category] = 0;
          }
          expensesByCategory[category] += exp.expenseAmount;
        }
      });

      getIncome.userIncome.forEach((inc) => {
        const incomeDate = new Date(inc.date);
        if (incomeDate.getMonth() === currentMonth) {
          totalIncome += inc.incomeAmount;
          incomeLabelsSet.add(inc.incomeSource || "Other");
        }
      });

      const expenseLabelsArray = Array.from(expenseLabelsSet);
      const incomeLabelsArray = Array.from(incomeLabelsSet);

      const expenseValuesArray = Object.values(expensesByCategory);

      setChartsData({
        expenseLabels: expenseLabelsArray,
        incomeLabels: incomeLabelsArray,

        expenses: expenseValuesArray,
        income: [totalIncome],
      });

      console.log("Chart Data Set:", chartsData);
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

  const updateStateArray = (stateSetter, prevState, newValue) => {
    if (Array.isArray(prevState)) {
      stateSetter([...prevState, newValue]);
    } else {
      console.error("State is not an array", prevState);
      stateSetter([newValue]);
    }
  };

  const handleFormSubmit = async (type, values) => {
    // console.log(`Submitting ${type} with values:`, values);
    switch (type) {
      case "income":
        updateStateArray(setIncome, income, values);
        break;
      case "expense":
        updateStateArray(setExpense, expense, values);

        break;
      case "budget":
        updateStateArray(setBudget, budget, values);

        break;
      case "saving":
        updateStateArray(setSaving, saving, values);

        break;
      default:
        break;
    }
    await fetchAllData();
    closeModal();
  };

  const chartData = {
    labels: chartsData.labels,
    expenses: chartsData.expenses,
    income: chartsData.income,
    budget: chartsData.budget,
    saving: chartsData.saving,
  };
  // console.log("chartData:", chartData);

  const totalIncome = Array.isArray(getIncome.userIncome)
    ? getIncome.userIncome.reduce(
        (acc, curr) => acc + (curr.incomeAmount || 0),
        0
      )
    : 0;

  const totalExpenses = Array.isArray(getExpense.expenseByUserId)
    ? getExpense.expenseByUserId.reduce(
        (acc, curr) => acc + (curr.expenseAmount || 0),
        0
      )
    : 0;

  const totalBudget = Array.isArray(getBudget.userBudget)
    ? getBudget.userBudget.reduce(
        (acc, curr) => acc + (curr.budgetAmount || 0),
        0
      )
    : 0;

  const totalSavings = Array.isArray(getSaving.savingGoals)
    ? getSaving.savingGoals.reduce(
        (acc, curr) => acc + (curr.savingAmount || 0),
        0
      )
    : 0;

  // console.log("Total Income:", totalIncome);
  // console.log("Total Expenses:", totalExpenses);
  // console.log("Total Budget:", totalBudget);
  // console.log("Total Savings:", totalSavings);

  const reportData = {
    income: totalIncome,
    expenses: totalExpenses,
    budget: totalBudget,
    savings: totalSavings,
  };

  // console.log("Report Data: ", reportData);

  return (
    <div className="create-budget-container">
      <h2 className="create-heading">Create Financial Entries</h2>

      <>
        <div className="button-group">
          <button onClick={() => openModal("income")} className="create-button">
            Create New Income
          </button>
          <button onClick={() => openModal("budget")} className="create-button">
            Create New Budget
          </button>
          <button
            onClick={() => openModal("expense")}
            className="create-button"
          >
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
              tabIndex={0}
              onKeyDown={(e)=>e.key === 'Escape' && closeModal()}
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
      </>
      {/* )} */}

      <div>
        <TableComp
          income={getIncome}
          expense={getExpense}
          budget={getBudget}
          saving={getSaving}
        />
      </div>
      <div className="chart-table-align">
        <Chart
          chartsData={{
            expenseLabels: chartsData.expenseLabels,
            expenses: chartsData.expenses,
            incomeLabels: chartsData.incomeLabels,
            income: chartsData.income,
          }}
        />
      </div>
      <div>
        <ExcelReport
          income={reportData.income}
          expenses={reportData.expenses}
          budget={reportData.budget}
          savings={reportData.savings}
        />
      </div>
    </div>
  );
};

export default CreateBudget;
