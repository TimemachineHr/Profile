import React, { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";

const ApplicabilityTab = ({ expenseData, setExpenseData, handleTabChange }) => {
  // Extract existing applicability data or set defaults
  const defaultApplicability = {
    gender: "",
    maritalStatus: "",
    businessUnit: "",
    department: "",
    designation: "",
    name: "",
  };

  // State for applicability data
  const [formData, setFormData] = useState(
    expenseData.applicability || defaultApplicability
  );
  const [isAssigned, setIsAssigned] = useState(
    Object.values(formData).some((value) => value !== "")
  );

  // Sync data with parent when formData changes
  useEffect(() => {
    setExpenseData((prev) => ({
      ...prev,
      applicability: formData,
    }));
  }, [formData, setExpenseData]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Assign data if all fields are filled
  const handleAssign = () => {
    if (Object.values(formData).every((value) => value !== "")) {
      setIsAssigned(true);
    } else {
      alert("Please fill all fields.");
    }
  };

  // Reset form data when deleting
  const handleDelete = () => {
    setFormData(defaultApplicability);
    setIsAssigned(false);
  };

  return (
    <div className="p-6">
      <div className="flex flex-wrap gap-4 mb-6">
        {[
          {
            label: "Gender",
            name: "gender",
            options: ["Male", "Female", "Other"],
          },
          {
            label: "Marital Status",
            name: "maritalStatus",
            options: ["Single", "Married"],
          },
          {
            label: "Business Unit",
            name: "businessUnit",
            options: ["Unit-1", "Unit-2", "All"],
          },
          {
            label: "Department",
            name: "department",
            options: ["HR", "Coordinator"],
          },
          {
            label: "Designation",
            name: "designation",
            options: ["Coordinator", "Manager", "Supervisor", "Developer"],
          },
          { label: "Name", name: "name", options: ["Trainee", "Senior"] },
        ].map((field) => (
          <div key={field.name} className="flex flex-col w-40">
            <label className="text-sm font-medium text-gray-800 mb-1">
              {field.label}
            </label>
            <select
              name={field.name}
              value={formData[field.name]}
              onChange={handleInputChange}
              className="p-2 border rounded-md"
            >
              <option value="">Select {field.label}</option>
              {field.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleAssign}
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg"
        >
          {isAssigned ? "Assigned" : "Assign"}
        </button>
      </div>

      {isAssigned && (
        <>
          <hr className="my-6 border-gray-300" />
          <h4 className="text-md font-semibold mb-2">Assigned Data</h4>
          <div className="text-sm grid grid-cols-7 gap-4">
            <div className="font-medium">Gender</div>
            <div className="font-medium">Marital Status</div>
            <div className="font-medium">Business Unit</div>
            <div className="font-medium">Department</div>
            <div className="font-medium">Designation</div>
            <div className="font-medium">Name</div>
            <div className="font-medium">Action</div>
            <div>{formData.gender}</div>
            <div>{formData.maritalStatus}</div>
            <div>{formData.businessUnit}</div>
            <div>{formData.department}</div>
            <div>{formData.designation}</div>
            <div>{formData.name}</div>
            <div>
              <button
                onClick={handleDelete}
                className="text-red-600 hover:text-red-800"
              >
                <FaTrashAlt />
              </button>
            </div>
          </div>
        </>
      )}

      {/* Navigation Buttons */}
      {/* <div className="flex justify-between mt-6">
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
      </div> */}
    </div>
  );
};

export default ApplicabilityTab;
