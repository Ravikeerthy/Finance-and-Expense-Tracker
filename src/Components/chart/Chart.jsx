import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import "./ChartStyle.css";
import { useEffect, useState } from "react";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ userId, token }) => {
  const [chartsData, setChartsData] = useState({
    expenseLabels: [],
    incomeLabels: [],
    expenses: [],
    income: [],
  });

  useEffect(() => {
    if (userId && token) {
      fetchChartData();
    }
  }, [userId, token]);

  const fetchChartData = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try{
    const expensesResponse = await axios.get(
      `https://back-end-d6p7.onrender.com/expense/expenseuserId/${userId}`,
      { headers }
    );
    const expenseData = expensesResponse.data;

 
    const incomeResponse = await axios.get(
      `https://back-end-d6p7.onrender.com/income/getIncomeByUserId/${userId}`,
      { headers }
    );
    const incomeData = incomeResponse.data;

   
    const expenseLabelsSet = new Set();
    const incomeLabelsSet = new Set();
    const expensesByCategory = {};

    let totalIncome = 0;

    expenseData.forEach((exp) => {
      const category = exp.expenseCategory || "Other";
      expenseLabelsSet.add(category);
      expensesByCategory[category] = (expensesByCategory[category] || 0) + exp.expenseAmount;
    });

    incomeData.forEach((inc) => {
      const source = inc.incomeSource || "Other";
      incomeLabelsSet.add(source);
      totalIncome += inc.incomeAmount;
    });

    const expenseLabelsArray = Array.from(expenseLabelsSet);
    const incomeLabelsArray = Array.from(incomeLabelsSet);
    const expenseValuesArray = Object.values(expensesByCategory);

    // Update chart data state
    setChartsData({
      expenseLabels: expenseLabelsArray,
      incomeLabels: incomeLabelsArray,
      expenses: expenseValuesArray,
      income: [totalIncome],
    });
  } catch (error) {
    console.error("Error fetching chart data", error);
  }
};

  // const expenseLabels = chartsData.expenseLabels || [];
  // const incomeLabels = chartsData.incomeLabels || [];

  // const expenses = chartsData.expenses || [];
  // const income = chartsData.income || [];

  const { expenseLabels, incomeLabels, expenses, income } = chartsData;
 
  const pieColors = [
    "rgba(75, 192, 192, 0.6)", 
    "rgba(255, 99, 132, 0.6)", 
    "rgba(54, 162, 235, 0.6)", 
    "rgba(255, 206, 86, 0.6)", 
    "rgba(153, 102, 255, 0.6)",
    "rgba(255, 159, 64, 0.6)", 
    "rgba(199, 199, 199, 0.6)",
    "rgba(83, 102, 255, 0.6)", 
    "rgba(191, 85, 236, 0.6)", 
    "rgba(255, 120, 0, 0.6)",  
  ];
  const pieData = {
    
    labels: expenseLabels.length > 0 ? expenseLabels : ["No Expenses"],
    datasets: [
      {
        data: expenses.length > 0 ? expenses : [0],
        backgroundColor: expenseLabels.map((_, index) => pieColors[index % pieColors.length]),
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: [...incomeLabels, ...expenseLabels], 
    datasets: [
      {
        label: "Income",
        data: income.length > 0 ? income : [0],  
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Expenses",
        data: expenses.length > 0 ? expenses : [0], 
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };
  
  console.log("Pie Data: ", pieData);
  console.log("Bar Data: ", barData);

  return (
    <div className="chart-container">
   
    <div className="row">
      <div className="col-6">
      <h3>Expense Distribution</h3>
      <div className="pie-chart">
      <Pie data={pieData} />
    </div>
      </div>
      <div className="col-6">
      <h3>Monthly Income vs. Expenses</h3>
    <div className="bar-chart">
      <Bar data={barData} />
    </div>
      </div>
    </div>
   

    
  </div>
  );
};

export default Chart;
