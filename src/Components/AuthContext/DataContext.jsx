import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    previousMonthIncome: 0,
    previousMonthExpense: 0,
    totalIncome: 0,
    totalExpenses: 0,
    previousWeekIncome: 0,
    previousWeekExpense: 0,
    currentWeekIncome: 0,
    currentWeekExpense: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (userId, token) => {
    setLoading(true);
    setError(null);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      const [
        previousMonthResponse,
        previousExpensesResponse,
        currentMonthResponse,
        currentExpensesResponse,
        previousWeekIncomeResponse,
        previousWeekExpenseResponse,
        currentWeekIncomeResponse,
        currentWeekExpenseResponse,
      ] = await Promise.all([
        axios.get(
          `https://back-end-d6p7.onrender.com/income/getIncomeByUserId/${userId}?month=previous`,
          { headers, withCredentials: true }
        ),
        axios.get(
          `https://back-end-d6p7.onrender.com/expense/expenseuserId/${userId}?month=previous`,
          { headers, withCredentials: true }
        ),
        axios.get(
          `https://back-end-d6p7.onrender.com/income/getIncomeByUserId/${userId}?month=current`,
          { headers }
        ),
        axios.get(
          `https://back-end-d6p7.onrender.com/expense/expenseuserId/${userId}?month=current`,
          { headers }
        ),
        axios.get(
          `https://back-end-d6p7.onrender.com/income/getIncomeByUserId/${userId}?week=previous`,
          { headers }
        ),
        axios.get(
          `https://back-end-d6p7.onrender.com/expense/expenseuserId/${userId}?week=previous`,
          { headers }
        ),
        axios.get(
          `https://back-end-d6p7.onrender.com/income/getIncomeByUserId/${userId}?week=current`,
          { headers }
        ),
        axios.get(
          `https://back-end-d6p7.onrender.com/expense/expenseuserId/${userId}?week=current`,
          { headers }
        ),
      ]);

      setData({
        previousMonthIncome: previousMonthResponse.data.totalIncome || 0,
        previousMonthExpense: previousExpensesResponse.data.totalExpense || 0,
        totalIncome: currentMonthResponse.data.totalIncome || 0,
        totalExpenses: currentExpensesResponse.data.totalExpense || 0,
        previousWeekIncome: previousWeekIncomeResponse.data.totalIncome || 0,
        previousWeekExpense: previousWeekExpenseResponse.data.totalExpense || 0,
        currentWeekIncome: currentWeekIncomeResponse.data.totalIncome || 0,
        currentWeekExpense: currentWeekExpenseResponse.data.totalExpense || 0,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DataContext.Provider value={{ data, loading, error, fetchData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
