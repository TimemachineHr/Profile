import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import ExpenseHeader from "../../components/Main/ExpenseHeader";

const ExpenseSettings = () => {
  const [timeOffChecked, setTimeOffChecked] = useState(false);
  const [blockExpenseChecked, setBlockExpenseChecked] = useState(false);
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

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const handleDropdownChange = (e) => {
    setSelectedType(e.target.value);
  };

  return (
    <>
      <ExpenseHeader />
      <div className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-xl font-semibold text-gray-700 mb-2">
                Expense Calendar
              </label>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 pt-3 mb-1">
                  Set Start & End Date
                </label>
                <div className="flex gap-4">
                  <input
                    type="date"
                    className="p-2 border rounded-md w-34"
                    placeholder="Start Date"
                  />
                  <input
                    type="date"
                    className="p-2 border rounded-md w-34"
                    placeholder="End Date"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reporting manager can{" "}
                    <select className="p-2 border rounded-md w-34">
                      <option value="payroll">View </option>
                      <option value="Ad-hoc">Not view </option>
                    </select>{" "}
                    the Expense claim
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xl font-semibold text-gray-700 mb-2">
                En-cashable Payment
              </label>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {" "}
                Paid through{" "}
                <select className="p-2 border rounded-md w-36">
                  <option value="payroll">Payroll</option>
                  <option value="adhoc">Ad-Hoc</option>
                </select>
              </label>
            </div>

            <div>
              <label className="block text-xl font-medium text-gray-700 mb-2">
                Expense Approver
              </label>
              <div className="space-y-2 space-x-3">
                <select className="p-2 border rounded-md w-36">
                  <option value="">Business Unit</option>
                  <option value="unit1">Unit 1</option>
                  <option value="unit2">Unit 2</option>
                </select>
                <select className="p-2 border rounded-md w-38">
                  <option value="">Approver Name</option>
                  <option value="manager">Manager</option>
                  <option value="hr">HR</option>
                </select>

                <button className="bg-[#1A72A7] text-white px-4 py-2 rounded-md">
                  Assign Approver
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 border-[#1A72A7] shadow-[0_0_4px_#1A72A7] rounded-md accent-[#1A72A7]"
                  onChange={(e) => setTimeOffChecked(e.target.checked)}
                />

                <span className="text-lg font-medium text-[#1A72A7] ">
                  Ad-hoc Expense Claim
                </span>
              </label>
            </div>
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 border-[#1A72A7] shadow-[0_0_4px_#1A72A7] rounded-md accent-[#1A72A7]"
                  checked={offInLieuChecked}
                  onChange={(e) => setOffInLieuChecked(e.target.checked)}
                />
                <span className="text-lg font-medium text-[#1A72A7] ">
                  Currency
                </span>
              </label>
              {offInLieuChecked && (
                <div className="mt-4">
                  <div className="flex flex-col space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="currencyType"
                        className="w-4 h-4 text-blue-700"
                        onChange={() => setMultipleCurrencySelected(false)} // Reset state for Single Currency
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
                        onChange={() => setMultipleCurrencySelected(true)} // Set state for Multiple Currency
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
                              <form onSubmit={handleSave} className="mt-2">
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
                                <div className="mt-4">
                                  <button
                                    type="submit"
                                    className="px-3 py-1 bg-green-500 text-white text-sm rounded-md"
                                  >
                                    Save
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-3 py-1 bg-gray-300 text-sm rounded-md ml-2"
                                  >
                                    Cancel
                                  </button>
                                </div>
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
          <button className="bg-green-600 text-white px-6 py-2 rounded-md">
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default ExpenseSettings;
