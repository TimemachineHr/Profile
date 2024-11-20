import React from "react";
import LeaveHeader from "../../components/Main/LeaveHeader";
import LeaveTable from "../../components/NewLeave/LeaveTable";
import UpcomingLeaves from "../../components/NewLeave/UpcommingLeaves";

const Leave = () => {
  return (
    <>
      <LeaveHeader />
      <div className="flex gap-4 p-4">
        <div className="w-2/3 p-2">
          <div className="sticky top-0">
            <LeaveTable />
          </div>
        </div>

        <div className="w-1/3 overflow-y-auto border-r border-gray-300 p-4 h-[calc(100vh-4rem)]">
          <UpcomingLeaves />
        </div>
      </div>
    </>
  );
};

export default Leave;
