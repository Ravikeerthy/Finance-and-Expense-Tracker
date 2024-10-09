import React from "react";
import "./TableStyle.css";


const TableComp = ({ income, expense, budget, saving }) => {
  console.log("TableComp incomedata:", income);
  console.log("TableComp expensedata:", expense);
  console.log("TableComp savingdata:", saving);
  console.log("TableComp budgetdata:", budget);

  const incomeData = Array.isArray(income) ? income : [];
  const expenseData = Array.isArray(expense) ? expense : [];
  const budgetData = Array.isArray(budget) ? budget : [];
  const savingData = Array.isArray(saving) ? saving : [];

  return (
    <div className="table-comp">
      <h3>Financial Overview</h3>

      <h4>Income</h4>
      {incomeData.length > 0 ? (
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
            {incomeData.map((inc, index) => (
              <tr key={index}>
                <td>{inc.incomeAmount}</td>
                <td>{inc.incomeSource}</td>
                <td>{inc.date}</td>
                <td>{inc.frequency}</td>
                <td><i class="fa-solid fa-pen-to-square"></i></td>
                <td><i class="fa-solid fa-trash"></i></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No income records yet.</p>
      )}

      {/* Expense Table */}
      <h4>Expense</h4>
      {expenseData.length > 0 ? (
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
            {expenseData.map((exp, index) => (
              <tr key={index}>
                <td>{exp.expenseAmount}</td>
                <td>{exp.expenseCategory}</td>
                <td>{exp.expenseDescription}</td>
                <td>{exp.date}</td>
                <td><i class="fa-solid fa-pen-to-square"></i></td>
                <td><i class="fa-solid fa-trash"></i></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No expense records yet.</p>
      )}

      {/* Budget Table */}
      <h4>Budget</h4>
      {budgetData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Category</th>
              <th>Budget Period</th>
            </tr>
          </thead>
          <tbody>
            {budgetData.map((bud, index) => (
              <tr key={index}>
                <td>{bud.budgetAmount}</td>
                <td>{bud.budgetCategory}</td>
                <td>{bud.budgetPeriod}</td>
                <td><i class="fa-solid fa-pen-to-square"></i></td>
                <td><i class="fa-solid fa-trash"></i></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No budget records yet.</p>
      )}

      {/* Saving Table */}
      <h4>Saving</h4>
      {savingData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Source</th>
              <th>Target Date</th>
            </tr>
          </thead>
          <tbody>
            {savingData.map((sav, index) => (
              <tr key={index}>
                <td>{sav.savingAmount}</td>
                <td>{sav.source}</td>
                <td>{sav.targetDate}</td>
                <td><i class="fa-solid fa-pen-to-square"></i></td>
                <td><i class="fa-solid fa-trash"></i></td>
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
