import React, { useState } from "react";

const Profile = () => {
  const [status, setStatus] = useState("Active");
  const [statusColor, setStatusColor] = useState("text-green-500");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const statusOptions = [
    { label: "Active", color: "text-green-500" },
    { label: "In Meeting", color: "text-yellow-500" },
    { label: "Offline", color: "text-gray-400" },
    { label: "Busy", color: "text-red-500" },
    { label: "Available", color: "text-purple-500" },
  ];

  const handleStatusChange = (selectedStatus) => {
    setStatus(selectedStatus.label);
    setStatusColor(selectedStatus.color);
    setIsDropdownOpen(false);
  };

  return (
    <div className="col-span-1 bg-white shadow-lg flex flex-col items-center rounded-2xl overflow-hidden relative">
      <div className="w-full h-32">
        <img
          src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=2000"
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>
      <img
        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
        alt="User"
        className="w-24 h-24 rounded-full border-4 border-white -mt-12 shadow-md"
      />
      <div className="flex flex-col items-center mt-4 mb-2">
        <h2 className="text-2xl font-bold">John Doe</h2>
        <p className="text-gray-500">@johndoe</p>
      </div>

      <div className="w-full px-2 m-2 ">
        <div className="flex items-center justify-center border border-gray-200 rounded-xl p-2 bg-gray-50">
          <p className="text-sm font-semibold pr-4">
            Role: <span className="text-blue-500">Developer</span>
          </p>
          <div className="h-6 border-l  border-gray-300 mx-3"></div>
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
    </div>
  );
};

export default Profile;
