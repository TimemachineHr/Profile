import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import GeneralTab from "../ExpenseCreation/GeneralTab";
import EntitlementTab from "../ExpenseCreation/EntitlementTab";
import ApplicabilityTab from "../ExpenseCreation/ApplicabilityTab";
import axios from "axios";

// Define tabs outside to avoid re-initialization
const tabs = ["General", "Entitlement", "Applicability"];

const ExpenseTypeModal = ({
  isModalOpen,
  handleModalToggle,
  selectedExpenseType,
  setExpenseTypes,
}) => {
  const [activeTab, setActiveTab] = useState("General");
  const [expenseData, setExpenseData] = useState({
    code: "",
    type: "",
    maximumClaimableAmount: "",
    monthlyLimit: 0,
    colorCode: "#FFFFFF",
    currency: "",
    options: {
      documentProof: false,
      employeeCoPayment: false,
      multipleBills: false,
      valueType: "",
      value: 0,
    },
    entitlement: {
      effectiveAfter: "",
      allowedDuringProbation: false,
      allowedDuringNoticePeriod: false,
    },
    applicability: {
      gender: "",
      maritalStatus: "",
      businessUnit: "",
      department: "",
      designation: "",
      name: "",
    },
  });

  // Populate data when editing an existing expense type
  useEffect(() => {
    if (selectedExpenseType) {
      setExpenseData(selectedExpenseType);
    }
  }, [selectedExpenseType]);

  // Handle form submission (Create or Update)
  const handleSubmit = async () => {
    try {
      const url = selectedExpenseType
        ? `https://expense-module.vercel.app/api/new-expense-type/${selectedExpenseType._id}`
        : "https://expense-module.vercel.app/api/new-expense-type/";

      const method = selectedExpenseType ? "PUT" : "POST";

      const response = await axios({
        method,
        url,
        data: expenseData,
      });

      alert(
        selectedExpenseType
          ? "Expense Type updated successfully!"
          : "Expense Type created successfully!"
      );

      handleModalToggle();

      // Update state with new expense type data
      if (selectedExpenseType) {
        setExpenseTypes((prevTypes) =>
          prevTypes.map((expense) =>
            expense._id === selectedExpenseType._id ? response.data : expense
          )
        );
      } else {
        setExpenseTypes((prevTypes) => [...prevTypes, response.data]);
      }
    } catch (error) {
      console.error("Error saving expense type:", error);
      alert("An error occurred. Please try again.");
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-2/3 p-4 relative">
        {/* Modal Header */}
        <div className="px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            {selectedExpenseType ? "Edit Expense Type" : "Create Expense Type"}
          </h2>
          <button
            onClick={handleModalToggle}
            className="text-gray-600 hover:text-gray-800"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="border-b-2 mb-6">
          <nav className="flex justify-between items-center px-8 py-4 rounded-lg">
            <div className="flex space-x-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-6 font-medium rounded-lg text-sm transition duration-300 ${
                    activeTab === tab
                      ? "text-white bg-blue-900 shadow-md"
                      : "text-gray-500 hover:text-blue-600 hover:bg-gray-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <h1 className="text-xl font-semibold text-gray-800">
              {expenseData.type || "Expense Type"}
            </h1>
          </nav>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "General" && (
            <GeneralTab
              expenseData={expenseData}
              setExpenseData={setExpenseData}
            />
          )}
          {activeTab === "Entitlement" && (
            <EntitlementTab
              expenseData={expenseData}
              setExpenseData={setExpenseData}
            />
          )}
          {activeTab === "Applicability" && (
            <ApplicabilityTab
              expenseData={expenseData}
              setExpenseData={setExpenseData}
            />
          )}
        </div>

        {/* Footer Buttons */}
        {activeTab === "Applicability" && (
          <div className="flex justify-between px-8 mt-4">
            <button
              onClick={() => setActiveTab("Entitlement")}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-900 text-white px-6 py-2 rounded-lg"
            >
              {selectedExpenseType ? "Update" : "Save"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseTypeModal;
