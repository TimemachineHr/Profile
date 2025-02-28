import { MdTextFields } from "react-icons/md";
import React, { useState } from "react";

const FontSizeSelector = ({ fontSize, onChange }) => {
  const [isFontSizeOpen, setIsFontSizeOpen] = useState(false);

  return (
    <div className="relative">
      {/* Font Size Icon */}
      <button
        className="flex items-center justify-center w-10 h-10 text-gray-600 hover:bg-gray-100 rounded-md"
        onClick={() => setIsFontSizeOpen(!isFontSizeOpen)}
        title="Font Size"
      >
        <MdTextFields size={24} />
      </button>

      {/* Font Size Modal */}
      {isFontSizeOpen && (
        <div className="absolute top-12 left-0 bg-white border shadow-lg rounded-md w-40 z-10">
          <ul className="p-2 space-y-2">
            <li>
              <button
                onClick={() => onChange("text-sm")}
                className={`w-full text-left px-2 py-1 rounded-md ${
                  fontSize === "text-sm"
                    ? "bg-gray-200 font-bold"
                    : "hover:bg-gray-100"
                }`}
              >
                Small
              </button>
            </li>
            <li>
              <button
                onClick={() => onChange("text-base")}
                className={`w-full text-left px-2 py-1 rounded-md ${
                  fontSize === "text-base"
                    ? "bg-gray-200 font-bold"
                    : "hover:bg-gray-100"
                }`}
              >
                Medium
              </button>
            </li>
            <li>
              <button
                onClick={() => onChange("text-lg")}
                className={`w-full text-left px-2 py-1 rounded-md ${
                  fontSize === "text-lg"
                    ? "bg-gray-200 font-bold"
                    : "hover:bg-gray-100"
                }`}
              >
                Large
              </button>
            </li>
            <li>
              <button
                onClick={() => onChange("text-xl")}
                className={`w-full text-left px-2 py-1 rounded-md ${
                  fontSize === "text-xl"
                    ? "bg-gray-200 font-bold"
                    : "hover:bg-gray-100"
                }`}
              >
                Extra Large
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default FontSizeSelector;
