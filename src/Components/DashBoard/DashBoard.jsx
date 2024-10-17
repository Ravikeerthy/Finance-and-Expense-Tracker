import React from 'react'
import "./DashboardStyle.css"

const DashBoard = ({ income = [], expense =[], budget=[], savings=[], username }) => {
  const totalIncome = income.reduce((acc, curr) => acc + (curr.incomeAmount || 0), 0);
  const totalExpenses = expense.reduce((acc, curr) => acc + (curr.expenseAmount || 0), 0);
  const totalBudget = budget.reduce((acc, curr) => acc + (curr.budgetAmount || 0), 0);
  const totalSavings = savings.reduce((acc, curr) => acc + (curr.savingAmount || 0), 0);
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        {username && <p className="username">{username}</p>} 
      </div>
      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Income</h3>
          <p>${totalIncome.toFixed(2)}</p>
        </div>
        <div className="card">
          <h3>Total Expenses</h3>
          <p>${totalExpenses.toFixed(2)}</p>
        </div>
        <div className="card">
          <h3>Total Budget</h3>
          <p>${totalBudget.toFixed(2)}</p>
        </div>
        <div className="card">
          <h3>Total Savings</h3>
          <p>${totalSavings.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}

export default DashBoard
