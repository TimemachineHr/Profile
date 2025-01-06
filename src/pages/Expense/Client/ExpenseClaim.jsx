import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { FaPaperclip } from "react-icons/fa6";
import ExpenseTable from "../../../components/NewExpense/Client/ExpenseTable";
import ExpenseStatus from "../../../components/NewExpense/Client/ExpenseStatus";

const ExpenseClaim = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenseAmountFields, setExpenseAmountFields] = useState([
    { amount: "", currency: "" },
  ]);
  const [claimType, setClaimType] = useState("");
  const [view, setView] = useState("Self");
  const [name, setName] = useState("");

  useEffect(() => {
    if (view === "Self") {
      setName("John Doe");
    }
    if (view === "Team") {
      setName("");
    }
  }, [view]);

  const toggleView = () => {
    setView(view === "Team" ? "Self" : "Team");
  };

  // Toggle modal open/close
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // Handle adding new expense amount field
  const addExpenseAmountField = () => {
    setExpenseAmountFields([
      ...expenseAmountFields,
      { amount: "", currency: "" },
    ]);
  };

  // Handle removing expense amount field
  const removeExpenseAmountField = (index) => {
    const newFields = expenseAmountFields.filter((_, i) => i !== index);
    setExpenseAmountFields(newFields);
  };

  // Handle input change for the expense amount fields
  const handleExpenseAmountChange = (index, field, value) => {
    const newFields = [...expenseAmountFields];
    newFields[index][field] = value;
    setExpenseAmountFields(newFields);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-700">Expense Claim</h1>
        <button
          className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={toggleModal}
        >
          <FaPlus className="mr-2 inline" />
          Submit Claim
        </button>
      </div>

      <div className="flex flex-wrap gap-4 p-4">
        {/* Left Section: Expense Table */}
        <div className="flex-1 min-w-[60%] max-w-[70%] overflow-hidden">
          <div className="relative">
            <ExpenseTable />
          </div>
        </div>

        {/* Right Section: Expense Status */}
        <div className="flex-1 min-w-[30%] max-w-[35%] overflow-y-auto h-[calc(100vh-4rem)] p-4">
          <ExpenseStatus />
        </div>
      </div>

      {/* Modal for Claim Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white  rounded-lg w-3/4 md:w-1/2">
            {/* Modal Header */}
            <div className="bg-blue-400 text-white px-4 py-4 flex items-center rounded-md mb-2 justify-between">
              {/* Header Text */}
              <h2 className="text-lg font-semibold">Expense Claim</h2>

              {/* Toggle and Buttons */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setView("Team")}
                  className={`px-4 py-2 rounded-l-lg ${
                    view === "Team"
                      ? "text-blue-200 font-semibold"
                      : "text-white hover:text-gray-300"
                  }`}
                >
                  Team
                </button>
                <label className="relative inline-block w-10 h-6">
                  <input
                    type="checkbox"
                    className="opacity-0 w-0 h-0"
                    onChange={toggleView}
                  />
                  <span className="absolute cursor-pointer inset-0 rounded-full bg-gray-300 before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all checked:before:translate-x-4 checked:bg-blue-500"></span>
                </label>
                <button
                  onClick={() => setView("Self")}
                  className={`px-4 py-2 rounded-r-lg ${
                    view === "Self"
                      ? "text-blue-200 font-semibold"
                      : "text-white hover:text-gray-300"
                  }`}
                >
                  Self
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="flex gap-8 p-6">
              {/* Left Side Fields */}
              <div className="w-1/2 space-y-4">
                <div className="flex flex-col mt-4">
                  <label className="text-gray-700 text-md font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={view === "Self"}
                    className={`p-2 border rounded-md font-light w-full ${
                      view === "Self" ? "bg-gray-200 cursor-not-allowed" : ""
                    }`}
                    placeholder="Enter Employee name"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-700 text-md font-medium mb-2">
                    Date Incurred
                  </label>
                  <input
                    type="date"
                    name="date"
                    placeholder="MM/DD/YYYY"
                    className="p-2 border rounded-md font-light w-full"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-700 text-md font-medium mb-2">
                    Claim Type
                  </label>
                  <select
                    value={claimType}
                    onChange={(e) => setClaimType(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select Claim Type</option>
                    <option value="Travel">Travel</option>
                    <option value="Food">Food</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-700 text-md font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    placeholder="Description"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>

              {/* Right Side Fields */}
              <div className="w-1/2 space-y-4 mt-4">
                {/* Labels for Expense Amount and Attachments */}
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <label className="text-gray-700 text-md font-medium mb-2">
                      Expense Amount
                    </label>
                  </div>
                  <div className="flex-1 ml-5">
                    <label className="text-gray-700 text-md font-medium mb-2">
                      Attachments
                    </label>
                  </div>
                </div>

                {/* Dynamic Fields */}
                {expenseAmountFields.map((field, index) => (
                  <div key={index} className="flex gap-4 items-center">
                    {/* Expense Amount Input */}
                    <div className="flex-1">
                      <div className="flex items-center border rounded-md overflow-hidden">
                        {/* Left side: Currency */}
                        <span className="w-12 bg-gray-100 text-gray-700 px-3 py-2 text-center">
                          $
                        </span>
                        <input
                          type="number"
                          value={field.amount}
                          onChange={(e) =>
                            handleExpenseAmountChange(
                              index,
                              "amount",
                              e.target.value
                            )
                          }
                          placeholder="Amount"
                          className="w-full p-2 border text-sm rounded-md"
                        />
                      </div>
                    </div>

                    {/* Attachments Input */}
                    <div className="flex-1">
                      <div className="flex items-center border  rounded-md overflow-hidden">
                        {/* Left Side: Attach Icon */}
                        <span className="w-12 p-2  rounded-md bg-gray-100 text-gray-700 flex justify-center items-center">
                          <FaPaperclip className="text-lg" />
                        </span>

                        {/* Right Side: File Name */}
                        <input
                          type="file"
                          onChange={(e) =>
                            handleExpenseAmountChange(
                              index,
                              "currency",
                              e.target.files[0]?.name
                            )
                          }
                          className="hidden"
                          id={`file-upload-${index}`}
                        />
                        <label
                          htmlFor={`file-upload-${index}`}
                          className="w-full p-2 text-gray-700 cursor-pointer"
                        >
                          {field.currency || "Upload"}
                        </label>
                      </div>
                    </div>

                    {/* Remove Field Button */}
                    {expenseAmountFields.length > 1 && (
                      <button
                        onClick={() => removeExpenseAmountField(index)}
                        className="text-red-500"
                      >
                        <FaMinus />
                      </button>
                    )}
                  </div>
                ))}

                {/* Add New Field Button */}
                {expenseAmountFields.length < 5 && (
                  <button
                    onClick={addExpenseAmountField}
                    className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    <FaPlus className="mr-2" />
                    Add Another Amount
                  </button>
                )}

                {/* Total Claim */}
                <div className="mt-8">
                  <label className="text-gray-700 text-md font-medium ">
                    Total Claim
                  </label>
                  <div className="flex flex-col mt-3">
                    <div className="flex items-center border rounded-md overflow-hidden">
                      {/* Left side: Currency */}
                      <span className="w-12  bg-gray-100 text-gray-700 px-3 h-20 text-center flex items-center justify-center">
                        $
                      </span>

                      {/* Right side: Numeric Input */}
                      <input
                        type="text"
                        placeholder="Total Amount"
                        className="w-2/3 p-2 h-20 border-l text-2xl  text-gray-700 font-semibold outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-2 mt-2 p-4">
              <button className="bg-blue-800 text-white px-4 py-2 rounded-lg">
                Submit
              </button>
              <button
                onClick={toggleModal}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseClaim;
