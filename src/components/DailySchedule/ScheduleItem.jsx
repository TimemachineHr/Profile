import React from "react";
import * as FaIcons from "react-icons/fa";
import { TiTick } from "react-icons/ti";

const ScheduleItem = ({ item, index, toggleComplete, isLast }) => {
  const IconComponent = FaIcons[item.icon] || FaIcons.FaTasks; // Fallback to FaTasks

  return (
    <div className="flex items-start space-x-4 relative">
      {/* Timeline Indicator */}
      <div className="flex flex-col items-center">
        {/* Dotted Line */}
        {!isLast && (
          <div
            style={{
              borderColor: item.completed ? item.iconColor || "#ccc" : "#ccc",
            }}
            className="absolute top-8 left-4 w-1 h-full border-l-2 border-dotted"
          ></div>
        )}

        {/* Circular Icon */}
        <div
          className="w-9 h-9 flex items-center justify-center rounded-full z-10"
          style={{ backgroundColor: item.iconColor || "#ccc" }} // Default to gray if iconColor is not provided
        >
          <IconComponent style={{ color: "white", fontSize: "20px" }} />
        </div>
      </div>

      {/* Task Content */}
      <div className="flex flex-col space-y-1">
        <span className="text-gray-600 text-sm">{item.time}</span>
        <span
          className={`font-medium text-gray-800 ${
            item.completed ? "line-through text-gray-500" : ""
          }`}
        >
          {item.description}
        </span>
        {item.details && (
          <span
            className={`text-xs ${
              item.completed ? "line-through text-gray-400" : "text-gray-500"
            }`}
          >
            {item.details}
          </span>
        )}
      </div>

      {/* Circular Checkbox with Tick Mark */}
      <div className="absolute right-2 ">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => toggleComplete(index)}
            className="appearance-none w-5 h-5 border-2 rounded-full focus:outline-none transition duration-150 relative"
            style={{
              borderColor: item.completed ? item.iconColor : "#d1d5db", // Dynamic border color or default gray
            }}
          />
          <span
            className={`absolute top-1/2 left-0.5 transform -translate-x-1/2 -translate-y-1/2 text-sm font-semibold ${
              item.completed ? "block text-gray-600" : "hidden"
            }`}
          >
            <TiTick className="text-lg" />
          </span>
        </label>
      </div>
    </div>
  );
};

export default ScheduleItem;
