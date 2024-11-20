import React, { useState } from "react";
import ExpenseHeader from "../../components/Main/ExpenseHeader";

const ExpenseSettings = () => {
  const [timeOffChecked, setTimeOffChecked] = useState(false);
  const [blockExpenseChecked, setBlockExpenseChecked] = useState(false);
  const [offInLieuChecked, setOffInLieuChecked] = useState(false);
  const [multipleCurrencySelected, setMultipleCurrencySelected] =
    useState(false);
  const [selectedType, setSelectedType] = useState("");

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
                      <option value="payroll">payroll</option>
                      <option value="Ad-hoc">Ad-hoc</option>
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
                <select className="p-2 border rounded-md w-38">
                  <option value="">Approver Name</option>
                  <option value="manager">Manager</option>
                  <option value="hr">HR</option>
                </select>
                <select className="p-2 border rounded-md w-36">
                  <option value="">Business Unit</option>
                  <option value="unit1">Unit 1</option>
                  <option value="unit2">Unit 2</option>
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
                          <div className="mt-4 p-3 border rounded-md bg-gray-50">
                            <p className="text-sm font-medium text-gray-800">
                              Admin Exchange Rate
                            </p>
                            <ul className="list-disc ml-6 mt-2 text-sm font-light text-gray-700">
                              <li>1 SGD = 3.55 MYR</li>
                              <li>1 SGD = 61.87 INR</li>
                              <li>1 SGD = 1.14 AUD</li>
                              <li>1 SGD = 41.77 Peso</li>
                              <li>1 SGD = 11708.51 IDR</li>
                              <li>All other currencies to be advised</li>
                            </ul>
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
