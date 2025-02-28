import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { templates } from "../../pages/Communication/LetterPage";

const LetterTemplates = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState(null);

  const filteredCommunications = [
    {
      id: 1,
      name: "Leave Letter",
      type: "Letter",
      template: "leave",
      status: "Draft",
    },
    {
      id: 2,
      name: "Expense Claim Letter",
      type: "Letter",
      template: "expense",
      status: "Published",
    },
    {
      id: 3,
      name: "Request for Extension",
      type: "Letter",
      template: "extension",
      status: "Published",
    },
  ];
  const highlightPlaceholders = (text) => {
    const targetPlaceholders = ["[Recipient]", "[Sender]"];
    const regex = new RegExp(
      targetPlaceholders.map((ph) => `\\${ph}`).join("|"),
      "g"
    );

    const parts = text.split(regex);
    const matches = text.match(regex) || [];
    let result = [];

    parts.forEach((part, index) => {
      result.push(part);
      if (matches[index]) {
        result.push(
          <span key={index} className="text-green-800 font-bold">
            {matches[index]}
          </span>
        );
      }
    });

    return result;
  };
  const handleLetterSelect = (comm) => {
    if (comm.status === "Draft") {
      navigate(`/letter/${comm.template}`);
    } else {
      setSelectedLetter(comm);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedLetter(null);
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-4">Letters</h3>
      <div className="flex gap-6 overflow-x-auto">
        {filteredCommunications
          .filter((comm) => comm.type === "Letter")
          .map((comm) => (
            <div
              key={comm.id}
              className="w-28 h-28 p-4 border rounded-xl shadow-md relative bg-white hover:cursor-pointer"
              onClick={() => handleLetterSelect(comm)}
            >
              {/* Status Badge */}
              <div
                className={`absolute bottom-2 right-2 px-2 py-1 text-xs rounded text-white ${
                  comm.status === "Draft" ? "bg-yellow-500" : "bg-green-500"
                }`}
              >
                {comm.status}
              </div>
              <h3 className="text-sm font-semibold hover:underline">
                {comm.name}
              </h3>
            </div>
          ))}
      </div>

      {showModal && selectedLetter && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-10/12 md:w-2/3 lg:w-1/2 p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              aria-label="Close Modal"
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4">{selectedLetter.name}</h2>
            <div className="flex justify-center items-center w-full flex-grow">
              <div className="bg-white shadow-md p-6 rounded-lg w-[130mm] h-[140mm] border relative">
                <div className="whitespace-pre-wrap text-sm">
                  {highlightPlaceholders(templates[selectedLetter.template])}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LetterTemplates;
