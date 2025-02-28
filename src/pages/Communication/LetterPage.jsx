import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { TbArrowBackUp } from "react-icons/tb";

export const templates = {
  leave: `Dear [Recipient],

I am writing to formally request leave for [Duration], starting from [Start Date] to [End Date]. The reason for my leave is [Reason], which I have ensured will not affect the continuity of my responsibilities. I have taken the necessary steps to delegate my tasks to [Colleague/Team] during my absence, and I am confident that there will be no disruption to ongoing projects.

If there are any urgent matters that require my attention, I will be reachable via [Contact Method]. I hope you will kindly consider this request, and I assure you of my complete dedication to catching up on any pending work upon my return.

Thank you for your understanding and support.

Sincerely,
[Sender]`,
  expense: `Dear [Recipient],

I am submitting my detailed expense claim for [Expense Details] incurred during the period of [Dates] as part of [Project/Work]. The total amount claimed is [Total Amount], which includes the following expenses:
- [Expense Type 1]: [Amount]
- [Expense Type 2]: [Amount]
- [Expense Type 3]: [Amount]

Attached are the relevant receipts and supporting documentation for your reference. I have ensured all expenses comply with our organization's expense policy and have categorized them accordingly.

If you require any additional details or clarification regarding this claim, please feel free to contact me at your earliest convenience. I look forward to your approval of the reimbursement.

Best regards,
[Sender]`,
  extension: `Dear [Recipient],

I am writing to formally request an extension for [Project/Deadline] from the current deadline of [Current Deadline] to the proposed new deadline of [New Deadline]. The primary reason for this extension request is [Reason], which has impacted the initial timeline. 

To mitigate this, I have already taken the following steps:
1. [Step 1: Describe action taken].
2. [Step 2: Describe action taken].
3. [Step 3: Describe action taken].

Extending the deadline will allow us to maintain the quality standards expected for this project and ensure all deliverables meet the agreed specifications. I am confident this additional time will lead to a successful outcome.

Thank you for your understanding and consideration. I am happy to discuss this further and provide any additional details you may require.

Sincerely,
[Sender]`,
};
const LetterPage = () => {
  const { templateId } = useParams();
  const [formData, setFormData] = useState({});

  const template = templates[templateId];
  const [content, setContent] = useState(template);

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
    const updatedContent = template.replace(
      new RegExp(`\\[${key}\\]`, "g"),
      value
    );
    setContent(updatedContent);
  };

  const highlightPlaceholders = (text) => {
    // Define the placeholders to be highlighted
    const targetPlaceholders = ["[Recipient]", "[Sender]"];
    const regex = new RegExp(
      targetPlaceholders.map((ph) => `\\${ph}`).join("|"),
      "g"
    );

    const parts = text.split(regex); // Split text by target placeholders
    const matches = text.match(regex) || []; // Find matching placeholders
    let result = [];

    parts.forEach((part, index) => {
      result.push(part); // Add regular text
      if (matches[index]) {
        // Add highlighted placeholders
        result.push(
          <span key={index} className="text-green-800 font-bold">
            {matches[index]}
          </span>
        );
      }
    });

    return result;
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-2">
      {/* Header */}
      <div className="w-full bg-white shadow rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/communication">
              <button
                className="flex items-center justify-center w-10 h-10 bg-gray-800 rounded-xl"
                aria-label="Go back"
              >
                <TbArrowBackUp size={24} className="text-white font-semibold" />
              </button>
            </Link>
            <h1 className="text-lg font-semibold">
              {templateId.charAt(0).toUpperCase() + templateId.slice(1)} Letter
              Editor
            </h1>
          </div>
          <div className="flex gap-4">
            <button className="px-4 py-2 font-semibold rounded-xl hover:bg-gray-100 hover:text-blue-900 transition duration-200">
              Duplicate
            </button>
            <button className="px-4 py-2 font-semibold rounded-xl hover:bg-gray-100 hover:text-blue-900 transition duration-200">
              Publish
            </button>
          </div>
        </div>
      </div>

      {/* Letter Content */}
      <div className="flex justify-center items-center w-full flex-grow">
        <div className="bg-white shadow-md p-6 rounded-lg w-[130mm] h-[140mm] border relative">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="hidden"
          />
          <div className="whitespace-pre-wrap text-sm">
            {highlightPlaceholders(content)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetterPage;
