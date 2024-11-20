import React, { useState } from "react";
import ApplicationItem from "./ApplicationItem";
import Popup from "./Popup";
import { applicationData } from "./data";
import { IoMdOpen } from "react-icons/io";

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

  return (
    <>
      <div className="rounded-2xl bg-white shadow-lg p-4 flex flex-col h-64 w-full">
        <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
          Previous Applications
        </h3>

        <div
          className="overflow-y-auto flex-grow rounded-lg p-2"
          style={{ maxHeight: "300px" }}
        >
          <ul>
            {applicationData.map((app, index) => (
              <ApplicationItem
                key={index}
                title={app.title}
                code={app.code}
                daysOrAmount={app.daysOrAmount}
                status={app.status}
              />
            ))}
          </ul>
        </div>

        <button
          onClick={handlePopupOpen}
          className="ml-auto  px-2 py-1 bg-[#007b5e] text-white rounded-lg flex items-center space-x-1 hover:bg-[#124d3f]"
        >
          <IoMdOpen />
          <span>Apply</span>
        </button>
      </div>

      {showPopup && (
        <Popup onClose={handlePopupClose} onSelect={handleRedirect} />
      )}
    </>
  );
};

export default ApplyLeave;
