import React, { useState } from "react";
import { AiFillNotification } from "react-icons/ai";
import { PiListPlusBold } from "react-icons/pi";
import { LuFilter } from "react-icons/lu";
import { FaTimes } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
import CommunicationHeader from "../../components/Main/CommunicationHeader";
import LetterTemplates from "../../components/Communication/LetterTemplates";

const Communication = () => {
  const [communications, setCommunications] = useState([
    { id: 1, type: "Form", name: "New Hardware Require", status: "Draft" },
    { id: 2, type: "Form", name: "Feedback Form", status: "Published" },
    { id: 3, type: "Letter", name: "Leave Letter", status: "Draft" },
    {
      id: 4,
      type: "Letter",
      name: "Request for Extension",
      status: "Published",
    },
  ]);
  const [filter, setFilter] = useState("All");
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [showPublishPopup, setShowPublishPopup] = useState(false);
  const [selectedCommunication, setSelectedCommunication] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [hasAnnouncements, setHasAnnouncements] = useState(false);

  const handleNameChange = (id) => {
    setCommunications(
      communications.map((comm) =>
        comm.id === id ? { ...comm, name: editingName } : comm
      )
    );
    setEditingId(null);
  };

  const handleUpdateStatus = (id, newStatus) => {
    setCommunications(
      communications.map((comm) =>
        comm.id === id ? { ...comm, status: newStatus } : comm
      )
    );
  };

  const handleAddCommunication = (type) => {
    const newCommunication = {
      id: communications.length + 1,
      type,
      name: `New ${type}`,
      status: "Draft",
    };
    setCommunications((prev) => [...prev, newCommunication]);
  };

  const [showAnnouncementPopup, setShowAnnouncementPopup] = useState(false);
  const [announcement, setAnnouncement] = useState({
    audience: "All",
    method: "Email",
    message: "",
  });

  const handleAnnouncementChange = (field, value) => {
    setAnnouncement((prev) => ({ ...prev, [field]: value }));
  };

  const handleSendAnnouncement = () => {
    if (
      announcement.subject &&
      announcement.message &&
      announcement.businessUnit &&
      announcement.department &&
      announcement.designation
    ) {
      setAnnouncements((prev) => [...prev, announcement]);
      setHasAnnouncements(true);
      setShowAnnouncementPopup(false);
    } else {
      alert("Please fill in all the fields before sending the announcement.");
    }
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

      <div className="px-6 pt-6 h-[calc(100vh-120px)] flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-6">
            <div className="px-4">
              <h3 className="text-xl font-semibold mb-4">Forms</h3>
              <div className="flex gap-6 overflow-x-auto">
                {filteredCommunications
                  .filter((comm) => comm.type === "Form")
                  .map((comm) => (
                    <div
                      key={comm.id}
                      className="w-28 h-28 p-4 border rounded-xl shadow-md relative bg-white hover:cursor-pointer"
                    >
                      <div
                        onClick={() => {
                          if (comm.status === "Draft") {
                            handlePublishClick(comm);
                          } else {
                            handleUpdateStatus(comm.id, "Published");
                          }
                        }}
                        className={`absolute bottom-4 right-0 px-3 py-1 text-xs rounded text-white ${
                          comm.status === "Draft"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                      >
                        {comm.status}
                      </div>

                      {comm.status === "Draft" && editingId === comm.id ? (
                        <input
                          type="text"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          onBlur={() => handleNameChange(comm.id)}
                          className="w-full text-md font-semibold border-b focus:outline-none"
                          autoFocus
                        />
                      ) : (
                        <h3
                          className={`text-sm font-semibold ${
                            comm.status === "Draft" ? "hover:underline" : ""
                          }`}
                          onClick={() => {
                            if (comm.status === "Draft") {
                              setEditingId(comm.id);
                              setEditingName(comm.name);
                            }
                          }}
                        >
                          {comm.name}
                        </h3>
                      )}
                    </div>
                  ))}
              </div>
            </div>

            {/* <div className="p-4">
              <h3 className="text-xl font-semibold mb-4">Letters</h3>
              <div className="flex gap-6 overflow-x-auto">
                {filteredCommunications
                  .filter((comm) => comm.type === "Letter")
                  .map((comm) => (
                    <div
                      key={comm.id}
                      className="w-28 h-28 p-4 border rounded-xl shadow-md relative bg-white hover:cursor-pointer"
                    >
                      <div
                        onClick={() => {
                          if (comm.status === "Draft") {
                            handlePublishClick(comm);
                          } else {
                            handleUpdateStatus(comm.id, "Published");
                          }
                        }}
                        className={`absolute bottom-4 right-0 px-3 py-1 text-xs rounded text-white ${
                          comm.status === "Draft"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                      >
                        {comm.status}
                      </div>

                      {comm.status === "Draft" && editingId === comm.id ? (
                        <input
                          type="text"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          onBlur={() => handleNameChange(comm.id)}
                          className="w-full text-md font-semibold border-b focus:outline-none"
                          autoFocus
                        />
                      ) : (
                        <h3
                          className={`text-sm font-semibold ${
                            comm.status === "Draft" ? "hover:underline" : ""
                          }`}
                          onClick={() => {
                            if (comm.status === "Draft") {
                              setEditingId(comm.id);
                              setEditingName(comm.name);
                            }
                          }}
                        >
                          {comm.name}
                        </h3>
                      )}
                    </div>
                  ))}
              </div>
            </div> */}
            <LetterTemplates filteredCommunications={filteredCommunications} />
          </div>
        </div>
        <div className="flex flex-col border-t-2 sm:flex-row gap-6 sticky bottom-0 bg-white">
          {/* Announcements Section */}
          <div className="w-full sm:w-1/2 border rounded-lg shadow mt-2 p-4">
            <h2 className="text-lg font-bold mb-4 inline-flex items-center">
              <AiFillNotification className="mr-2" /> Announcements
            </h2>

            {hasAnnouncements ? (
              <div className="space-y-4">
                {announcements.map((announcement, index) => (
                  <div
                    key={index}
                    className="border border-gray-300 rounded-lg p-4 bg-gray-50 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-md font-semibold text-blue-900">
                        {announcement.subject}
                      </h3>
                      <span className="text-md font-semibold text-blue-800">
                        {announcement.createdAt
                          ? new Date(announcement.createdAt).toLocaleString(
                              "en-US",
                              {
                                dateStyle: "medium",
                                timeStyle: "short",
                              }
                            )
                          : "Nov 26, 2024"}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">
                      {announcement.message.substring(0, 100)}...
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {announcement.businessUnit} - {announcement.department} |{" "}
                      {announcement.designation}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">
                There are no company announcements yet. Create now to notify
                your company what's happening.
              </p>
            )}

            <button
              className="mt-4 inline-flex items-center border border-pink-600 text-pink-600 px-4 py-2 rounded-full hover:bg-pink-600 hover:text-white"
              onClick={() => setShowAnnouncementPopup(true)}
            >
              <PiListPlusBold className="mr-2" /> Create Announcement
            </button>
          </div>

          {/* Filter Options Section */}
          <div className="w-full sm:w-1/2 relative">
            <button
              title="Filter Options"
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
                          ? "bg-blue-900 text-white"
                          : "bg-gray-100 text-gray-700"
                      } hover:bg-blue-800 hover:text-white`}
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

      {showAnnouncementPopup && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              {/* Dynamic Title */}
              <h3 className="text-lg font-semibold text-blue-900">
                {announcement.subject || "New Announcement"}
              </h3>
              <button
                onClick={() => setShowAnnouncementPopup(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <div className="space-y-4">
              {/* Multi-Dropdown Row */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">
                    Business Unit
                  </label>
                  <select
                    className="w-full border border-gray-300 p-2 rounded-md"
                    value={announcement.businessUnit}
                    onChange={(e) =>
                      handleAnnouncementChange("businessUnit", e.target.value)
                    }
                  >
                    <option value="All">All</option>
                    <option value="Business Unit 1">Business Unit 1</option>
                    <option value="Business Unit 2">Business Unit 2</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">
                    Department
                  </label>
                  <select
                    className="w-full border border-gray-300 p-2 rounded-md"
                    value={announcement.department}
                    onChange={(e) =>
                      handleAnnouncementChange("department", e.target.value)
                    }
                  >
                    <option value="All">All</option>
                    <option value="Department 1">Department 1</option>
                    <option value="Department 2">Department 2</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">
                    Designation
                  </label>
                  <select
                    className="w-full border border-gray-300 p-2 rounded-md"
                    value={announcement.designation}
                    onChange={(e) =>
                      handleAnnouncementChange("designation", e.target.value)
                    }
                  >
                    <option value="All">All</option>
                    <option value="Manager">Manager</option>
                    <option value="Heads">Heads</option>
                  </select>
                </div>
              </div>

              {/* Title Input */}
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded-md"
                  value={announcement.subject}
                  onChange={(e) =>
                    handleAnnouncementChange("subject", e.target.value)
                  }
                />
              </div>

              {/* Message Textarea */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  className="w-full border border-gray-300 p-2 rounded-md"
                  rows="4"
                  value={announcement.message}
                  onChange={(e) =>
                    handleAnnouncementChange("message", e.target.value)
                  }
                ></textarea>
              </div>

              {/* Send Via and Send Button */}
              <div className="flex items-center gap-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">
                    Send Via
                  </label>
                  <select
                    className="w-full border border-gray-300 p-2 rounded-md"
                    value={announcement.method}
                    onChange={(e) =>
                      handleAnnouncementChange("method", e.target.value)
                    }
                  >
                    <option value="Email">Email</option>
                    <option value="Message">Message</option>
                  </select>
                </div>
                <div>
                  <button
                    onClick={handleSendAnnouncement}
                    className="bg-blue-900 mt-6 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    <IoIosSend size={24} className="inline pr-2" />
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPublishPopup && selectedCommunication && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">
              Change the status of this draft to "Published"?
            </h3>
            {/* Toggle Button for External Users */}
            <div className="flex items-center mt-4">
              <label className="text-sm font-medium mr-4">External Party</label>
              <button
                className={`relative inline-flex items-center h-6 rounded-full w-11 ${
                  announcement.externalUsers ? "bg-blue-600" : "bg-gray-300"
                }`}
                onClick={() =>
                  handleAnnouncementChange(
                    "externalUsers",
                    !announcement.externalUsers
                  )
                }
              >
                <span
                  className={`${
                    announcement.externalUsers
                      ? "translate-x-6"
                      : "translate-x-1"
                  } inline-block w-4 h-4 transform bg-white rounded-full`}
                ></span>
              </button>
            </div>
            <div className="flex justify-end mt-6 items-end">
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
