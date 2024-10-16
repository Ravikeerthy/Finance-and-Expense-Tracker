import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext/AuthContext";
import "./ComparativeStyle.css";

const ComparativeReports = () => {
  const [previousMonthIncome, setPreviousMonthIncome] = useState(0);
  const [previousMonthExpense, setPreviousMonthExpense] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [previousWeekIncome, setPreviousWeekIncome] = useState(0);
  const [previousWeekExpense, setPreviousWeekExpense] = useState(0);
  const [currentWeekIncome, setCurrentWeekIncome] = useState(0);
  const [currentWeekExpense, setCurrentWeekExpense] = useState(0);

  const { user } = useContext(AuthContext);
  const userId = user ? user._id : null;
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (userId) {
      fetchComparativeData();
    }
  }, [userId, token]);

  const fetchComparativeData = async () => {
    setLoading(true);
    setError(null);

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      // Fetch data concurrently
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
          { headers, withCredentials: true }
        ),
        axios.get(
          `https://back-end-d6p7.onrender.com/expense/expenseuserId/${userId}?month=current`,
          { headers, withCredentials: true }
        ),
        axios.get(
          `https://back-end-d6p7.onrender.com/income/getIncomeByUserId/${userId}?week=previous`,
          { headers, withCredentials: true }
        ),
        axios.get(
          `https://back-end-d6p7.onrender.com/expense/expenseuserId/${userId}?week=previous`,
          { headers, withCredentials: true }
        ),
        axios.get(
          `https://back-end-d6p7.onrender.com/income/getIncomeByUserId/${userId}?week=current`,
          { headers, withCredentials: true }
        ),
        axios.get(
          `https://back-end-d6p7.onrender.com/expense/expenseuserId/${userId}?week=current`,
          { headers, withCredentials: true }
        ),
      ]);

     
      setPreviousMonthIncome(previousMonthResponse.data.totalIncome);
      setPreviousMonthExpense(previousExpensesResponse.data.totalExpense);
      setTotalIncome(currentMonthResponse.data.totalIncome);
      setTotalExpenses(currentExpensesResponse.data.totalExpense);
      setPreviousWeekIncome(previousWeekIncomeResponse.data.totalIncome);
      setPreviousWeekExpense(previousWeekExpenseResponse.data.totalExpense);
      setCurrentWeekIncome(currentWeekIncomeResponse.data.totalIncome);
      setCurrentWeekExpense(currentWeekExpenseResponse.data.totalExpense);
    } catch (error) {
      console.error("Error fetching comparative data:", error);
      setError("Failed to fetch comparative data.");
    } finally {
      setLoading(false);
    }
  };

  const getComparativeReportData = () => {
    return {
      monthComparison: {
        income: {
          current: totalIncome,
          previous: previousMonthIncome,
          difference: totalIncome - previousMonthIncome,
        },
        expense: {
          current: totalExpenses,
          previous: previousMonthExpense,
          difference: totalExpenses - previousMonthExpense,
        },
      },
      weekComparison: {
        income: {
          current: currentWeekIncome,
          previous: previousWeekIncome,
          difference: currentWeekIncome - previousWeekIncome,
        },
        expense: {
          current: currentWeekExpense,
          previous: previousWeekExpense,
          difference: currentWeekExpense - previousWeekExpense,
        },
      },
    };
  };

  const comparativeData = getComparativeReportData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="comparative-report">
      <h3>Comparative Report</h3>
      <h4>Monthly Comparison</h4>
      <div>
        <p>
          Current Month Income: ${comparativeData.monthComparison.income.current}
        </p>
        <p>
          Previous Month Income: ${comparativeData.monthComparison.income.previous}
        </p>
        <p>
          Difference: ${comparativeData.monthComparison.income.difference}
        </p>

        <p>
          Current Month Expense: ${comparativeData.monthComparison.expense.current}
        </p>
        <p>
          Previous Month Expense: ${comparativeData.monthComparison.expense.previous}
        </p>
        <p>
          Difference: ${comparativeData.monthComparison.expense.difference}
        </p>
      </div>

      <h4>Weekly Comparison</h4>
      <div>
        <p>
          Current Week Income: ${comparativeData.weekComparison.income.current}
        </p>
        <p>
          Previous Week Income: ${comparativeData.weekComparison.income.previous}
        </p>
        <p>
          Difference: ${comparativeData.weekComparison.income.difference}
        </p>

        <p>
          Current Week Expense: ${comparativeData.weekComparison.expense.current}
        </p>
        <p>
          Previous Week Expense: ${comparativeData.weekComparison.expense.previous}
        </p>
        <p>
          Difference: ${comparativeData.weekComparison.expense.difference}
        </p>
      </div>
    </div>
  );
};

export default ComparativeReports;
