import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Report from "./pages/Report";
import Transaction from "./pages/Transaction";
import Navbar from "./Components/Navbar";
import NotFound from "./pages/NotFound";
import Addtransaction from "./pages/Addtransaction";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/reports" element={<Report />} />
          <Route path="/add-transaction" element={<Addtransaction />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
