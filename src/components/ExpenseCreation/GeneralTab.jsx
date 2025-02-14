import React, { useState } from "react";

const GeneralTab = ({ handleTabChange, expenseData, setExpenseData }) => {
  const [color, setColor] = useState("#FFFFFF");

  const handleInputChange = (field, value) => {
    setExpenseData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMaximumClaimableAmountChange = (amount, frequency) => {
    setExpenseData((prev) => ({
      ...prev,
      maximumClaimableAmount: `${amount} ${frequency}`,
    }));
  };

  return (
    <div>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col">
            <label className="text-gray-700 text-md font-medium mb-2">
              Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="Expensecode"
              value={expenseData.code}
              placeholder="Alphanumeric (6 digits)"
              className="p-2 border rounded-md font-light w-full"
              onChange={(e) => handleInputChange("code", e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-md font-medium mb-2">
              Type <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="Expensetype"
              value={expenseData.type}
              placeholder="Eg: Food Allowance"
              className="p-2 border rounded-md font-light w-full"
              onChange={(e) => handleInputChange("type", e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-md font-medium mb-2">
              Maximum Claimable Amount <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center space-x-2 rounded-md">
              <input
                type="number"
                name="claimableAmount"
                value={expenseData.maximumClaimableAmount?.split(" ")[0] || ""}
                placeholder="Set 0 for no limit"
                className="p-2 border rounded-md font-light w-32"
                onChange={(e) =>
                  handleMaximumClaimableAmountChange(
                    e.target.value,
                    expenseData.maximumClaimableFrequency || "Monthly"
                  )
                }
              />
              <select
                className="p-2 border rounded-md w-32"
                onChange={(e) =>
                  handleMaximumClaimableAmountChange(
                    expenseData.maximumClaimableAmount?.split(" ")[0] || "",
                    e.target.value
                  )
                }
              >
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col">
            <label className="text-gray-700 text-md font-medium mb-2">
              Monthly Limit (If applicable)
            </label>
            <input
              type="text"
              placeholder="Leave it blank for all available balance"
              name="monthlylimit"
              value={expenseData.monthlyLimit}
              className="p-2 border rounded-md w-full font-light"
              onChange={(e) =>
                handleInputChange("monthlyLimit", e.target.value)
              }
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="colourcode"
              className="text-gray-700 text-md font-medium mb-2"
            >
              Color Code <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border rounded-md">
              <input
                type="text"
                value={expenseData.colorCode}
                readOnly
                className="p-2 w-full font-light text-gray-700 border-none focus:outline-none"
              />
              <input
                type="color"
                id="colourcode"
                name="colourcode"
                value={expenseData.colorCode}
                onChange={(e) => {
                  setColor(e.target.value);
                  handleInputChange("colorCode", e.target.value);
                }}
                className="w-12 h-10 p-1 rounded-r-md border-l"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="colourcode"
              className="text-gray-700 text-md font-medium mb-2"
            >
              Currency <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border rounded-md">
              <select
                className="p-2 w-full font-light text-gray-700 border-none focus:outline-none"
                value={expenseData.currency}
                onChange={(e) => handleInputChange("currency", e.target.value)}
              >
                <option value="Single">Single</option>
                <option value="Multiple">Multiple</option>
              </select>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="flex items-center text-gray-700 font-medium">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={expenseData.options.documentProof}
                  onChange={(e) =>
                    handleInputChange("options", {
                      ...expenseData.options,
                      documentProof: e.target.checked,
                    })
                  }
                />
                Document Proof
              </label>
            </div>
            <div className="space-y-2">
              <label className="flex items-center text-gray-700 font-medium">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={expenseData.options.employeeCoPayment}
                  onChange={(e) =>
                    handleInputChange("options", {
                      ...expenseData.options,
                      employeeCoPayment: e.target.checked,
                    })
                  }
                />
                Employee Co-Payment
              </label>

              {expenseData.options.employeeCoPayment && (
                <div className="mt-4 flex items-center space-x-4">
                  {/* Value Type */}
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-light text-sm mb-1">
                      Value Type
                    </label>
                    <select
                      value={expenseData.options.valueType || ""}
                      onChange={(e) =>
                        handleInputChange("options", {
                          ...expenseData.options,
                          valueType: e.target.value,
                        })
                      }
                      className="p-2 border rounded-md w-40 font-light text-sm"
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      <option value="Percentage">Percent</option>
                      <option value="Fixed">Fixed</option>
                    </select>
                  </div>

                  {/* Value */}
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-light text-sm mb-1">
                      Value
                    </label>
                    <input
                      type="text"
                      className="p-2 border rounded-md w-40 font-light text-sm"
                      placeholder="Enter value"
                      value={expenseData.options.value || ""}
                      onChange={(e) =>
                        handleInputChange("options", {
                          ...expenseData.options,
                          value: parseInt(e.target.value, 10) || "",
                        })
                      }
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <label className="flex items-center text-gray-700 font-medium">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={expenseData.options.multipleBills}
                  onChange={(e) =>
                    handleInputChange("options", {
                      ...expenseData.options,
                      multipleBills: e.target.checked,
                    })
                  }
                />
                Multiple Bills
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={() => handleTabChange("Entitlement")}
            className="bg-blue-900 text-white px-6 py-2 rounded-lg"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneralTab;
