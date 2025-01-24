import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import GeneralTab from "../LeaveCreation/GeneralTab";
import EntitlementTab from "../LeaveCreation/Entitlement";
import ApplicabilityTab from "../LeaveCreation/Applicability";

const LeaveTypeModal = ({
  isModalOpen,
  setIsModalOpen,
  selectedLeave,
  setLeaveData,
}) => {
  const tabs = ["General", "Entitlement", "Applicability"];
  const [activeTab, setActiveTab] = useState("General");
  const [leaveData, setLeaveDataLocal] = useState({
    code: "",
    type: "",
    noOfDays: 0,
    monthlyLimit: 0,
    colorCode: "#FFFFFF",
    options: {
      documentProof: false,
      payable: false,
      showAvailability: false,
      enCashable: false,
      carryForward: false,
      leaveIncrement: false,
      enCashableOptions: { allAvailableBalance: false, noOfDays: null },
      carryForwardOptions: { allAvailableBalance: false, noOfDays: null },
      leaveIncrementOptions: { perYear: null, cappedAt: null },
    },
    entitlement: {
      effectiveAfter: null,
      allowedDuringProbation: false,
      permittedForHourlyTimeOff: false,
      allowedDuringNoticePeriod: false,
      exclude: false,
    },
    applicability: {
      gender: "",
      maritalStatus: "",
      businessUnit: "",
      department: "",
      designation: "",
      name: "",
    },
  });

  useEffect(() => {
    if (selectedLeave) {
      setLeaveDataLocal(selectedLeave);
    }
  }, [selectedLeave]);

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleSave = async () => {
    try {
      const url = selectedLeave
        ? `https://leave-module.vercel.app/api/leave-types/${selectedLeave._id}`
        : "https://leave-module.vercel.app/api/leave-types/";

      const method = selectedLeave ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leaveData),
      });

      if (response.ok) {
        alert(
          selectedLeave
            ? "Leave type updated successfully!"
            : "Leave type created successfully!"
        );
        setIsModalOpen(false);

        if (selectedLeave) {
          setLeaveData((prevData) =>
            prevData.map((leave) =>
              leave._id === selectedLeave._id ? leaveData : leave
            )
          );
        }
      } else {
        alert(
          selectedLeave
            ? "Failed to update leave type."
            : "Failed to create leave type."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-2/3 p-4 relative">
            {/* Modal Header */}
            <div className="px-6 py-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                {selectedLeave ? "Edit Leave Type" : "Create Leave Type"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              >
                <FaTimes size={24} />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="border-b-2 mb-6">
              <nav className="flex items-center justify-between px-8 py-4">
                <div className="flex space-x-4">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => handleTabChange(tab)}
                      className={`py-2 px-6 font-medium rounded-lg text-sm transition ${
                        activeTab === tab
                          ? "text-white bg-blue-900"
                          : "text-gray-500 hover:text-blue-600"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-800">
                    {leaveData.type || "Leave Type"}
                  </h1>
                </div>
              </nav>
            </div>

            {/* Tab Content */}
            <div>
              {activeTab === "General" && (
                <GeneralTab
                  handleTabChange={handleTabChange}
                  leaveData={leaveData}
                  setLeaveData={setLeaveDataLocal}
                />
              )}
              {activeTab === "Entitlement" && (
                <EntitlementTab
                  handleTabChange={handleTabChange}
                  leaveData={leaveData}
                  setLeaveData={setLeaveDataLocal}
                />
              )}

              {activeTab === "Applicability" && (
                <ApplicabilityTab
                  handleTabChange={handleTabChange}
                  leaveData={leaveData}
                  setLeaveData={setLeaveDataLocal}
                />
              )}
            </div>

            {/* Save Button */}
            {activeTab === "Applicability" && (
              <div className="flex justify-between mt-3 px-8">
                <button
                  onClick={() => handleTabChange("Entitlement")}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg"
                >
                  Back
                </button>
                <button
                  onClick={handleSave}
                  className="bg-blue-900 text-white px-6 py-2 rounded-lg"
                >
                  {selectedLeave ? "Update" : "Save"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveTypeModal;
