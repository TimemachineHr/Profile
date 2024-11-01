import React from "react";
import NotificationItem from "./NotificationItem";

const NotificationGroup = ({ date, notifications }) => {
  return (
    <div className="mb-4">
      <h4 className="text-xs font-semibold text-gray-500 mb-2">{date}</h4>
      <ul className="space-y-2">
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </ul>
    </div>
  );
};

export default NotificationGroup;
