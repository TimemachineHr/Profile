import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaPlus, FaTimes } from "react-icons/fa";

const CommunicationHeader = ({ onAddCommunication }) => {
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation(); // Get current location

  const handleOnboardingClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleAdd = (type) => {
    onAddCommunication(type);
    setShowPopup(false);
  };

  const isActive = (path) =>
    location.pathname === path
      ? "bg-gray-100 text-blue-600"
      : "hover:bg-gray-100 hover:text-blue-600";

  return (
    <header className="flex justify-between items-center bg-white text-black py-2 px-6 shadow-md">
      <div className="flex space-x-4">
        <Link
          to="/communication"
          className={`px-4 py-2 font-semibold rounded-lg transition duration-200 ${isActive(
            "/communication"
          )}`}
        >
          Home
        </Link>
        <Link
          to="/submission"
          className={`px-4 py-2 font-semibold rounded-lg relative transition duration-200 ${isActive(
            "/submission"
          )}`}
        >
          Submission
          <span className="ml-2 bg-blue-600 text-white text-xs font-bold rounded-full px-2 py-1">
            5
          </span>
        </Link>
        <Link
          to="/communicationsettings"
          className={`px-4 py-2 font-semibold rounded-lg transition duration-200 ${isActive(
            "/communicationsettings"
          )}`}
        >
          Settings
        </Link>
      </div>
      <div className="text-right">
        <h2 className="text-lg font-semibold mb-1">Communication</h2>
        <button
          onClick={handleOnboardingClick}
          className="flex items-center bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-700 active:scale-95 transition-transform duration-200"
        >
          <FaPlus className="mr-2" /> Add New Communication
        </button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-2xl relative">
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={20} />
            </button>

            <h2 className="text-xl font-bold text-center mb-8 text-gray-800">
              Create New Communication
            </h2>

            <div className="flex flex-wrap justify-center items-center gap-6">
              <button
                onClick={() => handleAdd("Form")}
                className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
              >
                Form
              </button>

              <button
                onClick={() => handleAdd("Letter")}
                className="bg-violet-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-violet-700 transition"
              >
                Letter
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default CommunicationHeader;
