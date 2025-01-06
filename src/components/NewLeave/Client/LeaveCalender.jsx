import React, { useState, useEffect } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

const LeaveCalender = () => {
  const [viewMode, setViewMode] = useState("Team"); // Toggle between 'Team' and 'Company'
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [leaveData, setLeaveData] = useState({});

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();

  const handleToggle = () => {
    setViewMode(viewMode === "Team" ? "Company" : "Team");
  };

  const changeMonth = (increment) => {
    const newMonth = month + increment;
    if (newMonth > 11) {
      setMonth(0);
      setYear(year + 1);
    } else if (newMonth < 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(newMonth);
    }
  };

  // Generate random leave data
  useEffect(() => {
    const randomLeaveData = {};
    for (let i = 1; i <= daysInMonth; i++) {
      if (Math.random() > 0.7) {
        const numPeople = Math.floor(Math.random() * 3) + 1; // 1 to 3 people
        randomLeaveData[i] = Array.from({ length: numPeople }, (_, index) => ({
          id: index,
          name: `Person ${i}${index + 1}`,
          profileImage: `https://i.pravatar.cc/30?img=${(i * 10 + index) % 70}`, // Random images within the available range (1–70)
        }));
      }
    }
    setLeaveData(randomLeaveData);
  }, [month, year, daysInMonth]);

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center mt-8 bg-blue-900 p-4  text-white rounded-lg shadow mb-6">
        {/* Month and Year Selector */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => changeMonth(-1)}
            className="px-3 py-1 text-white rounded-md hover:bg-blue-800/80"
          >
            <FaAngleLeft />
          </button>
          <span className="text-lg font-semibold">
            {months[month]} {year}
          </span>
          <button
            onClick={() => changeMonth(1)}
            className="px-3 py-1 text-white rounded-md hover:bg-blue-800/80"
          >
            <FaAngleRight />
          </button>
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-between space-x-4">
          {/* "Company" Label */}
          <span
            className={`text-sm font-medium ${
              viewMode === "Company" ? "text-blue-400" : "text-gray-200"
            }`}
          >
            Company
          </span>

          {/* Toggle */}
          <label className="relative flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="hidden"
              checked={viewMode === "Team"}
              onChange={handleToggle}
            />
            <div
              className={`relative w-14 h-6 bg-gray-300 rounded-full shadow-inner transition-all duration-300 ${
                viewMode === "Team" ? "bg-blue-800" : ""
              }`}
            >
              <div
                className={`absolute w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-300 ${
                  viewMode === "Team" ? "translate-x-8" : "translate-x-0"
                }`}
              />
            </div>
          </label>

          {/* "Team" Label */}
          <span
            className={`text-sm font-medium ${
              viewMode === "Team" ? "text-blue-400" : "text-gray-100"
            }`}
          >
            Team
          </span>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Days of the week */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-semibold text-gray-600">
            {day}
          </div>
        ))}
        {/* Empty slots for days before the first of the month */}
        {Array.from({ length: startDay }).map((_, index) => (
          <div key={`empty-${index}`} className="h-16"></div>
        ))}
        {/* Dates of the month */}
        {Array.from({ length: daysInMonth }).map((_, index) => (
          <div
            key={`date-${index + 1}`}
            className="h-16 p-2 border rounded-lg bg-gray-50 shadow-sm flex flex-col items-center justify-start"
          >
            <div className="text-sm font-bold text-gray-600">{index + 1}</div>
            <div className="mt-1 flex -space-x-2">
              {leaveData[index + 1]?.slice(0, 2).map((person) => (
                <img
                  key={person.id}
                  src={person.profileImage}
                  alt={person.name}
                  className="w-6 h-6 rounded-full border-2 border-white"
                  onError={(e) => {
                    e.currentTarget.style.display = "none"; // Hide if image fails to load
                  }}
                />
              ))}
              {leaveData[index + 1]?.length > 2 && (
                <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 border-2 border-white">
                  +{leaveData[index + 1].length - 2}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaveCalender;
