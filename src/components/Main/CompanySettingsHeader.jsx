import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaPlus, FaTimes } from "react-icons/fa";

const CompanySettingsHeader = ({ onAddCommunication }) => {
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
    <header className="flex justify-between items-center bg-white text-black py-4 px-6 shadow-md">
      <div className="flex space-x-4">
        <Link
          to="/companysettings"
          className={`px-4 py-2 font-semibold rounded-lg transition duration-200 ${isActive(
            "/companysettings"
          )}`}
        >
          Business
        </Link>
        <Link
          to="/brand"
          className={`px-4 py-2 font-semibold rounded-lg relative transition duration-200 ${isActive(
            "/brand"
          )}`}
        >
          Brand
        </Link>
        <Link
          to="/othersettings"
          className={`px-4 py-2 font-semibold rounded-lg transition duration-200 ${isActive(
            "/othersettings"
          )}`}
        >
          Other Settings
        </Link>
      </div>
      <div className="text-right">
        <h2 className="text-2xl text-gray-700 font-semibold mb-1">Settings</h2>
      </div>
    </header>
  );
};

export default CompanySettingsHeader;
