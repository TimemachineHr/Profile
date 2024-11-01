import React, { useState } from "react";
import PayslipIcon from "../assets/payslip.svg";

const PaySlip = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="rounded-2xl bg-white shadow-lg h-52 p-6 flex flex-col items-center justify-center text-center">
      <div className="flex items-center space-x-2">
        <img src={PayslipIcon} alt="Pay-Slip" />
        <h2 className="font-bold text-xl text-gray-800">PaySlip</h2>
      </div>
      <button
        onClick={openModal}
        className="mt-6 bg-[#007b5e] text-white px-6 py-2 rounded-lg hover:bg-[#124d3f]"
      >
        View PaySlip
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-96 p-6 relative">
            <div className="flex items-center space-x-2">
              <img
                src={PayslipIcon}
                alt="Pay-Slip"
                className="h-8 w-8 inline-block"
              />
              <h2 className="text-xl font-semibold text-gray-800 mb-0">
                Detailed PaySlip
              </h2>
            </div>
            <button
              onClick={closeModal}
              className="absolute top-1 right-3 text-gray-600 hover:text-gray-800 text-2xl"
              aria-label="Close"
            >
              &times;
            </button>

            <div className="mt-4 mb-6">
              <p className="text-gray-600 text-sm">
                Here is the detailed payslip information for the employee.
              </p>
            </div>

            <div className="mt-4">
              <p className="font-semibold text-gray-800">Basic Salary:</p>
              <p className="text-gray-600 text-lg">$1140.00</p>
            </div>

            <div className="flex flex-col items-center justify-center mt-4">
              <div className="bg-[#e0f7e7] border border-[#b2ebf2] rounded-lg p-4 w-full text-center shadow">
                <p className="font-semibold text-lg text-gray-800">
                  Take Home:
                </p>
                <p className="text-2xl font-bold text-gray-700">$6140.00</p>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <div className="flex flex-col items-center w-1/2">
                <p className="font-semibold text-gray-800">Productivity:</p>
                <p className="text-gray-600 text-lg">40.45 Hours</p>
              </div>

              <div className="flex flex-col items-center w-1/2">
                <p className="font-semibold text-gray-800">Gross:</p>
                <p className="text-gray-600 text-lg">$ 6840.00</p>
              </div>
            </div>

            <button
              onClick={() => console.log("Download Payslip")}
              className="bg-[#007b5e] text-white px-4 py-2 rounded-lg hover:bg-[#124d3f] mt-6 w-full"
            >
              Download Payslip
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaySlip;
