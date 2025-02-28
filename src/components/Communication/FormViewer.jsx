import { useState } from "react";
import { FaTimes, FaShareAlt } from "react-icons/fa";

const FormViewer = ({ selectedFormData, setSelectedFormData }) => {
  const [shareLink, setShareLink] = useState("");

  const handleShare = () => {
    const formId = selectedFormData?.id || "12345"; // Replace with actual form ID logic
    const generatedLink = `${window.location.origin}/form/${formId}`;
    setShareLink(generatedLink);
    navigator.clipboard.writeText(generatedLink);
    alert("Form link copied to clipboard!");
  };

  return (
    selectedFormData && (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl shadow-lg w-2/4 h-3/4 overflow-y-auto relative">
          {/* Close Button */}
          <button
            onClick={() => setSelectedFormData(null)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={20} />
          </button>

          {/* Form Title */}
          <h3 className="text-xl font-semibold mb-4">
            {selectedFormData.formTitle}
          </h3>

          {/* Questions List */}
          {selectedFormData.questions?.length > 0 ? (
            <div className="space-y-4">
              {selectedFormData.questions.map((q, index) => (
                <div key={index} className="mb-4 p-4 border rounded bg-gray-50">
                  <p className="font-medium mb-2">{q.text}</p>
                  {q.type === "shortAnswer" && (
                    <input
                      type="text"
                      className="w-full border p-2 rounded"
                      placeholder="Short Answer"
                      disabled
                    />
                  )}
                  {q.type === "paragraph" && (
                    <textarea
                      className="w-full border p-2 rounded"
                      placeholder="Long Answer"
                      disabled
                    />
                  )}
                  {["multipleChoice", "checkboxes", "dropdown"].includes(
                    q.type
                  ) && (
                    <div className="space-y-2">
                      {q.options.map((option, i) => (
                        <div key={i} className="flex items-center gap-4">
                          {q.type === "multipleChoice" && (
                            <input type="radio" disabled />
                          )}
                          {q.type === "checkboxes" && (
                            <input type="checkbox" disabled />
                          )}
                          <span>{option}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {q.type === "fileUpload" && (
                    <p className="text-gray-600 italic">File upload field</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No questions available.</p>
          )}

          {/* Share Button */}
          <div className="flex justify-end">
            <button
              onClick={handleShare}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded flex items-center gap-2 hover:bg-blue-700"
            >
              <FaShareAlt />
              Share Form
            </button>
          </div>
          {/* Display Shareable Link */}
          {/* {shareLink && (
            <p className="mt-2 text-gray-700 text-sm">
              Share this link:{" "}
              <a href={shareLink} target="_blank" className="text-blue-600">
                {shareLink}
              </a>
            </p>
          )} */}
        </div>
      </div>
    )
  );
};

export default FormViewer;
