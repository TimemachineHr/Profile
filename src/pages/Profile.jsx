import React, { useState, useEffect } from "react";
import ProfileCard from "../components/ProfileCard";
import Attendance from "../components/Attendance/Attendance";
import Tasks from "../components/Tasks";
import Notifications from "../components/Notifications/Notifications";
import DailySchedule from "../components/DailySchedule/DailySchedule";
import ApplyLeave from "../components/ApplyLeave/ApplyLeave";
import PaySlip from "../components/PaySlip";
import Confetti from "react-confetti";

const Profile = () => {
  const [showConfetti, setShowConfetti] = useState(false);

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  useEffect(() => {
    triggerConfetti();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 relative">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
        <ProfileCard />
        <Attendance />
        <ApplyLeave />
        <Notifications />
        <DailySchedule triggerConfetti={triggerConfetti} />
        <Tasks />
        <PaySlip />
      </div>
    </div>
  );
};

export default Profile;
