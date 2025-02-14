import React, { useEffect, useState } from "react";
import ExpenseHeader from "../../components/Main/ExpenseHeader";
import { MdDelete } from "react-icons/md";
import { FaRegEdit, FaTimes } from "react-icons/fa";
import { MdPrint, MdOutlineFileDownload } from "react-icons/md";
import { IoMdShareAlt } from "react-icons/io";
import ExpenseTypeModal from "../../components/ExpenseCreation/ExpenseTypeModal";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [expenseIdToDelete, setExpenseIdToDelete] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [expenseType, setExpenseType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpenseType, setSelectedExpenseType] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(
          "https://expense-module.vercel.app/api/new-expense-type"
        );
        const data = await response.json();
        setExpenses(data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  const handleDelete = async (expenseId) => {
    try {
      const response = await fetch(
        `https://expense-module.vercel.app/api/new-expense-type/${expenseId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setExpenses((prevExpenses) =>
          prevExpenses.filter((expense) => expense._id !== expenseId)
        );
        setIsPopupVisible(false);
        setInputValue("");
      } else {
        console.error("Failed to delete expense");
      }
    } catch (error) {
      console.error("Error during deletion:", error);
    }
  };

  const showConfirmationModal = (expenseId) => {
    const selectedExpense = expenses.find(
      (expense) => expense._id === expenseId
    );
    if (selectedExpense) {
      setExpenseType(selectedExpense.type);
      setExpenseIdToDelete(expenseId);
      setIsPopupVisible(true);
    }
  };

  const handleConfirm = () => {
    if (expenseIdToDelete) {
      handleDelete(expenseIdToDelete);
    }
  };

  const handleEdit = (expense) => {
    setSelectedExpenseType(expense);
    setIsModalOpen(true);
  };

  return (
    <>
      <ExpenseHeader />
      {/* Dropdown Button at Top-Right */}
      <div className="relative">
        <div className="absolute right-6 top-4 z-10">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full text-gray-600 hover:bg-gray-400 focus:outline-none"
            title="Options"
          >
            ⋮
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-14 bg-white shadow-lg border rounded-md text-left z-20 flex flex-col">
              <button className="flex items-center justify-center w-full p-2 hover:bg-gray-100 transition">
                <MdPrint size={22} className="text-gray-600" title="Print" />
              </button>
              <button className="flex items-center justify-center w-full p-2 hover:bg-gray-100 transition">
                <MdOutlineFileDownload
                  size={22}
                  className="text-gray-600"
                  title="Download"
                />
              </button>
              <button className="flex items-center justify-center w-full p-2 hover:bg-gray-100 transition">
                <IoMdShareAlt
                  size={22}
                  className="text-gray-600"
                  title="Share"
                />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="px-6 pt-16">
        <div className="overflow-auto bg-white shadow-md rounded-lg">
          <table className="w-full text-left border-collapse rounded-xl overflow-hidden">
            <thead className="bg-blue-900 text-center text-white">
              <tr>
                <th className="p-4 border-2 border-gray-400">Expense Type</th>
                <th className="p-4 border-2 border-gray-400">Claim Code</th>
                <th className="p-4 border-2 border-gray-400">Currency</th>
                <th className="p-4 border-2 border-gray-400">Max Claimable</th>
                <th className="p-4 border-2 border-gray-400">Document</th>
                <th className="p-4 border-2 border-gray-400">Co-Payment</th>
                <th className="p-4 border-2 border-gray-400">Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr
                  key={expense._id}
                  className="border-b text-center bg-white even:bg-gray-100"
                >
                  <td className="p-4 border-l-2 border-b-2 border-gray-400">
                    {expense.type}
                  </td>
                  <td className="p-4 border-b-2 border-gray-400">
                    <span
                      className="text-white p-1 rounded-md"
                      style={{ backgroundColor: expense.colorCode }}
                    >
                      {expense.code}
                    </span>
                  </td>
                  <td className="p-4 border-b-2 border-gray-400">
                    {expense.currency}
                  </td>
                  <td className="p-4 border-b-2 border-gray-400">
                    {expense.maximumClaimableAmount}
                  </td>
                  <td className="p-4 border-b-2 border-gray-400">
                    {expense.options.documentProof ? "Required" : "Optional"}
                  </td>
                  <td className="p-4 border-b-2 border-gray-400">
                    {expense.options.employeeCoPayment
                      ? `${expense.options.value}%`
                      : "N/A"}
                  </td>
                  <td className="p-4 border-b-2 border-gray-400">
                    <button
                      title="Delete"
                      className="text-gray-700 p-2 rounded-lg"
                      onClick={() => showConfirmationModal(expense._id)}
                    >
                      <MdDelete size={24} />
                    </button>
                    <button
                      title="Edit"
                      className="text-gray-700 p-2 rounded-lg"
                      onClick={() => handleEdit(expense)}
                    >
                      <FaRegEdit size={24} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isPopupVisible && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="bg-white rounded-lg px-6 pt-4 pb-6 shadow-lg w-96">
            <div className="flex justify-between items-center">
              <h2
                id="modal-title"
                className="text-lg font-bold mb-4 text-gray-700"
              >
                Confirm <span className="text-blue-800">{expenseType}</span>{" "}
                Deletion
              </h2>
              <button
                className="font-normal text-sm text-gray-700 hover:text-red-500 mb-3"
                onClick={() => setIsPopupVisible(false)}
              >
                <FaTimes size={24} />
              </button>
            </div>
            <p className="mb-6 text-gray-700 text-sm">
              Please type <span className="font-semibold">"{expenseType}"</span>{" "}
              to confirm deletion of this expense type.
            </p>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={expenseType}
              className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end gap-4">
              <button
                className={`${
                  inputValue === expenseType
                    ? "bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                } text-white font-normal text-lg px-4 py-1 rounded-lg shadow-lg`}
                onClick={handleConfirm}
                disabled={inputValue !== expenseType}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <ExpenseTypeModal
        isModalOpen={isModalOpen}
        handleModalToggle={() => setIsModalOpen(false)}
        selectedExpenseType={selectedExpenseType}
        setExpenseTypes={setExpenses}
      />
    </>
  );
};

export default ExpenseList;
