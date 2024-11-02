import React, { useState, useEffect } from "react";
import PayslipIcon from "../assets/payslip.svg";
import { FaLock } from "react-icons/fa";

const PaySlip = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authenticateUser = () => {
    setIsAuthenticated(true);
    setTimeout(() => {
      setIsAuthenticated(false);
    }, 5000);
  };

  const basicSalary = 1140.0;
  const takeHome = 6140.0;
  const productivity = 160.45;
  const gross = 6840.0;

  return (
    <div className="rounded-2xl bg-white shadow-lg h-60 p-4 flex flex-col items-center justify-center text-center">
      {!isAuthenticated ? (
        <div className="flex flex-col items-center">
          <FaLock className="h-6 w-6 mb-2" />
          <p className="text-gray-600 text-sm mb-4">
            Authenticate in Mobile App to View Payslip
          </p>
          <button
            onClick={authenticateUser}
            className="bg-[#007b5e] text-white px-4 py-2 rounded-lg hover:bg-[#124d3f]"
          >
            Authenticate
          </button>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-center space-x-2 mb-4 text-center">
            <img src={PayslipIcon} alt="Pay-Slip" />
            <h2 className="font-bold text-xl text-gray-800">PaySlip</h2>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative w-24 h-24">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="none"
                  stroke="#e5e5e5"
                  strokeWidth="3"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="none"
                  stroke="#A971E0"
                  strokeWidth="3"
                  strokeDasharray="25 75"
                  strokeDashoffset="25"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="none"
                  stroke="#3CA9B0"
                  strokeWidth="3"
                  strokeDasharray="15 85"
                  strokeDashoffset="50"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="none"
                  stroke="#F4B942"
                  strokeWidth="3"
                  strokeDasharray="10 90"
                  strokeDashoffset="65"
                />
              </svg>
              <p className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-gray-800">
                ${takeHome.toFixed(2)}
              </p>
            </div>

            <div className="text-left">
              <div className="text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Basic Salary:</span> $
                  {basicSalary.toFixed(2)}
                </p>
                <p className="font-semibold text-green-600 text-lg mt-2">
                  Take Home: ${takeHome.toFixed(2)}
                </p>
              </div>

              <div className="flex justify-between text-sm text-gray-600 mt-4">
                <div className="flex flex-col items-center">
                  <p className="font-semibold text-gray-800">Productivity:</p>
                  <p>{productivity} Hrs</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="font-semibold text-gray-800">Gross:</p>
                  <p>${gross.toFixed(2)}</p>
                </div>
              </div>

              <button
                onClick={() => console.log("Download Payslip")}
                className="bg-[#007b5e] text-white px-4 py-2 rounded-lg hover:bg-[#124d3f] mt-4 w-full text-sm"
              >
                Download Payslip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaySlip;
