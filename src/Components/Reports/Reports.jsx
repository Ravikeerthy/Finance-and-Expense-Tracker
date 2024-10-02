import React from 'react'
import axios from "axios"
import ExcelReport from './ExcelReport';

const Reports = () => {
  

  const downloadPDFReport = async () => {
    try {
      const response = await axios.post('http://localhost:4000/generatereport/generate_pdf', {
        income: 5000,
        expenses: 3000,
        savings: 2000,
      }, {
        responseType: 'blob' 
      });
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'FinancialReport.pdf'); 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading PDF report:", error);
    }
  };
  
  return (
    <div>
      {/* <button onClick={downloadPDFReport}>Download PDF Report</button> */}
    <ExcelReport />
    </div>
  )
}

export default Reports
