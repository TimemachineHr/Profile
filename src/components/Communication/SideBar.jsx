import React from "react";

const Sidebar = ({ activeSection, handleSectionClick }) => {
  const sections = [
    "Logo Position",
    "Background",
    "Header",
    "Footer",
    "Communication Publisher",
  ];

  return (
    <div className="w-1/4 bg-gray-200 text-white flex flex-col items-center py-8">
      <div className="flex flex-col gap-6 w-4/5">
        {sections.map((label) => (
          <button
            key={label}
            onClick={() => handleSectionClick(label)}
            className={`flex justify-start gap-3 py-3 px-4 rounded-lg shadow-lg transition-all ${
              activeSection === label
                ? "bg-blue-600 text-white ring-2 ring-blue-300"
                : "bg-gray-400 text-white hover:bg-blue-600 hover:text-white"
            }`}
          >
            <span className="text-md font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
