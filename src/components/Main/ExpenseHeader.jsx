import React, { useState } from "react";
import { FaPlus, FaTimes, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import GeneralTab from "../ExpenseCreation/GeneralTab";
import EntitlementTab from "../ExpenseCreation/EntitlementTab";
import ApplicabilityTab from "../ExpenseCreation/ApplicabilityTab";

const ExpenseHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tabs = ["General", "Entitlement", "Applicability"];
  const [activeTab, setActiveTab] = useState("General");

  const [ExpenseType, setExpenseType] = useState("Expense Type");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
    setActiveTab("General");
  };

  return (
    <>
      <header className="flex justify-between items-center bg-white text-black py-2 px-6 shadow-md">
        <div className="flex space-x-4">
          <Link
            to="/expense"
            className="px-4 py-2 font-semibold rounded-lg hover:bg-gray-100 hover:text-blue-600 transition duration-200"
          >
            Home
          </Link>
          <Link
            to="/expenselist"
            className="px-4 py-2 font-semibold rounded-lg hover:bg-gray-100 hover:text-blue-600 transition duration-200"
          >
            List
          </Link>
          <Link
            to="/expensereport"
            className="px-4 py-2 font-semibold rounded-lg hover:bg-gray-100 hover:text-blue-600 transition duration-200"
          >
            Report
          </Link>
          <Link
            to="/expensesettings"
            className="px-4 py-2 font-semibold rounded-lg hover:bg-gray-100 hover:text-blue-600 transition duration-200"
          >
            Claim Settings
          </Link>
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-2/3 p-4 relative">
            <div className="px-6 py-4">
              <div className="px-6 py-1 relative">
                <div className="flex justify-center items-center">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    Expense Type Creation
                  </h2>
                  <button
                    onClick={handleModalToggle}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>
              </div>
            </div>

            <div className="border-b mb-6">
              <nav className="flex justify-between items-center px-6 py-2">
                <div className="flex space-x-4 bg-gray-300 rounded-md px-4 py-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-2 px-4 font-medium text-sm ${
                        activeTab === tab
                          ? "text-white bg-blue-800 border-b-2 radius-md border-blue-700"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <h1 className="text-lg font-semibold text-gray-700">
                  {ExpenseType}
                </h1>
              </nav>
            </div>

            <div>
              {activeTab === "General" && (
                <GeneralTab
                  setExpenseType={setExpenseType}
                  handleTabChange={handleTabChange}
                />
              )}
              {activeTab === "Entitlement" && (
                <EntitlementTab handleTabChange={handleTabChange} />
              )}
              {activeTab === "Applicability" && (
                <ApplicabilityTab handleTabChange={handleTabChange} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExpenseHeader;
