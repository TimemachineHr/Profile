import React, { useState } from "react";
import { AiFillNotification } from "react-icons/ai";
import { PiListPlusBold } from "react-icons/pi";
import { LuFilter } from "react-icons/lu";
import CommunicationHeader from "../../components/Main/CommunicationHeader";

const Communication = () => {
  const [communications, setCommunications] = useState([]);
  const [filter, setFilter] = useState("All");
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [showPublishPopup, setShowPublishPopup] = useState(false);
  const [selectedCommunication, setSelectedCommunication] = useState(null);

  const handleAddCommunication = (type) => {
    setCommunications([
      ...communications,
      {
        id: Date.now(),
        type,
        status: "Draft",
      },
    ]);
  };

  const handleUpdateStatus = (id, newStatus) => {
    setCommunications(
      communications.map((comm) =>
        comm.id === id ? { ...comm, status: newStatus } : comm
      )
    );
  };

  const filteredCommunications = communications.filter((comm) => {
    if (filter === "All") return true;
    return comm.status === filter;
  });

  const handlePublishClick = (comm) => {
    setSelectedCommunication(comm);
    setShowPublishPopup(true);
  };

  const handleConfirmPublish = () => {
    if (selectedCommunication) {
      handleUpdateStatus(selectedCommunication.id, "Published");
      setShowPublishPopup(false);
    }
  };

  return (
    <>
      <CommunicationHeader onAddCommunication={handleAddCommunication} />

      <div className="p-6 h-[calc(100vh-120px)] flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mt-6 mb-6">
            <div className="col-span-full">
              <h3 className="text-xl font-semibold mb-4">Forms</h3>
              {filteredCommunications
                .filter((comm) => comm.type === "Form")
                .map((comm) => (
                  <div
                    key={comm.id}
                    className="w-36 h-36 p-4 border rounded-xl shadow-md relative bg-white hover:cursor-pointer"
                    onClick={() => {
                      if (comm.status === "Draft") {
                        handlePublishClick(comm);
                      } else {
                        handleUpdateStatus(comm.id, "Published");
                      }
                    }}
                  >
                    <div
                      className={`absolute bottom-4 right-0 px-3 py-1 text-xs rounded text-white ${
                        comm.status === "Draft"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    >
                      {comm.status}
                    </div>
                    <h3 className="text-lg font-semibold">{comm.type}</h3>
                  </div>
                ))}
            </div>

            {/* Letter Blocks */}
            <div className="col-span-full">
              <h3 className="text-xl font-semibold mb-4">Letters</h3>
              {filteredCommunications
                .filter((comm) => comm.type === "Letter")
                .map((comm) => (
                  <div
                    key={comm.id}
                    className="w-36 h-36 p-4 border rounded-xl shadow-md relative bg-white hover:cursor-pointer"
                    onClick={() => {
                      if (comm.status === "Draft") {
                        handlePublishClick(comm);
                      } else {
                        handleUpdateStatus(comm.id, "Published");
                      }
                    }}
                  >
                    <div
                      className={`absolute bottom-4 right-0 px-3 py-1 text-xs rounded text-white ${
                        comm.status === "Draft"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    >
                      {comm.status}
                    </div>
                    <h3 className="text-lg font-semibold">{comm.type}</h3>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-col sm:flex-row gap-6  sticky bottom-0 bg-white ">
          <div className="w-1/2 sm:w-1/2 border rounded-lg shadow p-6">
            <h2 className="text-lg font-bold mb-4 inline-flex items-center">
              <AiFillNotification className="mr-2" /> Announcements
            </h2>
            <p className="text-gray-600">
              There are no company announcements yet. Create now to notify your
              company what's happening.
            </p>
            <button className="mt-4 inline-flex items-center border border-pink-600 text-pink-600 px-4 py-2 rounded-full hover:bg-pink-600 hover:text-white">
              <PiListPlusBold className="mr-2" /> Create Announcement
            </button>
          </div>

          <div className="w-full sm:w-1/2 relative">
            <button
              onClick={() => setShowFilterPopup((prev) => !prev)}
              className="absolute bottom-4 right-4 bg-gray-200 text-gray-600 p-2 rounded-full hover:bg-gray-300"
            >
              <LuFilter size={24} />
            </button>

            {showFilterPopup && (
              <div className="absolute bottom-16 right-0 bg-white border rounded-lg shadow-lg p-4 z-10 max-w-xs">
                <h3 className="text-sm font-semibold mb-2">Filter Options</h3>
                <div className="flex flex-col gap-2">
                  {["All", "Draft", "Published"].map((option) => (
                    <button
                      key={option}
                      className={`text-left px-4 py-2 rounded-md ${
                        filter === option
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700"
                      } hover:bg-blue-600 hover:text-white`}
                      onClick={() => {
                        setFilter(option);
                        setShowFilterPopup(false);
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showPublishPopup && selectedCommunication && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">
              Change the status of this draft to "Published"?
            </h3>
            <div className="flex justify-end items-end">
              <button
                onClick={handleConfirmPublish}
                className="bg-green-500 text-white px-4 py-2 rounded-xl mr-4"
              >
                Yes, Publish
              </button>
              <button
                onClick={() => setShowPublishPopup(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Communication;
