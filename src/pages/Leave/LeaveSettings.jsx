import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaPlus, FaTimes } from "react-icons/fa";
import { BiCheckDouble } from "react-icons/bi";
import LeaveHeader from "../../components/Main/LeaveHeader";
import axios from "axios";

// Paid through----- at employment termination or End of Leave Calendar
// how : Payroll / Adhoc
// When : Termination/YEarend
// what : actual days/all(At leave type creation)

const LeaveSettings = () => {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    approvalStatus: "preapprove",
    paymentMethod: "payroll",
    approvers: [{ businessUnit: "", designation: "", approverName: "" }],
    timeOffChecked: false,
    timeOffHoursPerDay: undefined,
    blockLeaveChecked: false,
    blockLeaveSpecificDate: "",
    blockLeaveMonthlyRange: { startDate: "", endDate: "" },
    offInLieuChecked: false,
    offInLieuTimeBound: "",
  });
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupInputValue, setPopupInputValue] = useState("");
  const [isAssigned, setIsAssigned] = useState(false);

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

  const openConfirmPopup = () => {
    setIsPopupVisible(true);
  };

  const confirmAssignApprover = () => {
    if (popupInputValue === "Assign") {
      setIsAssigned(true);
      setIsPopupVisible(false);
    }
  };

  const addApprover = () => {
    setFormData((prev) => ({
      ...prev,
      approvers: [
        ...prev.approvers,
        { businessUnit: "", designation: "", approverName: "" },
      ],
    }));
    setIsPopupVisible(false);
    setIsAssigned(false);
  };

  const removeApprover = (index) => {
    setFormData((prev) => ({
      ...prev,
      approvers: prev.approvers.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
            <div className="space-y-6">
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
                    <option value="manual">Manual</option>
                  </select>{" "}
                  at{" "}
                  <select
                    // name="paymentMethod"
                    // value={formData.paymentMethod}
                    onChange={handleInputChange}
                    className="p-2 border rounded-md w-58"
                  >
                    <option value="employmenttermination">
                      Employment Termination
                    </option>
                    <option value="endofleavecalendar">
                      End of Leave Calendar
                    </option>
                  </select>{" "}
                </label>
              </div>

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
                      className="p-2 border rounded-md w-36"
                      value={approver.designation}
                      onChange={(e) =>
                        handleApproverChange(
                          index,
                          "designation",
                          e.target.value
                        )
                      }
                    >
                      <option value="">Designation</option>
                      <option value="design1">Design 1</option>
                      <option value="design2">Design 2</option>
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
                    {index === formData.approvers.length - 1 && (
                      <button
                        type="button"
                        onClick={addApprover}
                        className="text-blue-600 bg-gray-300 rounded-full p-1  hover:text-blue-800"
                      >
                        <FaPlus size={15} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={openConfirmPopup}
                  className="bg-[#1A72A7] text-white px-4 py-2 rounded-md mt-2 flex items-center gap-2"
                >
                  {isAssigned ? (
                    <>
                      <BiCheckDouble size={28} className="inline" />
                      <span>Assigned</span>
                    </>
                  ) : (
                    "Assign Approver"
                  )}
                </button>
              </div>
            </div>

            {/* Popup Modal */}
            {isPopupVisible && (
              <div
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
              >
                <div className="bg-white rounded-lg px-6 pt-4 pb-6 shadow-lg w-96">
                  <div className="flex justify-between items-center">
                    <h2
                      id="modal-title"
                      className="text-lg font-bold mb-4 text-gray-700"
                    >
                      Assign Approver
                    </h2>
                    <button
                      className="font-normal text-sm text-gray-700 hover:text-red-500 mb-3"
                      onClick={() => setIsPopupVisible(false)}
                    >
                      <FaTimes size={24} />
                    </button>
                  </div>
                  <p className="mb-6 text-gray-700 text-sm">
                    Please type <span className="font-semibold">"Assign"</span>{" "}
                    to add a new approver.
                  </p>
                  <input
                    type="text"
                    value={popupInputValue}
                    onChange={(e) => setPopupInputValue(e.target.value)}
                    placeholder="Assign"
                    className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onCopy={(e) => {
                      e.preventDefault();
                    }}
                    onPaste={(e) => {
                      e.preventDefault();
                    }}
                  />
                  <div className="flex justify-end gap-4">
                    <button
                      className={`${
                        popupInputValue === "Assign"
                          ? "bg-blue-500"
                          : "bg-gray-400 cursor-not-allowed"
                      } text-white font-normal text-lg px-4 py-1 rounded-lg shadow-lg`}
                      onClick={confirmAssignApprover}
                      disabled={popupInputValue !== "Assign"}
                    >
                      Assign
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-6">
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
