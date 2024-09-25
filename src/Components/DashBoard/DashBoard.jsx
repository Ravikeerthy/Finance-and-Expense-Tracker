import React from "react";
import Chart from "../chart/Chart";

import "./ChartStyle.css";

const DashBoard = () => {
  return (
    <div>
      <h1>Expense Tracker DashBoard</h1>
      <div className="chart-container">
        <div className="chart-item">
          <Chart />
        </div>
       
      </div>
    </div>
  );
};

export default DashBoard;
