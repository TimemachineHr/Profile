import React from "react";
import { FaBell } from "react-icons/fa";

const Notifications = () => {
  return (
    <div className="rounded-2xl bg-white shadow-lg h-48 p-8 flex flex-col">
      <h3 className="font-semibold text-lg text-gray-800 mb-2 flex items-center">
        <FaBell className="mr-2 text-yellow-500" /> Happenings
      </h3>
      <ul className="text-sm text-gray-600 space-y-1">
        <li>• John Doe: New task assigned</li>
        <li>• Jane Doe: Reminder for meeting</li>
        <li>• Admin: Policy update</li>
      </ul>
    </div>
  );
};

export default Notifications;
