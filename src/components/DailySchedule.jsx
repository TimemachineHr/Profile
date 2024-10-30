import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

const DailySchedule = ({ schedule }) => {
  return (
    <div className="rounded-2xl bg-white shadow-lg h-48 p-8 flex flex-col">
      <h3 className="font-semibold text-lg text-gray-800 mb-2 flex items-center">
        <FaCalendarAlt className="mr-2 text-purple-500" /> Plan My Day
      </h3>
      <ul className="text-sm text-gray-600 space-y-1">
        <li>• 10:00 AM - Code Review</li>
        <li>• 1:00 PM - Team Meeting</li>
        <li>• 3:00 PM - Project Planning</li>
      </ul>
    </div>
  );
};

export default DailySchedule;
