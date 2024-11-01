import React from "react";

const ScheduleModal = ({
  closeModal,
  newTime,
  setNewTime,
  newDescription,
  setNewDescription,
  handleAddPlan,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-80">
        <h2 className="text-lg font-semibold mb-4">Add New Plan</h2>
        <input
          type="time"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
          className="w-full p-2 mb-3 border rounded-lg"
          placeholder="Enter time"
        />
        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          className="w-full p-2 mb-3 border rounded-lg"
          placeholder="Enter description"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleAddPlan}
            className="px-4 py-2 bg-[#007b5e] text-white rounded-lg hover:bg-[#124d3f]"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;
