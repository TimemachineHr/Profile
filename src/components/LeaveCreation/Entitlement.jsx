import React, { useState, useEffect } from "react";

const Entitlement = ({ handleTabChange, leaveData, setLeaveData }) => {
  // Ensure that leaveData.entitlement is always defined
  const defaultEntitlement = {
    effectiveAfter: null,
    allowedDuringProbation: false,
    permittedForHourlyTimeOff: false,
    allowedDuringNoticePeriod: false,
    exclude: false,
    excludeOption: "",
  };

  useEffect(() => {
    if (!leaveData.entitlement) {
      setLeaveData((prev) => ({
        ...prev,
        entitlement: defaultEntitlement,
      }));
    }
  }, [leaveData, setLeaveData]);

  const entitlement = leaveData.entitlement || defaultEntitlement;
  const [showExcludeDropdown, setShowExcludeDropdown] = useState(
    entitlement.exclude || false
  );

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === "checkbox" ? checked : value;

    setLeaveData((prev) => ({
      ...prev,
      entitlement: {
        ...prev.entitlement,
        [name]: updatedValue,
      },
    }));
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-2 gap-8">
        {/* Effective After Section */}
        <div className="space-y-6">
          <div className="flex flex-col">
            <label className="text-gray-700 text-md font-medium mb-2">
              Effective After
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                name="effectiveAfter"
                value={entitlement.effectiveAfter || ""}
                onChange={handleInputChange}
                placeholder="Enter No"
                className="w-32 p-2 border rounded-md"
              />
              <select disabled className="w-32 p-2 border rounded-md">
                <option>Days</option>
              </select>
              <span className="text-gray-600">of Joining</span>
            </div>
          </div>
        </div>

        {/* Entitlement Options Section */}
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="allowedDuringProbation"
              checked={entitlement.allowedDuringProbation}
              onChange={handleInputChange}
              className="mr-3"
            />
            <label className="text-gray-700">Allowed during probation</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="permittedForHourlyTimeOff"
              checked={entitlement.permittedForHourlyTimeOff}
              onChange={handleInputChange}
              className="mr-3"
            />
            <label className="text-gray-700">
              Permitted for hourly time-off
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="allowedDuringNoticePeriod"
              checked={entitlement.allowedDuringNoticePeriod}
              onChange={handleInputChange}
              className="mr-3"
            />
            <label className="text-gray-700">
              Allowed during notice period
            </label>
          </div>

          {/* Exclude Section */}
          <div className="flex flex-col">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="exclude"
                checked={entitlement.exclude}
                onChange={(e) => {
                  setShowExcludeDropdown(e.target.checked);
                  handleInputChange(e);
                }}
                className="mr-3"
              />
              <label className="text-gray-700">Exclude</label>
            </div>
            {showExcludeDropdown && (
              <select
                name="excludeOption"
                value={entitlement.excludeOption || ""}
                onChange={handleInputChange}
                className="w-full mt-2 p-2 border rounded-md"
              >
                <option value="">Select Option</option>
                <option value="week-offs">Week-offs</option>
                <option value="holidays">Holidays</option>
                <option value="both">Both</option>
              </select>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => handleTabChange("General")}
          className="bg-gray-400 text-white px-6 py-2 rounded-lg"
        >
          Back
        </button>
        <button
          onClick={() => handleTabChange("Applicability")}
          className="bg-blue-900 text-white px-6 py-2 rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Entitlement;
