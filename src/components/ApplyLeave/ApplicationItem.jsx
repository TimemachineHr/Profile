import React from "react";

const statusColors = {
  Approved: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Rejected: "bg-red-100 text-red-700",
};

const ApplicationItem = ({ title, code, daysOrAmount, status }) => (
  <li className="bg-gray-50 p-3 rounded-lg shadow border border-gray-200 mb-1 flex justify-between items-start w-full max-w-xs">
    {" "}
    <div className="flex flex-col">
      <span className="text-md font-medium text-gray-800">{title}</span>
      <span className="text-sm text-orange-400">({code})</span>
    </div>
    <div className="flex flex-col items-center">
      {" "}
      <span className="text-sm font-semibold text-gray-700">
        {daysOrAmount}
      </span>
      <span
        className={`text-xs px-2 py-1 rounded-lg font-semibold ${statusColors[status]}`}
      >
        {status}
      </span>
    </div>
  </li>
);

export default ApplicationItem;
