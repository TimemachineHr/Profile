import React from "react";
import LeaveHeader from "../../components/Main/LeaveHeader";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const leaveData = [
  {
    code: "L001",
    type: "Annual Leave",
    days: 30,
    carryForward: "✔",
    maxCarryDays: 10,
    payable: "❌",
    documents: "Required",
    showLimit: "❌",
    enCashable: "✔",
  },
  {
    code: "L002",
    type: "Sick Leave",
    days: 15,
    carryForward: "❌",
    maxCarryDays: "-",
    payable: "✔",
    documents: "Not Required",
    showLimit: "✔",
    enCashable: "❌",
  },
  {
    code: "L003",
    type: "Maternity Leave",
    days: 90,
    carryForward: "❌",
    maxCarryDays: "-",
    payable: "✔",
    documents: "Required",
    showLimit: "❌",
    enCashable: "❌",
  },
  {
    code: "L004",
    type: "Paternity Leave",
    days: 10,
    carryForward: "❌",
    maxCarryDays: "05",
    payable: "❌",
    documents: "Required",
    showLimit: "❌",
    enCashable: "❌",
  },
];

const LeaveList = () => {
  return (
    <>
      <LeaveHeader />
      <h1 className="text-2xl font-bold px-6 pt-6">
        Existing Leave Type / Available Leave Type
      </h1>
      <div className="p-8">
        <table className="w-full border border-gray-300 rounded-xl overflow-hidden shadow-lg">
          <thead className="bg-blue-900 text-center text-white">
            <tr>
              <th className="p-4 border-2 border-gray-400 text-center">Code</th>
              <th className="p-4 border-2 border-gray-400 text-center">Type</th>
              <th className="p-4 border-2 border-gray-400 text-center">
                No. of Days
              </th>
              <th className="p-4 border-2 border-gray-400 text-center">
                Carry Forward
              </th>
              <th className="p-2 border-2 border-gray-400 text-center">
                Max Carry Days
              </th>
              <th className="p-4 border-2 border-gray-400 text-center">
                Payable
              </th>
              <th className="p-4 border-2 border-gray-400 text-center">
                Documents
              </th>
              <th className="p-4 border-2 border-gray-400 text-center">
                Show Limit
              </th>
              <th className="p-4 border-2 border-gray-400 text-center">
                En-Cashable
              </th>
              <th className="p-4 border-2 border-gray-400 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white text-center  text-gray-800">
            {leaveData.map((leave, index) => (
              <tr
                key={index}
                className={` border-b-2 border-gray-300 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-100"
                }`}
              >
                <td className="p-4">
                  {" "}
                  <span className="text-white font-normal bg-violet-500 p-1 rounded-md">
                    {leave.code}
                  </span>
                </td>
                <td className="p-4 border-b-2 border-gray-300">{leave.type}</td>
                <td className="p-4  border-b-2 border-gray-300">
                  {leave.days}
                </td>
                <td className="p-4  border-b-2 border-gray-300">
                  {leave.carryForward}
                </td>
                <td className="p-4  border-b-2 border-gray-300">
                  {leave.maxCarryDays}
                </td>
                <td className="p-4  border-b-2 border-gray-300">
                  {leave.payable}
                </td>
                <td className="p-4  border-b-2 border-gray-300">
                  {leave.documents}
                </td>
                <td className="p-4  border-b-2 border-gray-300">
                  {leave.showLimit}
                </td>
                <td className="p-4  border-b-2 border-gray-300">
                  {leave.enCashable}
                </td>
                <td className="p-4  border-r-2 border-gray-300">
                  <button className=" text-gray-700 p-2 rounded-lg">
                    <MdDelete size={24} />
                  </button>
                  <button className=" text-gray-700 p-2 rounded-lg">
                    <FaRegEdit size={24} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LeaveList;
