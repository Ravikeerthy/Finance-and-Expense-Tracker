import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import { useData } from "../AuthContext/DataContext";
import "./ComparaticeStyle.css";

const ComparativeReports = () => {
  const { data, loading, error, fetchData } = useData();

  const { user } = useContext(AuthContext);
  const userId = user ? user._id : null;
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (userId) {
      fetchData(userId, token);
    }
  }, [userId, token, fetchData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="comparative-report">
    <h3>Comparative Report</h3>
    <h4>Monthly Comparison</h4>
    <div>
      <p>
        Current Month Income: INR {data.totalIncome}
      </p>
      <p>
        Previous Month Income: INR {data.previousMonthIncome}
      </p>
      <p>
        Difference: INR {data.totalIncome - data.previousMonthIncome}
      </p>

      <p>
        Current Month Expense: INR {data.totalExpenses}
      </p>
      <p>
        Previous Month Expense: INR {data.previousMonthExpense}
      </p>
      <p>
        Difference: INR {data.totalExpenses - data.previousMonthExpense}
      </p>
    </div>

    <h4>Weekly Comparison</h4>
    <div>
      <p>
        Current Week Income: INR {data.currentWeekIncome}
      </p>
      <p>
        Previous Week Income: INR {data.previousWeekIncome}
      </p>
      <p>
        Difference: INR {data.currentWeekIncome - data.previousWeekIncome}
      </p>

      <p>
        Current Week Expense: INR {data.currentWeekExpense}
      </p>
      <p>
        Previous Week Expense: INR {data.previousWeekExpense}
      </p>
      <p>
        Difference: INR {data.currentWeekExpense - data.previousWeekExpense}
      </p>
    </div>
  </div>
  );
};

export default ComparativeReports;
