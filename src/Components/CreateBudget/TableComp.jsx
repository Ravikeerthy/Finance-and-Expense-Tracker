import React from 'react'
import "./TableStyle.css";

const TableComp = ({ income, expense, budget, saving }) => {
    console.log("Income:", income);
    console.log("Expense:", expense);
    console.log("Budget:", budget);
    console.log("Saving:", saving);
  return (
    <div>
    <h3>Financial Data Table</h3>
    <table className="financial-table">
      <thead>
        <tr>
          <th>Type</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {income?.map((amount, index) => (
          <tr key={`income-${index}`}>
            <td>Income</td>
            <td>{amount}</td>
          </tr>
        ))}

        {expense?.map((amount, index) => (
          <tr key={`expense-${index}`}>
            <td>Expense</td>
            <td>{amount}</td>
          </tr>
        ))}

        {budget?.map((amount, index) => (
          <tr key={`budget-${index}`}>
            <td>Budget</td>
            <td>{amount}</td>
          </tr>
        ))}

        {saving?.map((amount, index) => (
          <tr key={`saving-${index}`}>
            <td>Saving</td>
            <td>{amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default TableComp
