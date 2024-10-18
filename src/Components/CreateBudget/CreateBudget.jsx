  import React, { useContext, useEffect, useState } from "react";
  import "./CreateBudgetStyle.css";
  import ExpenseForm from "./ExpenseForm";
  import SavingForm from "./SavingForm";
  import IncomeForm from "./IncomeForm";
  import BudgetForm from "./BudgetForm";
  import { AuthContext } from "../AuthContext/AuthContext";
  import ExcelReport from "../Reports/ExcelReport";
  import Dashboard from "../DashBoard/DashBoard";
import { FinanceContext } from "../AuthContext/FinanceContext ";
  

  const CreateBudget = () => {
    const { income, expense, budget, saving, fetchData, chartData, loading, error } =
      useContext(FinanceContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentForm, setCurrentForm] = useState(null);

    // const [getIncome, setGetIncome] = useState({ userIncome: [] });
    // const [getExpense, setGetExpense] = useState({ expenseByUserId: [] });
    // const [getBudget, setGetBudget] = useState({ userBudget: [] });
    // const [getSaving, setGetSaving] = useState({ savingGoals: [] });

    const [chartsData, setChartsData] = useState({
      labels: [],
      expenses: [],
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

    useEffect(() => {
      chartData();
    }, [income, expense, chartData]);

    // const fetchAllData = async () => {
    //   setLoading(true);
    //   setError(null);

    //   const headers = {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   };
    //   try {
    //     // console.log(`Fetching Income for userId: ${userId}`);
    //     const incomeGetResponse = await axios.get(
    //       `https://back-end-d6p7.onrender.com/income/getIncomeByUserId/${userId}`,
    //       { headers, withCredentials: true }
    //     );
    //     setGetIncome(incomeGetResponse.data);
    //     console.log("IncomeGetData", incomeGetResponse.data);

    //     const expenseGetResponse = await axios.get(
    //       `https://back-end-d6p7.onrender.com/expense/expenseuserId/${userId}`,
    //       { headers, withCredentials: true }
    //     );
    //     setGetExpense(expenseGetResponse.data);
    //     console.log("ExpenseGetData", expenseGetResponse.data);

    //     const budgetGetResponse = await axios.get(
    //       `https://back-end-d6p7.onrender.com/budget/getBudgetByUserId/${userId} `,
    //       { headers, withCredentials: true }
    //     );
    //     setGetBudget(budgetGetResponse.data);
    //     console.log("BudgetGetData", budgetGetResponse.data);

    //     const savingGetResponse = await axios.get(
    //       `https://back-end-d6p7.onrender.com/savings/getbyid/${userId}`,
    //       { headers, withCredentials: true }
    //     );
    //     setGetSaving(savingGetResponse.data);
    //     console.log("SavingGetData", savingGetResponse.data);
    //   } catch (error) {
    //     console.error("Error fetching data from the database", error);
    //     setError("Failed to fetch data.");
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // const fetchChartData = async () => {
    //   const currentMonth = new Date().getMonth();
    //   let totalExpenses = 0;
    //   let totalIncome = 0;

    //   const expenseLabelsSet = new Set();
    //   const incomeLabelsSet = new Set();

    //   const expensesByCategory = {};

    //   if (getExpense.expenseByUserId && getIncome.userIncome) {
    //     console.log("Monthly Expenses Data:", getExpense.expenseByUserId);
    //     console.log("Monthly Income Data:", getIncome.userIncome);

    //     getExpense.expenseByUserId.forEach((exp) => {
    //       const expenseDate = new Date(exp.date);
    //       if (expenseDate.getMonth() === currentMonth) {
    //         totalExpenses += exp.expenseAmount;
    //         const category = exp.expenseCategory || "Other";
    //         expenseLabelsSet.add(category);

    //         if (!expensesByCategory[category]) {
    //           expensesByCategory[category] = 0;
    //         }
    //         expensesByCategory[category] += exp.expenseAmount;
    //       }
    //     });

    //     getIncome.userIncome.forEach((inc) => {
    //       const incomeDate = new Date(inc.date);
    //       if (incomeDate.getMonth() === currentMonth) {
    //         totalIncome += inc.incomeAmount;
    //         incomeLabelsSet.add(inc.incomeSource || "Other");
    //       }
    //     });

    //     const expenseLabelsArray = Array.from(expenseLabelsSet);
    //     const incomeLabelsArray = Array.from(incomeLabelsSet);

    //     const expenseValuesArray = Object.values(expensesByCategory);

    //     setChartsData({
    //       expenseLabels: expenseLabelsArray,
    //       incomeLabels: incomeLabelsArray,

    //       expenses: expenseValuesArray,
    //       income: [totalIncome],
    //     });

    //     console.log("Chart Data Set:", chartsData);
    //   }
    // };

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

    const chartDatas = {
      labels: chartsData.labels,
      expenses: chartsData.expenses,
      income: chartsData.income,
      budget: chartsData.budget,
      saving: chartsData.saving,
    };
    // console.log("chartData:", chartData);

    const totalIncome = Array.isArray(income.userIncome)
      ? income.userIncome.reduce(
          (acc, curr) => acc + (curr.incomeAmount || 0),
          0
        )
      : 0;

    const totalExpenses = Array.isArray(expense.expenseByUserId)
      ? expense.expenseByUserId.reduce(
          (acc, curr) => acc + (curr.expenseAmount || 0),
          0
        )
      : 0;

    const totalBudget = Array.isArray(budget.userBudget)
      ? budget.userBudget.reduce(
          (acc, curr) => acc + (curr.budgetAmount || 0),
          0
        )
      : 0;

    const totalSavings = Array.isArray(saving.savingGoals)
      ? saving.savingGoals.reduce(
          (acc, curr) => acc + (curr.savingAmount || 0),
          0
        )
      : 0;

    // console.log("Total Income:", totalIncome);
    // console.log("Total Expenses:", totalExpenses);
    // console.log("Total Budget:", totalBudget);
    // console.log("Total Savings:", totalSavings);

    const reportData = {
      income: totalIncome,
      expenses: totalExpenses,
      budget: totalBudget,
      savings: totalSavings,
    };

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
        {/* )} */}

        {/* <div>
          <TableComp
            income={getIncome}
            expense={getExpense}
            budget={getBudget}
            saving={getSaving}
          />
        </div> */}
        <div className="chart-table-align">
          {/* <Chart
            chartsData={{
              expenseLabels: chartsData.expenseLabels,
              expenses: chartsData.expenses,
              incomeLabels: chartsData.incomeLabels,
              income: chartsData.income,
              userId:  userId ,
              token:  token ,
            }}
          /> */}
        </div>
        <div>
          <ExcelReport
            income={reportData.income}
            expenses={reportData.expenses}
            budget={reportData.budget}
            savings={reportData.savings}
            userId={userId}
            token={token}
          />
        </div>
        <Dashboard
          income={getIncome.userIncome}
          expense={getExpense.expenseByUserId}
          budget={getBudget.userBudget}
          savings={getSaving.savingGoals}
          username={userName}
          userId={userId}
          token={token}
        />
      </div>
    );
  };

  export default CreateBudget;
