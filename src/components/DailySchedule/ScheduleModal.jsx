import React, { useState } from "react";

const ScheduleModal = ({
  closeModal,
  newTime,
  setNewTime,
  newDescription,
  setNewDescription,
  handleAddPlan,
}) => {
  const [isReminderOn, setIsReminderOn] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState("5 min");

  const reminderOptions = [
    "5 min",
    "15 min",
    "30 min",
    "1 hour",
    "2 hours",
    "4 hours",
  ];

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

        <div className="flex items-center mb-4">
          <label className="mr-2">Set Reminder</label>
          <input
            type="checkbox"
            checked={isReminderOn}
            onChange={() => setIsReminderOn(!isReminderOn)}
            className="toggle-checkbox"
          />
        </div>

        {isReminderOn && (
          <div className="mb-4 h-24 overflow-y-scroll scrollbar-hide border rounded-lg">
            {reminderOptions.map((option, index) => (
              <div
                key={index}
                onClick={() => setSelectedReminder(option)}
                className={`p-2 text-center cursor-pointer ${
                  selectedReminder === option
                    ? "bg-[#007b5e] text-white"
                    : "bg-gray-100 text-gray-800"
                } hover:bg-[#007b5e] hover:text-white`}
              >
                {option}
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end space-x-2">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={() => handleAddPlan(selectedReminder)}
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
