import React from "react";

const Profile = () => {
  return (
    <div className="col-span-1 bg-white shadow-lg flex flex-col items-center rounded-2xl overflow-hidden">
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
      <div className="flex w-full justify-between px-4 mb-4">
        <p className="text-sm font-semibold">
          Role: <span className="text-blue-500">Developer</span>
        </p>
        <p className="text-sm font-semibold">
          Status: <span className="text-green-500">Active</span>
        </p>
      </div>
    </div>
  );
};

export default Profile;
