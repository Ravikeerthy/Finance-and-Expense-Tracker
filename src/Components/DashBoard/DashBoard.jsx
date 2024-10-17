import React from "react";
import "./DashboardStyle.css";

const DashBoard = ({
  income = [],
  expense = [],
  budget = [],
  savings = [],
  username,
}) => {
  console.log("Dashboard props:", {
    income,
    expense,
    budget,
    savings,
    username,
  });
  // Calculating totals
  const totalIncome = income.reduce(
    (acc, curr) => acc + (curr.incomeAmount || 0),
    0
  );
  const totalExpenses = expense.reduce(
    (acc, curr) => acc + (curr.expenseAmount || 0),
    0
  );
  const totalBudget = budget.reduce(
    (acc, curr) => acc + (curr.budgetAmount || 0),
    0
  );
  const totalSavings = savings.reduce(
    (acc, curr) => acc + (curr.savingAmount || 0),
    0
  );
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
