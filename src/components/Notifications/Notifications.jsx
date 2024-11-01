import React from "react";
import { FaBell, FaTasks, FaFileAlt, FaReceipt } from "react-icons/fa";
import { notificationData } from "./NotificaitonData";

const iconMap = {
  FaBell: <FaBell />,
  FaTasks: <FaTasks />,
  FaFileAlt: <FaFileAlt />,
  FaReceipt: <FaReceipt />,
};

const Notifications = () => {
  const groupedNotifications = notificationData.reduce((acc, notification) => {
    (acc[notification.date] = acc[notification.date] || []).push(notification);
    return acc;
  }, {});

  return (
    <div className="rounded-2xl bg-white shadow-lg h-64 p-4 flex flex-col">
      <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
        <FaBell className="mr-2 text-yellow-500" /> Happenings
      </h3>

      <div className="overflow-y-auto flex-grow">
        {Object.keys(groupedNotifications).map((date) => (
          <div key={date} className="mb-4">
            <h4 className="text-xs font-semibold text-gray-500 mb-2">{date}</h4>
            <ul className="space-y-2">
              {groupedNotifications[date].map((notification) => (
                <li
                  key={notification.id}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded-lg shadow-sm"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-xl text-[#007b5e]">
                      {iconMap[notification.icon]}
                    </div>
                    <span className="text-gray-800 text-sm">
                      {notification.content}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {notification.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
