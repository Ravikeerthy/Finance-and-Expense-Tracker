import React, { useContext, useEffect, useState } from "react";
import axios from "axios"; 
import { AuthContext } from "../AuthContext/AuthContext";
import "./ComparaticeStyle.css";

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
    //   Authorization: `Bearer ${token}`,
    };

    try {
   
      const previousMonthResponse = await axios.get(
        `https://back-end-d6p7.onrender.com/income/getIncomeByUserId/${userId}?month=previous`,
        { headers, withCredentials: true }
      );
      setPreviousMonthIncome(previousMonthResponse.data.totalIncome);

     
      const previousExpensesResponse = await axios.get(
        `https://back-end-d6p7.onrender.com/expense/expenseuserId/${userId}?month=previous`,
        { headers, withCredentials: true }
      );
      setPreviousMonthExpense(previousExpensesResponse.data.totalExpense);

      
      const currentMonthResponse = await axios.get(
        `https://back-end-d6p7.onrender.com/income/getIncomeByUserId/${userId}?month=current`,
        { headers, withCredentials: true }
      );
      setTotalIncome(currentMonthResponse.data.totalIncome);

      const currentExpensesResponse = await axios.get(
        `https://back-end-d6p7.onrender.com/expense/expenseuserId/${userId}?month=current`,
        { headers, withCredentials: true }
      );
      setTotalExpenses(currentExpensesResponse.data.totalExpense);
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
        <div>
          <p
            className={`difference ${
              comparativeData.monthComparison.income.difference >= 0
                ? "positive"
                : "negative"
            }`}
          >
            Difference: ${comparativeData.monthComparison.income.difference}
          </p>
        </div>

        <p>
          Current Month Income: $
          {comparativeData.monthComparison.income.current}
        </p>
        <p>
          Previous Month Income: $
          {comparativeData.monthComparison.income.previous}
        </p>
        <p>Difference: ${comparativeData.monthComparison.income.difference}</p>

        <p>
          Current Month Expense: $
          {comparativeData.monthComparison.expense.current}
        </p>
        <p>
          Previous Month Expense: $
          {comparativeData.monthComparison.expense.previous}
        </p>
        <p>Difference: ${comparativeData.monthComparison.expense.difference}</p>
      </div>

      <h4>Weekly Comparison</h4>
      <div>
        <p>
          Current Week Income: ${comparativeData.weekComparison.income.current}
        </p>
        <p>
          Previous Week Income: $
          {comparativeData.weekComparison.income.previous}
        </p>
        <p>Difference: ${comparativeData.weekComparison.income.difference}</p>

        <p>
          Current Week Expense: $
          {comparativeData.weekComparison.expense.current}
        </p>
        <p>
          Previous Week Expense: $
          {comparativeData.weekComparison.expense.previous}
        </p>
        <p>Difference: ${comparativeData.weekComparison.expense.difference}</p>
      </div>
    </div>
  );
};

export default ComparativeReports;
