import React, { useState } from "react";

const GeneralTab = ({ handleTabChange, setExpenseType }) => {
  const [color, setColor] = useState("#FFFFFF");
  const [isEncashable, setIsEncashable] = useState(false);
  const [isCarryForward, setIsCarryForward] = useState(false);
  const [encashOption, setEncashOption] = useState("");
  const [carryForwardOption, setCarryForwardOption] = useState("");
  const [isExpenseIncrement, setIsExpenseIncrement] = useState(false);

  const handleExpenseTypeChange = (e) => {
    setExpenseType(e.target.value || "Expense Type");
  };
  const handleExpenseIncrementChange = (e) => {
    setIsExpenseIncrement(e.target.checked);
  };
  const handleEncashableChange = (e) => {
    setIsEncashable(e.target.checked);
    if (!e.target.checked) setEncashOption("");
  };

  const handleCarryForwardChange = (e) => {
    setIsCarryForward(e.target.checked);
    if (!e.target.checked) setCarryForwardOption("");
  };

  const handleEncashOptionChange = (e) => {
    setEncashOption(e.target.value);
  };

  const handleCarryForwardOptionChange = (e) => {
    setCarryForwardOption(e.target.value);
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
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
              name="Expensetype"
              placeholder="Eg: Food Allowance"
              onChange={handleExpenseTypeChange}
              className="p-2 border rounded-md font-light w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-md font-medium mb-2">
              Maximum Claimable Amount <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center space-x-2 rounded-md">
              <input
                type="text"
                name="claimableAmount"
                placeholder="Set 0 for no limit"
                className="p-2 border rounded-md font-light w-32"
              />
              <select className="p-2 border rounded-md w-32">
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
              name="monthlylimit"
              className="p-2 border rounded-md w-full font-light"
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
                value={color}
                readOnly
                className="p-2 w-full font-light text-gray-700 border-none focus:outline-none"
              />
              <input
                type="color"
                id="colourcode"
                name="colourcode"
                value={color}
                onChange={handleColorChange}
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
              <select className="p-2 w-full font-light text-gray-700 border-none focus:outline-none">
                <option value="Monthly">Single</option>
                <option value="Yearly">Multiple</option>
              </select>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="flex items-center text-gray-700 font-medium">
                <input type="checkbox" className="mr-2" />
                Document Proof
              </label>
            </div>
            <div className="space-y-2">
              <label className="flex items-center text-gray-700 font-medium">
                <input
                  type="checkbox"
                  className="mr-2"
                  onChange={handleEncashableChange}
                />
                Employee Co-Payment
              </label>
              {isEncashable && (
                <div className="mt-4 flex items-center space-x-4">
                  <div className="flex flex-col">
                    <label className="text-gray-700 font-light text-sm mb-1">
                      Value Type
                    </label>
                    <select
                      value={encashOption}
                      onChange={handleEncashOptionChange}
                      className="p-2 border rounded-md w-40 font-light text-sm"
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      <option value="allAvailable">Percent</option>
                      <option value="enterDays">Fixed</option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-gray-700 font-light text-sm mb-1">
                      Value
                    </label>
                    <input
                      type="text"
                      className="p-2 border rounded-md w-40 font-light text-sm"
                      placeholder="Enter value"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <label className="flex items-center text-gray-700 font-medium">
                <input type="checkbox" className="mr-2" />
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
