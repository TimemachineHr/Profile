import React, { useState } from "react";
import CommunicationHeader from "../../components/Main/CommunicationHeader";
import { BiCheckDouble } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import axios from "axios";

const CommunicationSettings = () => {
  const [formData, setFormData] = useState({
    defaultMethod: "email",
    allowReplies: false,
    enableReadReceipts: false,
    allowLetterCustomization: false,
    letterApprovalRequired: false,
    allowFormCustomization: false,
    approvalFormRequired: false,
    announcementType: "generalUpdate",
    allowComments: false,
    enableNotifications: false,
    approvers: [{ businessUnit: "", designation: "", approverName: "" }],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleApproverChange = (index, field, value) => {
    const updatedApprovers = [...formData.approvers];
    updatedApprovers[index][field] = value;
    setFormData({ ...formData, approvers: updatedApprovers });
  };

  const addApprover = () => {
    setFormData({
      ...formData,
      approvers: [
        ...formData.approvers,
        { businessUnit: "", designation: "", approverName: "" },
      ],
    });
  };

  const removeApprover = (index) => {
    const updatedApprovers = formData.approvers.filter((_, i) => i !== index);
    setFormData({ ...formData, approvers: updatedApprovers });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/communication-settings",
        formData
      );
      console.log("Saved Settings:", response.data);
      setSuccessMessage("Settings saved successfully!");
    } catch (err) {
      console.log(err);

      setError("Failed to save settings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <CommunicationHeader />
      <form onSubmit={handleSubmit}>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              {/* General Settings */}
              <div>
                <label className="block text-xl font-semibold text-gray-700 mb-2">
                  General
                </label>
                <label
                  htmlFor="defaultMethod"
                  className="block text-sm mb-2 font-medium text-gray-700"
                >
                  Default Communication Method
                </label>
                <select
                  id="defaultMethod"
                  name="defaultMethod"
                  value={formData.defaultMethod}
                  onChange={handleInputChange}
                  className="p-2 border rounded-md w-1/3"
                >
                  <option value="all">All</option>
                  <option value="email">Email</option>
                  <option value="notification">Notification</option>
                </select>

                <div className="mt-3 flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="allowReplies"
                      checked={formData.allowReplies}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <span>Allow Employee to Reply</span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="enableReadReceipts"
                      checked={formData.enableReadReceipts}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <span>Enable Read Receipts</span>
                  </label>
                </div>
              </div>

              {/* Letter Settings */}
              <div>
                <div>
                  <label className="block text-xl font-semibold text-gray-700">
                    Communication
                  </label>
                </div>
                <label className="block text-xl mt-2 font-medium text-gray-700">
                  Letter
                </label>
                {/* <select
                  name="letterTemplate"
                  value={formData.letterTemplate}
                  onChange={handleInputChange}
                  className="p-2 border rounded-md w-1/3"
                >
                  <option value="offerLetter">Offer Letter</option>
                  <option value="warningLetter">Warning Letter</option>
                  <option value="promotionLetter">Promotion Letter</option>
                </select> */}

                <label className="flex items-center space-x-2 mt-3">
                  <input
                    type="checkbox"
                    name="allowLetterCustomization"
                    checked={formData.allowLetterCustomization}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span>Allow Customization</span>
                </label>

                <label className="flex items-center space-x-2 mt-2">
                  <input
                    type="checkbox"
                    name="letterApprovalRequired"
                    checked={formData.letterApprovalRequired}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span>Approval Required for Sending Letter</span>
                </label>
              </div>

              {/* Form Settings */}
              <div>
                <label className="block text-xl font-medium text-gray-700 mb-2">
                  Form
                </label>
                {/* <select
                  name="formTemplate"
                  value={formData.formTemplate}
                  onChange={handleInputChange}
                  className="p-2 border rounded-md w-1/3"
                >
                  <option value="Support Form">Support Form</option>
                  <option value="surveyForm">Survey Form</option>
                  <option value="newForm">New Form</option>
                </select> */}

                <label className="flex items-center space-x-2 mt-3">
                  <input
                    type="checkbox"
                    name="allowFormCustomization"
                    checked={formData.allowFormCustomization}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span>Allow Customization</span>
                </label>

                <label className="flex items-center space-x-2 mt-2">
                  <input
                    type="checkbox"
                    name="approvalFormRequired"
                    checked={formData.approvalFormRequired}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span>Approval Required for Sending Form</span>
                </label>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6 ">
              {/* Announcement Settings */}
              <div>
                <label className="block text-xl font-semibold text-gray-700 mb-2">
                  Announcement Settings
                </label>
                <select
                  name="announcementType"
                  value={formData.announcementType}
                  onChange={handleInputChange}
                  className="p-2 border rounded-md w-1/3"
                >
                  <option value="generalUpdate">General Update</option>
                  <option value="policyChange">Policy Change</option>
                  <option value="emergencyAlert">Emergency Alert</option>
                </select>

                {/* <label className="block text-sm font-medium text-gray-700 mt-3">
                  Schedule Announcement
                </label>
                <input
                  type="date"
                  name="scheduleAnnouncement"
                  value={formData.scheduleAnnouncement}
                  onChange={handleInputChange}
                  className="p-2 border rounded-md w-1/3"
                /> */}

                <label className="flex items-center space-x-2 mt-3">
                  <input
                    type="checkbox"
                    name="allowComments"
                    checked={formData.allowComments}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span>Allow Comments on Announcement</span>
                </label>

                <div className="mt-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="enableNotifications"
                      checked={formData.enableNotifications}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <span>Enable Notification</span>
                  </label>
                </div>
              </div>

              {/* Approver Selection */}
              <div>
                <label className="block text-xl font-semibold text-gray-700 mb-2">
                  Approver
                </label>
                {formData.approvers.map((approver, index) => (
                  <div key={index} className="flex items-center space-x-3 mb-2">
                    <select
                      className="p-2 border rounded-md w-1/3"
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
                      <option value="bu1">BU-1</option>
                      <option value="bu2">BU-2</option>
                    </select>

                    <select
                      className="p-2 border rounded-md w-1/3"
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
                      <option value="manager">Manager</option>
                      <option value="hr">HR</option>
                      <option value="supervisor">Supervisor</option>
                    </select>

                    <select
                      className="p-2 border rounded-md w-1/3"
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
                    </select>

                    <div className="flex items-center gap-2">
                      {formData.approvers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeApprover(index)}
                          className="text-red-600 hover:text-red-800"
                          title="Remove Approver"
                        >
                          <AiOutlineDelete size={20} />
                        </button>
                      )}
                      {index === formData.approvers.length - 1 && (
                        <button
                          type="button"
                          onClick={addApprover}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FaPlus size={15} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-4 text-right">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-md"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommunicationSettings;
