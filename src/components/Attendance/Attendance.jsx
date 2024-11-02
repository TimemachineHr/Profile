import React, { useState, useEffect } from "react";
import { FaClipboardCheck, FaCoffee, FaClock } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";
import { TbFingerprintScan } from "react-icons/tb";

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
    <div className="relative rounded-2xl bg-white shadow-lg h-58 p-4 flex flex-col md:flex-row items-stretch text-center md:col-span-2 md:text-left space-y-8 md:space-y-0 md:space-x-4">
      <div className="absolute top-4 right-4 flex flex-col items-end space-y-2">
        <button className="text-sm text-blue-600 hover:underline">
          View Attendance History
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center md:items-start space-y-4 w-full md:w-1/2">
        <div className="flex items-center space-x-4">
          <TbFingerprintScan size={36} className="text-[#007b5e]" />
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
        <div className="text-gray-700 text-sm space-y-1 text-left mt-2 overflow-y-auto max-h-10">
          <ul className="text-sm text-gray-600 space-y-1">
            <li>Project-A : 12:00 - 12:30(30 Min)</li>
            <li>Project-B : 13:00 - 14:00 (1 Hr)</li>
            <li>Project-C : 15:00 - 16:00 (1 Hr)</li>
          </ul>
        </div>
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

      <div className="flex flex-col items-center w-full md:w-1/2  justify-center">
        {!isClockedIn ? (
          <button
            onClick={handleClockIn}
            className="px-4 py-3 bg-[#007b5e] mt-12 text-white rounded-lg hover:bg-[#007b5e] w-full"
          >
            Clock In
          </button>
        ) : (
          <div className="flex flex-col items-center mt-9 space-y-2 w-full">
            <p className="text-lg font-semibold text-gray-800">
              Timer:{" "}
              {Math.floor(timer / 3600)
                .toString()
                .padStart(2, "0")}
              :{(Math.floor(timer / 60) % 60).toString().padStart(2, "0")}:
              {(timer % 60).toString().padStart(2, "0")}
            </p>
            <div className="flex justify-center items-center  space-x-4 w-full">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-4">
                  {" "}
                  <button
                    onClick={handleTakeBreak}
                    title={isOnBreak ? "End Break" : "Take Break"}
                  >
                    <FaCoffee
                      className={`text-xl ${
                        isOnBreak
                          ? "text-yellow-500 hover:text-yellow-600"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                    />{" "}
                  </button>
                  <button
                    onClick={handleClockOut}
                    className="px-4 py-2 border-2 border-gray-500 font-semibold text-gray-600 rounded-lg hover:bg-gray-200 hover:text-gray-800 flex-grow text-center"
                    title="Clock Out"
                  >
                    Clock Out
                  </button>
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => setShowProjectModal(true)}
                    title="Switch Project"
                  >
                    <LuRefreshCw
                      size={24}
                      className="text-lg  text-gray-600 hover:text-gray-800"
                    />{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-auto w-full">
          {" "}
          <h3 className="mt-4 text-xl font-semibold text-gray-800 text-center">
            Upcoming Work Hours
          </h3>
          <div className="h-22 bg-gray-100 rounded-xl mt-2 flex items-center w-full">
            <div className="flex mr-1 ml-3 items-center text-center flex-grow">
              <div className="text-sm text-gray-600">
                <span className="block">Mon</span>
                <span className="block">1 Nov 2024</span>
                <span className="font-semibold text-green-500 border border-green-500 rounded-md px-1 mr-2">
                  GS
                </span>
              </div>
            </div>

            <div className="h-20 border-l border-gray-300 mx-2" />
            <div className="flex items-center">
              <div className="flex items-center">
                <span className="h-2.5 w-2.5 bg-green-500 rounded-full mr-1" />
                <span className="text-gray-600">9:00 AM</span>
                <hr className="border border-gray-300 h-0 w-8 ml-1 mr-1" />
                <span className="h-2.5 w-2.5 bg-red-500 rounded-full mx-2" />
                <span className="text-gray-600">6:00 PM</span>
              </div>
              <div className="flex items-center ml-1 mr-1">
                <FaClock className="text-gray-600 mr-1" />
                <span className="text-gray-600">9 hrs</span>
              </div>
            </div>
          </div>
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
            <select className="border border-gray-300 rounded-md w-full p-2">
              <option value="">Project 1</option>
              <option value="">Project 2</option>
              <option value="">Project 3</option>
            </select>

            <button
              onClick={() => setShowProjectModal(false)}
              className="w-full bg-[#007b5e] text-white py-2 rounded-md hover:bg-[#005f47]"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;
