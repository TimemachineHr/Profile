import React, { useState, useRef } from "react";
import { FaRegEdit, FaTimes, FaPlus } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { BiCheckDouble } from "react-icons/bi";
import ExpenseHeader from "../../components/Main/ExpenseHeader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { addYears, subDays } from "date-fns";

// Assign Approver
// Please type " Assign" to add a new Leave Approver
const ExpenseSettings = () => {
  const [timeOffChecked, setTimeOffChecked] = useState(false);
  const [blockExpenseChecked, setBlockExpenseChecked] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [offInLieuChecked, setOffInLieuChecked] = useState(false);
  const [multipleCurrencySelected, setMultipleCurrencySelected] =
    useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [exchangeRates, setExchangeRates] = useState([
    { currency: "MYR", value: 3.55 },
    { currency: "INR", value: 61.87 },
    { currency: "AUD", value: 1.14 },
    { currency: "Peso", value: 41.77 },
    { currency: "IDR", value: 11708.51 },
  ]);
  const [reportingManager, setReportingManager] = useState("view");
  const [paymentMethod, setPaymentMethod] = useState("payroll");
  const [approvers, setApprovers] = useState([
    { businessUnit: "", designation: "", approverName: "" },
  ]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupInputValue, setPopupInputValue] = useState("");
  const [isAssigned, setIsAssigned] = useState(false);
  const lastApproverAddedAt = useRef(null); // To track the last approver addition timestamp

  const addApproverWithConfirmation = () => {
    const now = new Date();
    if (lastApproverAddedAt.current) {
      const timeElapsed = (now - lastApproverAddedAt.current) / 1000;
      if (timeElapsed < 60) {
        setIsPopupVisible(true); // Show popup if within 1 minute
        return;
      }
    }

    // Add approver directly if no confirmation is required
    addApprover();
  };
  const openConfirmPopup = () => {
    setIsPopupVisible(true);
  };

  const confirmAssignApprover = () => {
    if (popupInputValue === "Assign") {
      setIsAssigned(true);
      setIsPopupVisible(false);
    }
  };

  const addApprover = () => {
    setApprovers([
      ...approvers,
      { businessUnit: "", designation: "", approverName: "" },
    ]);
    lastApproverAddedAt.current = new Date(); // Update the last approver addition time
    setIsPopupVisible(false); // Hide the popup if it was shown
    setIsAssigned(false);
  };

  // Handle exchange rate changes
  const handleRateChange = (index, field, value) => {
    const updatedRates = [...exchangeRates];
    updatedRates[index][field] = value;
    setExchangeRates(updatedRates);
  };

  const handleAddRate = () => {
    setExchangeRates([...exchangeRates, { currency: "", value: "" }]);
  };

  const handleRemoveRate = (index) => {
    const updatedRates = exchangeRates.filter((_, i) => i !== index);
    setExchangeRates(updatedRates);
  };

  // Handle approvers array
  const handleApproverChange = (index, field, value) => {
    const updatedApprovers = [...approvers];
    updatedApprovers[index][field] = value;
    setApprovers(updatedApprovers);
  };

  const removeApprover = (index) => {
    setApprovers(approvers.filter((_, i) => i !== index));
  };

  const handleDropdownChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    const calculatedEndDate = subDays(addYears(date, 1), 1);
    setEndDate(calculatedEndDate);
  };

  const handleSubmit = async () => {
    const data = {
      startDate,
      endDate,
      reportingManager,
      encashablePaymentMethod: paymentMethod,
      adHocExpenseClaim: timeOffChecked,
      currencySettings: {
        singleCurrency: !multipleCurrencySelected,
        multipleCurrency: multipleCurrencySelected,
        selectedType: selectedType || undefined,
        adminExchangeRates:
          selectedType === "adminExchangeRate"
            ? exchangeRates.reduce((acc, rate) => {
                if (rate.currency && rate.value) {
                  acc[rate.currency] = parseFloat(rate.value);
                }
                return acc;
              }, {})
            : undefined,
      },
      approvers,
    };

    console.log("Payload being sent:", JSON.stringify(data, null, 2));

    try {
      const response = await axios.post(
        "https://expense-module.vercel.app/api/expense-settings",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Expense settings saved successfully:", response.data);
      alert("Expense settings saved successfully!");
    } catch (error) {
      console.error("Error saving expense settings:", error);
      alert("Error saving expense settings. Please check your inputs.");
    }
  };

  return (
    <>
      <ExpenseHeader />
      <div className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Expense Calendar */}
            <div>
              <label className="block text-xl font-semibold text-gray-700 mb-2">
                Expense Calendar
              </label>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Set Start & End Date
                </label>
                <div className="flex gap-4">
                  <DatePicker
                    selected={startDate}
                    onChange={handleStartDateChange}
                    dateFormat="MMMM d"
                    placeholderText="Start Date"
                    showMonthDropdown
                    showDayDropdown
                    className="p-2 border rounded-md"
                  />
                  <DatePicker
                    selected={endDate}
                    dateFormat="MMMM d"
                    placeholderText="End Date"
                    showMonthDropdown
                    showDayDropdown
                    className="p-2 border rounded-md"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reporting manager can{" "}
                    <select
                      className="p-2 border rounded-md w-34"
                      value={reportingManager}
                      onChange={(e) => setReportingManager(e.target.value)}
                    >
                      <option value="view">View</option>
                      <option value="notview">Not view</option>
                    </select>{" "}
                    the Expense claim
                  </label>
                </div>
              </div>
            </div>

            {/* En-cashable Payment */}
            <div>
              <label className="block text-xl font-semibold text-gray-700 mb-2">
                En-cashable Payment
              </label>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Paid through{" "}
                <select
                  className="p-2 border rounded-md w-36"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="payroll">Payroll</option>
                  <option value="manual">Manual</option>
                </select>{" "}
                on the month of approval
              </label>
            </div>
            {/* Expense Approver */}
            <div>
              <label className="block text-xl font-medium text-gray-700 mb-2">
                Expense Approver
              </label>
              {approvers.map((approver, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <select
                    className="p-2 border rounded-md w-36"
                    value={approver.businessUnit}
                    onChange={(e) =>
                      handleApproverChange(
                        index,
                        "businessUnit",
                        e.target.value
                      )
                    }
                  >
                    <option value="">Business Unit</option>
                    <option value="unit1">Unit 1</option>
                    <option value="unit2">Unit 2</option>
                  </select>
                  <select
                    className="p-2 border rounded-md w-36"
                    value={approver.designation}
                    onChange={(e) =>
                      handleApproverChange(index, "designation", e.target.value)
                    }
                  >
                    <option value="">Designation</option>
                    <option value="design1">Design 1</option>
                    <option value="design2">Design 2</option>
                  </select>
                  <select
                    className="p-2 border rounded-md w-38"
                    value={approver.approverName}
                    onChange={(e) =>
                      handleApproverChange(
                        index,
                        "approverName",
                        e.target.value
                      )
                    }
                  >
                    <option value="">Approver Name</option>
                    <option value="JohnDoe">John Doe</option>
                    <option value="JaneSmith">Jane Smith</option>
                  </select>
                  <div className="flex items-center gap-1.5">
                    {approvers.length > 1 && (
                      <button
                        title="Remove Approver"
                        type="button"
                        onClick={() => removeApprover(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <AiOutlineDelete size={20} />
                      </button>
                    )}
                    {index === approvers.length - 1 && (
                      <button
                        type="button"
                        onClick={addApprover}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaPlus size={15} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={openConfirmPopup}
                className="bg-[#1A72A7] text-white px-4 py-2 rounded-md mt-2 flex items-center gap-2"
              >
                {isAssigned ? (
                  <>
                    <BiCheckDouble size={28} className="inline" />
                    <span>Assigned</span>
                  </>
                ) : (
                  "Assign Approver"
                )}
              </button>
            </div>
          </div>

          {/* Popup Modal */}
          {isPopupVisible && (
            <div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <div className="bg-white rounded-lg px-6 pt-4 pb-6 shadow-lg w-96">
                <div className="flex justify-between items-center">
                  <h2
                    id="modal-title"
                    className="text-lg font-bold mb-4 text-gray-700"
                  >
                    Assign Approver
                  </h2>
                  <button
                    className="font-normal text-sm text-gray-700 hover:text-red-500 mb-3"
                    onClick={() => setIsPopupVisible(false)}
                  >
                    <FaTimes size={24} />
                  </button>
                </div>
                <p className="mb-6 text-gray-700 text-sm">
                  Please type <span className="font-semibold">"Assign"</span> to
                  add a new approver.
                </p>
                <input
                  type="text"
                  value={popupInputValue}
                  onChange={(e) => setPopupInputValue(e.target.value)}
                  placeholder="Assign"
                  className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onCopy={(e) => {
                    e.preventDefault();
                  }}
                  onPaste={(e) => {
                    e.preventDefault();
                  }}
                />
                <div className="flex justify-end gap-4">
                  <button
                    className={`${
                      popupInputValue === "Assign"
                        ? "bg-blue-500"
                        : "bg-gray-400 cursor-not-allowed"
                    } text-white font-normal text-lg px-4 py-1 rounded-lg shadow-lg`}
                    onClick={confirmAssignApprover}
                    disabled={popupInputValue !== "Assign"}
                  >
                    Assign
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="space-y-6">
            {/* Ad-hoc Expense Claim */}
            <div className="flex items-center space-x-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 border-[#1A72A7] shadow-[0_0_4px_#1A72A7] rounded-md accent-[#1A72A7]"
                  checked={timeOffChecked}
                  onChange={(e) => setTimeOffChecked(e.target.checked)}
                />
                <span className="text-lg font-medium text-[#1A72A7]">
                  Ad-hoc Expense Claim
                </span>
              </label>
              <div className="relative group mb-5 ">
                <span className="text-gray-500 cursor-pointer ">
                  <BsFillInfoCircleFill />
                </span>
                <div className="absolute hidden group-hover:block bg-white text-sm text-gray-700 border rounded-lg shadow-lg p-2 w-64 mt-2">
                  Ad-hoc Expense Claim allows employees to submit expense claims
                  for one-off or unexpected costs.
                </div>
              </div>
            </div>

            {/* Currency Section */}
            <div>
              <div className="flex items-center space-x-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 border-[#1A72A7] shadow-[0_0_4px_#1A72A7] rounded-md accent-[#1A72A7]"
                    checked={offInLieuChecked}
                    onChange={(e) => setOffInLieuChecked(e.target.checked)}
                  />
                  <span className="text-lg font-medium text-red-500">
                    Currency
                  </span>
                </label>
                <div className="relative group mb-5 ">
                  <span className="text-gray-500 cursor-pointer ">
                    <BsFillInfoCircleFill />
                  </span>
                  <div className="absolute hidden group-hover:block bg-white text-sm text-gray-700 border rounded-lg shadow-lg p-2 w-64 mt-2">
                    Currency allows employees to submit expense claims for
                    different currencies.
                  </div>
                </div>
              </div>
              {offInLieuChecked && (
                <div className="mt-4">
                  <div className="flex flex-col space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="currencyType"
                        className="w-4 h-4 text-blue-700"
                        onChange={() => setMultipleCurrencySelected(false)}
                      />
                      <span className="text-sm font-light">
                        Single Currency
                      </span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="currencyType"
                        className="w-4 h-4 text-blue-700"
                        onChange={() => setMultipleCurrencySelected(true)}
                      />
                      <span className="text-sm font-light">
                        Multiple Currency
                      </span>
                    </label>
                    {multipleCurrencySelected && (
                      <div className="mt-2 space-x-2">
                        <label className="text-sm font-medium text-gray-700">
                          Select Type
                        </label>
                        <select
                          className="p-2 border rounded-md w-48 font-light text-sm mt-1"
                          value={selectedType}
                          onChange={handleDropdownChange}
                        >
                          <option value="" disabled>
                            Choose Option
                          </option>
                          <option value="exchangeRate">Exchange Rate</option>
                          <option value="adminExchangeRate">
                            Admin Exchange Rate
                          </option>
                          <option value="employeeExchangeRate">
                            Employee Exchange Rate
                          </option>
                          <option value="both">Both</option>
                        </select>
                        {selectedType === "adminExchangeRate" && (
                          <div className="mt-4 p-3 border rounded-md bg-gray-50 relative">
                            <div className="flex justify-between items-center">
                              <p className="text-sm font-medium text-gray-800">
                                Admin Exchange Rate
                              </p>
                              <button
                                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                                onClick={() => setIsEditing(!isEditing)}
                              >
                                <FaRegEdit />
                              </button>
                            </div>
                            {!isEditing ? (
                              <ul className="list-disc ml-6 mt-2 text-sm font-light text-gray-700">
                                {exchangeRates.map((rate, index) => (
                                  <li key={index}>
                                    1 SGD = {rate.value} {rate.currency}
                                  </li>
                                ))}
                                <li>All other currencies to be advised</li>
                              </ul>
                            ) : (
                              <form
                                onSubmit={(e) => e.preventDefault()}
                                className="mt-2"
                              >
                                {exchangeRates.map((rate, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-2 mb-2"
                                  >
                                    <input
                                      type="text"
                                      value={rate.currency}
                                      onChange={(e) =>
                                        handleRateChange(
                                          index,
                                          "currency",
                                          e.target.value
                                        )
                                      }
                                      placeholder="Currency (e.g., SGD)"
                                      className="border rounded-md p-1 text-sm w-32"
                                    />
                                    <input
                                      type="number"
                                      value={rate.value}
                                      onChange={(e) =>
                                        handleRateChange(
                                          index,
                                          "value",
                                          e.target.value
                                        )
                                      }
                                      placeholder="Exchange Rate"
                                      className="border rounded-md p-1 text-sm w-32"
                                    />
                                    <button
                                      type="button"
                                      className="text-red-500 hover:text-red-700"
                                      onClick={() => handleRemoveRate(index)}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                ))}
                                <button
                                  type="button"
                                  className="text-blue-500 hover:underline text-sm"
                                  onClick={handleAddRate}
                                >
                                  Add New Currency
                                </button>
                              </form>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 text-right">
          <button
            className="bg-green-600 text-white px-6 py-2 rounded-md"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default ExpenseSettings;
