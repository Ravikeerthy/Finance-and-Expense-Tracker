import React from "react";
import axios from "axios";
import "./ReportStyle.css";

const ExcelReport = () => {
  const downloadExcelReport = async (req, res) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/generatereport/generate_excel",
        {
          income: 5000,
          expenses: 3000,
          savings: 2000,
        },
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "FinancialReport.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading Excel report:", error);
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
