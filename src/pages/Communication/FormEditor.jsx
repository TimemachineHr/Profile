import React, { useState } from "react";

const FormEditor = () => {
  const [formTitle, setFormTitle] = useState("Untitled Form");
  const [questions, setQuestions] = useState([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);

  const questionTypes = [
    { type: "shortAnswer", label: "Short Answer" },
    { type: "paragraph", label: "Paragraph" },
    { type: "multipleChoice", label: "Multiple Choice" },
    { type: "checkboxes", label: "Checkboxes" },
    { type: "dropdown", label: "Dropdown" },
    { type: "fileUpload", label: "File Upload" },
  ];

  // Add a new question
  const handleAddQuestion = (type) => {
    const newQuestion = {
      id: Date.now(),
      text: "Untitled Question",
      type,
      options:
        type === "multipleChoice" ||
        type === "checkboxes" ||
        type === "dropdown"
          ? ["Option 1"]
          : [],
      required: false,
      logic: null,
    };
    setQuestions([...questions, newQuestion]);
    setSelectedQuestionIndex(questions.length); // Select newly added question
  };

  // Update question field (text, options, etc.)
  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    setQuestions(updatedQuestions);
  };

  // Add an option to multiple-choice, checkboxes, or dropdown
  const addOption = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options.push(
      `Option ${updatedQuestions[index].options.length + 1}`
    );
    setQuestions(updatedQuestions);
  };

  // Update an option
  const updateOption = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  // Delete a question
  const deleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
    setSelectedQuestionIndex(null);
  };

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-gray-100 p-4 border-r">
        <h3 className="text-lg font-bold mb-4">Question Types</h3>
        {questionTypes.map((type) => (
          <button
            key={type.type}
            className="w-full mb-5 px-4 py-2 text-white bg-blue-800 rounded-lg hover:bg-blue-600"
            onClick={() => handleAddQuestion(type.type)}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Main Builder */}
      <div className="flex-1 p-6">
        <input
          type="text"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          className="w-full text-3xl font-bold border-b-2 mb-6 focus:outline-none"
          placeholder="Form Title"
        />
        <div className="space-y-6">
          {questions.map((question, index) => (
            <div
              key={question.id}
              className={`p-4 border rounded-md shadow-md ${
                index === selectedQuestionIndex ? "bg-blue-50" : "bg-white"
              }`}
              onClick={() => setSelectedQuestionIndex(index)}
            >
              <input
                type="text"
                value={question.text}
                onChange={(e) => updateQuestion(index, "text", e.target.value)}
                className="w-full border-b mb-4 focus:outline-none"
                placeholder="Question Text"
              />
              {/* Render inputs based on question type */}
              {question.type === "shortAnswer" && (
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  placeholder="Short Answer Text"
                  disabled
                />
              )}
              {question.type === "paragraph" && (
                <textarea
                  className="w-full border p-2 rounded"
                  placeholder="Long Answer Text"
                  disabled
                />
              )}
              {["multipleChoice", "checkboxes", "dropdown"].includes(
                question.type
              ) && (
                <div className="space-y-2">
                  {question.options.map((option, i) => (
                    <div key={i} className="flex items-center gap-4">
                      {question.type === "multipleChoice" && (
                        <input type="radio" disabled />
                      )}
                      {question.type === "checkboxes" && (
                        <input type="checkbox" disabled />
                      )}
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => updateOption(index, i, e.target.value)}
                        className="flex-1 border-b focus:outline-none"
                        placeholder={`Option ${i + 1}`}
                      />
                    </div>
                  ))}
                  <button
                    onClick={() => addOption(index)}
                    className="mt-2 text-blue-500 hover:underline"
                  >
                    + Add Option
                  </button>
                </div>
              )}
              {question.type === "fileUpload" && (
                <div>
                  <label className="block mt-4">
                    Allow Multiple Files:
                    <input
                      type="checkbox"
                      className="ml-2"
                      checked={question.allowMultipleFiles || false}
                      onChange={(e) =>
                        updateQuestion(
                          index,
                          "allowMultipleFiles",
                          e.target.checked
                        )
                      }
                    />
                  </label>
                </div>
              )}
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => deleteQuestion(index)}
                  className="text-red-500 hover:underline"
                >
                  Delete Question
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-1/4 bg-gray-100 p-4 border-l">
        {selectedQuestionIndex !== null && (
          <div>
            <h3 className="text-lg font-bold mb-4">Question Settings</h3>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Required:</label>
              <input
                type="checkbox"
                checked={questions[selectedQuestionIndex]?.required || false}
                onChange={(e) =>
                  updateQuestion(
                    selectedQuestionIndex,
                    "required",
                    e.target.checked
                  )
                }
              />
            </div>
          </div>
        )}
        {selectedQuestionIndex === null && (
          <p className="text-gray-500">
            Select a question to customize its settings.
          </p>
        )}
      </div>
    </div>
  );
};

export default FormEditor;
