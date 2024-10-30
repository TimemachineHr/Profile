import React, { useState, useEffect } from "react";
import { FaClipboardCheck, FaCoffee } from "react-icons/fa";

const Attendance = () => {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [timer, setTimer] = useState(0);
  const [showProjectModal, setShowProjectModal] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isClockedIn && !isOnBreak) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else if (isOnBreak || !isClockedIn) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isClockedIn, isOnBreak]);

  const handleClockIn = () => {
    const currentTime = new Date();
    setStartTime(currentTime);
    setIsClockedIn(true);
    setShowProjectModal(true);
  };

  const handleTakeBreak = () => {
    setIsOnBreak((prev) => !prev);
  };

  const handleClockOut = () => {
    setEndTime(new Date());
    setIsClockedIn(false);
    setTimer(0);
  };

  const formatTime = (date) => {
    if (!date) return "--:--";
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="relative rounded-2xl bg-white shadow-lg h-58 p-8 flex flex-col md:flex-row items-stretch text-center md:col-span-2 md:text-left space-y-8 md:space-y-0 md:space-x-8">
      <div className="absolute top-4 right-4 flex flex-col items-end space-y-2">
        <button className="text-sm text-blue-600 hover:underline">
          View Attendance History
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center md:items-start space-y-6">
        <div className="flex items-center space-x-4">
          <FaClipboardCheck size={36} className="text-[#007b5e]" />
          <h2 className="font-semibold text-xl text-gray-800">
            Mark Attendance
          </h2>
        </div>
        {startTime && endTime ? (
          <>
            <p className="text-sm text-gray-600">Your Work Hours are</p>
            <p className="text-2xl font-bold text-gray-800">
              {formatTime(startTime)} - {formatTime(endTime)}
            </p>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-600">
              You have clocked in today at
            </p>
            <p className="text-2xl font-bold text-[#007b5e]">
              {formatTime(startTime)}
            </p>
          </>
        )}
        <div className="flex space-x-8">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center">
              <span className="text-lg font-semibold text-blue-700">28</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Total</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center">
              <span className="text-lg font-semibold text-green-700">25</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Present</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-red-200 flex items-center justify-center">
              <span className="text-lg font-semibold text-red-700">3</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Absent</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center w-full md:w-1/3 space-y-4 justify-center">
        {!isClockedIn ? (
          <button
            onClick={handleClockIn}
            className="px-6 py-3 bg-[#007b5e] text-white rounded-md hover:bg-[#007b5e] w-full"
          >
            Clock In
          </button>
        ) : (
          <div className="flex flex-col items-center space-y-3 w-full">
            <p className="text-lg font-semibold text-gray-800">
              Timer:{" "}
              {Math.floor(timer / 3600)
                .toString()
                .padStart(2, "0")}
              :{(Math.floor(timer / 60) % 60).toString().padStart(2, "0")}:
              {(timer % 60).toString().padStart(2, "0")}
            </p>
            <div className="flex space-x-4 w-full">
              <button
                onClick={handleTakeBreak}
                className={`px-4 py-2 rounded-md text-white flex items-center space-x-1 w-full ${
                  isOnBreak
                    ? "bg-[#007b5e] hover:bg-[#124d3f]"
                    : "bg-yellow-500 hover:bg-yellow-600"
                }`}
              >
                <FaCoffee />
                <span>{isOnBreak ? "End Break" : "Take Break"}</span>
              </button>
              <button
                onClick={handleClockOut}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-full"
              >
                Clock Out
              </button>
            </div>
          </div>
        )}
        <div className="flex flex-col items-center">
          <button
            className="px-4 py-2 bg-[#007b5e] text-white rounded-md hover:bg-[#124d3f] mb-2"
            onClick={() => setShowProjectModal(true)}
          >
            Switch Project
          </button>
          <div className="text-gray-700 text-sm space-y-1 text-center">
            <p className="font-semibold">Project A: 12:00 - 12:30(30 Min)</p>
            <p className="font-semibold">
              Project B: 13:00 - 14:45(1 Hr 45 Min)
            </p>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 text-sm text-gray-600">
          Upcoming Work Hours:{" "}
          <span className="font-semibold">09:00 AM, 31 Oct 2024 (IND)</span>
        </div>
      </div>

      {showProjectModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6 space-y-6">
            <h1 className="text-xl font-bold text-gray-800 mb-2">
              Clock-In Details
            </h1>

            <div className="flex flex-col items-start text-gray-600 text-sm space-y-1">
              <p>
                <span className="font-medium text-gray-700">Date:</span>{" "}
                {new Date().toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium text-gray-700">Time:</span>{" "}
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            <h2 className="text-lg font-semibold text-gray-800 mt-4">
              Select Project
            </h2>
            <select className="w-full border border-gray-300 rounded-lg p-2 mb-4">
              <option>Project A</option>
              <option>Project B</option>
              <option>Project C</option>
            </select>

            <button
              onClick={() => setShowProjectModal(false)}
              className="bg-[#007b5e] text-white px-4 py-2 rounded-lg hover:bg-[#124d3f] w-full"
            >
              Confirm Clock-In
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;
