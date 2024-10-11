import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2"; // Import Pie for pie charts
import "./ChartStyle.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ chartsData = {} }) => {
  console.log("Received chartsData: ", chartsData);

  // Bar chart data for expenses
  const expenseData = {
    labels: chartsData.labels,
    datasets: [
      {
        label: "Expenses",
        data: chartsData.expense,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
  };

  // Pie chart data for income
  const incomeData = {
    labels: chartsData.income.incomeSource,
    datasets: [
      {
        label: "Income Distribution",
        data: chartsData.income.incomeAmount,
        backgroundColor: [
          "rgba(255, 205, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
  };

  // Pie chart data for savings
  const savingsData = {
    labels: chartsData.saving.source,
    datasets: [
      {
        label: "Savings Allocation",
        data: chartsData.saving.savingAmount,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
      },
    ],
  };

  // Pie chart data for budget
  const budgetData = {
    labels: chartsData.budget.budgetCategory,
    datasets: [
      {
        label: "Budget Distribution",
        data: chartsData.budget,
        backgroundColor: [
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
      },
    ],
  };

  console.log("Pie Data: ", incomeData, savingsData, budgetData);

  return (
    <div className="chart-container">
      <h3>Expenses Bar Chart</h3>
      <div className="bar-chart">
        <Bar data={expenseData} />
      </div>
      ,<h3>Income Pie Chart</h3>
      <div className="pie-chart">
        <Pie data={incomeData} />
      </div>
      <h3>Savings Pie Chart</h3>
      <div className="pie-chart">
        <Pie data={savingsData} />
      </div>
      <h3>Budget Pie Chart</h3>
      <div className="pie-chart">
        <Pie data={budgetData} />
      </div>
    </div>
  );
};

export default Chart;
