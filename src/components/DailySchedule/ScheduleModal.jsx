import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import { ImCross } from "react-icons/im";

const ScheduleModal = ({
  closeModal,
  newStartTime,
  setNewStartTime,
  newEndTime,
  setNewEndTime,
  newDescription,
  setNewDescription,
  handleAddPlan,
  selectedIcon,
  setSelectedIcon,
  iconColor,
  setIconColor,
}) => {
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);
  const [isReminderOn, setIsReminderOn] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState("5 min");

  const icons = Object.entries(FaIcons);

  const handleIconSelect = (iconName) => {
    setSelectedIcon(iconName);
    setIsIconPickerOpen(false);
  };

  const generateReminderOptions = () => {
    const currentTime = new Date();
    const userTime = new Date();

    const [startHours, startMinutes] = newStartTime.split(":");
    userTime.setHours(startHours, startMinutes, 0);

    const diffMinutes = Math.floor(
      (userTime.getTime() - currentTime.getTime()) / (1000 * 60)
    );

    const options = [
      { label: "5 min", value: 5 },
      { label: "15 min", value: 15 },
      { label: "30 min", value: 30 },
      { label: "1 hour", value: 60 },
      { label: "2 hours", value: 120 },
      { label: "4 hours", value: 240 },
    ];

    return options.filter((option) => option.value <= diffMinutes);
  };

  const dynamicReminderOptions = generateReminderOptions();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm relative">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
        >
          <ImCross size={18} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {newDescription ? newDescription : "Add New Plan"}
        </h2>

        {/* Icon Picker, Start Time, and End Time */}
        <div className="flex items-center space-x-4 mb-4">
          {/* Icon Picker */}
          <div className="relative">
            <div
              className="cursor-pointer rounded-full p-3 text-2xl shadow-md"
              style={{ backgroundColor: iconColor }}
              onClick={() => setIsIconPickerOpen(!isIconPickerOpen)}
            >
              {React.createElement(FaIcons[selectedIcon], {
                style: { fontSize: "24px", color: "white" },
              })}
            </div>

            {isIconPickerOpen && (
              <div className="absolute bg-white border rounded-lg shadow-lg p-3 w-64 mt-2 left-0 z-50">
                <div className="grid grid-cols-5 gap-2 max-h-40 overflow-y-auto">
                  {icons.map(([iconName, IconComponent]) => (
                    <div
                      key={iconName}
                      className={`p-2 border rounded cursor-pointer ${
                        selectedIcon === iconName ? "bg-gray-300" : ""
                      }`}
                      onClick={() => handleIconSelect(iconName)}
                    >
                      <IconComponent style={{ fontSize: "20px" }} />
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-2 border-t flex justify-between">
                  <label>Icon Color:</label>
                  <input
                    type="color"
                    value={iconColor}
                    onChange={(e) => setIconColor(e.target.value)}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Start Time Input */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">
              Start Time:
            </label>
            <input
              type="time"
              value={newStartTime}
              onChange={(e) => setNewStartTime(e.target.value)}
              className="p-2 border rounded-lg shadow-sm w-28"
            />
          </div>

          {/* End Time Input */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">End Time:</label>
            <input
              type="time"
              value={newEndTime}
              onChange={(e) => setNewEndTime(e.target.value)}
              className="p-2 border rounded-lg shadow-sm w-28"
            />
          </div>
        </div>

        {/* Description Input */}
        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          className="w-full p-3 border rounded-lg shadow-sm mb-4"
          placeholder="Enter description"
        />

        {/* Reminder Section */}
        <div className="flex items-center mb-4">
          <label className="mr-3 text-gray-700 font-medium">
            Set Reminder:
          </label>
          <input
            type="checkbox"
            checked={isReminderOn}
            onChange={() => setIsReminderOn(!isReminderOn)}
            className="w-5 h-5 accent-[#007b5e]"
          />
        </div>

        {isReminderOn && (
          <div className="mb-4 h-24 overflow-y-scroll scrollbar-hide border rounded-lg shadow-inner p-2">
            {dynamicReminderOptions.length > 0 ? (
              dynamicReminderOptions.map((option, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedReminder(option.label)}
                  className={`p-2 text-center cursor-pointer rounded-lg ${
                    selectedReminder === option.label
                      ? "bg-[#007b5e] text-white"
                      : "bg-gray-100 text-gray-800"
                  } hover:bg-[#007b5e] hover:text-white transition`}
                >
                  {option.label}
                </div>
              ))
            ) : (
              <div className="p-2 text-center text-gray-500">
                No reminders available for the selected time.
              </div>
            )}
          </div>
        )}

        {/* Add Plan Button */}
        <div className="flex justify-end">
          <button
            onClick={() => handleAddPlan(selectedReminder)}
            className="px-6 py-2 bg-[#007b5e] text-white rounded-lg hover:bg-[#124d3f] transition"
          >
            Add Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;
