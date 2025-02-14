import React, { useState, useEffect } from "react";
import { FaLock, FaCopy, FaPlus, FaCalendarAlt } from "react-icons/fa";
import ScheduleItem from "./ScheduleItem";
import ScheduleModal from "./ScheduleModal";
import DateNavigator from "./DateNavigator";
import AllTaskModal from "./AllTaskModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ImCross } from "react-icons/im";
import { BiExpandAlt } from "react-icons/bi";
import Confetti from "react-confetti";

const DailySchedule = ({ triggerConfetti }) => {
  const [schedule, setSchedule] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStartTime, setNewStartTime] = useState("");
  const [newEndTime, setNewEndTime] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("FaClock");
  const [iconColor, setIconColor] = useState("#000000");
  const [reminderTime, setReminderTime] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDateForCopy, setSelectedDateForCopy] = useState(null);
  const [isAllTasksOpen, setIsAllTasksOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(currentDate);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
    changeDay(date); // Assuming this function changes the displayed tasks based on the new date
  };

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch(
          "https://tasks-backend-tms.vercel.app/api/plans"
        );
        const data = await response.json();
        setSchedule(data);
      } catch (error) {
        console.error("Error fetching schedule:", error);
      }
    };
    fetchSchedule();
  }, []);

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

  useEffect(() => {
    const allCompleted =
      filteredSchedule.length > 0 &&
      filteredSchedule.every((item) => item.completed);
    if (allCompleted) {
      setShowPopup(true);
      triggerConfetti();
    }
  }, [schedule]);

  const toggleComplete = async (id) => {
    const taskToUpdate = schedule.find((item) => item._id === id);

    if (!taskToUpdate) {
      console.error("Task not found");
      return;
    }

    const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };

    setSchedule((prevSchedule) =>
      prevSchedule.map((item) => (item._id === id ? updatedTask : item))
    );

    try {
      const response = await fetch(
        `https://tasks-backend-tms.vercel.app/api/plans/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTask),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error response:", errorData);
        throw new Error("Failed to update task on the server");
      }
    } catch (error) {
      console.error("Error updating task:", error);

      setSchedule((prevSchedule) =>
        prevSchedule.map((item) =>
          item._id === id
            ? { ...item, completed: taskToUpdate.completed }
            : item
        )
      );
    }
  };

  const handleCopy = () => setIsCalendarOpen(true);

  const handleDateSelect = (date) => setSelectedDateForCopy(date);

  const copyScheduleToDate = async () => {
    if (selectedDateForCopy) {
      const selectedDateString = selectedDateForCopy
        .toISOString()
        .split("T")[0];

      const newSchedule = schedule
        .filter((item) => item.date === currentDate.toISOString().split("T")[0])
        .map((item) => ({
          ...item,
          date: selectedDateString,
          completed: false,
        }));

      setSchedule((prevSchedule) => [...prevSchedule, ...newSchedule]);

      // Send new schedule to the API
      try {
        await Promise.all(
          newSchedule.map((item) =>
            fetch("https://tasks-backend-tms.vercel.app/api/plans", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(item),
            })
          )
        );
      } catch (error) {
        console.error("Error copying tasks:", error);
      }

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
    setNewStartTime("");
    setNewEndTime("");
    setNewDescription("");
    setSelectedIcon("FaClock");
    setIconColor("#000000");
    setReminderTime("");
  };

  const handleAddPlan = async () => {
    if (newStartTime && newDescription) {
      // Create a new task object, including `endTime` only if it's provided
      const newTask = {
        startTime: newStartTime,
        endTime: newEndTime || null, // If `newEndTime` is not provided, set it to `null`
        description: newDescription,
        completed: false,
        icon: selectedIcon,
        iconColor,
        reminder: reminderTime,
        reminderTriggered: false,
        date: currentDate.toISOString().split("T")[0],
      };

      setSchedule((prevSchedule) => [...prevSchedule, newTask]);

      // Save the new task to the API
      try {
        await fetch("https://tasks-backend-tms.vercel.app/api/plans", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTask),
        });
      } catch (error) {
        console.error("Error adding task:", error);
      }

      closeModal(); // Close the modal after task creation
    } else {
      // Optionally handle validation if `newStartTime` or `newDescription` is missing
      alert("Start time and description are required");
    }
  };

  const filteredSchedule = schedule.filter(
    (item) => item.date === currentDate.toISOString().split("T")[0]
  );

  return (
    <div className="relative rounded-2xl bg-white shadow-lg h-64 p-4 flex flex-col">
      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
            <div className="text-center">
              <Confetti width={window.innerWidth} height={window.innerHeight} />
              <h3 className="text-2xl font-bold mb-4">
                Yay! All Tasks Completed
              </h3>
              <button
                className="px-4 py-2 bg-[#007b5e] text-white font-semibold rounded-lg hover:bg-green-900 transition-all"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg text-gray-800">Plan My Day</h3>
        <div
          className="relative flex items-center space-x-2 group"
          // title="PRIVATE - These plans are visible only to you"
        >
          <FaLock className="text-gray-500" />
          <span className="text-gray-700">Private</span>

          {/* Tooltip (Visible on hover, aligned to the left) */}
          <div className="absolute hidden group-hover:block bg-white text-sm text-gray-700 border rounded-lg shadow-lg p-2 w-40 top-full mr-2">
            Only you can see this
          </div>
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
                key={item._id}
                item={item}
                index={index}
                toggleComplete={toggleComplete}
                isLast={index === filteredSchedule.length - 1}
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
        <div className="fixed inset-0 bg-gray-800 bg-opacity-90 flex justify-center items-center z-50">
          <ScheduleModal
            closeModal={closeModal}
            newStartTime={newStartTime}
            setNewStartTime={setNewStartTime}
            newEndTime={newEndTime}
            setNewEndTime={setNewEndTime}
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
        </div>
      )}

      {/* Calendar Modal */}
      {isCalendarOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 max-w-lg relative">
            <div className="flex justify-between mb-3 items-center">
              <h3 className="text-xl font-semibold text-gray-800">
                Select Date
              </h3>
              <button
                onClick={() => setIsCalendarOpen(false)}
                className="text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                <ImCross />
              </button>
            </div>

            <div className="w-full overflow-hidden">
              <DatePicker
                selected={selectedDateForCopy}
                onChange={handleDateSelect}
                inline
                className="border border-gray-300 rounded-md p-0 w-full"
              />
            </div>

            <button
              onClick={copyScheduleToDate}
              className="w-full py-2 bg-[#007b5e] text-white font-semibold rounded-lg hover:bg-green-900 transition-all mt-3"
            >
              Copy Plans
            </button>
          </div>
        </div>
      )}

      <button
        className="absolute bottom-4 left-4 px-2 py-1 text-gray-700 rounded-lg hover:bg-[#124d3f] hover:text-white"
        onClick={() => setIsAllTasksOpen(true)}
      >
        <BiExpandAlt size={20} />
      </button>

      {isAllTasksOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex justify-center items-center z-40">
          <AllTaskModal
            isOpen={isAllTasksOpen}
            onClose={() => setIsAllTasksOpen(false)}
            schedule={schedule}
            toggleComplete={toggleComplete}
            copyScheduleToDate={copyScheduleToDate}
            handleCopy={handleCopy}
            openModal={openModal}
          />
          {/* <AllTaskModal
            onClose={() => setIsAllTasksOpen(false)}
            schedule={schedule}
            toggleComplete={toggleComplete}
            handleCopy={handleCopy}
            openModal={openModal}
          /> */}
        </div>
      )}

      {/* Copy Plans Modal */}
      {isCalendarOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-90 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 max-w-lg relative">
            {/* Header with Title and Close Button */}
            <div className="flex justify-between mb-3  items-center">
              <h3 className="text-xl font-semibold text-gray-800">
                Copy Plans
              </h3>
              <button
                onClick={() => setIsCalendarOpen(false)}
                className="text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                <ImCross />
              </button>
            </div>

            {/* Calendar for Date Selection */}
            <div className="w-full overflow-hidden">
              <DatePicker
                selected={selectedDateForCopy}
                onChange={handleDateSelect}
                inline
                className="border border-gray-300 rounded-md p-0 w-full"
              />
            </div>

            {/* Copy Button */}
            <button
              onClick={copyScheduleToDate}
              className="w-full py-2 bg-[#007b5e] text-white font-semibold rounded-lg hover:bg-green-900 transition-all mt-3"
            >
              Copy Plans
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailySchedule;
