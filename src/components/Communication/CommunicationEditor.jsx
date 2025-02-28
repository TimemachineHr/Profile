import React, { useState } from "react";
import Draggable from "react-draggable";
import { FaTimes, FaPen } from "react-icons/fa";

const CommunicationEditor = ({
  formData,
  activeSection,
  handleFormUpdate,
  handleReset,
  handleSave,
}) => {
  const { logoPosition } = formData.header;
  const [isLogoVisible, setIsLogoVisible] = useState(true);
  const [showActions, setShowActions] = useState(false);

  const handleDragStop = (_, data) => {
    if (activeSection === "Logo Position") {
      handleFormUpdate("header", {
        ...formData.header,
        logoPosition: { x: data.x, y: data.y },
      });
    }
  };

  const handleDeleteLogo = () => {
    setIsLogoVisible(false);
  };

  const toggleActions = () => {
    setShowActions(!showActions);
  };

  return (
    <div className="w-3/4 flex flex-col items-center justify-between bg-gray-50 p-4 pb-8">
      <div className="absolute top-28 right-4">
        <button
          onClick={toggleActions}
          className="text-gray-600 hover:text-gray-800 transition"
        >
          <FaPen size={20} />
        </button>
        {showActions && (
          <div className="absolute top-8 right-0 bg-white shadow-md rounded-md p-2 flex flex-col">
            <button
              onClick={handleReset}
              className="bg-red-500 text-white px-4 py-2 rounded-md mb-1"
            >
              Reset
            </button>
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        )}
      </div>

      <div
        className="relative w-[45%] h-[90%] bg-white shadow-lg rounded-lg px-6 pt-6 flex flex-col justify-between"
        style={{
          backgroundColor: formData.background.backgroundColor,
          backgroundImage: formData.background.imageUrl
            ? `url(${formData.background.imageUrl})`
            : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex items-center mb-4">
          {isLogoVisible && (
            <Draggable
              position={logoPosition}
              onStop={handleDragStop}
              disabled={activeSection !== "Logo Position"}
            >
              <div
                className={`relative w-16 h-16 border-dashed border-2 rounded-full flex items-center justify-center transition-all ${
                  activeSection === "Logo Position"
                    ? "cursor-move border-blue-800 text-blue-800"
                    : "cursor-default border-gray-400 text-gray-400"
                }`}
              >
                {activeSection === "Logo Position" && (
                  <button
                    onClick={handleDeleteLogo}
                    className="absolute -top-3 -right-3 bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors shadow-md z-10"
                    aria-label="Delete Logo"
                  >
                    <FaTimes size={12} />
                  </button>
                )}
                Logo
              </div>
            </Draggable>
          )}

          <h1
            className={`
              flex-1 ${
                formData.header.fontStyling.alignment === "left"
                  ? "text-left"
                  : formData.header.fontStyling.alignment === "right"
                  ? "text-right"
                  : "text-center"
              } ${formData.header.fontStyling.fontSize} 
              ${formData.header.fontStyling.isBold ? "font-bold" : ""}
              ${formData.header.fontStyling.isItalic ? "italic" : ""}
              ${formData.header.fontStyling.isUnderline ? "underline" : ""}
              text-gray-800
            `}
            style={{
              fontFamily: formData.header.fontStyling.fontFamily || "inherit",
              color: formData.header.fontStyling.textColor || "#000000",
            }}
          >
            {formData.header.text}
          </h1>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center">
          <p className="text-center text-gray-600 text-md">
            {formData.content.text || "Form or Letter content goes here"}
          </p>
        </div>

        {formData.footer.showPageLineBreak && (
          <Draggable
            axis="y"
            onStop={(_, data) =>
              handleFormUpdate("footer", {
                ...formData.footer,
                dottedLinePosition: data.y,
              })
            }
          >
            <div className="w-full h-[2px] border-t border-dotted border-gray-400 cursor-move mb-4"></div>
          </Draggable>
        )}
        <footer
          className={`w-full py-2 text-gray-500 text-sm text-${formData.footer.fontStyling.alignment}`}
          style={{
            fontFamily: formData.footer.fontStyling.fontStyle,
            fontWeight: formData.footer.fontStyling.isBold ? "bold" : "normal",
            fontStyle: formData.footer.fontStyling.isItalic
              ? "italic"
              : "normal",
            textDecoration: formData.footer.fontStyling.isUnderline
              ? "underline"
              : "none",
          }}
        >
          {formData.footer.text}
          {formData.footer.showPageNumber && (
            <div className="mt-2">
              Page{" "}
              {formData.footer.pageNumberFormat === "roman" ? "I/V" : "1/5"}
            </div>
          )}
        </footer>
      </div>
    </div>
  );
};

export default CommunicationEditor;
