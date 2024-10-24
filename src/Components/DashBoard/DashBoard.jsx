import React, { useContext, useEffect, useState } from "react";
import "./DashboardStyle.css";
import { FinanceContext } from "../AuthContext/FinanceContext ";
import Chart from "../chart/Chart";
import axios from "axios";
import { AuthContext } from "../AuthContext/AuthContext";

const DashBoard = ({}) => {
  const { income, expense, budget, saving, token, username } =
    useContext(FinanceContext);
const {userId} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, [userId, token]);

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

      console.log("IncomeGetData", incomeGetResponse.data);

      const expenseGetResponse = await axios.get(
        `https://back-end-d6p7.onrender.com/expense/expenseuserId/${userId}`,
        { headers, withCredentials: true }
      );

      console.log("ExpenseGetData", expenseGetResponse.data);

      const budgetGetResponse = await axios.get(
        `https://back-end-d6p7.onrender.com/budget/getBudgetByUserId/${userId} `,
        { headers, withCredentials: true }
      );

      console.log("BudgetGetData", budgetGetResponse.data);

      const savingGetResponse = await axios.get(
        `https://back-end-d6p7.onrender.com/savings/getbyid/${userId}`,
        { headers, withCredentials: true }
      );

      console.log("SavingGetData", savingGetResponse.data);
    } catch (error) {
      console.error("Error fetching data from the database", error);
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };
  // Calculating totals
  const totalIncome = Array.isArray(income)
  ? income.reduce((acc, curr) => acc + (curr.incomeAmount || 0), 0)
  : 0;

const totalExpenses = Array.isArray(expense)
  ? expense.reduce((acc, curr) => acc + (curr.expenseAmount || 0), 0)
  : 0;

const totalBudget = Array.isArray(budget)
  ? budget.reduce((acc, curr) => acc + (curr.budgetAmount || 0), 0)
  : 0;

const totalSavings = Array.isArray(saving)
  ? saving.reduce((acc, curr) => acc + (curr.savingAmount || 0), 0)
  : 0;

  console.log(
    "Dash board amounts: ",
    totalIncome,
    totalExpenses,
    totalBudget,
    totalSavings
  );

  // Net Balance
  const netBalance = totalIncome - totalExpenses;
  console.log("Net Balance: ", netBalance);

  // Expense Breakdown by Category
  const expenseByCategory = expense.reduce((acc, curr) => {
    const category = curr.expenseCategory || "Other";
    acc[category] = (acc[category] || 0) + (curr.expenseAmount || 0);
    return acc;
  }, {});
  console.log("Expense category: ", expenseByCategory);

  // Get recent transactions
  const recentTransactions = [...income, ...expense]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);
  console.log("Recent transactions: ", recentTransactions);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        {username && <p className="username">{username}</p>}
      </div>
      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Income</h3>
          <p>{totalIncome.toFixed(2)}</p>
        </div>
        <div className="card">
          <h3>Total Expenses</h3>
          <p>{totalExpenses.toFixed(2)}</p>
        </div>
        <div className="card">
          <h3>Total Budget</h3>
          <p>{totalBudget.toFixed(2)}</p>
        </div>
        <div className="card">
          <h3>Total Savings</h3>
          <p>{totalSavings.toFixed(2)}</p>
        </div>
        <div className="card">
          <h3>Net Balance</h3>
          <p>{netBalance.toFixed(2)}</p>
        </div>
      </div>

      {/* Expense Breakdown by Category */}
      <div className="expense-breakdown">
        <h3>Expense Breakdown by Category</h3>
        <ul>
          {Object.entries(expenseByCategory).map(([category, amount]) => (
            <li key={category}>
              {category}: {amount.toFixed(2)}
            </li>
          ))}
        </ul> 
      </div>

      <Chart userId={userId} token={token} />

      {/* Recent Transactions */}
      <div className="recent-transactions">
        <h3>Recent Transactions</h3>
        <ul>
          {recentTransactions.map((transaction, index) => (
            <li key={index}>
              {transaction.date}:{" "}
              {transaction.incomeAmount
                ? `Income - ${transaction.incomeAmount}`
                : `Expense - ${transaction.expenseAmount}`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashBoard;
