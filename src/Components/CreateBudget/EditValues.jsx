import axios from "axios";
import React, { useEffect, useState } from "react";
import "./EditStyle.css";

const EditValues = ({ item, type='', onClose, onSave }) => {
  const [formData, setFormData] = useState(item);

  useEffect(() => {
    setFormData(item);
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    
    let updateURL;

    switch (type) {
      case "income":
        updateURL = `https://back-end-d6p7.onrender.com/income/update/${formData._id}`;
        break;
      case "expense":
        updateURL = `https://back-end-d6p7.onrender.com/expense/update/${formData._id}`;
        break;
      case "budget":
        updateURL = `https://back-end-d6p7.onrender.com/budget/update/${formData._id}`;
        break;
      case "saving":
        updateURL = `https://back-end-d6p7.onrender.com/savings/update/${formData._id}`;
        break;
      default:
        return;
    }

    try {
      const editedValues = await axios.put(updateURL, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      console.log("Edited values", editedValues);
      if (response.status === 200) {
        onSave(); 
      }
    
      alert("Values updated successfully!");
    } catch (error) {
      console.error("Error updating record", error);
      alert("Failed to update Values.");
    }
    onClose();
  };
  return (
    <div className="edit-form">
    <h2>Edit {type.charAt(0).toUpperCase() + type.slice(1)}</h2>
    <form onSubmit={handleSubmit}>
      {type === "income" && (
        <>
          <label>
            Amount:
            <input
              type="number"
              name="incomeAmount"
              value={formData.incomeAmount || ""}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Source:
            <input
              type="text"
              name="incomeSource"
              value={formData.incomeSource || ""}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={formData.date || ""}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Frequency:
            <input
              type="text"
              name="frequency"
              value={formData.frequency || ""}
              onChange={handleChange}
              required
            />
          </label>
        </>
      )}
      {type === "expense" && (
        <>
          <label>
            Amount:
            <input
              type="number"
              name="expenseAmount"
              value={formData.expenseAmount || ""}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Category:
            <input
              type="text"
              name="expenseCategory"
              value={formData.expenseCategory || ""}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="expenseDescription"
              value={formData.expenseDescription || ""}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={formData.date || ""}
              onChange={handleChange}
              required
            />
          </label>
        </>
      )}
      {type === "budget" && (
        <>
          <label>
            Amount:
            <input
              type="number"
              name="budgetAmount"
              value={formData.budgetAmount || ""}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Category:
            <input
              type="text"
              name="budgetCategory"
              value={formData.budgetCategory || ""}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Period:
            <input
              type="text"
              name="budgetPeriod"
              value={formData.budgetPeriod || ""}
              onChange={handleChange}
              required
            />
          </label>
        </>
      )}
      {type === "saving" && (
        <>
          <label>
            Amount:
            <input
              type="number"
              name="savingAmount"
              value={formData.savingAmount || ""}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Source:
            <input
              type="text"
              name="source"
              value={formData.source || ""}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Target Date:
            <input
              type="date"
              name="targetDate"
              value={formData.targetDate || ""}
              onChange={handleChange}
              required
            />
          </label>
        </>
      )}
      <button type="submit">Save</button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  </div>
  );
};

export default EditValues;
