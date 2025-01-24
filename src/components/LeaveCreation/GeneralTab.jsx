import React, { useState } from "react";

const GeneralTab = ({ handleTabChange, leaveData, setLeaveData }) => {
  // Handlers to update state dynamically
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === "checkbox" ? checked : value;

    setLeaveData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  const handleOptionChange = (option, key, value) => {
    setLeaveData((prev) => ({
      ...prev,
      options: {
        ...prev.options,
        [option]: key ? { ...prev.options[option], [key]: value } : value,
      },
    }));
  };

  return (
    <div>
      <div className="space-y-4">
        {/* General Fields */}
        <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col">
            <label className="text-gray-700 text-md font-medium mb-2">
              Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="code"
              value={leaveData.code}
              onChange={handleInputChange}
              placeholder="Alphanumeric (6 digits)"
              className="p-2 border rounded-md font-light w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-md font-medium mb-2">
              Type <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="type"
              value={leaveData.type}
              onChange={handleInputChange}
              placeholder="Eg: Annual Leave"
              className="p-2 border rounded-md font-light w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-md font-medium mb-2">
              No of Days <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="noOfDays"
              value={leaveData.noOfDays}
              onChange={handleInputChange}
              placeholder="Set 0 for no limit"
              className="p-2 border rounded-md font-light w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col">
            <label className="text-gray-700 text-md font-medium mb-2">
              Monthly Limit (If applicable)
            </label>
            <input
              type="number"
              name="monthlyLimit"
              value={leaveData.monthlyLimit}
              onChange={handleInputChange}
              className="p-2 border rounded-md w-full font-light"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-md font-medium mb-2">
              Color Code <span className="text-red-500">*</span>
            </label>
            {/* <input
              type="color"
              name="colorCode"
              value={leaveData.colorCode}
              onChange={handleInputChange}
              className="w-12 h-10 p-1 rounded-md"
            /> */}
            <div className="flex items-center border rounded-md">
              <input
                type="text"
                value={leaveData.colorCode}
                onChange={handleInputChange}
                readOnly
                className="p-2 w-full font-light text-gray-700 border-none focus:outline-none"
              />
              <input
                type="color"
                name="colorCode"
                value={leaveData.colorCode}
                onChange={handleInputChange}
                className="w-12 h-10 p-1 rounded-r-md border-l"
              />
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="p-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="flex items-center text-gray-700 font-medium">
                <input
                  type="checkbox"
                  name="documentProof"
                  checked={leaveData.options.documentProof}
                  onChange={(e) =>
                    handleOptionChange("documentProof", null, e.target.checked)
                  }
                  className="mr-2"
                />
                Document Proof
              </label>
            </div>
            <div className="space-y-2">
              <label className="flex items-center text-gray-700 font-medium">
                <input
                  type="checkbox"
                  name="payable"
                  checked={leaveData.options.payable}
                  onChange={(e) =>
                    handleOptionChange("payable", null, e.target.checked)
                  }
                  className="mr-2"
                />
                Payable
              </label>
            </div>
            <div className="space-y-2">
              <label className="flex items-center text-gray-700 font-medium">
                <input
                  type="checkbox"
                  name="showAvailability"
                  checked={leaveData.options.showAvailability}
                  onChange={(e) =>
                    handleOptionChange(
                      "showAvailability",
                      null,
                      e.target.checked
                    )
                  }
                  className="mr-2"
                />
                Show availability to employees
              </label>
            </div>

            {/* En-Cashable Option */}
            <div className="space-y-2">
              <label className="flex items-center text-gray-700 font-medium">
                <input
                  type="checkbox"
                  name="enCashable"
                  checked={leaveData.options.enCashable}
                  onChange={(e) =>
                    handleOptionChange("enCashable", null, e.target.checked)
                  }
                  className="mr-2"
                />
                En-Cashable
              </label>
              {leaveData.options.enCashable && (
                <div className="mt-2">
                  <label className="text-gray-700 font-light text-sm">
                    Maximum Number of Days To Be En-Cashed
                  </label>
                  <select
                    value={
                      leaveData.options.enCashableOptions.allAvailableBalance
                        ? "allAvailable"
                        : "enterDays"
                    }
                    onChange={(e) =>
                      handleOptionChange(
                        "enCashableOptions",
                        "allAvailableBalance",
                        e.target.value === "allAvailable"
                      )
                    }
                    className="p-2 border rounded-md w-full font-light text-sm mt-1"
                  >
                    <option value="allAvailable">All Available Balance</option>
                    <option value="enterDays">Enter Days</option>
                  </select>
                  {!leaveData.options.enCashableOptions.allAvailableBalance && (
                    <input
                      type="number"
                      name="noOfDays"
                      value={leaveData.options.enCashableOptions.noOfDays || ""}
                      onChange={(e) =>
                        handleOptionChange(
                          "enCashableOptions",
                          "noOfDays",
                          e.target.value
                        )
                      }
                      placeholder="Enter number of days"
                      className="p-2 border rounded-md w-full font-light text-sm mt-1"
                    />
                  )}
                </div>
              )}
            </div>

            {/* Carry Forward Option */}
            <div className="space-y-2">
              <label className="flex items-center text-gray-700 font-medium">
                <input
                  type="checkbox"
                  name="carryForward"
                  checked={leaveData.options.carryForward}
                  onChange={(e) =>
                    handleOptionChange("carryForward", null, e.target.checked)
                  }
                  className="mr-2"
                />
                Carry Forward
              </label>
              {leaveData.options.carryForward && (
                <div className="mt-2">
                  <label className="text-gray-700 font-light text-sm">
                    Maximum Number of Days To Be Carried Forward
                  </label>
                  <select
                    value={
                      leaveData.options.carryForwardOptions.allAvailableBalance
                        ? "allAvailable"
                        : "enterDays"
                    }
                    onChange={(e) =>
                      handleOptionChange(
                        "carryForwardOptions",
                        "allAvailableBalance",
                        e.target.value === "allAvailable"
                      )
                    }
                    className="p-2 border rounded-md w-full font-light text-sm mt-1"
                  >
                    <option value="allAvailable">All Available Balance</option>
                    <option value="enterDays">Enter Days</option>
                  </select>
                  {!leaveData.options.carryForwardOptions
                    .allAvailableBalance && (
                    <input
                      type="number"
                      name="noOfDays"
                      value={
                        leaveData.options.carryForwardOptions.noOfDays || ""
                      }
                      onChange={(e) =>
                        handleOptionChange(
                          "carryForwardOptions",
                          "noOfDays",
                          e.target.value
                        )
                      }
                      placeholder="Enter number of days"
                      className="p-2 border rounded-md w-full font-light text-sm mt-1"
                    />
                  )}
                </div>
              )}
            </div>

            {/* Leave Increment Option */}
            <div className="space-y-2">
              <label className="flex items-center text-gray-700 font-medium">
                <input
                  type="checkbox"
                  name="leaveIncrement"
                  checked={leaveData.options.leaveIncrement}
                  onChange={(e) =>
                    handleOptionChange("leaveIncrement", null, e.target.checked)
                  }
                  className="mr-2"
                />
                Leave Increment
              </label>
              {leaveData.options.leaveIncrement && (
                <div className="mt-2 space-y-2">
                  <div>
                    <label className="text-gray-700 font-light text-sm">
                      <input
                        type="number"
                        name="perYear"
                        value={
                          leaveData.options.leaveIncrementOptions.perYear || ""
                        }
                        onChange={(e) =>
                          handleOptionChange(
                            "leaveIncrementOptions",
                            "perYear",
                            e.target.value
                          )
                        }
                        className="p-2 border rounded-md w-12 font-light text-sm mt-1"
                      />{" "}
                      Day per Year
                    </label>
                  </div>
                  <div>
                    <label className="text-gray-700 font-light text-sm">
                      Capped at{" "}
                      <input
                        type="number"
                        name="cappedAt"
                        value={
                          leaveData.options.leaveIncrementOptions.cappedAt || ""
                        }
                        onChange={(e) =>
                          handleOptionChange(
                            "leaveIncrementOptions",
                            "cappedAt",
                            e.target.value
                          )
                        }
                        className="p-2 border rounded-md w-12 font-light text-sm mt-1"
                      />{" "}
                      days
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
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
