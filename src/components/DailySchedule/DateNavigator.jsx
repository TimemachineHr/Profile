import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

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
      <FaAngleLeft
        title="Previous Day"
        className="text-gray-500 cursor-pointer"
        onClick={() => changeDay("previous")}
      />
      <span className="text-gray-800 font-semibold">
        {formatDate(currentDate)}
      </span>
      <FaAngleRight
        title="Next Day"
        className="text-gray-500 cursor-pointer"
        onClick={() => changeDay("next")}
      />
    </div>
  );
};

export default DateNavigator;
