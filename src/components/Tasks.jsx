import React from "react";
import { FaTasks } from "react-icons/fa";

const Tasks = () => {
  return (
    <div className="rounded-2xl bg-white shadow-lg h-48 p-8 flex flex-col">
      <h3 className="font-semibold text-lg text-gray-800 mb-2 flex items-center">
        <FaTasks className="mr-2 text-blue-500" /> Tasks
      </h3>
      <ul className="text-sm text-gray-600 space-y-1">
        <li>• Employee Management System - 4 hrs ago</li>
        <li>• Payroll System - 2 days ago</li>
        <li>• Time & Attendance System - 5 days ago</li>
      </ul>
    </div>
  );
};

export default Tasks;
