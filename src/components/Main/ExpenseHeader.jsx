import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import ExpenseTypeModal from "../ExpenseCreation/ExpenseTypeModal";

const ExpenseHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tabs = ["General", "Entitlement", "Applicability"];
  const [activeTab, setActiveTab] = useState("General");

  const [ExpenseType, setExpenseType] = useState("Expense Type");

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
    setActiveTab("General");
  };

  const links = [
    { to: "/expense", label: "Home" },
    { to: "/expenselist", label: "List" },
    { to: "/expensereport", label: "Report" },
    { to: "/expensesettings", label: " Settings" },
  ];

  return (
    <>
      <header className="flex justify-between items-center bg-white text-black py-2 px-6 shadow-md">
        <div className="flex space-x-4">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 font-semibold rounded-xl transition duration-200 ${
                location.pathname === link.to
                  ? "bg-gray-100 text-blue-900 shadow-sm" // Active styles
                  : "hover:bg-gray-100 hover:text-blue-900"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="text-right">
          <h2 className="text-lg font-semibold mb-1">Expense Claim</h2>
          <button
            onClick={handleModalToggle}
            className="flex items-center bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-700 active:scale-95 transition-transform duration-200"
          >
            <FaPlus className="mr-2" /> New Expense Type
          </button>
        </div>
      </header>

      <ExpenseTypeModal
        isModalOpen={isModalOpen}
        handleModalToggle={handleModalToggle}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
        ExpenseType={ExpenseType}
        setExpenseType={setExpenseType}
      />
    </>
  );
};

export default ExpenseHeader;
