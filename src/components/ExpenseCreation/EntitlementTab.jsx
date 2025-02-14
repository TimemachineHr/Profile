import React, { useEffect, useState } from "react";

const Entitlement = ({ handleTabChange, expenseData, setExpenseData }) => {
  // Default entitlement values
  const defaultEntitlement = {
    effectiveAfter: "0 Days",
    allowedDuringProbation: false,
    allowedDuringNoticePeriod: false,
  };

  // Ensure entitlement exists in parent state only on mount
  useEffect(() => {
    if (!expenseData.entitlement) {
      setExpenseData((prev) => ({
        ...prev,
        entitlement: defaultEntitlement,
      }));
    }
  }, [expenseData.entitlement, setExpenseData]);

  // Extract existing values or set defaults
  const entitlement = expenseData.entitlement || defaultEntitlement;
  const [effectiveAfterValue, setEffectiveAfterValue] = useState("0");
  const [effectiveAfterUnit, setEffectiveAfterUnit] = useState("Days");
  const [allowedDuringProbation, setAllowedDuringProbation] = useState(false);
  const [allowedDuringNoticePeriod, setAllowedDuringNoticePeriod] =
    useState(false);

  // Initialize states from parent data only once
  useEffect(() => {
    if (entitlement.effectiveAfter) {
      const parts = entitlement.effectiveAfter.split(" ");
      setEffectiveAfterValue(parts[0] || "0");
      setEffectiveAfterUnit(parts[1] || "Days");
    }
    setAllowedDuringProbation(entitlement.allowedDuringProbation || false);
    setAllowedDuringNoticePeriod(
      entitlement.allowedDuringNoticePeriod || false
    );
  }, []);

  // Handle input changes
  const updateEntitlement = (field, value) => {
    setExpenseData((prev) => ({
      ...prev,
      entitlement: {
        ...prev.entitlement,
        [field]: value,
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
                value={effectiveAfterValue}
                onChange={(e) => {
                  setEffectiveAfterValue(e.target.value);
                  updateEntitlement(
                    "effectiveAfter",
                    `${e.target.value} ${effectiveAfterUnit}`
                  );
                }}
                className="w-32 p-2 border rounded-md"
              />
              <select
                value={effectiveAfterUnit}
                onChange={(e) => {
                  setEffectiveAfterUnit(e.target.value);
                  updateEntitlement(
                    "effectiveAfter",
                    `${effectiveAfterValue} ${e.target.value}`
                  );
                }}
                className="w-32 p-2 border rounded-md"
              >
                <option>Days</option>
                <option>Months</option>
              </select>
              <span className="text-gray-600">of Joining</span>
            </div>
          </div>
        </div>

        {/* Entitlement Options */}
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={allowedDuringProbation}
              onChange={(e) => {
                setAllowedDuringProbation(e.target.checked);
                updateEntitlement("allowedDuringProbation", e.target.checked);
              }}
              className="mr-3"
            />
            <label className="text-gray-700">Allowed during probation</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={allowedDuringNoticePeriod}
              onChange={(e) => {
                setAllowedDuringNoticePeriod(e.target.checked);
                updateEntitlement(
                  "allowedDuringNoticePeriod",
                  e.target.checked
                );
              }}
              className="mr-3"
            />
            <label className="text-gray-700">
              Allowed during notice period
            </label>
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
