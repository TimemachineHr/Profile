import React, { useState } from "react";

const GeneralTab = ({ handleTabChange, setLeaveType }) => {
  const [color, setColor] = useState("#FFFFFF");
  const [isEncashable, setIsEncashable] = useState(false);
  const [isCarryForward, setIsCarryForward] = useState(false);
  const [encashOption, setEncashOption] = useState("");
  const [carryForwardOption, setCarryForwardOption] = useState("");
  const [isLeaveIncrement, setIsLeaveIncrement] = useState(false);

  const handleLeaveTypeChange = (e) => {
    setLeaveType(e.target.value || "Leave Type");
  };

  const handleEncashableChange = (e) => {
    setIsEncashable(e.target.checked);
    if (!e.target.checked) setEncashOption("");
  };

  const handleCarryForwardChange = (e) => {
    setIsCarryForward(e.target.checked);
    if (!e.target.checked) setCarryForwardOption("");
  };

  const handleLeaveIncrementChange = (e) => {
    const isChecked = e.target.checked;
    setIsLeaveIncrement(isChecked);
  };

  const handleEncashOptionChange = (e) => {
    setEncashOption(e.target.value);
    setIsEncashable(false);
  };

  const handleCarryForwardOptionChange = (e) => {
    setCarryForwardOption(e.target.value);
    setIsCarryForward(false);
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
              name="leavecode"
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
              name="leavetype"
              placeholder="Eg: Annual Leave"
              onChange={handleLeaveTypeChange}
              className="p-2 border rounded-md font-light w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 text-md font-medium mb-2">
              No of Days <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="noofdays"
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
                <input type="checkbox" className="mr-2" />
                Payable
              </label>
            </div>
            <div className="space-y-2">
              <label className="flex items-center text-gray-700 font-medium">
                <input type="checkbox" className="mr-2" />
                Show availability to employees
              </label>
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-gray-700 font-medium">
                <input
                  type="checkbox"
                  className="mr-2"
                  onChange={handleEncashableChange}
                />
                En-Cashable
              </label>
              {isEncashable && (
                <div className="mt-2">
                  <label className="text-gray-700 font-light text-sm">
                    Maximum Number of Days To Be En-Cashed
                  </label>
                  <select
                    value={encashOption}
                    onChange={handleEncashOptionChange}
                    className="p-2 border rounded-md w-full font-light text-sm mt-1"
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="allAvailable">All Available Balance</option>
                    <option value="enterDays">Enter Days</option>
                  </select>
                  {encashOption === "enterDays" && (
                    <div className="mt-2">
                      <label className="text-gray-700 font-light text-sm">
                        No. of days
                      </label>
                      <input
                        type="number"
                        placeholder="Enter number of days"
                        className="p-2 border rounded-md w-full font-light text-sm mt-1"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-gray-700 font-medium">
                <input
                  type="checkbox"
                  className="mr-2"
                  onChange={handleCarryForwardChange}
                />
                Carry Forward
              </label>
              {isCarryForward && (
                <div className="mt-2">
                  <label className="text-gray-700 font-light text-sm">
                    Maximum Number of Days To Be Carried Forward
                  </label>
                  <select
                    value={carryForwardOption}
                    onChange={handleCarryForwardOptionChange}
                    className="p-2 border rounded-md w-full font-light text-sm mt-1"
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="allAvailable">All Available Balance</option>
                    <option value="enterDays">Enter Days</option>
                  </select>
                  {carryForwardOption === "enterDays" && (
                    <div className="mt-2">
                      <label className="text-gray-700 font-light text-sm">
                        No. of days
                      </label>
                      <input
                        type="number"
                        placeholder="Enter number of days"
                        className="p-2 border rounded-md w-full font-light text-sm mt-1"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-gray-700 font-medium">
                <input
                  type="checkbox"
                  className="mr-2"
                  onChange={handleLeaveIncrementChange}
                />
                Leave Increment
              </label>
              {isLeaveIncrement && (
                <div className="mt-2 space-y-2">
                  <div>
                    <label className="text-gray-700 font-light text-sm">
                      <input
                        type="number"
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
