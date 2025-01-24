import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaCopy, FaPlus } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DateNavigator from "./DateNavigator";
import ScheduleItem from "./ScheduleItem";

const AllTaskModal = ({
  isOpen,
  onClose,
  schedule,
  handleCopy,
  toggleComplete,
  openModal,
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredSchedule, setFilteredSchedule] = useState([]);

  // Filter tasks based on the current date
  useEffect(() => {
    const filtered = schedule.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate.toLocaleDateString() === currentDate.toLocaleDateString();
    });
    setFilteredSchedule(filtered);
  }, [currentDate, schedule]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setCurrentDate(date); // Sync currentDate with selectedDate
    setShowCalendar(false); // Close the calendar after selection
  };

  const changeDay = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(
      direction === "next" ? newDate.getDate() + 1 : newDate.getDate() - 1
    );
    setCurrentDate(newDate);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex justify-center items-center z-40">
      <div className="bg-white rounded-lg shadow-lg p-6 pt-2 w-1/2 max-h-[90vh] overflow-y-auto relative">
        {/* Header with All Tasks Title and Close Button */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Plan My Day</h3>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <ImCross />
          </button>
        </div>

        {/* Header with Date Navigator, Calendar Icon, and Copy Button */}
        <div className="flex justify-between items-center mb-4 mt-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className="text-gray-600 hover:text-gray-800"
              title="Select Date"
            >
              <FaCalendarAlt className="text-xl" />
            </button>
            <DateNavigator currentDate={currentDate} changeDay={changeDay} />
            {showCalendar && (
              <div className="absolute z-50 top-12">
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  inline
                  calendarClassName="rounded-lg shadow-lg"
                />
              </div>
            )}
          </div>

          <button
            onClick={handleCopy}
            className="text-gray-500 hover:text-gray-700"
            title="Copy Day"
          >
            <FaCopy />
          </button>
        </div>

        {/* Tasks for the Selected Date */}
        <ul className="space-y-2 mb-4">
          {filteredSchedule.length === 0 ? (
            <li className="text-gray-500 text-center">
              No tasks for this date
            </li>
          ) : (
            filteredSchedule.map((task, index) => (
              <ScheduleItem
                key={task._id}
                item={task}
                index={index}
                toggleComplete={toggleComplete}
                isLast={index === filteredSchedule.length - 1}
              />
            ))
          )}
        </ul>

        {/* Add Plan Button */}
        <button
          onClick={openModal}
          className="ml-auto px-2 py-1 bg-[#007b5e] text-white rounded-lg flex items-center space-x-1 hover:bg-[#124d3f]"
        >
          <FaPlus className="text-sm" />
          <span>Add Plan</span>
        </button>
      </div>
    </div>
  );
};

export default AllTaskModal;
