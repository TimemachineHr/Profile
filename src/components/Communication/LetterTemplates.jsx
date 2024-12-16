import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LetterTemplates = () => {
  const navigate = useNavigate();

  const filteredCommunications = [
    { id: 1, name: "Leave Letter", type: "Letter", template: "leave" },
    {
      id: 2,
      name: "Expense Claim Letter",
      type: "Letter",
      template: "expense",
    },
    {
      id: 3,
      name: "Request for Extension",
      type: "Letter",
      template: "extension",
    },
  ];

  const handleLetterSelect = (comm) => {
    if (!comm.template) {
      alert("Template not found for this letter!");
      return;
    }
    navigate(`/letter/${comm.template}`);
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
              <h3 className="text-sm font-semibold hover:underline">
                {comm.name}
              </h3>
            </div>
          ))}
      </div>
    </div>
  );
};

export default LetterTemplates;
