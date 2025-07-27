import React, { useState, useEffect } from "react";
import "../Styles/DashBoard.css";
import TransactionCard from "../Components/TransactionCard";
import RecentTransaction from "../Components/RecentTransaction";
import NoTransaction from "../Components/NoTransaction";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useNavigate } from "react-router-dom";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function DashBoard() {
  const navigate = useNavigate();

  // Define all expense categories
  const categories = [
    "Salary",
    "Groceries",
    "Dining",
    "Transport",
    "Entertainment",
    "Others",
  ];

  // State variables
  const [transaction, setTransaction] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [maxExpense, setMaxExpense] = useState(0);
  const [categoryData, setCategoryData] = useState({});

  // Fetch transactions and calculate stats on mount
  useEffect(() => {
    const existingTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];
    setTransaction(existingTransactions);

    let income = 0;
    let expense = 0;
    let highestExpense = 0;
    let categoryBreakDown = {};

    // Initialize each category with 0
    categories.forEach((cat) => (categoryBreakDown[cat] = 0));

    // Calculate totals and breakdowns
    existingTransactions.forEach((tx) => {
      if (tx.type === "Income") {
        income += tx.amount;
      } else {
        expense += tx.amount;
        categoryBreakDown[tx.category] =
          (categoryBreakDown[tx.category] || 0) + tx.amount;

        // Track the highest single-category expense (for chart scaling)
        if (categoryBreakDown[tx.category] > highestExpense) {
          highestExpense = categoryBreakDown[tx.category];
        }
      }
    });

    setTotalIncome(income);
    setTotalExpense(expense);
    setBalance(income - expense);
    setCategoryData(categoryBreakDown);
    setMaxExpense(highestExpense);
  }, []);

  // Chart configuration
  const chartData = {
    labels: categories,
    datasets: [
      {
        label: "Expenses per Category",
        data: categories.map((cat) => categoryData[cat] || 0),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4CAF50",
          "#9966FF",
          "#FFA07A",
        ],
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: maxExpense > 0 ? maxExpense * 1.2 : 10,
        grid: { display: false },
      },
      x: {
        grid: { display: false },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="dashboard">
      {/* Header with Add Transaction Button */}
      <div className="dashboard-inner">
        <h2>Dashboard</h2>
        <button
          className="add-transaction"
          onClick={() => navigate("/add-transaction")}
        >
          + Add Transaction
        </button>
      </div>

      {/* Overview Card */}
      <TransactionCard
        balance={balance}
        income={totalIncome}
        expense={totalExpense}
      />

      <div className="transactions-chart-row">
        {/* Recent Transactions Section */}
        <div className="transactions half-chart">
          <h3>Recent Transaction</h3>
          {transaction.length === 0 ? (
            <NoTransaction />
          ) : (
            <RecentTransaction transaction={transaction} />
          )}
        </div>

        {/* Chart Section */}
        <div className="expense-chart half-width">
          <h3>Expense by Category</h3>
          {chartData.datasets[0].data.every((value) => value === 0) ? (
            <NoTransaction />
          ) : (
            <div className="chart-container">
              <Bar data={chartData} options={chartOptions} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
