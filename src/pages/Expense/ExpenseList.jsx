import React from "react";
import ExpenseHeader from "../../components/Main/ExpenseHeader";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
const ExpenseList = () => {
  // Sample data for table rows
  const expenses = [
    {
      type: "Food Allowance",
      code: "FC001",
      cycle: "Monthly",
      currency: "Single",
      maxClaimable: "$500",
      document: "Required",
      coPayment: "10%",
    },
    {
      type: "Travel Allowance",
      code: "TC002",
      cycle: "Quarterly",
      currency: "Multiple",
      maxClaimable: "$1200",
      document: "Optional",
      coPayment: "5%",
    },
    {
      type: "Gym Allowance",
      code: "GC003",
      cycle: "Yearly",
      currency: "Multiple",
      maxClaimable: "$300",
      document: "Required",
      coPayment: "15%",
    },
    {
      type: "Childcare Allowance",
      code: "CC004",
      cycle: "Monthly",
      currency: "Single",
      maxClaimable: "$700",
      document: "Required",
      coPayment: "20%",
    },
  ];

  return (
    <>
      <ExpenseHeader />

      <h1 className="text-2xl font-bold px-6 pt-6">
        Existing Expense Type / Available Expense Type
      </h1>

      <div className="px-6 pt-4">
        <table className="w-full text-left border-collapse rounded-xl overflow-hidden">
          <thead className="bg-blue-900 text-center text-white">
            <tr>
              <th className="p-4 border-2 border-gray-400">Expense Type</th>
              <th className="p-4 border-2 border-gray-400">Claim Code</th>
              <th className="p-4 border-2 border-gray-400">Claim Cycle</th>
              <th className="p-4 border-2 border-gray-400">Currency</th>
              <th className="p-4 border-2 border-gray-400">Max Claimable</th>
              <th className="p-4 border-2 border-gray-400">Document</th>
              <th className="p-4 border-2 border-gray-400">Co-Payment</th>
              <th className="p-4 border-2 border-gray-400">Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr
                key={index}
                className="border-b last:border-none text-center bg-white even:bg-gray-100"
              >
                <td className="p-4 border-l-2 border-b-2 border-gray-400">
                  {expense.type}
                </td>
                <td className="p-4 border-b-2 border-gray-400">
                  <span className="text-white bg-green-600 p-1 rounded-md">
                    {expense.code}
                  </span>
                </td>
                <td className="p-4 border-b-2 border-gray-400">
                  {expense.cycle}
                </td>
                <td className="p-4 border-b-2 border-gray-400">
                  {expense.currency}
                </td>
                <td className="p-4 border-b-2 border-gray-400">
                  {expense.maxClaimable}
                </td>
                <td className="p-4 border-b-2 border-gray-400">
                  {expense.document}
                </td>
                <td className="p-4 border-b-2 border-gray-400">
                  {expense.coPayment}
                </td>
                <td className="p-4 border-b-2 border-r-2 border-gray-400">
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

export default ExpenseList;
