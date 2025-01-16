import React, { useState } from "react";
import ReactDOM from "react-dom";
import { ImCross } from "react-icons/im";
import { FaTrophy, FaFlag } from "react-icons/fa";
import { IoRocket } from "react-icons/io5";

const Profile = () => {
  const [status, setStatus] = useState("Active");
  const [statusColor, setStatusColor] = useState("text-green-500");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [coverImage, setCoverImage] = useState(
    "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=2000"
  );
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const [isTrophyPopupOpen, setIsTrophyPopupOpen] = useState(false); // State for Trophy Popup

  const statusOptions = [
    { label: "Active", color: "text-green-500" },
    { label: "In Meeting", color: "text-yellow-500" },
    { label: "Offline", color: "text-gray-400" },
    { label: "Busy", color: "text-red-500" },
    { label: "Available", color: "text-purple-500" },
  ];

  const randomCoverImages = [
    "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=2000",
    "https://images.unsplash.com/photo-1440778303588-435521a205bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    "https://images.pexels.com/photos/4397925/pexels-photo-4397925.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80",
    "https://images.unsplash.com/photo-1418854982207-12f710b74003?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    "https://images.pexels.com/photos/4066850/pexels-photo-4066850.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80",
    "https://images.unsplash.com/photo-1494173853739-c21f58b16055?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80",
  ];

  const handleStatusChange = (selectedStatus) => {
    setStatus(selectedStatus.label);
    setStatusColor(selectedStatus.color);
    setIsDropdownOpen(false);
  };

  const handleImageChange = (imageUrl) => {
    setCoverImage(imageUrl);
    setIsImagePickerOpen(false);
  };

  const ImagePickerPopup = () => {
    return ReactDOM.createPortal(
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-4 rounded-lg shadow-lg w-80">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Choose a Cover Image</h3>
            <button
              onClick={() => setIsImagePickerOpen(false)}
              className=" text-gray-700 px-2 py-1 rounded hover:bg-gray-300 flex items-center"
            >
              <ImCross />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {randomCoverImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Cover ${index}`}
                className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80"
                onClick={() => handleImageChange(image)}
              />
            ))}
          </div>
        </div>
      </div>,
      document.body
    );
  };

  const TrophyPopup = () => {
    return ReactDOM.createPortal(
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white px-4 py-2 rounded-lg shadow-xl w-96 max-w-lg">
          {/* Header with Close Button */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Achievements
            </h3>
            <button
              onClick={() => setIsTrophyPopupOpen(false)} // Close the popup
              className="text-gray-600 hover:text-gray-900 p-2 rounded-full transition duration-300"
            >
              <ImCross className="text-lg" />
            </button>
          </div>

          {/* Popup Content */}
          <div className="flex items-center">
            {/* Right Side Text */}
            <div className="flex flex-col justify-center text-left">
              <p className="text-lg font-semibold text-gray-800">
                John Doe, Developer
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center">
                  <FaTrophy className="text-xl text-yellow-500" />
                  <div className="border-l border-gray-300 mx-4 h-6"></div>
                  <p className="text-sm text-gray-600">3 Goals</p>
                </div>

                <div className="flex items-center">
                  <IoRocket className="text-xl text-gray-700" />
                  <div className="border-l border-gray-300 mx-4 h-6"></div>
                  <p className="text-sm text-gray-600">7 Projects</p>
                </div>

                <div className="flex items-center">
                  <FaFlag className="text-xl text-gray-700" />
                  <div className="border-l border-gray-300 mx-4 h-6"></div>
                  <p className="text-sm text-gray-600">8 Milestones</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <div className="col-span-1 bg-white shadow-lg flex flex-col items-center rounded-2xl overflow-hidden relative">
      {/* Cover Image */}
      <div className="w-full h-32 relative">
        <img
          src={coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <button
          onClick={() => setIsImagePickerOpen(true)}
          className="absolute top-2 right-2 bg-white text-gray-700 px-2 py-1 text-xs rounded shadow-md hover:bg-gray-100"
        >
          Change Cover
        </button>
      </div>

      {/* Profile Picture */}
      <div className="relative -mt-12">
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
          alt="User"
          className="w-24 h-24 rounded-full border-4 border-white shadow-md"
        />
      </div>

      {/* User Details */}
      <div className="flex flex-col items-center mt-2 mb-2">
        <h2 className="text-2xl font-bold">John Doe</h2>
        <p className="text-gray-500">@johndoe</p>
      </div>

      <div className="flex items-center justify-between w-full px-5">
        {/* EmpID */}
        <p className="text-sm font-semibold text-gray-600">Emp ID: IFE4567</p>
        {/* Trophy Icon */}
        <button
          onClick={() => setIsTrophyPopupOpen(true)}
          className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-400"
        >
          <FaTrophy />
        </button>
      </div>

      {/* Status and Role */}
      <div className="w-full px-2 m-2">
        <div className="flex items-center justify-center border border-gray-200 rounded-xl p-2 bg-gray-50">
          <p className="text-sm font-semibold pr-4">
            Role: <span className="text-blue-500">Developer</span>
          </p>
          <div className="h-6 border-l border-gray-300 mx-3"></div>
          <div className="relative">
            <p
              className="text-sm font-semibold pl-4"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Status:{" "}
              <span
                className={`cursor-pointer ${statusColor} font-semibold text-sm`}
              >
                {status}
              </span>
            </p>
            {isDropdownOpen && (
              <div className="absolute bottom-full mb-1 left-0 z-10 bg-white border border-gray-200 shadow-lg rounded-lg p-2 w-32">
                {statusOptions.map((option) => (
                  <p
                    key={option.label}
                    onClick={() => handleStatusChange(option)}
                    className={`cursor-pointer hover:bg-gray-100 p-1 rounded ${option.color}`}
                  >
                    {option.label}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Render Image Picker Popup */}
      {isImagePickerOpen && <ImagePickerPopup />}

      {/* Render Trophy Popup */}
      {isTrophyPopupOpen && <TrophyPopup />}
    </div>
  );
};

export default Profile;
