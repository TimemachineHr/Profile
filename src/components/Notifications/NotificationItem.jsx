import React from "react";

const NotificationItem = ({ notification }) => {
  return (
    <li className="flex items-center justify-between p-2 bg-gray-50 rounded-lg shadow-sm">
      <div className="flex items-center space-x-3">
        <div className="text-xl text-[#007b5e]">{notification.icon}</div>
        <span className="text-gray-800 text-sm">{notification.content}</span>
      </div>
      <span className="text-xs text-gray-500">{notification.time}</span>
    </li>
  );
};

export default NotificationItem;
