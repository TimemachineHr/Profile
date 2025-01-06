import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import { ImCross } from "react-icons/im";

const ScheduleModal = ({
  closeModal,
  newTime,
  setNewTime,
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

    const [hours, minutes] = newTime.split(":");
    userTime.setHours(hours, minutes, 0);

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
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96 relative">
        <h2 className="text-lg font-semibold mb-4">Add New Plan</h2>
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          <ImCross />
        </button>

        {/* Time Input with Icon Picker */}
        <div className="flex items-center mb-3">
          <div
            className="cursor-pointer text-2xl mr-3"
            onClick={() => setIsIconPickerOpen(!isIconPickerOpen)}
          >
            {React.createElement(FaIcons[selectedIcon], {
              style: { fontSize: "24px", color: iconColor },
            })}
          </div>
          <input
            type="time"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Icon Picker */}
        {isIconPickerOpen && (
          <div className="absolute bg-white border rounded-lg shadow-lg p-3 w-full z-50">
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

        {/* Description Input */}
        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          className="w-full p-2 mb-3 border rounded-lg"
          placeholder="Enter description"
        />

        {/* Reminder Section */}
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
            {dynamicReminderOptions.length > 0 ? (
              dynamicReminderOptions.map((option, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedReminder(option.label)}
                  className={`p-2 text-center cursor-pointer ${
                    selectedReminder === option.label
                      ? "bg-[#007b5e] text-white"
                      : "bg-gray-100 text-gray-800"
                  } hover:bg-[#007b5e] hover:text-white`}
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
