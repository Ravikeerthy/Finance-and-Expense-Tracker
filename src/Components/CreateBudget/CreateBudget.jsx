import React, { useState } from "react";
import "./CreateBudgetStyle.css";
import ExpenseForm from "./ExpenseForm";
import SavingForm from "./SavingForm";
import IncomeForm from "./IncomeForm";
import BudgetForm from "./BudgetForm";
import TableComp from "./TableComp";

const CreateBudget = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState(null);

  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);
  const [budget, setBudget] = useState([]);
  const [saving, setSaving] = useState([]);

  const openModal = (formType) => {
    setCurrentForm(formType); 
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentForm(null);
  };

  const handleFormSubmit = (type, values) => {
    switch (type) {
      case "income":
        setIncome([...income, values.amount]); 
        break;
      case "expense":
        setExpense([...expense, values.amount]); 
        break;
      case "budget":
        setBudget([...budget, values.amount]); 
        break;
      case "saving":
        setSaving([...saving, values.amount]); 
        break;
      default:
        break;
    }
    
   
    closeModal();
  };

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
              <IncomeForm onSubmit={(values) => handleFormSubmit("income", values)} />
            )}
            {currentForm === "budget" && (
              <BudgetForm onSubmit={(values) => handleFormSubmit("budget", values)} />
            )}
            {currentForm === "expense" && (
              <ExpenseForm onSubmit={(values) => handleFormSubmit("expense", values)} />
            )}
            {currentForm === "saving" && (
              <SavingForm onSubmit={(values) => handleFormSubmit("saving", values)} />
            )}
          </div>
        </div>
      )}
      <div>
      <TableComp income={income} expense={expense} budget={budget} saving={saving}  />
      </div>
    </div>
  );
};

export default CreateBudget;
