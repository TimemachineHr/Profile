import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import ApplicationItem from "./ApplicationItem";
import Popup from "./Popup";
import { applicationData } from "./data";

const ApplyLeave = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handlePopupOpen = () => setShowPopup(true);
  const handlePopupClose = () => setShowPopup(false);

  const handleRedirect = (type) => {
    if (type === "leave") {
      window.location.href = "/leave-application";
    } else if (type === "expense") {
      window.location.href = "/expense-claim";
    }
  };

  console.log(applicationData);

  return (
    <>
      <div className="rounded-2xl bg-white shadow-lg p-4 flex md:flex-row flex-col h-auto md:h-52 w-full md:col-span-2">
        <div className="w-full md:w-2/3 md:pr-4 flex flex-col">
          <h3 className="font-bold text-lg text-gray-800 mb-3 text-center md:text-left">
            Previous Applications
          </h3>
          <div
            className="overflow-y-auto flex-grow"
            style={{ maxHeight: "120px" }}
          >
            <ul className="space-y-2">
              {applicationData.map((app, index) => (
                <ApplicationItem
                  key={index}
                  icon={app.icon}
                  title={app.title}
                  details={app.details}
                  date={app.date}
                />
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full md:w-1/3 flex flex-col items-center justify-center text-center mt-4 md:mt-0">
          <FaCalendarAlt size={36} className="text-gray-500 mb-3" />
          <h2 className="font-bold text-lg text-gray-800">Apply for Leave</h2>
          <button
            onClick={handlePopupOpen}
            className="mt-4 px-4 py-2 bg-[#007b5e] text-white rounded-lg hover:bg-[#124d3f]"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Popup for Application Type Selection */}
      {showPopup && (
        <Popup onClose={handlePopupClose} onSelect={handleRedirect} />
      )}
    </>
  );
};

export default ApplyLeave;
