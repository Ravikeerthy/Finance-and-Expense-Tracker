import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [income, setIncome] = useState({ userIncome: [] });
  const [expense, setExpense] = useState({ expenseByUserId: [] });
  const [budget, setBudget] = useState({ userBudget: [] });
  const [saving, setSaving] = useState({ savingGoals: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState({
    labels: [],
    expenses: [],
    income: [],
  });

  const [financeData, setFinanceData] = useState({
    incomes: [],
    expenses: [],
    budgets: [],
  });

  const userId = user ? user._id : null;

  useEffect(() => {
    fetchData();
  }, [userId, token]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    if (!token || !userId) {
      setError("Unauthorized or user not logged in");
      setLoading(false);
      return;
    }
   

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const incomeResponse = await axios.get(
        `https://back-end-d6p7.onrender.com/income/getIncomeByUserId/${userId}`,
        { headers }
      );
      setIncome(incomeResponse.data);

      const expenseResponse = await axios.get(
        `https://back-end-d6p7.onrender.com/expense/expenseuserId/${userId}`,
        { headers }
      );
      setExpense(expenseResponse.data);

      const budgetResponse = await axios.get(
        `https://back-end-d6p7.onrender.com/budget/getBudgetByUserId/${userId}`,
        { headers }
      );
      setBudget(budgetResponse.data);

      const savingResponse = await axios.get(
        `https://back-end-d6p7.onrender.com/savings/getbyid/${userId}`,
        { headers }
      );
      setSaving(savingResponse.data);

      updateChartData(incomeResponse.data.userIncome, expenseResponse.data.expenseByUserId, budgetResponse.data.userBudget, savingResponse.data.savingGoals);
    } catch (error) {
      console.error("Error fetching data", error);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };
  
  const updateChartData = (incomeData, expenseData) => {
    const currentMonth = new Date().getMonth();
    const expenseLabelsSet = new Set();
    const expensesByCategory = {};
    let totalExpenses = 0;
    let totalIncome = 0;
    expenseData.forEach((exp) => {
        const expenseDate = new Date(exp.date);
        if (expenseDate.getMonth() === currentMonth) {
          totalExpenses += exp.expenseAmount;
          const category = exp.expenseCategory || "Other";
          expenseLabelsSet.add(category);
  
          if (!expensesByCategory[category]) {
            expensesByCategory[category] = 0;
          }
          expensesByCategory[category] += exp.expenseAmount;
        }
      });
  
      incomeData.forEach((inc) => {
        const incomeDate = new Date(inc.date);
        if (incomeDate.getMonth() === currentMonth) {
          totalIncome += inc.incomeAmount;
        }
      });
  
      const expenseLabelsArray = Array.from(expenseLabelsSet);
      const expenseValuesArray = Object.values(expensesByCategory);
  
     
      setChartData({
        labels: expenseLabelsArray,
        expenses: expenseValuesArray,
        income: [totalIncome],
      });
  }

  const handleDelete = async (type, id) => {
    try {
      const endpointMap = {
        income: `https://back-end-d6p7.onrender.com/income/delete/${id}`,
        expense: `https://back-end-d6p7.onrender.com/expense/delete/${id}`,
        budget: `https://back-end-d6p7.onrender.com/budget/delete/${id}`,
        saving: `https://back-end-d6p7.onrender.com/savings/delete/${id}`,
      };

      await axios.delete(endpointMap[type], {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (type === "income") {
        setIncome((prev) => prev.filter((item) => item._id !== id));
      } else if (type === "expense") {
        setExpense((prev) => prev.filter((item) => item._id !== id));
      } else if (type === "budget") {
        setBudget((prev) => prev.filter((item) => item._id !== id));
      } else if (type === "saving") {
        setSaving((prev) => prev.filter((item) => item._id !== id));
      }

      alert("Item deleted successfully.");
    } catch (error) {
      console.error("Error deleting item", error);
      alert("Failed to delete item.");
    }
  };

  const editItem = async (type, item) => {
    const token = user ? user.token : null;
    let updateURL;
    switch (type) {
      case "income":
        updateURL = `https://back-end-d6p7.onrender.com/income/update/${item._id}`;
        break;
      case "expense":
        updateURL = `https://back-end-d6p7.onrender.com/expense/update/${item._id}`;
        break;
      case "budget":
        updateURL = `https://back-end-d6p7.onrender.com/budget/update/${item._id}`;
        break;
      default:
        return;
    }
    try {
      const response = await axios.put(updateURL, item, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        setIncome((prev) =>
          type === "income"
            ? prev.map((dataItem) =>
                dataItem._id === item._id ? item : dataItem
              )
            : prev
        );
        setExpense((prev) =>
          type === "expense"
            ? prev.map((dataItem) =>
                dataItem._id === item._id ? item : dataItem
              )
            : prev
        );
        setBudget((prev) =>
          type === "budget"
            ? prev.map((dataItem) =>
                dataItem._id === item._id ? item : dataItem
              )
            : prev
        );

        alert("Values updated successfully!");
      }
    } catch (error) {
      console.error("Error updating record", error);
      alert("Failed to update Values.");
    }
  };

  return (
    <FinanceContext.Provider
      value={{
        income,
        expense,
        budget,
        saving,
        loading,
        error,
        chartData,
        fetchData,
        handleDelete,
        editItem,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};
