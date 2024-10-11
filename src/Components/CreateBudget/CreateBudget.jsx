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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [getIncome, setGetIncome] = useState([]);
  const [getExpense, setGetExpense] = useState([]);
  const [getSaving, setGetSaving] = useState([]);
  const [getBudget, setGetBudget] = useState([]);

  const [chartsData, setChartsData] = useState({
    labels: [],
    expenses: [],
    income: [],
    budget: [],
    saving: [],
  });

  const { user } = useContext(AuthContext);

  const userId = user ? user._id : null;
  // console.log("UserId", userId);

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
      const incomeGetResponse = await axios.get(
        `http://localhost:4000/income/getIncomeByUserId/${userId}`,
        { headers, withCredentials: true }
      );
      setGetIncome(incomeGetResponse.data);
      console.log("IncomeGetData", incomeGetResponse.data);
      console.log("Intial Valies of getIncome: ", getIncome);

      const expenseGetResponse = await axios.get(
        `http://localhost:4000/expense/expenseuserId/${userId}`,
        { headers, withCredentials: true }
      );
      setGetExpense(expenseGetResponse.data);
      console.log("ExpenseGetData", expenseGetResponse.data);

      const budgetGetResponse = await axios.get(
        `http://localhost:4000/budget/getBudgetByUserId/${userId} `,
        { headers, withCredentials: true }
      );
      setGetBudget(budgetGetResponse.data);
      console.log("BudgetGetData", budgetGetResponse.data);

      const savingGetResponse = await axios.get(
        `http://localhost:4000/savings/getbyid/${userId}`,
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
    const monthlyExpenses = Array(12).fill(0);
    const monthlyIncome = Array(12).fill(0);

    if (getExpense.expenseByUserId && getIncome.userIncome) {
      console.log("Expenses Data:", getExpense.expenseByUserId);
      console.log("Income Data:", getIncome.userIncome);
      getExpense.expenseByUserId.forEach((exp) => {
        const expenseDate = new Date(exp.date); 
      const monthIndex = expenseDate.getMonth()+1;
        console.log(`Processing Expense: ${exp.expenseAmount} for month ${monthIndex}`);
        monthlyExpenses[monthIndex] += exp.expenseAmount;
      });

      getIncome.userIncome.forEach((inc) => {
        const incomeDate = new Date(inc.date); 
        const monthIndex = incomeDate.getMonth()+1;
        console.log(`Processing Income: ${inc.incomeAmount} for month ${monthIndex}`);

        monthlyIncome[monthIndex] += inc.incomeAmount;
      });
    }
   

    setChartsData({
      labels: getExpense.expenseByUserId.map(
        (exp) => exp.expenseCategory || "other",
        expense
      ),
      expenses: monthlyExpenses,
      expense: getExpense.expenseByUserId.map((exp) => exp.expenseAmount || 0),
      income: getIncome.userIncome.map((inc) => inc.incomeAmount || 0),
      budget: getBudget.userBudget.map((bud) => bud.budgetAmount || 0),
      saving: getSaving.savingGoals.map((sav) => sav.savingAmount || 0),
      month: monthlyIncome,
    });
    console.log("setChartedData", chartsData);
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
    console.log(`Submitting ${type} with values:`, values);
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
  console.log("chartData:", chartData);

  return (
    <div className="create-budget-container">
      <h2 className="create-heading">Create Financial Entries</h2>

      {loading && <p>Loading data...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <>
          <div className="button-group">
            <button
              onClick={() => openModal("income")}
              className="create-button"
            >
              Create New Income
            </button>
            <button
              onClick={() => openModal("budget")}
              className="create-button"
            >
              Create New Budget
            </button>
            <button
              onClick={() => openModal("expense")}
              className="create-button"
            >
              Create New Expense
            </button>
            <button
              onClick={() => openModal("saving")}
              className="create-button"
            >
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
        </>
      )}

      <div>
        <TableComp
          income={getIncome}
          expense={getExpense}
          budget={getBudget}
          saving={getSaving}
        />
      </div>
      <div className="chart-table-align">
        <div>
          <Chart chartsData={chartsData} />
        </div>
      </div>
    </div>
  );
};

export default CreateBudget;
