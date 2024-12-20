import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const { user, token, userId } = useContext(AuthContext);
  //   const [income, setIncome] = useState({ userIncome: [] });
  const [income, setIncome] = useState([]);
  //   const [expense, setExpense] = useState({ expenseUserId: [] });
  const [expense, setExpense] = useState([]);
  //   const [budget, setBudget] = useState({ userBudget: [] });
  const [budget, setBudget] = useState([]);
  //   const [saving, setSaving] = useState({ savingGoals: [] });
  const [saving, setSaving] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState({
    labels: [],
    expenses: [],
    income: [],
  });

  
  const username = user ? user.firstName : "Guest";

  useEffect(() => {
    fetchData();
  }, [userId]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    if (!userId) {
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
        { headers, withCredentials: true }
      );
      setIncome(incomeResponse.data.userIncome || []);

      const expenseResponse = await axios.get(
        `https://back-end-d6p7.onrender.com/expense/expenseuserId/${userId}`,
        { headers, withCredentials: true }
      );
      setExpense(expenseResponse.data.userExpenses || []);

      const budgetResponse = await axios.get(
        `https://back-end-d6p7.onrender.com/budget/getBudgetByUserId/${userId}`,
        { headers, withCredentials: true }
      );
      setBudget(budgetResponse.data.userBudget || []);

      const savingResponse = await axios.get(
        `https://back-end-d6p7.onrender.com/savings/getbyid/${userId}`,
        { headers, withCredentials: true }
      );
      setSaving(savingResponse.data.savingGoals || []);

      console.log("Income:", income);
      console.log("Expense:", expense);
      console.log("Budget:", budget);
      console.log("Savings:", saving);

      updateChartData(
        incomeResponse.data.userIncome,
        expenseResponse.data.userExpenses
        // budgetResponse.data.userBudget,
        // savingResponse.data.savingGoals
      );
      
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
      console.log("Current Month Expense:", exp);
    });

    incomeData.forEach((inc) => {
      const incomeDate = new Date(inc.date);
      if (incomeDate.getMonth() === currentMonth) {
        totalIncome += inc.incomeAmount;
        console.log("Current Month Income:", inc);
      }
    });

    const expenseLabelsArray = Array.from(expenseLabelsSet);
    const expenseValuesArray = Object.values(expensesByCategory);

    setChartData((prevState) => ({
      ...prevState,
      labels: expenseLabelsArray,
      expenses: expenseValuesArray,
      income: [totalIncome],
      totalExpenses: totalExpenses,
    }));

    console.log("Expense Labels Array:", expenseLabelsArray);
    console.log("Expense Values Array:", expenseValuesArray);
    console.log("Total Income:", totalIncome);
  };

  const handleDelete = async (type, id) => {
    console.log("Authorization Token:", token);
    const confirmDelete = window.confirm("Are you sure you want to delete the item?");
    if(!confirmDelete) {return};

    try {
      const endpointMap = {
        income: `https://back-end-d6p7.onrender.com/income/delete/${id}`,
        expense: `https://back-end-d6p7.onrender.com/expense/delete/${id}`,
        budget: `https://back-end-d6p7.onrender.com/budget/delete/${id}`,
        saving: `https://back-end-d6p7.onrender.com/savings/delete/${id}`,
      };

      const deleteResponse = await axios.delete(endpointMap[type], {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log("Deleted Response: ", deleteResponse);

      if (type === "income") {
        setIncome((prev) => prev.filter((item) => item._id !== id));
      } else if (type === "expense") {
        setExpense((prev) => prev.filter((item) => item._id !== id));
      } else if (type === "budget") {
        setBudget((prev) => prev.filter((item) => item._id !== id));
      } else if (type === "saving") {
        setSaving((prev) => prev.filter((item) => item._id !== id));
      }
      console.log("Deleting:", type, "ID:", id);
      await fetchData();

      alert("Item deleted successfully.");
    } catch (error) {
      console.error("Error deleting item", error);
      alert("Failed to delete items.");
    } finally{
      await fetchData();
    }
  };

  const editItem = async (type, item) => {
    // const token = user ? user.token : null;
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
        username,
        income,
        expense,
        budget,
        saving,
        loading,
        error,
        updatedChartData: chartData,
        fetchData,
        handleDelete,
        editItem,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};
