import React from "react";

function RecentTransaction({ transaction = [] }) {
  // Slice the last 10 transactions and reverse them for most recent first
  const recentTx = transaction.slice(-10).reverse();

  return (
    <>
      {recentTx.length === 0 ? (
        <p>No recent transactions found.</p>
      ) : (
        recentTx.map((tx, index) => (
          <ul key={index} className="transaction-item">
            <li>
              
              <span className="transaction-category">{tx.category}</span>

              
              <span
                className={`transaction-amount ${
                  tx.type === "Income" ? "income" : "expense"
                }`}
              >
                {tx.amount}
              </span>
            </li>
          </ul>
        ))
      )}
    </>
  );
}

export default RecentTransaction;
