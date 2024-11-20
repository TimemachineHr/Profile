import React, { useState } from "react";
import { FaPlus, FaTimes, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import GeneralTab from "../LeaveCreation/GeneralTab";
import EntitlementTab from "../LeaveCreation/Entitlement";
import ApplicabilityTab from "../LeaveCreation/Applicability";

const LeaveHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tabs = ["General", "Entitlement", "Applicability"];
  const [activeTab, setActiveTab] = useState("General");

  const [leaveType, setLeaveType] = useState("Leave Type");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
    setActiveTab("General");
  };

  return (
    <>
      <header className="flex justify-between items-center bg-white text-black py-2 px-6 shadow-md">
        <div className="flex space-x-4">
          <Link
            to="/leave"
            className="px-4 py-2 font-semibold rounded-xl hover:bg-gray-100 hover:text-blue-900 transition duration-200"
          >
            Home
          </Link>
          <Link
            to="/leavelist"
            className="px-4 py-2 font-semibold rounded-xl hover:bg-gray-100 hover:text-blue-900 transition duration-200"
          >
            List
          </Link>
          <Link
            to="/leavereport"
            className="px-4 py-2 font-semibold rounded-xl hover:bg-gray-100 hover:text-blue-900 transition duration-200"
          >
            Report
          </Link>
          <Link
            to="/leavesettings"
            className="px-4 py-2 font-semibold rounded-xl hover:bg-gray-100 hover:text-blue-900 transition duration-200"
          >
            Settings
          </Link>
        </div>
        <div className="text-right">
          <h2 className="text-lg font-semibold mb-1">Leave/TimeOff</h2>
          <button
            onClick={handleModalToggle}
            className="flex items-center bg-blue-800 text-white py-2 px-4 rounded-xl hover:bg-blue-700 active:scale-95 transition-transform duration-200"
          >
            <FaPlus className="mr-2" /> New Leave Type
          </button>
        </div>
      </header>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-2/3 p-4 relative">
            <div className="px-6 py-4">
              <div className="px-6 py-1 relative">
                <div className="flex justify-center items-center">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    Leave Type Creation
                  </h2>
                  <button
                    onClick={handleModalToggle}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>
              </div>
            </div>

            <div className="border-b-2 mb-6">
              <nav className="flex justify-between items-center px-8 py-4 rounded-lg">
                <div className="flex space-x-4">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-2 px-6 font-medium rounded-lg text-sm transition duration-300 ${
                        activeTab === tab
                          ? "text-white bg-blue-900 shadow-md"
                          : "text-gray-500 hover:text-blue-600 hover:bg-gray-100"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <h1 className="text-xl font-semibold text-gray-800">
                  {leaveType}
                </h1>
              </nav>
            </div>

            <div>
              {activeTab === "General" && (
                <GeneralTab
                  setLeaveType={setLeaveType}
                  handleTabChange={handleTabChange}
                />
              )}
              {activeTab === "Entitlement" && (
                <EntitlementTab handleTabChange={handleTabChange} />
              )}
              {activeTab === "Applicability" && (
                <ApplicabilityTab handleTabChange={handleTabChange} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LeaveHeader;