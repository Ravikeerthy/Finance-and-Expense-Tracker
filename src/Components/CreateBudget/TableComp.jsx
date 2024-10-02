import React from "react";
import "./TableStyle.css";

const TableComp = ({ income, expense, budget, saving  }) => {
  console.log("TableComp incomedata:", income);
  console.log("TableComp savingdata:", saving);


  return (
    <div className="table-comp">
    <h3>Financial Overview</h3>

    {/* Income Table */}
    <h4>Income</h4>
    {income.length > 0 ? (
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
          {income.map((inc, index) => (
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
    {expense.length > 0 ? (
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
          {expense.map((exp, index) => (
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
    {budget.length > 0 ? (
      <table>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Category</th>
            <th>Budget Period</th>
          </tr>
        </thead>
        <tbody>
          {budget.map((bud, index) => (
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
    {saving.length > 0 ? (
      <table>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Source</th>
            <th>Target Date</th>
          </tr>
        </thead>
        <tbody>
          {saving.map((sav, index) => (
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
  );
};

export default TableComp;
