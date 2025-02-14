import React, { useEffect, useRef, useState } from "react";
import * as FaIcons from "react-icons/fa";
import { TiTick } from "react-icons/ti";

const ScheduleItem = ({ item, toggleComplete, isLast }) => {
  const IconComponent = FaIcons[item.icon] || FaIcons.FaTasks; // Fallback to FaTasks

  // Ref to measure text width
  const textRef = useRef(null);
  const [textWidth, setTextWidth] = useState(0);

  // Calculate duration in hours
  const startTime = new Date(`1970-01-01T${item.startTime}:00`);
  const endTime = new Date(`1970-01-01T${item.endTime}:00`);
  const duration = Math.abs(endTime - startTime) / (1000 * 60 * 60); // In hours

  // Dynamic height based on duration (with small scaling)
  let itemHeight = 40; // Default for 1 hour
  if (duration > 1 && duration <= 2) {
    itemHeight = 60; // 2 hours
  } else if (duration > 2) {
    itemHeight = 80; // 3+ hours, max capped
  }

  // Measure the text width when the component mounts or updates
  useEffect(() => {
    if (textRef.current) {
      setTextWidth(textRef.current.offsetWidth); // Get the rendered width of the text
    }
  }, [item.description]);

  return (
    <div className="flex items-start space-x-4 relative">
      {/* Timeline Indicator */}
      <div className="flex flex-col items-center">
        {/* Dotted Line */}
        {!isLast && (
          <div
            style={{
              borderColor: item.completed ? item.iconColor || "#ccc" : "#ccc",
              height: `${itemHeight + 20}px`, // Use dynamic height here
            }}
            className="absolute top-8 left-4 w-1 border-l-2 border-dotted"
          ></div>
        )}

        {/* Icon (Circle or Stretched) */}
        <div
          className={`flex items-center justify-center z-10`}
          style={{
            backgroundColor: item.iconColor || "#ccc",
            height: duration <= 1 ? "33px" : `${itemHeight}px`, // Fixed height
            width: "33px", // Fixed width
            borderRadius: duration <= 1 ? "50%" : "90px", // Circle for 1 hour, rounded rectangle otherwise
          }}
        >
          <IconComponent style={{ color: "white", fontSize: "20px" }} />
        </div>
      </div>

      {/* Task Content */}
      <div className="flex flex-col space-y-1">
        <span className="text-gray-600 text-sm">
          {item.startTime} - {item.endTime}
        </span>
        <span className="relative inline-block">
          {/* Main Text */}
          <span
            ref={textRef} // Attach the ref to measure the text width
            className={`font-medium text-gray-800 ${
              item.completed ? "text-gray-500" : "text-gray-800"
            }`}
            style={{
              transition: "color 0.5s ease", // Smooth color transition
            }}
          >
            {item.description}
          </span>

          {/* Dynamic Strike-Through Animation */}
          <span
            className={`absolute bottom-1/2 left-0 h-[1px] bg-gray-500`}
            style={{
              width: item.completed ? `${textWidth}px` : "0px", // Dynamic width
              transform: "translateY(50%)", // Center the strike line
              transition: "width 0.5s ease", // Animate the width of the line
            }}
          ></span>
        </span>

        {item.details && (
          <span
            className={`text-xs ${
              item.completed ? "line-through text-gray-400" : "text-gray-500"
            }`}
            style={{
              transition: "all 1s ease-in-out",
            }}
          >
            {item.details}
          </span>
        )}
      </div>

      <div className="absolute right-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => toggleComplete(item._id)} // Pass _id here
            className="appearance-none w-5 h-5 border-2 rounded-full focus:outline-none transition duration-150 relative"
            style={{
              opacity: 0, // Hide default checkbox
            }}
          />

          {/* SVG Circle for both checked and unchecked states */}
          <span
            className={`absolute top-0 left-0 w-5 h-5 flex items-center justify-center`}
          >
            <svg
              width="19"
              height="18"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 left-0 w-full h-full"
            >
              <path
                d="M16.457 8.42106C16.457 9.24587 15.7477 9.89748 15.5167 10.6233C15.2858 11.3491 15.4343 12.3389 14.9806 12.9575C14.527 13.5761 13.5537 13.7329 12.9186 14.1865C12.2835 14.6402 11.8628 15.5227 11.1205 15.7702C10.3781 16.0176 9.55333 15.5557 8.72852 15.5557C7.9037 15.5557 7.07889 16.0094 6.33655 15.7784C5.59422 15.5475 5.15707 14.6484 4.53846 14.1948C3.91984 13.7411 2.95481 13.6009 2.47642 12.9658C1.99803 12.3307 2.18773 11.3821 1.94029 10.6316C1.69284 9.88098 1 9.24587 1 8.42106C1 7.59624 1.70934 6.93639 1.94029 6.21055C2.17124 5.48472 2.02277 4.49494 2.47642 3.87633C2.93007 3.25772 3.90335 3.10925 4.53846 2.64735C5.17356 2.18546 5.59422 1.3194 6.33655 1.07196C7.07889 0.824512 7.92844 1.29466 8.72852 1.29466C9.52859 1.29466 10.3781 0.841008 11.1205 1.07196C11.8628 1.3029 12.3 2.20195 12.9186 2.64735C13.5372 3.09275 14.5187 3.24122 14.9806 3.87633C15.4425 4.51143 15.2693 5.45997 15.5167 6.21055C15.7642 6.96113 16.457 7.59624 16.457 8.42106Z"
                stroke={item.completed ? item.iconColor : "#d1d5db"} // Stroke color based on checkbox state
                strokeWidth="1.64963"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill={item.completed ? item.iconColor : "none"} // Add fill color when checked
              />
            </svg>

            {/* Show Tick Mark on Check */}
            {item.completed && (
              <span
                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white`} // Tick mark in white
              >
                <TiTick className="text-lg" />
              </span>
            )}
          </span>
        </label>
      </div>
    </div>
  );
};

export default ScheduleItem;
