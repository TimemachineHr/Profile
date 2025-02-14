import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import LeaveTypeModal from "../LeaveCreation/LeaveTypeModal";

const LeaveHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leaveType, setLeaveType] = useState("Leave Type");

  const location = useLocation(); // Hook to get the current URL path

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const links = [
    { to: "/leave", label: "Home" },
    { to: "/leavelist", label: "List" },
    { to: "/leavereport", label: "Report" },
    { to: "/leavesettings", label: "Settings" },
  ];

  return (
    <>
      <header className="flex justify-between items-center bg-white text-black py-2 px-6 shadow-md">
        <div className="flex space-x-4">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 font-semibold rounded-xl transition duration-200 ${
                location.pathname === link.to
                  ? "bg-gray-100 text-blue-900 shadow-sm" // Active styles
                  : "hover:bg-gray-100 hover:text-blue-900"
              }`}
            >
              {link.label}
            </Link>
          ))}
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

      {/* Include the modal */}
      <LeaveTypeModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setLeaveType={setLeaveType}
        leaveType={leaveType}
      />
    </>
  );
};

export default LeaveHeader;
