import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import LeaveCalender from "../../../components/NewLeave/Client/LeaveCalender";
import LeaveStatus from "../../../components/NewLeave/Client/LeaveStatus";
import LeaveTable from "../../../components/NewLeave/Client/LeaveTable";
import { FaPaperclip } from "react-icons/fa6";
const ClientLeave = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const [claimType, setClaimType] = useState("");
  const [view, setView] = useState("Self");
  const [name, setName] = useState("");
  const [selectedOption, setSelectedOption] = useState("Single");
  const [hourlyStart, setHourlyStart] = useState("");
  const [hourlyEnd, setHourlyEnd] = useState("");
  const [compensationDates, setCompensationDates] = useState({
    start: "",
    end: "",
  });
  const toggleView = () => {
    setView(view === "Team" ? "Self" : "Team");
  };
  useEffect(() => {
    if (view === "Self") {
      setName("John Doe");
    } else {
      setName("");
    }
  }, [view]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Leave</h1>
        <button
          onClick={toggleModal}
          className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          <FaPlus className="mr-2 inline" />
          Apply Leave
        </button>
      </div>

      <div className="flex flex-wrap gap-4 p-4">
        <div className="flex-1 min-w-[60%] max-w-[70%] overflow-hidden">
          <LeaveCalender />
        </div>
        <div className="flex-1 min-w-[30%] max-w-[35%] overflow-y-auto h-[calc(100vh-4rem)] p-4">
          <LeaveStatus />
        </div>
      </div>

      <LeaveTable />
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-3/4 md:w-1/2">
            <div className="bg-blue-400 text-white px-4 py-4 flex items-center rounded-md mb-2 justify-between">
              {/* Header Text */}
              <h2 className="text-lg font-semibold">Apply Leave</h2>

              {/* Toggle and Buttons */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setView("Team")}
                  className={`px-4 py-2 rounded-l-lg ${
                    view === "Team"
                      ? "text-blue-200 font-semibold"
                      : "text-white hover:text-gray-300"
                  }`}
                >
                  Team
                </button>
                <label className="relative inline-block w-10 h-6">
                  <input
                    type="checkbox"
                    className="opacity-0 w-0 h-0"
                    onChange={toggleView}
                  />
                  <span className="absolute cursor-pointer inset-0 rounded-full bg-gray-300 before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all checked:before:translate-x-4 checked:bg-blue-500"></span>
                </label>
                <button
                  onClick={() => setView("Self")}
                  className={`px-4 py-2 rounded-r-lg ${
                    view === "Self"
                      ? "text-blue-200 font-semibold"
                      : "text-white hover:text-gray-300"
                  }`}
                >
                  Self
                </button>
              </div>
            </div>
            <div className="flex gap-8 p-9">
              <div className="w-1/2 space-y-4">
                <div className="flex flex-col">
                  <label className="text-gray-700 text-md font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={view === "Self"}
                    className={`p-2 border rounded-md w-full ${
                      view === "Self" ? "bg-gray-200 cursor-not-allowed" : ""
                    }`}
                    placeholder="Enter Employee name"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-700 text-md font-medium mb-2">
                    Leave Type
                  </label>
                  <select
                    value={claimType}
                    onChange={(e) => setClaimType(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select Leave Type</option>
                    <option value="Sick">Sick</option>
                    <option value="Vacation">Vacation</option>
                    <option value="Maternity">Maternity</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <h2 className="text-md text-gray-700   font-semibold mb-4">
                    Select Duration
                  </h2>
                  {["Single", "Multiple", "First Half", "Second Half"].map(
                    (option) => (
                      <label
                        key={option}
                        className="flex items-center pl-2 space-x-3"
                      >
                        <input
                          type="radio"
                          value={option}
                          checked={selectedOption === option}
                          onChange={() => setSelectedOption(option)}
                          className="form-radio text-blue-600"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    )
                  )}
                  {/* <label className="flex items-center pl-2 space-x-3">
                    <input
                      type="radio"
                      value="Hourly Time-off"
                      checked={selectedOption === "Hourly Time-off"}
                      onChange={() => setSelectedOption("Hourly Time-off")}
                      className="form-radio text-blue-600"
                    />
                    <span className="text-gray-700">Hourly Time-off</span>
                  </label> */}
                </div>
              </div>

              <div className="w-1/2 space-y-4">
                <div className="flex flex-col">
                  <label className="text-gray-700 text-md font-medium mb-2">
                    Documents
                  </label>
                  <div className="flex items-center border rounded-md overflow-hidden">
                    {/* Left Side: Attach Icon */}
                    <span className="w-12 p-2 rounded-md bg-gray-100 text-gray-700 flex justify-center items-center">
                      <FaPaperclip className="text-lg" />
                    </span>

                    {/* Hidden File Input */}
                    <input type="file" className="hidden" id="file-upload" />

                    {/* File Name / Label */}
                    <label
                      htmlFor="file-upload"
                      className="w-full p-2 text-gray-700 cursor-pointer truncate"
                    >
                      Upload
                    </label>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-700 text-md font-medium mb-2">
                    Reason for Absent
                  </label>
                  <textarea
                    className="p-2 border rounded-md"
                    placeholder="Enter your reason"
                  ></textarea>
                </div>

                {["Single", "Multiple"].includes(selectedOption) && (
                  <div className="flex flex-col">
                    <label className="text-gray-700 text-md font-medium mb-2">
                      Compensation for Work Done
                    </label>
                    {selectedOption === "Single" && (
                      <input
                        type="date"
                        value={compensationDates.start}
                        onChange={(e) =>
                          setCompensationDates({
                            ...compensationDates,
                            start: e.target.value,
                          })
                        }
                        className="p-2 border rounded-md"
                      />
                    )}
                    {selectedOption === "Multiple" && (
                      <div className="flex items-center space-x-4">
                        <input
                          type="date"
                          value={compensationDates.start}
                          onChange={(e) =>
                            setCompensationDates({
                              ...compensationDates,
                              start: e.target.value,
                            })
                          }
                          className="p-2 border rounded-md"
                        />

                        <span className="text-gray-700">to</span>

                        <input
                          type="date"
                          value={compensationDates.end}
                          onChange={(e) =>
                            setCompensationDates({
                              ...compensationDates,
                              end: e.target.value,
                            })
                          }
                          className="p-2 border rounded-md"
                        />
                      </div>
                    )}
                  </div>
                )}

                <div className="flex flex-col">
                  <label className="text-gray-700 text-md font-medium mb-2">
                    To Be Taken On
                  </label>
                  <input type="date" className="p-2 border rounded-md" />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4 m-6">
              <button className="bg-blue-800 text-white px-4 py-2 rounded-lg">
                Submit
              </button>
              <button
                onClick={toggleModal}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientLeave;

// Off-In-Leau
// OIL = Compensation Leave for work done on Government Holidays
