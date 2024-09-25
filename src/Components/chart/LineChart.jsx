import React from 'react'
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register components for Line chart
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = () => {
    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            label: "Expenses",
            data: [400, 300, 500, 700, 600, 800], // Example data
            fill: false,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            tension: 0.1, // Makes the line curved
          },
        ],
      };
    
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Expenses Over Time",
          },
        },
        scales: {
          y: {
            beginAtZero: true, // Ensures the y-axis starts at 0
          },
        },
      };
  return (
    <Line data={data} options={options} />);
  
};

export default LineChart
