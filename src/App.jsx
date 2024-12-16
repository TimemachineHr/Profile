import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import NewEmployee from "./pages/NewEmployee";
import Leave from "./pages/Leave/Leave";
import LeaveList from "./pages/Leave/LeaveList";
import LeaveSettings from "./pages/Leave/LeaveSettings";
import LeaveReport from "./pages/Leave/LeaveReport";
import Expense from "./pages/Expense/Expense";
import ClientExpense from "./pages/Expense/Client/ExpenseClaim";
import ClientLeave from "./pages/Leave/Client/ClientLeave";
import ExpenseList from "./pages/Expense/ExpenseList";
import ExpenseReport from "./pages/Expense/ExpenseReport";
import ExpenseSettings from "./pages/Expense/ExpenseSettings";
import Communication from "./pages/Communication/Communication";
import LetterPage from "./pages/Communication/LetterPage";
import CommunicationSettings from "./pages/Communication/CommunicationSettings";
import Submission from "./pages/Communication/Submission";
import IncomeTax from "./pages/IR8A/IncomeTax";
import IncomeTaxForm from "./pages/IR8A/IncomeTaxForm";
import List from "./pages/List";
import Chart from "./pages/Chart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import CompanySettings from "./pages/CompanySettings/CompanySettings";

const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/list" element={<List />} />
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />
      <Route path="/newemployee" element={<NewEmployee />} />

      <Route path="/leave" element={<Leave />} />
      <Route path="/leavelist" element={<LeaveList />} />
      <Route path="/leavereport" element={<LeaveReport />} />
      <Route path="/leavesettings" element={<LeaveSettings />} />

      <Route path="/expense" element={<Expense />} />
      <Route path="/expenselist" element={<ExpenseList />} />
      <Route path="/expensereport" element={<ExpenseReport />} />
      <Route path="/expensesettings" element={<ExpenseSettings />} />

      {/* Client */}
      <Route path="/client/clientexpense" element={<ClientExpense />} />

      {/* Client */}
      <Route path="/client/clientleave" element={<ClientLeave />} />

      <Route path="/profile" element={<Profile />} />

      <Route path="/companysettings" element={<CompanySettings />} />

      <Route path="/communication" element={<Communication />} />
      <Route path="/letter/:templateId" element={<LetterPage />} />
      <Route
        path="/communicationsettings"
        element={<CommunicationSettings />}
      />
      <Route path="/submission" element={<Submission />} />
      <Route path="/ir8a/incometax" element={<IncomeTax />} />
      <Route path="/ir8a/incometaxform" element={<IncomeTaxForm />} />

      <Route
        path="/profile"
        element={<PrivateRoute token={token} element={<Profile />} />}
      />
      <Route
        path="/chart"
        element={<PrivateRoute token={token} element={<Chart />} />}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
