import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const ScheduleItem = ({ item, index, toggleComplete }) => {
  return (
    <li
      className={`flex items-center justify-between p-2 rounded-lg border ${
        item.completed ? "line-through text-gray-400" : "text-gray-800"
      } border-gray-200`}
    >
      <div className="flex items-center space-x-2">
        <FaCheckCircle
          className={`${
            item.completed ? "text-green-400" : "text-gray-400"
          } cursor-pointer`}
          onClick={() => toggleComplete(index)}
        />
        <span>
          {item.time} - {item.description}
        </span>
      </div>
      <button
        onClick={() => toggleComplete(index)}
        className="text-xs text-[#007b5e] hover:underline"
      >
        {item.completed ? "Undo" : "Complete"}
      </button>
    </li>
  );
};

export default ScheduleItem;
