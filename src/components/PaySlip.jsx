import React, { useState } from "react";

const PaySlip = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="rounded-2xl bg-white shadow-lg h-48 p-4 flex flex-col items-center justify-center text-center">
      <h2 className="font-semibold text-lg text-gray-800">Employee Info</h2>
      <button
        onClick={openModal}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        PaySlip
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-80 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              PaySlip
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              Here is the detailed payslip information for the employee.
            </p>
            <button
              onClick={closeModal}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaySlip;
