import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import LeaveHeader from "../../components/Main/LeaveHeader";
import axios from "axios";

//  Paid through----- at employment termination or End of Leave Calendar
// how : Payroll / Adhoc
// When : Termination/YEarend
// what : actual days/all(At leave type creation)

const LeaveSettings = () => {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    approvalStatus: "preapprove",
    paymentMethod: "payroll",
    approvers: [{ businessUnit: "", approverName: "" }],
    timeOffChecked: false,
    timeOffHoursPerDay: undefined,
    blockLeaveChecked: false,
    blockLeaveSpecificDate: "",
    blockLeaveMonthlyRange: { startDate: "", endDate: "" },
    offInLieuChecked: false,
    offInLieuTimeBound: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name) => {
    setFormData((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleApproverChange = (index, field, value) => {
    const updatedApprovers = [...formData.approvers];
    updatedApprovers[index][field] = value;
    setFormData((prev) => ({ ...prev, approvers: updatedApprovers }));
  };

  const addApprover = () => {
    setFormData((prev) => ({
      ...prev,
      approvers: [...prev.approvers, { businessUnit: "", approverName: "" }],
    }));
  };

  const removeApprover = (index) => {
    setFormData((prev) => ({
      ...prev,
      approvers: prev.approvers.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format data for backend submission
    const formattedData = {
      ...formData,
      startDate: formData.startDate
        ? new Date(formData.startDate).toISOString()
        : null,
      endDate: formData.endDate
        ? new Date(formData.endDate).toISOString()
        : null,
      blockLeaveSpecificDate: formData.blockLeaveSpecificDate
        ? new Date(formData.blockLeaveSpecificDate).toISOString()
        : null,
      blockLeaveMonthlyRange: {
        startDate: formData.blockLeaveMonthlyRange.startDate
          ? new Date(formData.blockLeaveMonthlyRange.startDate).toISOString()
          : null,
        endDate: formData.blockLeaveMonthlyRange.endDate
          ? new Date(formData.blockLeaveMonthlyRange.endDate).toISOString()
          : null,
      },
      offInLieuTimeBound: formData.offInLieuTimeBound
        ? new Date(formData.offInLieuTimeBound).toISOString()
        : null,
    };

    try {
      const response = await axios.post(
        "https://leave-module.vercel.app/api/leave-settings",
        formattedData
      );
      alert("Leave settings saved successfully!");
      console.log("Saved data:", response.data);
    } catch (error) {
      console.error("Error saving leave settings:", error);
      alert("Error saving leave settings. Please check your inputs.");
    }
  };

  return (
    <>
      <LeaveHeader />
      <form onSubmit={handleSubmit}>
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Section */}
            <div className="space-y-6">
              {/* Leave Calendar */}
              <div>
                <label className="block text-xl font-semibold text-gray-700 mb-2">
                  Leave Calendar
                </label>
                <label className="block text-sm font-medium text-gray-700 pt-3 mb-1">
                  Set Start & End Date
                </label>
                <div className="flex gap-4">
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="p-2 border rounded-md w-34"
                  />
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="p-2 border rounded-md w-34"
                  />
                </div>
                <label className="block text-sm font-medium text-gray-700 mt-3 mb-1">
                  Reporting manager can{" "}
                  <select
                    name="approvalStatus"
                    value={formData.approvalStatus}
                    onChange={handleInputChange}
                    className="p-2 border rounded-md w-34"
                  >
                    <option value="preapprove">Pre-Approve</option>
                    <option value="unabletoview">Unable to View</option>
                    <option value="viewonly">View Only</option>
                  </select>{" "}
                  the leave
                </label>
              </div>

              {/* En-cashable Payment */}
              <div>
                <label className="block text-xl font-semibold text-gray-700 mb-2">
                  En-cashable Payment
                </label>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Paid through{" "}
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    className="p-2 border rounded-md w-36"
                  >
                    <option value="payroll">Payroll</option>
                    <option value="adhoc">Ad-Hoc</option>
                  </select>{" "}
                  at employment termination or End of Leave Calendar
                </label>
              </div>

              {/* Leave Approver */}
              <div>
                <label className="block text-xl font-medium text-gray-700 mb-2">
                  Leave Approver
                </label>
                {formData.approvers.map((approver, index) => (
                  <div key={index} className="flex items-center space-x-3 mb-2">
                    <select
                      className="p-2 border rounded-md w-36"
                      value={approver.businessUnit}
                      onChange={(e) =>
                        handleApproverChange(
                          index,
                          "businessUnit",
                          e.target.value
                        )
                      }
                    >
                      <option value="">Business Unit</option>
                      <option value="unit1">Unit 1</option>
                      <option value="unit2">Unit 2</option>
                    </select>
                    <select
                      className="p-2 border rounded-md w-38"
                      value={approver.approverName}
                      onChange={(e) =>
                        handleApproverChange(
                          index,
                          "approverName",
                          e.target.value
                        )
                      }
                    >
                      <option value="">Approver Name</option>
                      <option value="JohnDoe">John Doe</option>
                      <option value="JaneSmith">Jane Smith</option>
                      <option value="Franky">Franky</option>
                    </select>
                    {formData.approvers.length > 1 && (
                      <button
                        title="Remove Approver"
                        type="button"
                        onClick={() => removeApprover(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <AiOutlineDelete size={20} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addApprover}
                  className="bg-[#1A72A7] text-white px-4 py-2 rounded-md mt-2"
                >
                  Assign Approver
                </button>
              </div>
            </div>

            {/* Right Section */}
            <div className="space-y-6">
              {/* Time Off */}
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 border-[#1A72A7] shadow-[0_0_4px_#1A72A7] rounded-md accent-[#1A72A7]"
                    checked={formData.timeOffChecked}
                    onChange={() => handleCheckboxChange("timeOffChecked")}
                  />
                  <span className="text-lg font-medium text-[#1A72A7]">
                    Time Off
                  </span>
                </label>
                {formData.timeOffChecked && (
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">
                      One day leave is{" "}
                      <input
                        type="number"
                        name="timeOffHoursPerDay"
                        value={formData.timeOffHoursPerDay || ""}
                        onChange={handleInputChange}
                        className="p-2 border rounded-md w-28"
                        placeholder="Enter hours"
                      />{" "}
                      hrs
                    </label>
                  </div>
                )}
              </div>

              {/* Block Leave */}
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 border-[#1A72A7] shadow-[0_0_4px_#1A72A7] rounded-md accent-[#1A72A7]"
                    checked={formData.blockLeaveChecked}
                    onChange={() => handleCheckboxChange("blockLeaveChecked")}
                  />
                  <span className="text-lg font-medium text-[#1A72A7]">
                    Block Leave
                  </span>
                </label>
                {formData.blockLeaveChecked && (
                  <div className="mt-2 space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      On specific date{" "}
                      <input
                        type="date"
                        name="blockLeaveSpecificDate"
                        value={formData.blockLeaveSpecificDate}
                        onChange={handleInputChange}
                        className="p-2 border rounded-md w-36"
                      />
                    </label>
                    <div className="flex gap-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Leave from{" "}
                        <input
                          type="date"
                          name="blockLeaveMonthlyRangeStart"
                          value={formData.blockLeaveMonthlyRange.startDate}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              blockLeaveMonthlyRange: {
                                ...prev.blockLeaveMonthlyRange,
                                startDate: e.target.value,
                              },
                            }))
                          }
                          className="p-2 border rounded-md w-36"
                        />{" "}
                        to{" "}
                        <input
                          type="date"
                          name="blockLeaveMonthlyRangeEnd"
                          value={formData.blockLeaveMonthlyRange.endDate}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              blockLeaveMonthlyRange: {
                                ...prev.blockLeaveMonthlyRange,
                                endDate: e.target.value,
                              },
                            }))
                          }
                          className="p-2 border rounded-md w-36"
                        />{" "}
                        every month
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Off-In-Lieu */}
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 border-[#1A72A7] shadow-[0_0_4px_#1A72A7] rounded-md accent-[#1A72A7]"
                    checked={formData.offInLieuChecked}
                    onChange={() => handleCheckboxChange("offInLieuChecked")}
                  />
                  <span className="text-lg font-medium text-[#1A72A7]">
                    Off-In-Lieu
                  </span>
                </label>
                {formData.offInLieuChecked && (
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Time Bound{" "}
                      <input
                        type="date"
                        name="offInLieuTimeBound"
                        value={formData.offInLieuTimeBound}
                        onChange={handleInputChange}
                        className="p-2 border rounded-md w-36"
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 text-right">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default LeaveSettings;
