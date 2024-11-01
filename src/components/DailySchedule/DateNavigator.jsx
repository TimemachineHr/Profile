import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const DateNavigator = ({ currentDate, changeDay }) => {
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <FaArrowLeft
        className="text-gray-500 cursor-pointer"
        onClick={() => changeDay("previous")}
      />
      <span className="text-gray-800 font-semibold">
        {formatDate(currentDate)}
      </span>
      <FaArrowRight
        className="text-gray-500 cursor-pointer"
        onClick={() => changeDay("next")}
      />
    </div>
  );
};

export default DateNavigator;
