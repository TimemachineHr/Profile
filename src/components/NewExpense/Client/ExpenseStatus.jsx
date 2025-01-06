import React from "react";

const ExpenseStatus = () => {
  const expenseStatus = [
    { code: "E001", claimable: "$500", claimed: 40, balance: "$300" },
    { code: "E002", claimable: "$700", claimed: 60, balance: "$280" },
    { code: "E003", claimable: "$300", claimed: 80, balance: "$60" },
    { code: "E004", claimable: "$200", claimed: 30, balance: "$140" },
    { code: "E005", claimable: "$100", claimed: 20, balance: "$80" },
  ];

  return (
    <div className="mt-12">
      <div className="bg-blue-900 p-2 mb-2 text-white rounded-lg shadow">
        <h2 className="text-xl font-semibold text-center mb-2">
          Expense Status
        </h2>
      </div>
      <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-green-200">
            <th className="border  text-gray-700 border-gray-300  px-4 py-2">
              Code
            </th>
            <th className="border text-gray-700 border-gray-300 px-4 py-2">
              Claimable
            </th>
            <th className="border text-gray-700 border-gray-300 px-4 py-2">
              Claimed/Used
            </th>
            <th className="border text-gray-700 border-gray-300 px-4 py-2">
              Balance
            </th>
          </tr>
        </thead>
        <tbody>
          {expenseStatus.map((row, index) => (
            <tr key={index} className="bg-white odd:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">
                <span className="bg-blue-500 px-1 text-sm rounded-md">
                  {row.code}
                </span>
              </td>
              <td className="border text-center border-gray-300 px-4 py-2">
                {row.claimable}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="relative w-full h-4 bg-gray-200 rounded-lg">
                  <div
                    className="absolute top-0 left-0 h-4 bg-green-500 rounded-lg"
                    style={{ width: `${row.claimed}%` }}
                  ></div>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-800">
                    {row.claimed}%
                  </span>
                </div>
              </td>
              <td className="border text-center border-gray-300 px-4 py-2">
                {row.balance}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseStatus;
