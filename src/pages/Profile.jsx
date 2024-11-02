import React from "react";
import ProfileCard from "../components/ProfileCard";
import Attendance from "../components/Attendance/Attendance";
import Tasks from "../components/Tasks";
import Notifications from "../components/Notifications/Notifications";
import DailySchedule from "../components/DailySchedule/DailySchedule";
import ApplyLeave from "../components/ApplyLeave/ApplyLeave";
import PaySlip from "../components/PaySlip";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
        <ProfileCard />
        <Attendance />
        <ApplyLeave />
        <Notifications />
        <DailySchedule />
        <Tasks />
        <PaySlip />
      </div>
    </div>
  );
};

export default Profile;
