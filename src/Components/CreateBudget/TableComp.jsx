import React, { useContext, useEffect, useState } from "react";
import "./TableStyle.css";
import { AuthContext } from "../AuthContext/AuthContext";
import axios from "axios";
import EditValues from "./EditValues";
import { FinanceContext } from "../AuthContext/FinanceContext ";

const TableComp = ({ income, expense, budget, saving }) => {
  console.log("TableComp props:", { income, expense, budget, saving });

  const { user } = useContext(AuthContext);
  const userId = user ? user._id : null;
  const token = user ? user.token : null;

  const { getIncome, getExpense, getBudget, getSaving,fetchData, handleDelete, editItem } =
    useContext(FinanceContext);

    const [data, setData] = useState({
      income: [],
      expense: [],
      budget: [],
      saving: [],})
  const [deletedData, setDeletedData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState({ type: null, item: null });
  // const [getIncome, setGetIncome] = useState([]);
  // const [getExpense, setGetExpense] = useState([]);
  // const [getBudget, setGetBudget] = useState([]);
  // const [getSaving, setGetSaving] = useState([]);

  // const incomeData = Array.isArray(income.userIncome) ? income.userIncome : [];
  // const expenseData = Array.isArray(expense.expenseByUserId)
  //   ? expense.expenseByUserId
  //   : [];
  // const budgetData = Array.isArray(budget.userBudget) ? budget.userBudget : [];
  // const savingData = Array.isArray(saving.savingGoals)
  //   ? saving.savingGoals
  //   : [];

  useEffect(() => {
    fetchData();
    // setDeletedData(false);
  }, [userId, token]);

  // const fetchtingData = async () => {
  //   setLoading(true);
  //   setError(null);

  //   if (!token || !userId) {
  //     setError("Unauthorized or user not logged in");
  //     setLoading(false);
  //     return;
  //   }
  //   const headers = {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${token}`,
  //   };
  //   try {
  //     console.log(`Fetching Income for userId: ${userId}`);
  //     const incomeGetResponse = await axios.get(
  //       `https://back-end-d6p7.onrender.com/income/getIncomeByUserId/${userId}`,
  //       { headers, withCredentials: true }
  //     );
  //     setGetIncome(incomeGetResponse.data);
  //     console.log("IncomeGetData", incomeGetResponse.data);

  //     const expenseGetResponse = await axios.get(
  //       `https://back-end-d6p7.onrender.com/expense/expenseuserId/${userId}`,
  //       { headers, withCredentials: true }
  //     );
  //     setGetExpense(expenseGetResponse.data);
  //     console.log("ExpenseGetData", expenseGetResponse.data);

  //     const budgetGetResponse = await axios.get(
  //       `https://back-end-d6p7.onrender.com/budget/getBudgetByUserId/${userId} `,
  //       { headers, withCredentials: true }
  //     );
  //     setGetBudget(budgetGetResponse.data);
  //     console.log("BudgetGetData", budgetGetResponse.data);

  //     const savingGetResponse = await axios.get(
  //       `https://back-end-d6p7.onrender.com/savings/getbyid/${userId}`,
  //       { headers, withCredentials: true }
  //     );
  //     setGetSaving(savingGetResponse.data);
  //     console.log("SavingGetData", savingGetResponse.data);
  //   } catch (error) {
  //     console.error("Error fetching data from the database", error);
  //     setError("Failed to fetch data.");
  //   } finally {
  //     setLoading(false);
  //   }
  //   if (loading) return <p>Loading...</p>;
  //   if (error) return <p>{error}</p>;
  // };

  // const handleIncomeDelete = async (id) => {
  //   try {
  //     const deleteIncome = await axios.delete(
  //       `https://back-end-d6p7.onrender.com/income/delete/${id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //         withCredentials: true,
  //       }
  //     );
  //     // setDeletedData((prev)=>[...prev, id]);
  //     setGetIncome((prevIncome) => prevIncome.filter((inc) => inc._id !== id));
  //     // setDeletedData(true);

  //     alert(deleteIncome.data.message);
  //     // await fetchtingData();
  //   } catch (error) {
  //     console.log(error);
  //     alert("Server Error");
  //   }
  //   console.log("Deleting income with id:", id);
  // };

  // const handleExpenseDelete = async (id) => {
  //   try {
  //     const deleteExpense = await axios.delete(
  //       `https://back-end-d6p7.onrender.com/expense/delete/${id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //         withCredentials: true,
  //       }
  //     );
  //     // setDeletedData((prev)=>[...prev, id]);
  //     setGetExpense((prevExpense) =>
  //       prevExpense.filter((exp) => exp._id !== id)
  //     );

  //     // await fetchtingData();
  //     alert(deleteExpense.data.message);
  //   } catch (error) {
  //     console.log(error);
  //     alert("Server Error");
  //   }
  //   console.log("Deleting expense with id:", id);
  // };

  // const handleBudgetDelete = async (id) => {
  //   try {
  //     const deletebudget = await axios.delete(
  //       `https://back-end-d6p7.onrender.com/budget/delete/${id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //         withCredentials: true,
  //       }
  //     );
  //     // setDeletedData((prev)=>[...prev, id]);
  //     setGetBudget((prevBudget) => prevBudget.filter((bud) => bud._id !== id));

  //     // await fetchtingData();
  //     alert(deletebudget.data.message);
  //   } catch (error) {
  //     console.log(error);
  //     alert("Server Error");
  //   }
  //   console.log("Deleting budget with id:", id);
  // };

  // const handleSavingDelete = async (id) => {
  //   try {
  //     const deleteSaving = await axios.delete(
  //       `https://back-end-d6p7.onrender.com/savings/delete/${id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //         withCredentials: true,
  //       }
  //     );
  //     // setDeletedData((prev)=>[...prev, id]);
  //     setGetSaving((prevSaving) => prevSaving.filter((sav) => sav._id !== id));
  //     // await fetchtingData();
  //     alert(deleteSaving.data.message);
  //   } catch (error) {
  //     console.log(error);
  //     alert("Server Error");
  //   }
  //   console.log("Deleting saving with id:", id);
  // };

  const handleDeleteItem = async (type, id) => {
    try {
      await handleDelete(type, id);
      setData((prevData) => ({
        ...prevData,
        [type]: prevData[type].filter((item) => item._id !== id),
      }));
      alert("Item deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete item.");
    }
  };

  const handleEdit = (item, type) => {
    setIsEditing({ item, type });
  };

  const handleClose = () => {
    setIsEditing({ type: null, item: null });
  };

  const handleSave = () => {
    fetchData();
    handleClose();
  };
  return (
    // <div className="table-comp">
    //   <h3>Financial Overview</h3>

    //   <h4>Income</h4>
    //   {incomeData.length > 0 ? (
    //     <table>
    //       <thead>
    //         <tr>
    //           <th>S.No</th>
    //           <th>Amount</th>
    //           <th>Source</th>
    //           <th>Date</th>
    //           <th>Frequency</th>
    //           <th></th>
    //           <th></th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {incomeData.map((inc, index) => (
    //           <tr key={index}>
    //             <td>{index + 1} </td>
    //             <td>{inc.incomeAmount}</td>
    //             <td>{inc.incomeSource}</td>
    //             <td>{inc.date}</td>
    //             <td>{inc.frequency}</td>
    //             <td>
    //               <button
    //                 onClick={() => handleEdit(inc, "income")}
    //                 type="button"
    //               >
    //                 <i className="fa-solid fa-pen-to-square"></i>
    //               </button>
    //             </td>
    //             <td>
    //               <button
    //                 onClick={() => handleIncomeDelete(inc._id)}
    //                 type="button"
    //               >
    //                 <i className="fa-solid fa-trash"></i>
    //               </button>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   ) : (
    //     <p>No income records yet.</p>
    //   )}

    //   {/* Expense Table */}
    //   <h4>Expense</h4>
    //   {expenseData.length > 0 ? (
    //     <table>
    //       <thead>
    //         <tr>
    //           <th>S.No</th>
    //           <th>Amount</th>
    //           <th>Category</th>
    //           <th>Description</th>
    //           <th>Date</th>
    //           <th></th>
    //           <th></th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {expenseData.map((exp, index) => (
    //           <tr key={index}>
    //             <td>{index + 1} </td>
    //             <td>{exp.expenseAmount}</td>
    //             <td>{exp.expenseCategory}</td>
    //             <td>{exp.expenseDescription}</td>
    //             <td>{exp.date}</td>
    //             <td>
    //               <button
    //                 onClick={() => handleEdit(exp, "expense")}
    //                 type="button"
    //               >
    //                 <i className="fa-solid fa-pen-to-square"></i>
    //               </button>
    //             </td>
    //             <td>
    //               <button
    //                 onClick={() => handleExpenseDelete(exp._id)}
    //                 type="button"
    //               >
    //                 <i className="fa-solid fa-trash"></i>
    //               </button>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   ) : (
    //     <p>No expense records yet.</p>
    //   )}

    //   {/* Budget Table */}
    //   <h4>Budget</h4>
    //   {budgetData.length > 0 ? (
    //     <table>
    //       <thead>
    //         <tr>
    //           <th>S.No</th>
    //           <th>Amount</th>
    //           <th>Category</th>
    //           <th>Budget Period</th>
    //           <th></th>
    //           <th></th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {budgetData.map((bud, index) => (
    //           <tr key={index}>
    //             <td>{index + 1} </td>
    //             <td>{bud.budgetAmount}</td>
    //             <td>{bud.budgetCategory}</td>
    //             <td>{bud.budgetPeriod}</td>
    //             <td>
    //               <button
    //                 onClick={() => handleEdit(bud, "budget")}
    //                 type="button"
    //               >
    //                 <i className="fa-solid fa-pen-to-square"></i>
    //               </button>
    //             </td>
    //             <td>
    //               <button
    //                 onClick={() => handleBudgetDelete(bud._id)}
    //                 type="button"
    //               >
    //                 <i className="fa-solid fa-trash"></i>
    //               </button>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   ) : (
    //     <p>No budget records yet.</p>
    //   )}

    //   {/* Saving Table */}
    //   <h4>Saving</h4>
    //   {savingData.length > 0 ? (
    //     <table>
    //       <thead>
    //         <tr>
    //           <th>S.No</th>
    //           <th>Amount</th>
    //           <th>Source</th>
    //           <th>Target Date</th>
    //           <th></th>
    //           <th></th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {savingData.map((sav, index) => (
    //           <tr key={index}>
    //             <td>{index + 1} </td>
    //             <td>{sav.savingAmount}</td>
    //             <td>{sav.source}</td>
    //             <td>{sav.targetDate}</td>
    //             <td>
    //               <button onClick={() => handleEdit(sav, "saving")}>
    //                 <i className="fa-solid fa-pen-to-square"></i>
    //               </button>
    //             </td>
    //             <td>
    //               <button
    //                 onClick={() => handleSavingDelete(sav._id)}
    //                 type="button"
    //               >
    //                 <i className="fa-solid fa-trash"></i>
    //               </button>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   ) : (
    //     <p>No saving records yet.</p>
    //   )}
    //   {isEditing.type && (
    //     <div className="edit-modal">
    //       <div className="edit-modal-content">
    //         <span className="edit-close-button" onClick={handleClose}>
    //           &times;
    //         </span>
    //         <EditValues
    //           item={isEditing.item}
    //           type={isEditing.type}
    //           onClose={handleClose}
    //           onSave={handleSave}
    //         />
    //       </div>
    //     </div>
    //   )}
    // </div>
    <div className="table-comp">
    <h3>Financial Overview</h3>

    {/* Income Table */}
    <h4>Income</h4>
    <Table
      data={data.income}
      handleEdit={handleEdit}
      handleDelete={(id) => handleDeleteItem("income", id)}
      columns={["S.No", "Amount", "Source", "Date", "Frequency"]}
      renderRow={(inc, index) => (
        <>
          <td>{index + 1}</td>
          <td>{inc.incomeAmount}</td>
          <td>{inc.incomeSource}</td>
          <td>{inc.date}</td>
          <td>{inc.frequency}</td>
        </>
      )}
    />

    {/* Expense Table */}
    <h4>Expense</h4>
    <Table
      data={data.expense}
      handleEdit={handleEdit}
      handleDelete={(id) => handleDeleteItem("expense", id)}
      columns={["S.No", "Amount", "Category", "Description", "Date"]}
      renderRow={(exp, index) => (
        <>
          <td>{index + 1}</td>
          <td>{exp.expenseAmount}</td>
          <td>{exp.expenseCategory}</td>
          <td>{exp.expenseDescription}</td>
          <td>{exp.date}</td>
        </>
      )}
    />

    {/* Budget Table */}
    <h4>Budget</h4>
    <Table
      data={data.budget}
      handleEdit={handleEdit}
      handleDelete={(id) => handleDeleteItem("budget", id)}
      columns={["S.No", "Amount", "Category", "Budget Period"]}
      renderRow={(bud, index) => (
        <>
          <td>{index + 1}</td>
          <td>{bud.budgetAmount}</td>
          <td>{bud.budgetCategory}</td>
          <td>{bud.budgetPeriod}</td>
        </>
      )}
    />

    {/* Saving Table */}
    <h4>Saving</h4>
    <Table
      data={data.saving}
      handleEdit={handleEdit}
      handleDelete={(id) => handleDeleteItem("saving", id)}
      columns={["S.No", "Amount", "Source", "Target Date"]}
      renderRow={(sav, index) => (
        <>
          <td>{index + 1}</td>
          <td>{sav.savingAmount}</td>
          <td>{sav.source}</td>
          <td>{sav.targetDate}</td>
        </>
      )}
    />

    {isEditing.type && (
      <div className="edit-modal">
        <div className="edit-modal-content">
          <span className="edit-close-button" onClick={handleClose}>
            &times;
          </span>
          <EditValues
            item={isEditing.item}
            type={isEditing.type}
            onClose={handleClose}
            onSave={handleSave}
          />
        </div>
      </div>
    )}
  </div>
);
};

const Table = ({ data, handleEdit, handleDelete, columns, renderRow }) => (
<table>
  <thead>
    <tr>
      {columns.map((col, index) => (
        <th key={index}>{col}</th>
      ))}
      <th>Edit</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
    {data.length > 0 ? (
      data.map((item, index) => (
        <tr key={item._id}>
          {renderRow(item, index)}
          <td>
            <button onClick={() => handleEdit(item, item.type)}>
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
          </td>
          <td>
            <button onClick={() => handleDelete(item._id)}>
              <i className="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan={columns.length + 2}>No records found.</td>
      </tr>
    )}
  </tbody>
</table>
  );


export default TableComp;
