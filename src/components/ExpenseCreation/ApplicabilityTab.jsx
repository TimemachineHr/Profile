import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";

const Applicability = ({ handleTabChange }) => {
  const [isAssigned, setIsAssigned] = useState(false);

  const handleAssign = () => {
    setIsAssigned(true);
  };

  return (
    <div className="p-6">
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex flex-col w-40">
          <label className="text-sm font-medium text-gray-800 mb-1">
            Gender
          </label>
          <select className="p-2 border rounded-md">
            <option>Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
        <div className="flex flex-col w-40">
          <label className="text-sm font-medium text-gray-800 mb-1">
            Marital Status
          </label>
          <select className="p-2 border rounded-md">
            <option>Marital Status</option>
            <option>Single</option>
            <option>Married</option>
          </select>
        </div>
        <div className="flex flex-col w-40">
          <label className="text-sm font-medium text-gray-800 mb-1">
            Business Unit
          </label>
          <select className="p-2 border rounded-md">
            <option>Business Unit</option>
            <option>All</option>
            <option>Unit-1</option>
            <option>Unit-2</option>
          </select>
        </div>
        <div className="flex flex-col w-40">
          <label className="text-sm font-medium text-gray-800 mb-1">
            Department
          </label>
          <select className="p-2 border rounded-md">
            <option>Hr, CO-Ordinator</option>
          </select>
        </div>
        <div className="flex flex-col w-40">
          <label className="text-sm font-medium text-gray-800 mb-1">
            Designation
          </label>
          <select className="p-2 border rounded-md">
            <option>Trainee</option>
            <option>Senior</option>
          </select>
        </div>
        <div className="flex flex-col w-40">
          <label className="text-sm font-medium text-gray-800 mb-1">Name</label>
          <select className="p-2 border rounded-md">
            <option>Trainee</option>
            <option>Senior</option>
          </select>
        </div>
      </div>

      {!isAssigned ? (
        <div className="flex justify-end">
          <button
            onClick={handleAssign}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg"
          >
            Assign
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-end">
            <button
              onClick={handleAssign}
              className=" bg-green-600 text-white px-6 py-2 rounded-lg"
            >
              Assigned <FaEdit className="inline ml-2" />
            </button>
          </div>
          <hr className="my-6 border-gray-300" />
          <h4 className="text-md font-semibold mb-2">Applicable To</h4>
          <div className="text-sm grid grid-cols-5 gap-4">
            <div className="font-medium">Gender</div>
            <div className="font-medium">Business Unit</div>
            <div className="font-medium">Marital Status</div>
            <div className="font-medium">Department</div>
            <div className="font-medium">Designation</div>
            <div>Male</div>
            <div>Unit-1</div>
            <div>Single</div>
            <div>Hr</div>
            <div>Senior</div>
            <div>Female</div>
            <div>Unit-2</div>
            <div>Married</div>
            <div>Coordinator</div>
            <div>Trainee</div>
          </div>
        </>
      )}

      <div className="flex justify-between mt-6">
        <button
          onClick={() => handleTabChange("Entitlement")}
          className="bg-gray-400 text-white px-4 py-2 rounded-lg"
        >
          Back
        </button>
        <button
          onClick={() => alert("Saved!")}
          className="bg-blue-900 text-white px-4 py-2 rounded-lg"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Applicability;
