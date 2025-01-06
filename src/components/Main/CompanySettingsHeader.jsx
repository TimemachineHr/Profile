import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CompanySettingsHeader = () => {
  const sections = [
    { id: "business", label: "Business" },
    { id: "branches", label: "Branch" },
    { id: "brand", label: "Brand" },
    { id: "audit-log", label: "Audit Log" },
  ];
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      sections.forEach((section) => {
        const sectionElement = document.getElementById(section.id);
        if (
          sectionElement &&
          sectionElement.offsetTop <= window.scrollY + 100 &&
          sectionElement.offsetTop + sectionElement.offsetHeight >
            window.scrollY + 100
        ) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections]);

  const handleClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isActive = (id) =>
    activeSection === id
      ? "bg-gray-100 text-blue-600"
      : "hover:bg-gray-100 hover:text-blue-600";

  return (
    <header className="fixed top-0 left-0 w-full bg-white text-black py-4 px-6 shadow-md z-50">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleClick(section.id)}
              className={`px-4 py-2 font-semibold rounded-lg transition duration-200 ${isActive(
                section.id
              )}`}
            >
              {section.label}
            </button>
          ))}
        </div>
        <div className="text-right">
          <h2 className="text-2xl text-gray-700 font-semibold mb-1">
            Settings
          </h2>
        </div>
      </div>
    </header>
  );
};

export default CompanySettingsHeader;
