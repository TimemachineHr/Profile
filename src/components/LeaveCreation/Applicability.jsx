import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { BiCheckDouble } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";

const Applicability = ({ handleTabChange, leaveData, setLeaveData }) => {
  const [isAssigned, setIsAssigned] = useState(false);
  const [formData, setFormData] = useState({
    gender: leaveData.applicability.gender || "Gender",
    maritalStatus: leaveData.applicability.maritalStatus || "Marital Status",
    businessUnit: leaveData.applicability.businessUnit || "Business Unit",
    department: leaveData.applicability.department || "Hr Department",
    designation: leaveData.applicability.designation || "Senior",
    name: leaveData.applicability.name || "Trainee",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAssign = () => {
    // Update applicability data in centralized state
    setLeaveData((prev) => ({
      ...prev,
      applicability: { ...formData },
    }));
    setIsAssigned(true);
  };

  const handleDelete = () => {
    // Clear applicability data from centralized state
    setLeaveData((prev) => ({
      ...prev,
      applicability: {
        gender: "",
        maritalStatus: "",
        businessUnit: "",
        department: "",
        designation: "",
        name: "",
      },
    }));
    setIsAssigned(false);
  };

  return (
    <div className="p-6">
      {/* Applicability Form */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex flex-col w-40">
          <label className="text-sm font-medium text-gray-800 mb-1">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="p-2 border rounded-md"
          >
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
          <select
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
            className="p-2 border rounded-md"
          >
            <option>Marital Status</option>
            <option>Single</option>
            <option>Married</option>
          </select>
        </div>
        <div className="flex flex-col w-40">
          <label className="text-sm font-medium text-gray-800 mb-1">
            Business Unit
          </label>
          <select
            name="businessUnit"
            value={formData.businessUnit}
            onChange={handleChange}
            className="p-2 border rounded-md"
          >
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
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="p-2 border rounded-md"
          >
            <option>Hr Department</option>
            <option>Finance Department</option>
            <option>Marketing Department</option>
            <option>Operations Department</option>
          </select>
        </div>
        <div className="flex flex-col w-40">
          <label className="text-sm font-medium text-gray-800 mb-1">
            Designation
          </label>
          <select
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className="p-2 border rounded-md"
          >
            <option>Senior</option>
            <option>Trainee</option>
            <option>Coordinator</option>
            <option>Manager</option>
            <option>Supervisor</option>
            <option>Developer</option>
          </select>
        </div>

        <div className="flex flex-col w-40">
          <label className="text-sm font-medium text-gray-800 mb-1">Name</label>
          <select
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 border rounded-md"
          >
            <option>Trainee</option>
            <option>Senior</option>
          </select>
        </div>
      </div>

      {/* Assign Button */}
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
              className="bg-green-600 text-white px-6 py-2 rounded-lg"
            >
              <BiCheckDouble size={28} className="inline mr-2" /> Assigned
              <FaEdit className="inline ml-2" />
            </button>
          </div>
          <hr className="my-6 border-gray-300" />
          <h4 className="text-md font-semibold mb-2">Applicable To</h4>
          <div className="text-sm grid grid-cols-6 mb-2 gap-4">
            <div className="font-medium">Gender</div>
            <div className="font-medium">Business Unit</div>
            <div className="font-medium">Marital Status</div>
            <div className="font-medium">Department</div>
            <div className="font-medium">Designation</div>
            <div className="font-medium">Action</div>
          </div>
          <div className="text-sm grid grid-cols-6 gap-4 items-center">
            <div>{formData.gender}</div>
            <div>{formData.businessUnit}</div>
            <div>{formData.maritalStatus}</div>
            <div>{formData.department}</div>
            <div>{formData.designation}</div>
            <div>
              <button
                onClick={handleDelete}
                className="text-red-600 hover:text-red-800"
              >
                <AiOutlineDelete size={20} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Applicability;
