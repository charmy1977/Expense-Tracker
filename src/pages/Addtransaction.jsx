import React, { useEffect, useState } from "react";
import "../styles/AddTransaction.css";
import { useLocation } from "react-router-dom";

function AddTransaction() {
  // Form state
  const [type, setType] = useState("Expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  // Transaction list and edit state
  const [transaction, setTransaction] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const location = useLocation(); // Used to check if editing an existing transaction

  // Handle Add or Update transaction
  function handleAddTransaction(e) {
    e.preventDefault();

    // Validate required fields
    if (!amount || !category || !date) {
      return alert("Please fill all the fields!!");
    }

    const currentTransaction = {
      type,
      amount: parseFloat(amount),
      category,
      description,
      date,
    };

    let newTransactions;
    if (editIndex === null) {
      // Adding a new transaction
      newTransactions = [...transaction, currentTransaction];
    } else {
      // Updating an existing transaction
      newTransactions = [...transaction];
      newTransactions[editIndex] = currentTransaction;
    }

    // Save to state and localStorage
    setTransaction(newTransactions);
    localStorage.setItem("transactions", JSON.stringify(newTransactions));

    // Notify user
    alert(`${type} ${editIndex === null ? "added" : "updated"} successfully!`);

    // Reset form
    setType("Expense");
    setAmount("");
    setCategory("");
    setDescription("");
    setDate("");
    setEditIndex(null);
  }

  // Load existing transactions from localStorage on mount
  useEffect(() => {
    const existingTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];
    setTransaction(existingTransactions);

    // If editing, prefill form from location.state
    if (location.state && location.state.transaction) {
      const tx = location.state.transaction;
      setType(tx.type);
      setAmount(tx.amount);
      setCategory(tx.category);
      setDescription(tx.description);
      setDate(tx.date);
      setEditIndex(tx.index); // index is passed from parent
    }
  }, [location]);

  return (
    <div className="add-transaction-container">
      <h2>{editIndex === null ? "Add Transaction" : "Edit Transaction"}</h2>

      <div className="transaction-box">
        {/* Transaction Type Selector */}
        <div className="transaction-type">
          <label>
            <input
              type="radio"
              value="Expense"
              checked={type === "Expense"}
              onChange={() => setType("Expense")}
            />{" "}
            Expense
          </label>
          <label>
            <input
              type="radio"
              value="Income"
              checked={type === "Income"}
              onChange={() => setType("Income")}
            />{" "}
            Income
          </label>
        </div>

        {/* Amount Input */}
        <input
          type="number"
          value={amount}
          placeholder="Amount (₹)"
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* Category Dropdown */}
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select a category</option>
          <option value="Salary">Salary</option>
          <option value="Groceries">Groceries</option>
          <option value="Dining">Dining</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Others">Others</option>
        </select>

        {/* Description Textarea */}
        <textarea
          value={description}
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        {/* Date Picker */}
        <input
          value={date}
          type="date"
          onChange={(e) => setDate(e.target.value)}
        />

        {/* Submit Button */}
        <button onClick={handleAddTransaction}>
          {editIndex === null ? "Add Transaction" : "Update Transaction"}
        </button>
      </div>
    </div>
  );
}

export default AddTransaction;
