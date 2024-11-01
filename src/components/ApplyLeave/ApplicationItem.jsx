import React from "react";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaTimesCircle,
} from "react-icons/fa";

const iconComponents = {
  FaCheckCircle: <FaCheckCircle className="text-green-500" />,
  FaExclamationCircle: <FaExclamationCircle className="text-yellow-500" />,
  FaTimesCircle: <FaTimesCircle className="text-red-500" />,
};

const ApplicationItem = ({ icon, title, details, date }) => (
  <li className="bg-gray-100 p-3 rounded-lg shadow-md border border-gray-200">
    <div className="flex items-center justify-between text-gray-800 font-semibold">
      <div className="flex items-center space-x-2">
        {iconComponents[icon]}
        <span>{title}</span>
        <span className="text-gray-600">| {details}</span>
      </div>
      <span className="text-sm text-gray-500">{date}</span>
    </div>
  </li>
);

export default ApplicationItem;
