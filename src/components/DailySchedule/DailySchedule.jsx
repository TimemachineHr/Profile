import React, { useState } from "react";
import { FaLock, FaCopy, FaPlus } from "react-icons/fa";
import ScheduleItem from "./ScheduleItem";
import ScheduleModal from "./ScheduleModal";
import DateNavigator from "./DateNavigator";
import { scheduleData } from "./ScheduleData";

const DailySchedule = () => {
  const [schedule, setSchedule] = useState(scheduleData);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTime, setNewTime] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const toggleComplete = (index) => {
    setSchedule((prevSchedule) =>
      prevSchedule.map((item, i) =>
        i === index ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleCopy = () => {
    const scheduleText = schedule
      .map((item) => `${item.time} - ${item.description}`)
      .join("\n");
    navigator.clipboard.writeText(scheduleText);
    alert("Schedule copied to clipboard!");
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
  };

  const handleAddPlan = () => {
    if (newTime && newDescription) {
      setSchedule([
        ...schedule,
        { time: newTime, description: newDescription, completed: false },
      ]);
      closeModal();
    }
  };

  return (
    <div className="rounded-2xl bg-white shadow-lg h-64 p-4 flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg text-gray-800 flex items-center">
          Plan My Day
        </h3>

        <div className="flex items-center space-x-2">
          <FaLock className="text-gray-500" />
          <span className="text-gray-700 font-md">Private</span>
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
        <ul className="text-sm text-gray-600 space-y-2">
          {schedule.map((item, index) => (
            <ScheduleItem
              key={index}
              item={item}
              index={index}
              toggleComplete={toggleComplete}
            />
          ))}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <ScheduleModal
            closeModal={closeModal}
            newTime={newTime}
            setNewTime={setNewTime}
            newDescription={newDescription}
            setNewDescription={setNewDescription}
            handleAddPlan={handleAddPlan}
          />
        </div>
      )}
    </div>
  );
};

export default DailySchedule;
