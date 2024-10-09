import React from 'react'
import "./TableStyle.css";

const GetDataDisplay = ({ getIncome, getExpense, getBudget, getSaving }) => {
    console.log("IncomeGetData", getIncome);
    console.log("expenseGetData", getExpense);
    console.log("budgetGetData", getBudget);
    console.log("savingGetData", getSaving);
    
  return (
    <div className="table-comp">
    <h3>Your Transactions</h3>

    {/* Income Table */}
    <h4>Income</h4>
    {getIncome.length > 0 ? (
      <table>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Source</th>
            <th>Date</th>
            <th>Frequency</th>
          </tr>
        </thead>
        <tbody>
          {getIncome.map((inc, index) => (
            <tr key={index}>
              <td>{inc.incomeAmount}</td>
              <td>{inc.incomeSource}</td>
              <td>{inc.date}</td>
              <td>{inc.frequency}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>No income records yet.</p>
    )}

    {/* Expense Table */}
    <h4>Expense</h4>
    {getExpense.length > 0 ? (
      <table>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Category</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {getExpense.map((exp, index) => (
            <tr key={index}>
              <td>{exp.expenseAmount}</td>
              <td>{exp.expenseCategory}</td>
              <td>{exp.expenseDescription}</td>
              <td>{exp.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>No expense records yet.</p>
    )}

    {/* Budget Table */}
    <h4>Budget</h4>
    {getBudget.length > 0 ? (
      <table>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Category</th>
            <th>Budget Period</th>
          </tr>
        </thead>
        <tbody>
          {getBudget.map((bud, index) => (
            <tr key={index}>
              <td>{bud.budgetAmount}</td>
              <td>{bud.budgetCategory}</td>
              <td>{bud.budgetPeriod}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>No budget records yet.</p>
    )}

    {/* Saving Table */}
    <h4>Saving</h4>
    {getSaving.length > 0 ? (
      <table>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Source</th>
            <th>Target Date</th>
          </tr>
        </thead>
        <tbody>
          {getSaving.map((sav, index) => (
            <tr key={index}>
              <td>{sav.savingAmount}</td>
              <td>{sav.source}</td>
              <td>{sav.targetDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>No saving records yet.</p>
    )}
  </div>

  )
}

export default GetDataDisplay
