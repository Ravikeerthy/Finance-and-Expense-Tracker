import React, { useContext, useEffect, useState } from "react";
import "./CreateBudgetStyle.css";
import ExpenseForm from "./ExpenseForm";
import SavingForm from "./SavingForm";
import IncomeForm from "./IncomeForm";
import BudgetForm from "./BudgetForm";
import { AuthContext } from "../AuthContext/AuthContext";
import { FinanceContext } from "../AuthContext/FinanceContext ";
import TableComp from "./TableComp";

const CreateBudget = () => {
  const { income, expense, budget, saving, fetchData } =
    useContext(FinanceContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState(null);

  const { user } = useContext(AuthContext);

  const userId = user ? user._id : null;
  const userName = user ? user.firstName : null;
  console.log("UserName: ", userName);

  // console.log("User ID from context:", userId);

  const token = user ? user.token : null;
  // console.log("Token", token);

  useEffect(() => {
    fetchData();
  }, []);

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

  const updateStateArray = (stateSetter, prevState, updatedItem) => {
    if (Array.isArray(prevState)) {
      const index = prevState.findIndex((item) => item._id === updatedItem._id);
      if (index !== -1) {
        const updatedArray = [...prevState];
        updatedArray[index] = updatedItem;
        stateSetter(updatedArray);
      }
    }
  };

  const handleFormSubmit = async (type, values) => {
    try {
      switch (type) {
        case "income":
          updateStateArray(income, income, values);
          break;
        case "expense":
          updateStateArray(expense, expense, values);

          break;
        case "budget":
          updateStateArray(budget, budget, values);

          break;
        case "saving":
          updateStateArray(saving, saving, values);

          break;
        default:
          break;
      }
      await fetchData();
      closeModal();
    } catch (error) {
      console.error("Failed to fetch data after submitting form", error);
    }
  };

  return (
    <div className="create-budget-container">
      <h2 className="create-heading">Create Financial Entries</h2>

      <>
        <div className="button-group">
          <button onClick={() => openModal("income")} className="create-button">
            Create New Income
          </button>
          <button
            onClick={() => openModal("expense")}
            className="create-button"
          >
            Create New Expense
          </button>
          <button onClick={() => openModal("budget")} className="create-button">
            Create New Budget
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
              onKeyDown={(e) => e.key === "Escape" && closeModal()}
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

      <div className="chart-table-align"></div>
      <TableComp />
    </div>
  );
};

export default CreateBudget;
