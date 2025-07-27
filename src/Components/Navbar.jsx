import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../Styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate(); // For navigation
  const location = useLocation(); // To determine current route

  // Initialize dark mode state from localStorage
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Effect to toggle dark/light mode and persist choice in localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Clears localStorage and navigates to the home page
  function handleReset() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <nav className="navbar">
      <h1 className="logo">Expense Tracker</h1>

      <ul className="nav-links">
        {/* Navigation link: Dashboard */}
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to={"/"}>Dashboard</Link>
        </li>

        {/* Navigation link: Transaction */}
        <li className={location.pathname === "/transaction" ? "active" : ""}>
          <Link to={"/transaction"}>Transaction</Link>
        </li>

        {/* Navigation link: Report */}
        <li className={location.pathname === "/reports" ? "active" : ""}>
          <Link to={"/reports"}>Report</Link>
        </li>

        {/* Button: Reset (clears localStorage and returns to home) */}
        <li>
          <div className="reset-btn" onClick={handleReset}>
            Reset
          </div>
        </li>

        {/* Theme switch toggle (dark/light mode) */}
        <li className="theme-switch">
          <label className="switch-icon">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <span className="icon-slider">{darkMode ? "⏾" : "☀︎"}</span>
          </label>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
