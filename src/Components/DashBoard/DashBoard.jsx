import React from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardStyle.css";

const Dashboard = () => {
  const navigate = useNavigate();

 
  const handleCreate = () => {
    navigate("/create");
  };

  const handleChart = () => {
    navigate("/charts");
  };

  const handleDownload = () => {
   
    alert("Download initiated!");
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>
      <div className="button-group">
        <button className="dashboard-button create-button" onClick={handleCreate}>
          Create
        </button>
        <button className="dashboard-button chart-button" onClick={handleChart}>
          Chart
        </button>
        <button className="dashboard-button download-button" onClick={handleDownload}>
          Download
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
