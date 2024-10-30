import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

const ApplyLeave = () => {
  return (
    <>
      <div className="rounded-2xl bg-white shadow-lg h-48 p-4 flex flex-col items-center justify-center text-center md:col-span-2">
        <FaCalendarAlt size={36} className="text-gray-500 mb-3" />
        <h2 className="font-semibold text-lg text-gray-800">Apply for Leave</h2>
        <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
          Submit
        </button>
      </div>
    </>
  );
};

export default ApplyLeave;
