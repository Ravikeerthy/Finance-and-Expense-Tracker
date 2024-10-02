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
  Filler,
} from "chart.js";
import "./ChartStyle.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler
);

const Chart = ({ chartData }) => {
  const pieData = {
    labels: chartData?.labels || [],
    datasets: [
      {
        label: "Expenses",
        data: chartData?.expenses || [], 
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
  console.log("Pie Expense Data: ", pieData);
  

  // Line Chart Data
  const monthlyDatas = {
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
        data: chartData?.month || [], 
        fill: true,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
      {
        label: "Expense",
        data: chartData?.expenses || [], 
        fill: true,
        borderColor: "rgba(255, 99, 132, 1)",
        tension: 0.1,
      },
      {
        label: "Budget",
        data: chartData?.budget || [], 
        fill: true,
        borderColor: "rgba(255, 206, 86, 1)",
        tension: 0.1,
      },
      {
        label: "Saving",
        data: chartData?.saving || [], 
        fill: true,
        borderColor: "rgba(153, 102, 255, 1)",
        tension: 0.1,
      },
    ],
  };
console.log("Line Chart data: ", monthlyDatas);

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
        <Line data={monthlyDatas} options={lineOptions} />
      </div>
    </div>
  );
};

export default Chart;
