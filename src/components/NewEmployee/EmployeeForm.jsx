import React, { useState, useEffect } from "react";
import { FaCaretDown } from "react-icons/fa6";
import { FaPlus, FaMinus } from "react-icons/fa";

const EmployeeForm = ({ data, setData }) => {
  const [formState, setFormState] = useState({
    source: data?.source || "",
    businessUnit: data?.businessUnit || "",
    department: data?.department || "",
    designation: data?.designation || "",
    reportingTo: data?.reportingTo || "",
    userRole: data?.userRole || "",
    probationPeriod: data?.probationPeriod || "",
    workingDays: data?.workingDays || "",
    employmentType: data?.employmentType || "",
    logIn: data?.logIn || "",
    eligibleFor: data?.eligibleFor || {
      partTime: false,
      overTime: false,
    },
    equipmentIssuance: data?.equipmentIssuance || [
      {
        type: "",
        brand: "",
        model: "",
        serialNumber: "",
        assetTag: "",
        issueDate: "",
      },
    ],
  });

  useEffect(() => {
    setData(formState);
  }, [formState]);

  const updateFormField = (field, value) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateEligibleFor = (type) => {
    setFormState((prev) => ({
      ...prev,
      eligibleFor: {
        ...prev.eligibleFor,
        [type]: !prev.eligibleFor[type],
      },
    }));
  };

  const updateEquipmentField = (index, field, value) => {
    const newEquipment = [...formState.equipmentIssuance];
    newEquipment[index] = {
      ...newEquipment[index],
      [field]: value,
    };
    setFormState((prev) => ({
      ...prev,
      equipmentIssuance: newEquipment,
    }));
  };

  const addEquipmentSection = () => {
    setFormState((prev) => ({
      ...prev,
      equipmentIssuance: [
        ...prev.equipmentIssuance,
        {
          type: "",
          brand: "",
          model: "",
          serialNumber: "",
          assetTag: "",
          issueDate: "",
        },
      ],
    }));
  };

  const removeLastEquipmentSection = () => {
    if (formState.equipmentIssuance.length > 1) {
      setFormState((prev) => ({
        ...prev,
        equipmentIssuance: prev.equipmentIssuance.slice(0, -1),
      }));
    }
  };

  const CustomSelect = ({ placeholder, options, value, onChange }) => (
    <div className="relative pt-2">
      <select
        value={value}
        onChange={onChange}
        className="w-full h-11 bg-white shadow-[2px_2px_4px_rgba(0,0,0,0.15),-1px_-1px_4px_rgba(0,0,0,0.15)] rounded-lg px-3 text-gray-700 font-normal text-[rgba(51,51,51,0.8)] appearance-none focus:outline-none"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <FaCaretDown
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
        size={16}
      />
    </div>
  );

  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-4 gap-x-4 gap-y-6">
        <div>
          <label className="text-[18px] leading-[27px]  text-gray-700 text-md font-medium mb-2">
            Source
          </label>
          <CustomSelect
            placeholder="Select Source"
            options={[
              "Re-requirement",
              "Internal Transfer",
              "Promotion",
              "External Hire",
              "Rehire",
            ]}
            value={formState.source}
            onChange={(e) => updateFormField("source", e.target.value)}
          />
        </div>
        <div>
          <label className="text-[18px] leading-[27px]  text-gray-700 text-md font-medium mb-2">
            Business Unit
          </label>
          <CustomSelect
            placeholder="Select Business Unit"
            options={["Business Unit 1", "Business Unit 2", "Business Unit 3"]}
            value={formState.businessUnit}
            onChange={(e) => updateFormField("businessUnit", e.target.value)}
          />
        </div>
        <div>
          <label className="text-[18px] leading-[27px]  text-gray-700 text-md font-medium mb-2">
            Department
          </label>
          <CustomSelect
            placeholder="Select Department"
            options={["Department 1", "Department 2", "Department 3"]}
            value={formState.department}
            onChange={(e) => updateFormField("department", e.target.value)}
          />
        </div>
        <div>
          <label className="text-[18px] leading-[27px]  text-gray-700 text-md font-medium mb-2">
            Designation
          </label>
          <CustomSelect
            placeholder="Select Designation"
            options={["Designation 1", "Designation 2", "Designation 3"]}
            value={formState.designation}
            onChange={(e) => updateFormField("designation", e.target.value)}
          />
        </div>
        <div>
          <label className="text-[18px] leading-[27px]  text-gray-700 text-md font-medium mb-2">
            Reporting To
          </label>
          <CustomSelect
            placeholder="Select Reporting To"
            options={["Manager 1", "Manager 2", "Manager 3"]}
            value={formState.reportingTo}
            onChange={(e) => updateFormField("reportingTo", e.target.value)}
          />
        </div>
        <div>
          <label className="text-[18px] leading-[27px]  text-gray-700 text-md font-medium mb-2">
            User Role
          </label>
          <CustomSelect
            placeholder="Select User Role"
            options={["Admin", "Editor", "Viewer"]}
            value={formState.userRole}
            onChange={(e) => updateFormField("userRole", e.target.value)}
          />
        </div>
        <div>
          <label className="text-[18px] leading-[27px]  text-gray-700 text-md font-medium mb-2">
            Probation Period
          </label>
          <CustomSelect
            placeholder="Select Probation Period"
            options={["3 Months", "6 Months", "12 Months"]}
            value={formState.probationPeriod}
            onChange={(e) => updateFormField("probationPeriod", e.target.value)}
          />
        </div>
        <div>
          <label className="text-[18px] leading-[27px]  text-gray-700 text-md font-medium mb-2">
            Working Days
          </label>
          <CustomSelect
            placeholder="Select Working Days"
            options={["5 Days", "6 Days", "7 Days"]}
            value={formState.workingDays}
            onChange={(e) => updateFormField("workingDays", e.target.value)}
          />
        </div>
        <div>
          <label className="text-[18px] leading-[27px]  text-gray-700 text-md font-medium mb-2">
            Employment Type
          </label>
          <CustomSelect
            placeholder="Select Employment Type"
            options={["Full-time", "Part-time", "Contract"]}
            value={formState.employmentType}
            onChange={(e) => updateFormField("employmentType", e.target.value)}
          />
        </div>
        <div>
          <label className="text-[18px] leading-[27px]  text-gray-700 text-md font-medium mb-2">
            Log In
          </label>
          <CustomSelect
            placeholder="Select Log In Type"
            options={["Enable", "Disable"]}
            value={formState.logIn}
            onChange={(e) => updateFormField("logIn", e.target.value)}
          />
        </div>
        <div>
          <label className="text-[18px] leading-[27px]  text-gray-700 text-md font-medium mb-2">
            Eligible For
          </label>
          <div className="mt-3 flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formState.eligibleFor.partTime}
                onChange={() => updateEligibleFor("partTime")}
                className="w-4 h-4 border-[#1A72A7] shadow-[0_0_4px_#1A72A7] rounded-md accent-[#1A72A7]"
              />
              <span className="text-[16px]">Part Time</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formState.eligibleFor.overTime}
                onChange={() => updateEligibleFor("overTime")}
                className="w-4 h-4 border-[#1A72A7] shadow-[0_0_4px_#1A72A7] rounded-md accent-[#1A72A7]"
              />
              <span className="text-[16px]">Over Time</span>
            </label>
          </div>
        </div>
      </div>

      <div>
        <div className="text-md font-medium text-gray-900 mb-3">
          Equipment Issuance
        </div>
        {formState.equipmentIssuance.map((equipment, index) => (
          <div key={index} className="flex items-center gap-3 box-border m-2">
            <div>
              <select
                value={equipment.type}
                onChange={(e) =>
                  updateEquipmentField(index, "type", e.target.value)
                }
                className="w-40 h-[46px] bg-white shadow-[2px_2px_4px_rgba(0,0,0,0.15),-1px_-1px_4px_rgba(0,0,0,0.15)] rounded-lg px-3 text-gray-700  text-[12px] font-normal text-[rgba(51,51,51,0.8)] tracking-wider focus:outline-none pl-3"
              >
                <option value="">Select Type</option>
                <option value="laptop">Laptop</option>
                <option value="phone">Phone</option>
                <option value="tablet">Tablet</option>
                <option value="desktop">Desktop</option>
                <option value="monitor">Monitor</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                placeholder="Brand Name"
                value={equipment.brand}
                onChange={(e) =>
                  updateEquipmentField(index, "brand", e.target.value)
                }
                className="w-40 h-[46px] bg-white shadow-[4px_4px_4px_rgba(0,0,0,0.25),-1px_-1px_4px_rgba(0,0,0,0.25)] rounded-lg text-gray-700 text-[18px] font-light tracking-wider pl-3"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Model"
                value={equipment.model}
                onChange={(e) =>
                  updateEquipmentField(index, "model", e.target.value)
                }
                className="w-40 h-[46px] bg-white shadow-[4px_4px_4px_rgba(0,0,0,0.25),-1px_-1px_4px_rgba(0,0,0,0.25)] rounded-lg text-gray-700 text-[18px] font-light tracking-wider pl-3"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Serial Number"
                value={equipment.serialNumber}
                onChange={(e) =>
                  updateEquipmentField(index, "serialNumber", e.target.value)
                }
                className="w-40 h-[46px] bg-white shadow-[4px_4px_4px_rgba(0,0,0,0.25),-1px_-1px_4px_rgba(0,0,0,0.25)] rounded-lg text-gray-700 text-[18px] font-light tracking-wider pl-3"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Asset Tag"
                value={equipment.assetTag}
                onChange={(e) =>
                  updateEquipmentField(index, "assetTag", e.target.value)
                }
                className="w-40 h-[46px] bg-white shadow-[4px_4px_4px_rgba(0,0,0,0.25),-1px_-1px_4px_rgba(0,0,0,0.25)] rounded-lg text-gray-700 text-[18px] font-light tracking-wider pl-3"
              />
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="date"
                value={equipment.issueDate}
                onChange={(e) =>
                  updateEquipmentField(index, "issueDate", e.target.value)
                }
                className="w-fit h-[46px] bg-white shadow-[4px_4px_4px_rgba(0,0,0,0.25),-1px_-1px_4px_rgba(0,0,0,0.25)] rounded-lg text-gray-700 text-[18px] font-light tracking-wider pl-3"
              />
              {index === formState.equipmentIssuance.length - 1 && (
                <div className="flex space-x-1">
                  <button
                    type="button"
                    className="p-1 rounded-full bg-green-500 text-white hover:bg-green-600 transition"
                    onClick={addEquipmentSection}
                  >
                    <FaPlus size={16} />
                  </button>
                  {formState.equipmentIssuance.length > 1 && (
                    <button
                      type="button"
                      className="p-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
                      onClick={removeLastEquipmentSection}
                    >
                      <FaMinus size={16} />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeForm;
