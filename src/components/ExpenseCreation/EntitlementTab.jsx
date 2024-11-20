import React, { useState } from "react";

const Entitlement = ({ handleTabChange }) => {
  const [showExcludeDropdown, setShowExcludeDropdown] = useState(false);

  return (
    <div className="p-6">
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex flex-col">
            <label className="text-gray-700 text-md font-medium mb-2">
              Effective After
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                placeholder="Enter No."
                className="w-32 p-2 border rounded-md"
              />
              <select className="w-32 p-2 border rounded-md">
                <option>Days</option>
                <option>Months</option>
              </select>
              <span className="text-gray-600">of Joining</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <input type="checkbox" className="mr-3" />
            <label className="text-gray-700">Allowed during probation</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" className="mr-3" />
            <label className="text-gray-700">
              Allowed during notice period
            </label>
          </div>
        </div>
      </div>

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
