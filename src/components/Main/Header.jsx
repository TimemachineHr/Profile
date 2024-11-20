import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaUpload, FaLink, FaUserPlus, FaTimes } from "react-icons/fa";

const Header = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showBulkImportModal, setShowBulkImportModal] = useState(false);
  const [file, setFile] = useState(null);

  const handleOnboardingClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleBulkImportClick = () => {
    setShowBulkImportModal(true);
  };

  const closeBulkImportModal = () => {
    setShowBulkImportModal(false);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadFile = () => {
    if (file) {
      alert("File uploaded successfully");
    } else {
      alert("Please select a file first.");
    }
  };

  return (
    <header className="flex justify-between items-center bg-white text-black py-2 px-6 shadow-md">
      <div className="flex space-x-4">
        <Link
          to="/"
          className="px-4 py-2 font-semibold rounded-lg hover:bg-gray-100 hover:text-blue-600 transition duration-200"
        >
          Home
        </Link>
        <Link
          to="/list"
          className="px-4 py-2 font-semibold rounded-lg hover:bg-gray-100 hover:text-blue-600 transition duration-200"
        >
          List
        </Link>
        <Link
          to="/hire"
          className="px-4 py-2 font-semibold rounded-lg hover:bg-gray-100 hover:text-blue-600 transition duration-200"
        >
          Hire
        </Link>
        <Link
          to="/settings"
          className="px-4 py-2 font-semibold rounded-lg hover:bg-gray-100 hover:text-blue-600 transition duration-200"
        >
          Settings
        </Link>
      </div>
      <div className="text-right">
        <h2 className="text-lg font-semibold mb-1">Human Resources</h2>
        <button
          onClick={handleOnboardingClick}
          className="flex items-center bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-700 active:scale-95 transition-transform duration-200"
        >
          <FaPlus className="mr-2" /> New Onboarding
        </button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96 text-center shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Select Action</h2>
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={handleBulkImportClick}
                className="flex flex-col items-center justify-center bg-blue-800 text-white py-4 px-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                <FaUpload className="text-2xl mb-2" />
                <span>Bulk Import</span>
              </button>
              <button className="flex flex-col items-center justify-center bg-blue-800 text-white py-4 px-2 rounded-lg hover:bg-blue-600 transition duration-200">
                <FaLink className="text-2xl mb-2" />
                <span>Onboarding Link</span>
              </button>
              <Link to="/newemployee">
                <button className="flex flex-col items-center justify-center bg-blue-800 text-white py-4 px-2 rounded-lg hover:bg-blue-600 transition duration-200">
                  <FaUserPlus className="text-2xl mb-2" />
                  <span>Add New Employee</span>
                </button>
              </Link>
            </div>
            <button
              onClick={closePopup}
              className="mt-4 text-gray-500 hover:text-gray-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showBulkImportModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96 text-center shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Employee Bulk Import</h2>
              <button
                onClick={closeBulkImportModal}
                className="text-xl font-semibold text-gray-600 hover:text-gray-900"
              >
                <FaTimes />
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-left mb-2">
                1. Download File Template
              </label>
              <button
                onClick={() => alert("Template downloaded")}
                className="bg-blue-800 text-white flex items-start py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Download
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-left mb-2">2. Upload File</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="border-2 border-gray-300 p-2 rounded-lg w-full"
              />
            </div>
            <hr className="my-4 border-t border-gray-300" />
            <div className="flex justify-end mt-4">
              <button
                onClick={handleUploadFile}
                className="bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
