import React from "react";

const LeaveStatus = () => {
  const leaveData = [
    { leaveType: "Sick Leave", eligible: 12, taken: 4, available: 8 },
    { leaveType: "Casual Leave", eligible: 10, taken: 5, available: 5 },
    { leaveType: "Privilege Leave", eligible: 15, taken: 10, available: 5 },
    { leaveType: "Maternity Leave", eligible: 26, taken: 20, available: 6 },
    { leaveType: "Paternity Leave", eligible: 7, taken: 2, available: 5 },
    { leaveType: "Unpaid Leave", eligible: 5, taken: 3, available: 2 },
  ];
  const leaveStatus = leaveData.map((leave) => ({
    ...leave,
    percentTaken: ((leave.taken / leave.eligible) * 100).toFixed(2),
  }));

  return (
    <div className="mt-8">
      <div className="bg-blue-900 p-2 mb-2 text-white rounded-lg shadow">
        <h2 className="text-xl font-semibold text-center mb-2">Leave Status</h2>
      </div>
      <table className="border-collapse border border-gray-300 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-300">
            <th className="border border-gray-300  py-2 whitespace-nowrap">
              Leave Type
            </th>
            <th className="border border-gray-300 px-1 py-2 whitespace-nowrap">
              Eligible
            </th>
            <th className="border border-gray-300 px-1 py-2 whitespace-nowrap">
              Taken/Encashed
            </th>
            <th className="border border-gray-300 px-1 py-2 whitespace-nowrap">
              Available
            </th>
          </tr>
        </thead>
        <tbody>
          {leaveStatus.map((row, index) => (
            <tr key={index} className="bg-white odd:bg-gray-100">
              <td className="border text-center border-gray-300 px-4 py-2 text-md whitespace-nowrap">
                {row.leaveType}
              </td>
              <td className="border text-center border-gray-300 px-4 py-2 whitespace-nowrap">
                <span className=" px-1 rounded-md">{row.eligible}</span>
              </td>
              <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                <div className="relative w-full h-4 bg-gray-200 rounded-lg overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-4 rounded-lg"
                    style={{
                      width: `${row.percentTaken}%`,
                      background:
                        "linear-gradient(to right, #A8E6A1, #FFF3B0, #F7B2B0)", // Softer gradient
                    }}
                  ></div>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-800">
                    {row.taken}
                  </span>
                </div>
              </td>

              <td className="border text-center border-gray-300 px-4 py-2 whitespace-nowrap">
                <span className="px-1 rounded-md">{row.available}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveStatus;
