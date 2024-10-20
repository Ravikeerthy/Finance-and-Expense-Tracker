import React from "react";
import axios from "axios";
import "./ReportStyle.css";

const ExcelReport = ({income, expenses, budget, savings, userId, token}) => {
  console.log("Receiving report vales: ", income, expenses, budget, savings);
  
  const downloadExcelReport = async () => {
    try {
      const response = await axios.post(
        "https://back-end-d6p7.onrender.com/generatereport/generate_excel",
        {
          income: income || 0,
          expenses: expenses || 0,
          savings: savings || 0,
          budget: budget || 0,
          userId
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
          responseType: "blob",
        }
      );
      console.log("Generate report values: ", response.data)

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "FinancialReport.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading Excel report:", error);
      alert("Failed to download the report. Please try again.");
    }
  };
  return (
    <div className="report-container">
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/022/362/036/small_2x/3d-download-icon-illustration-png.png"
        alt="Report Icon"
        className="report-icon"
      />
      <h1 className="report-heading">Download Your Financial Report</h1>
      <button className="download-button" onClick={downloadExcelReport}>
        Download Excel Report
      </button>

      <p className="report-content">
        Managing your finances is crucial to understanding your financial
        health. This downloadable Excel report will give you a detailed
        breakdown of your income, expenses, and savings over the selected
        period.
      </p>

      <div className="report-features">
        <h2 className="report-heading2">Report Features</h2>
        <ul>
          <li>
            <strong>Income Overview:</strong> A clear view of your total income
            during the period.
          </li>
          <li>
            <strong>Expense Breakdown:</strong> Categorized breakdown of where
            your money is going.
          </li>
          <li>
            <strong>Savings Summary:</strong> A detailed summary of your savings
            to help you plan ahead.
          </li>
          <li>
            <strong>Financial Trends:</strong> A comparison of your financial
            habits over time.
          </li>
        </ul>
      </div>

      {/* <p className="report-content">
        Click the button below to generate and download your financial report.
        You can use this report to analyze spending habits, manage savings
        goals, and improve your financial planning.
      </p> */}

      
    </div>
  );
};

export default ExcelReport;
