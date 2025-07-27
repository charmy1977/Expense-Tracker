import React, { useEffect, useState } from "react";
import "../styles/Transaction.css";
import { useNavigate } from "react-router-dom";
import NoTransactions from "../Components/NoTransaction";

function Transaction() {
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState([]);

  // Load transactions from localStorage when the component mounts
  useEffect(() => {
    const existingTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];
    setTransaction(existingTransactions);
  }, []);

  // Navigate to edit form with transaction data
  function handleEdit(index) {
    const editTransaction = transaction[index];
    navigate("/add-transaction", {
      state: { transaction: { ...editTransaction, index } },
    });
  }

  // Delete a transaction by index
  function handleDelete(index) {
    const updatedTransactions = transaction.filter((_, i) => i !== index);
    setTransaction(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
  }

  return (
    <div className="transactions-container">
      <h2>All Transactions</h2>

      {/* Display fallback component if no transactions exist */}
      {transaction.length === 0 ? (
        <NoTransactions />
      ) : (
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {transaction.map((tx, index) => (
              <tr key={index}>
                <td>{tx.category}</td>
                <td>{tx.description || "No Description"}</td>
                <td className={tx.type === "Income" ? "income" : "expense"}>
                  {tx.amount.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}
                </td>
                <td>{tx.date}</td>
                <td>{tx.type}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(index)}
                      title="Edit Transaction"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(index)}
                      title="Delete Transaction"
                    >
                      🗑 Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Transaction;
