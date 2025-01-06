import React, { useState } from "react";
import { IoChatboxEllipses } from "react-icons/io5";
import { FiDownload, FiCheck, FiX, FiEye } from "react-icons/fi";

const ExpenseTable = () => {
  const [view, setView] = useState("Self");

  const toggleView = () => {
    setView(view === "Team" ? "Self" : "Team");
  };

  const expenseData = [
    {
      code: "FA0001",
      employeeName: "John Doe",
      subject: "Travel",
      type: "Food Allowance",
      amount: "$200",
      status: "Approved",
      date: "2024-12-01",
      docs: "#",
      action: ["tick"],
    },
    {
      code: "FA0002",
      employeeName: "Jane Smith",
      subject: "Hotel",
      type: "Stay Allowance",
      amount: "S$300",
      status: "Pending",
      date: "2024-12-02",
      docs: "#",
      action: ["eye"],
    },
    {
      code: "FA0003",
      employeeName: "Alice Brown",
      subject: "Meals",
      type: "Travel Allowance",
      amount: "$100",
      status: "Declined",
      date: "2024-12-03",
      docs: "#",
      action: ["cross"],
    },
    {
      code: "FA0004",
      employeeName: "Bob Johnson",
      subject: "Sick",
      type: "Sick Allowance",
      amount: "S$500",
      status: "Approved",
      date: "2024-12-04",
      docs: "#",
      action: ["tick"],
    },
    {
      code: "FA0005",
      employeeName: "Jake",
      subject: "Food",
      type: "Food Allowance",
      amount: "$100",
      status: "Approved",
      date: "2024-12-09",
      docs: "#",
      action: ["tick"],
    },
  ];

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-end items-center mb-4 gap-2">
        <button
          onClick={() => setView("Team")}
          className={`px-4 py-2 rounded-l-lg ${
            view === "Team"
              ? "text-blue-700 font-semibold"
              : "text-gray-700 hover:text-gray-500"
          }`}
        >
          Team
        </button>
        <label className="relative inline-block w-10 h-6">
          <input
            type="checkbox"
            className="opacity-0 w-0 h-0"
            onChange={toggleView}
          />
          <span className="absolute cursor-pointer inset-0 rounded-full bg-gray-200 before:absolute before:top-1 before:left-1 before:w-4 before:h-4 before:bg-white before:rounded-full before:transition-all checked:before:translate-x-4 checked:bg-blue-500"></span>
        </label>
        <button
          onClick={() => setView("Self")}
          className={`px-4 py-2 rounded-r-lg ${
            view === "Self"
              ? "text-blue-700 font-semibold"
              : "text-gray-700 hover:text-gray-500"
          }`}
        >
          Self
        </button>
      </div>
      <table
        className={`w-full border-collapse border border-gray-300 rounded-lg overflow-hidden ${
          view === "Team" ? "table-auto" : "table-fixed"
        }`}
      >
        <thead>
          <tr className="bg-blue-900 text-white font-semibold">
            <th className="border border-gray-300 px-4 py-2">Code</th>
            {view === "Team" && (
              <th className="border border-gray-300 px-4 py-2">
                Employee Name
              </th>
            )}
            {view === "Self" && (
              <th className="border border-gray-300 px-4 py-2">Subject</th>
            )}

            <th className="border border-gray-300 px-4 py-2 ">Type</th>
            <th className="border border-gray-300 px-4 py-2">Expense</th>
            <th className="border border-gray-300 px-4 py-2">Amount</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2 ">Date Incurred</th>
            <th className="border border-gray-300 px-4 py-2">Docs</th>
            {view === "Team" && (
              <th className="border border-gray-300 px-4 py-2">Action</th>
            )}
          </tr>
        </thead>
        <tbody>
          {expenseData.map((row, index) => (
            <tr key={index} className="bg-white odd:bg-gray-100 text-center">
              <td className="border border-gray-300 px-1 py-2">
                <span className="bg-blue-500 rounded-md text-sm px-1 ">
                  {row.code}
                </span>
              </td>
              {view === "Team" && (
                <td className="border border-gray-300 px-4 py-2">
                  {row.employeeName}
                </td>
              )}
              {view === "Self" && (
                <td className="border border-gray-300 px-4 py-2">
                  {row.subject}
                </td>
              )}

              <td className="border border-gray-300 px-4 py-2">{row.type}</td>
              <td className="border border-gray-300 px-4 py-2">{row.amount}</td>
              <td className="border border-gray-300 px-4 py-2">$300</td>
              <td className="border border-gray-300 px-1 py-2 relative">
                <span
                  className={`relative  text-white px-1 text-sm rounded-md ${
                    row.status === "Approved"
                      ? "bg-green-600"
                      : row.status === "Declined"
                      ? "bg-red-600"
                      : "bg-yellow-600"
                  }`}
                >
                  {row.status}
                  {row.status === "Declined" && (
                    <IoChatboxEllipses className="absolute top-0 right-0 text-black text-md translate-x-1/2 -translate-y-1/2" />
                  )}
                </span>
              </td>

              <td className="border text-sm whitespace-nowrap border-gray-300 px-4 py-2">
                {row.date}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <a
                  href={row.docs}
                  className="flex items-center justify-center text-blue-500"
                >
                  <FiDownload className="font-bold" />
                </a>
              </td>

              {view === "Team" && (
                <td className="border border-gray-300 px-4 py-2">
                  {row.action.includes("tick") && (
                    <FiCheck className="text-green-500 inline font-bold mx-1" />
                  )}
                  {row.action.includes("cross") && (
                    <FiX className="text-red-500 inline font-bold mx-1" />
                  )}
                  {row.action.includes("eye") && (
                    <FiEye className="text-blue-500 inline mx-1 font-bold" />
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
