import React, { useEffect, useState } from "react";
import LeaveHeader from "../../components/Main/LeaveHeader";
import { MdDelete } from "react-icons/md";
import { FaRegEdit, FaTimes } from "react-icons/fa";
import axios from "axios";
import LeaveTypeModal from "../../components/LeaveCreation/LeaveTypeModal";

const LeaveList = () => {
  const [leaveData, setLeaveData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [leaveIdToDelete, setLeaveIdToDelete] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [leaveTypeToDelete, setLeaveTypeToDelete] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null); // State for selected leave to edit

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const response = await axios.get(
          "https://leave-module.vercel.app/api/leave-types"
        );
        setLeaveData(response.data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch leave data.");
        setIsLoading(false);
      }
    };
    fetchLeaveData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://leave-module.vercel.app/api/leave-types/${id}`
      );
      setLeaveData((prevData) => prevData.filter((leave) => leave._id !== id));
      setIsPopupVisible(false);
    } catch (err) {
      setError("Failed to delete the leave type.");
    }
  };

  const handleEdit = (leave) => {
    setSelectedLeave(leave); // Set the selected leave type for editing
    setIsModalOpen(true); // Open the modal
  };

  const handleConfirm = () => {
    if (inputValue === "Delete") {
      handleDelete(leaveIdToDelete);
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <>
      <LeaveHeader />
      <h1 className="text-2xl font-bold text-red-500 px-6 pt-6">
        Existing Leave Type / Available Leave Type
      </h1>
      <div className="p-8">
        <table className="w-full border border-gray-300 rounded-xl overflow-hidden shadow-lg">
          <thead className="bg-blue-900 text-center text-white">
            <tr>
              <th className="p-4 border-2 border-gray-400 text-center">Code</th>
              <th className="p-4 border-2 border-gray-400 text-center">Type</th>
              <th className="p-4 border-2 border-gray-400 text-center">
                No. of Days
              </th>
              <th className="p-4 border-2 border-gray-400 text-center">
                Carry Forward
              </th>
              <th className="p-4 border-2 border-gray-400 text-center">
                Max Carry Days
              </th>
              <th className="p-4 border-2 border-gray-400 text-center">
                Payable
              </th>
              <th className="p-4 border-2 border-gray-400 text-center">
                Documents
              </th>
              <th className="p-4 border-2 border-gray-400 text-center">
                En-Cashable
              </th>
              <th className="p-4 border-2 border-gray-400 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white text-center text-gray-800">
            {leaveData.map((leave, index) => (
              <tr
                key={leave._id}
                className={`border-b-2 border-gray-300 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-100"
                }`}
              >
                <td className="p-4">
                  <span
                    className="text-white font-normal p-1 rounded-md"
                    style={{ backgroundColor: leave.colorCode }}
                  >
                    {leave.code}
                  </span>
                </td>
                <td className="p-4 border-b-2 border-gray-300">{leave.type}</td>
                <td className="p-4 border-b-2 border-gray-300">
                  {leave.noOfDays}
                </td>
                <td className="p-4 border-b-2 border-gray-300">
                  {leave.options.carryForward ? "✔" : "❌"}
                </td>
                <td className="p-4 border-b-2 border-gray-300">
                  {leave.options.carryForward
                    ? leave.options.carryForwardOptions.allAvailableBalance
                      ? "All"
                      : `${leave.options.carryForwardOptions.noOfDays} days`
                    : "-"}
                </td>
                <td className="p-4 border-b-2 border-gray-300">
                  {leave.options.payable ? "✔" : "❌"}
                </td>
                <td className="p-4 border-b-2 border-gray-300">
                  {leave.options.documentProof ? "Required" : "Not Required"}
                </td>
                <td className="p-4 border-b-2 border-gray-300">
                  {leave.options.enCashable ? "✔" : "❌"}
                </td>
                <td className="p-4 border-r-2 border-gray-300">
                  <button
                    className="text-gray-700 p-2 rounded-lg"
                    onClick={() => {
                      setLeaveIdToDelete(leave._id);
                      setLeaveTypeToDelete(leave.type);
                      setIsPopupVisible(true);
                    }}
                  >
                    <MdDelete size={24} />
                  </button>
                  <button
                    className="text-gray-700 p-2 rounded-lg"
                    onClick={() => handleEdit(leave)}
                  >
                    <FaRegEdit size={24} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {isPopupVisible && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="bg-white rounded-lg px-6 pt-4 pb-6 shadow-lg w-96">
            <div className="flex justify-between items-center">
              <h2
                id="modal-title"
                className="text-lg font-bold mb-4 text-gray-700"
              >
                Confirm{" "}
                <span className="text-blue-800">{leaveTypeToDelete}</span>{" "}
                Deletion
              </h2>
              <button
                className="font-normal text-sm text-gray-700 hover:text-red-500 mb-3"
                onClick={() => setIsPopupVisible(false)}
              >
                <FaTimes size={24} />
              </button>
            </div>
            <p className="mb-6 text-gray-700 text-sm">
              Please type <span className="font-semibold">"Delete"</span> to
              confirm deletion of this leave type.
            </p>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type Delete"
              className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end gap-4">
              <button
                className={`${
                  inputValue === "Delete"
                    ? "bg-red-500"
                    : "bg-gray-400 cursor-not-allowed"
                } text-white font-normal text-lg px-4 py-1 rounded-lg shadow-lg`}
                onClick={handleConfirm}
                disabled={inputValue !== "Delete"}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Leave Type Modal */}
      <LeaveTypeModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedLeave={selectedLeave}
        setLeaveData={setLeaveData} // Update leave list on successful edit
      />
    </>
  );
};

export default LeaveList;
