import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineEditNote } from "react-icons/md";
import { TbArrowBackUp } from "react-icons/tb";

const EmployeeHeader = ({ userName }) => {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white shadow-md">
      <div className="flex items-center gap-4">
        <Link to="/list">
          <button
            className="flex items-center justify-center w-10 h-10 bg-gray-800 rounded-xl"
            aria-label="Go back"
          >
            <TbArrowBackUp size={24} className="text-white font-semibold" />
          </button>
        </Link>
        <h1 className="text-xl font-medium text-gray-800">
          Create-New Employee
        </h1>
        <button
          className="flex items-center justify-center w-10 h-10 bg-gray-800 rounded-xl"
          aria-label="Go back"
        >
          <MdOutlineEditNote size={24} className="text-white font-semibold" />
        </button>
      </div>

      <div className="text-xl font-medium text-gray-700">
        {userName || "Employee Name"}
      </div>
    </header>
  );
};

export default EmployeeHeader;
