import React from "react";
import { FaTasks, FaCheckCircle, FaClock } from "react-icons/fa";

const Tasks = () => {
  const tasks = [
    {
      id: 1,
      content: "Employee Management System",
      time: "4 hrs ago",
      icon: <FaCheckCircle className="text-green-500" />,
    },
    {
      id: 2,
      content: "Payroll System",
      time: "2 days ago",
      icon: <FaClock className="text-yellow-500" />,
    },
    {
      id: 3,
      content: "Time & Attendance System",
      time: "5 days ago",
      icon: <FaCheckCircle className="text-blue-500" />,
    },
    {
      id: 4,
      content: "Project Management System",
      time: "1 week ago",
      icon: <FaClock className="text-yellow-500" />,
    },
    {
      id: 5,
      content: "Inventory Management System",
      time: "2 weeks ago",
      icon: <FaCheckCircle className="text-green-500" />,
    },
  ];

  return (
    <div className="rounded-2xl bg-white shadow-lg h-64 p-4 flex flex-col">
      <h3 className="font-bold text-lg text-gray-800 mb-2 flex items-center">
        <FaTasks className="mr-2 text-blue-500" /> Tasks
      </h3>

      <div className="overflow-y-auto flex-grow space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between p-2 bg-gray-50 rounded-lg shadow-sm"
          >
            <div className="flex items-center space-x-3">
              <div className="text-lg">{task.icon}</div>
              <span className="text-gray-800 text-sm">{task.content}</span>
            </div>
            <span className="text-xs text-gray-500">{task.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
