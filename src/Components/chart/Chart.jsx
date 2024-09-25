import React from "react";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";
import "./ChartStyle.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
);

const Chart = ({ data = {} }) => {
  const pieData = {
    labels: data.labels || ["Category1", "Category2", "Category3"],
    datasets: [
      {
        label: "Expenses",
        data: data.expenses || [100, 200, 150], 
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Line Chart Data
  const monthlyData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Income",
        data: data.income || [0,0,0,0,0,0], // Pass the actual monthly income data here
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
      {
        label: "Expense",
        data: data.expense || [0,0,0,0,0,0], // Pass the actual monthly expense data here
        fill: false,
        borderColor: "rgba(255, 99, 132, 1)",
        tension: 0.1,
      },
      {
        label: "Budget",
        data: data.budget || [0,0,0,0,0,0], // Pass the actual monthly budget data here
        fill: false,
        borderColor: "rgba(255, 206, 86, 1)",
        tension: 0.1,
      },
      {
        label: "Saving",
        data: data.saving || [0,0,0,0,0,0], // Pass the actual monthly saving data here
        fill: false,
        borderColor: "rgba(153, 102, 255, 1)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "left",
      },
      title: {
        display: true,
        text: "Expense Distribution by Category",
      },
    },
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Trends",
      },
    },
  };

  return (
    <div className="chart-container">
      <div className="chart-item">
        <h3>Expense Distribution</h3>
        <Pie data={pieData} options={options} />
      </div>
      <div className="chart-item">
        <h3>Monthly Trends</h3>
        <Line data={monthlyData} options={lineOptions} />
      </div>
    </div>
  );
};

export default Chart;
