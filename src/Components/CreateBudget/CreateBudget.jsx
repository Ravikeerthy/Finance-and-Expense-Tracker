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
  const {
    income,
    expense,
    budget,
    saving,
    fetchData,
    chartData,
    loading,
    error,
  } = useContext(FinanceContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState(null);

  // const [getIncome, setGetIncome] = useState({ userIncome: [] });
  // const [getExpense, setGetExpense] = useState({ expenseByUserId: [] });
  // const [getBudget, setGetBudget] = useState({ userBudget: [] });
  // const [getSaving, setGetSaving] = useState({ savingGoals: [] });

  const [chartsData, setChartsData] = useState({
    labels: [],
    expense: [],
    income: [],
    budget: [],
    saving: [],
  });

  const { user } = useContext(AuthContext);

  const userId = user ? user._id : null;
  const userName = user ? user.firstName : null;
  console.log("UserName: ", userName);

  // console.log("User ID from context:", userId);

  const token = user ? user.token : null;
  // console.log("Token", token);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // useEffect(() => {
  //   chartData;
  // }, [income, expense]);

  

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
    // console.log(`Submitting ${type} with values:`, values);
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

  // const chartDatas = {
  //   labels: chartsData.labels,
  //   expense: chartsData.expense,
  //   income: chartsData.income,
  //   budget: chartsData.budget,
  //   saving: chartsData.saving,
  // };
  // console.log("chartData:", chartData);

  const totalIncome = Array.isArray(income.userIncome)
    ? income.userIncome.reduce((acc, curr) => acc + (curr.incomeAmount || 0), 0)
    : 0;

  const totalExpenses = Array.isArray(expense.expenseByUserId)
    ? expense.expenseByUserId.reduce(
        (acc, curr) => acc + (curr.expenseAmount || 0),
        0
      )
    : 0;

  const totalBudget = Array.isArray(budget.userBudget)
    ? budget.userBudget.reduce((acc, curr) => acc + (curr.budgetAmount || 0), 0)
    : 0;

  const totalSaving = Array.isArray(saving.savingGoals)
    ? saving.savingGoals.reduce(
        (acc, curr) => acc + (curr.savingAmount || 0),
        0
      )
    : 0;

  

  // const reportData = {
  //   income: totalIncome,
  //   expense: totalExpenses,
  //   budget: totalBudget,
  //   saving: totalSaving,
  // };

  // console.log("Report Data: ", reportData);

  return (
    <div className="create-budget-container">
      <h2 className="create-heading">Create Financial Entries</h2>

      <>
        <div className="button-group">
          <button onClick={() => openModal("income")} className="create-button">
            Create New Income
          </button>
          <button onClick={() => openModal("budget")} className="create-button">
            Create New Budget
          </button>
          <button
            onClick={() => openModal("expense")}
            className="create-button"
          >
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
