import React, { useState, useEffect } from "react";
import { FaLock, FaCopy, FaPlus } from "react-icons/fa";
import ScheduleItem from "./ScheduleItem";
import ScheduleModal from "./ScheduleModal";
import DateNavigator from "./DateNavigator";
import { scheduleData } from "./ScheduleData"; // Import your modified scheduleData
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ImCross } from "react-icons/im";

const DailySchedule = () => {
  const [schedule, setSchedule] = useState(scheduleData);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTime, setNewTime] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("FaClock");
  const [iconColor, setIconColor] = useState("#000000");
  const [reminderTime, setReminderTime] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDateForCopy, setSelectedDateForCopy] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      schedule.forEach((item) => {
        if (item.reminder === now && !item.reminderTriggered) {
          alert(`Reminder: ${item.description}`);
          setSchedule((prev) =>
            prev.map((i) =>
              i === item ? { ...i, reminderTriggered: true } : i
            )
          );
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [schedule]);

  const toggleComplete = (index) => {
    setSchedule((prevSchedule) =>
      prevSchedule.map((item, i) =>
        i === index ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleCopy = () => {
    setIsCalendarOpen(true); // Open calendar modal on copy
  };

  const handleDateSelect = (date) => {
    setSelectedDateForCopy(date); // Set the selected date for copying tasks
  };

  const copyScheduleToDate = () => {
    if (selectedDateForCopy) {
      // Ensure the selected date is in the correct format (ISO string without the time part)
      const selectedDateString = selectedDateForCopy
        .toISOString()
        .split("T")[0];

      // Filter out the tasks from the current date
      const newSchedule = schedule
        .filter((item) => item.date === currentDate.toISOString().split("T")[0])
        .map((item) => ({
          ...item,
          date: selectedDateString, // Use selected date (not altered date)
        }));

      // Add the copied tasks to the schedule (keeping original tasks intact)
      setSchedule((prevSchedule) => [...prevSchedule, ...newSchedule]);

      // Close the calendar after copying tasks
      setIsCalendarOpen(false);
    }
  };

  const changeDay = (direction) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + (direction === "next" ? 1 : -1));
      return newDate;
    });
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setNewTime("");
    setNewDescription("");
    setSelectedIcon("FaClock");
    setIconColor("#000000");
    setReminderTime("");
  };

  const handleAddPlan = () => {
    if (newTime && newDescription) {
      setSchedule((prevSchedule) => [
        ...prevSchedule,
        {
          time: newTime,
          description: newDescription,
          completed: false,
          icon: selectedIcon,
          iconColor,
          reminder: reminderTime,
          reminderTriggered: false,
          date: currentDate.toISOString().split("T")[0], // Add current date to the new plan
        },
      ]);
      closeModal();
    }
  };

  // Filter the schedule by current date
  const filteredSchedule = schedule.filter(
    (item) => item.date === currentDate.toISOString().split("T")[0]
  );

  return (
    <div className="rounded-2xl bg-white shadow-lg h-64 p-4 flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg text-gray-800">Plan My Day</h3>
        <div className="flex items-center space-x-2">
          <FaLock className="text-gray-500" />
          <span className="text-gray-700">Private</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-2">
        <DateNavigator currentDate={currentDate} changeDay={changeDay} />
        <button
          onClick={handleCopy}
          className="text-gray-500 hover:text-gray-700"
          title="Copy Day"
        >
          <FaCopy />
        </button>
      </div>

      <div className="overflow-y-auto flex-grow">
        <ul className="space-y-2">
          {filteredSchedule.length === 0 ? (
            <li className="text-gray-500 text-center">No tasks for today</li>
          ) : (
            filteredSchedule.map((item, index) => (
              <ScheduleItem
                key={index}
                item={item}
                index={index}
                toggleComplete={toggleComplete}
              />
            ))
          )}
        </ul>
      </div>

      <button
        onClick={openModal}
        className="ml-auto px-2 py-1 bg-[#007b5e] text-white rounded-lg flex items-center space-x-1 hover:bg-[#124d3f]"
      >
        <FaPlus className="text-sm" />
        <span>Add Plan</span>
      </button>

      {isModalOpen && (
        <ScheduleModal
          closeModal={closeModal}
          newTime={newTime}
          setNewTime={setNewTime}
          newDescription={newDescription}
          setNewDescription={setNewDescription}
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
          iconColor={iconColor}
          setIconColor={setIconColor}
          handleAddPlan={handleAddPlan}
          reminderTime={reminderTime}
          setReminderTime={setReminderTime}
        />
      )}

      {/* Calendar Modal */}
      {isCalendarOpen && (
        <div className="absolute inset-0 bg-gray-800 bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-3  relative">
            {/* Title and Close Button on the Same Line */}
            <div className="flex justify-between mb-3 items-center">
              <h3 className="text-xl font-semibold text-gray-800">
                Copy Tasks to Selected Date
              </h3>
              <button
                onClick={() => setIsCalendarOpen(false)}
                className="text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                <ImCross className="text-xl" />
              </button>
            </div>

            {/* Calendar */}
            <DatePicker
              selected={selectedDateForCopy}
              onChange={handleDateSelect}
              inline
              className="border border-gray-300 rounded-md  p-2 w-full"
            />

            {/* Copy Tasks Button */}
            <button
              onClick={copyScheduleToDate}
              className="w-full py-2 bg-[#007b5e] text-white font-semibold rounded-lg hover:bg-green-900 transition-all"
            >
              Copy Tasks
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailySchedule;
