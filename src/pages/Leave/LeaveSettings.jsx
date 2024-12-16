import React, { useState } from "react";
import LeaveHeader from "../../components/Main/LeaveHeader";
import { FaInfoCircle } from "react-icons/fa";

const LeaveSettings = () => {
  const [timeOffChecked, setTimeOffChecked] = useState(false);
  const [blockLeaveChecked, setBlockLeaveChecked] = useState(false);
  const [offInLieuChecked, setOffInLieuChecked] = useState(false);

  return (
    <>
      <LeaveHeader />
      <div className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-xl font-semibold text-gray-700 mb-2">
                Leave Calendar
              </label>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 pt-3 mb-1">
                  Set Start & End Date
                </label>
                <div className="flex gap-4">
                  <input
                    type="date"
                    className="p-2 border rounded-md w-34"
                    placeholder="Start Date"
                  />
                  <input
                    type="date"
                    className="p-2 border rounded-md w-34"
                    placeholder="End Date"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reporting manager can{" "}
                    <select className="p-2 border rounded-md w-34">
                      <option value="preapprove">Pre-Approve</option>
                      <option value="preapprove">Unable to View</option>
                      <option value="viewonly">View Only</option>
                    </select>{" "}
                    the leave
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xl font-semibold text-gray-700 mb-2">
                En-cashable Payment
              </label>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {" "}
                Paid through{" "}
                <select className="p-2 border rounded-md w-36">
                  <option value="payroll">Payroll</option>
                  <option value="adhoc">Ad-Hoc</option>
                </select>
              </label>
            </div>

            <div>
              <label className="block text-xl font-medium text-gray-700 mb-2">
                Leave Approver
              </label>
              <div className="space-y-2 space-x-3">
                <select className="p-2 border rounded-md w-36">
                  <option value="">Business Unit</option>
                  <option value="unit1">Unit 1</option>
                  <option value="unit2">Unit 2</option>
                </select>
                <select className="p-2 border rounded-md w-38">
                  <option value="">Approver Name</option>
                  <option value="manager">Manager</option>
                  <option value="hr">HR</option>
                </select>

                <button className="bg-[#1A72A7] text-white px-4 py-2 rounded-md">
                  Assign Approver
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 border-[#1A72A7] shadow-[0_0_4px_#1A72A7] rounded-md accent-[#1A72A7]"
                  checked={timeOffChecked}
                  onChange={(e) => setTimeOffChecked(e.target.checked)}
                />

                <span className="text-lg font-medium text-[#1A72A7] ">
                  Time Off
                </span>
              </label>
              {timeOffChecked && (
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700">
                    One day leave is{" "}
                    <input
                      type="number"
                      className="p-2 border rounded-md w-28"
                      placeholder="Enter hours"
                    />{" "}
                    hrs
                  </label>
                </div>
              )}
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 border-[#1A72A7] shadow-[0_0_4px_#1A72A7] rounded-md accent-[#1A72A7]"
                  checked={blockLeaveChecked}
                  onChange={(e) => setBlockLeaveChecked(e.target.checked)}
                />
                <span className="text-lg font-medium text-[#1A72A7] ">
                  Block Leave
                </span>
              </label>
              {blockLeaveChecked && (
                <div className="mt-2 space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    On specific date{" "}
                    <input type="date" className="p-2 border rounded-md w-36" />
                  </label>
                  <div className="flex gap-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Leave from{" "}
                      <input
                        type="date"
                        className="p-2 border rounded-md w-36"
                      />{" "}
                      to{" "}
                      <input
                        type="date"
                        className="p-2 border rounded-md w-36"
                      />{" "}
                      every month
                    </label>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 border-[#1A72A7] shadow-[0_0_4px_#1A72A7] rounded-md accent-[#1A72A7]"
                  checked={offInLieuChecked}
                  onChange={(e) => setOffInLieuChecked(e.target.checked)}
                />
                <span className="text-lg font-medium text-[#1A72A7] ">
                  Off-In-Lieu
                </span>
              </label>
              {offInLieuChecked && (
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Time Bound{" "}
                    <input type="date" className="p-2 border rounded-md w-36" />
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 text-right">
          <button className="bg-green-600 text-white px-6 py-2 rounded-md">
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default LeaveSettings;
