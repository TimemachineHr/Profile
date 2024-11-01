import React from "react";
import { IoClose } from "react-icons/io5";

const Popup = ({ onClose, onSelect }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="relative bg-white rounded-2xl p-6 w-80 mx-auto">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        <IoClose size={24} />
      </button>
      <h3 className="text-lg font-bold mb-4 text-center">Application for:</h3>
      <div className="flex space-x-4 justify-center">
        <button
          onClick={() => onSelect("leave")}
          className="flex-1 py-2 px-3 bg-[#007b5e] text-white rounded-lg hover:bg-[#124d3f]"
        >
          Leave
        </button>
        <button
          onClick={() => onSelect("expense")}
          className="flex-1 py-2 px-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
        >
          Expense Claim
        </button>
      </div>
    </div>
  </div>
);

export default Popup;
