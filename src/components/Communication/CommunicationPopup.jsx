import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaUpload } from "react-icons/fa6";
import { MdFormatColorText } from "react-icons/md";
import FontSizeSelector from "../../components/Communication/FontsizeSelector";
import {
  AiOutlineAlignCenter,
  AiOutlineAlignLeft,
  AiOutlineAlignRight,
} from "react-icons/ai";

const alignments = [
  { value: "left", icon: <AiOutlineAlignLeft />, label: "Left" },
  { value: "center", icon: <AiOutlineAlignCenter />, label: "Center" },
  { value: "right", icon: <AiOutlineAlignRight />, label: "Right" },
];

const CommunicationPopup = ({
  activePopup,
  handleClosePopup,
  formData,
  handleFormUpdate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  if (activePopup === "Logo Position") {
    return null;
  }
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-10">
      <div className="relative bg-white p-6 rounded-lg shadow-xl w-96">
        <button
          onClick={handleClosePopup}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition"
          aria-label="Close"
        >
          <FaTimes size={20} />
        </button>

        <h3 className="text-lg font-semibold mb-4">{`Edit ${activePopup}`}</h3>

        {activePopup === "Background" && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-10">
            <div className="relative bg-white p-6 rounded-lg shadow-xl w-96">
              <button
                onClick={handleClosePopup}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition"
                aria-label="Close"
              >
                <FaTimes size={20} />
              </button>
              <h3 className="text-lg font-semibold mb-4">Set Background</h3>

              <div className="mb-4">
                <label className="block font-medium text-gray-700 mb-2">
                  Color
                </label>
                <div className="flex items-center border rounded-lg">
                  <input
                    type="text"
                    value={formData.background.backgroundColor}
                    readOnly
                    className="p-2 w-full font-light text-gray-700 border-none focus:outline-none"
                  />
                  <input
                    type="color"
                    value={formData.background.backgroundColor}
                    onChange={(e) =>
                      handleFormUpdate("background", {
                        ...formData.background,
                        backgroundColor: e.target.value,
                      })
                    }
                    className="w-12 h-10 p-1 rounded-lg border-l"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block font-medium text-gray-700 mb-2">
                  Image
                </label>
                <div
                  className="border-dashed border-2 border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-gray-500 hover:border-blue-500 transition"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files[0];
                    if (file) {
                      handleFormUpdate("background", {
                        ...formData.background,
                        imageUrl: URL.createObjectURL(file),
                      });
                    }
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        handleFormUpdate("background", {
                          ...formData.background,
                          imageUrl: URL.createObjectURL(file),
                        });
                      }
                    }}
                    className="hidden"
                    id="fileInput"
                  />
                  <label
                    htmlFor="fileInput"
                    className=" text-gray-600 hover:text-blue-500 px-4 py-2 rounded-lg cursor-pointer"
                  >
                    Drag and drop / <FaUpload className="inline" /> Upload
                  </label>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={handleClosePopup}
                  className="bg-blue-900 text-white px-6 py-2 rounded-lg"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {activePopup === "Header" && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-10">
            <div className="relative bg-white px-6 pt-6 rounded-lg shadow-xl w-96">
              {/* Close Button */}
              <div className="flex items-center pb-4 justify-between">
                <h3 className="text-xl font-semibold">Edit Header</h3>
                <button
                  onClick={handleClosePopup}
                  className="text-gray-600 hover:text-gray-800 transition"
                  aria-label="Close"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              {/* Header Text Input */}
              <textarea
                value={formData.header.text}
                onChange={(e) =>
                  handleFormUpdate("header", {
                    ...formData.header,
                    text: e.target.value,
                  })
                }
                className="w-full border p-2 rounded-md mb-4"
                rows="2"
              ></textarea>

              <div className="flex items-center justify-between mb-4">
                {/* Text Styling Button */}
                <div className="relative">
                  <div
                    title="Edit Header Styling"
                    className="flex items-center justify-center w-12 h-12 border rounded-md cursor-pointer hover:bg-gray-100"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <MdFormatColorText size={24} className="text-gray-800" />
                  </div>

                  {/* Styling Options Modal */}
                  {isOpen && (
                    <div className="absolute bottom-16 left-0 bg-white border rounded-md shadow-lg flex items-center p-2 space-x-2">
                      {/* Font Family Selector */}
                      <select
                        value={formData.header.fontStyling.fontStyle}
                        onChange={(e) =>
                          handleFormUpdate("header", {
                            ...formData.header,
                            fontStyling: {
                              ...formData.header.fontStyling,
                              fontStyle: e.target.value,
                            },
                          })
                        }
                        className="p-1 text-sm border rounded-md"
                        title="Font Family"
                      >
                        <option value="sans-serif">Sans-serif</option>
                        <option value="serif">Serif</option>
                        <option value="monospace">Monospace</option>
                        <option value="cursive"> Brush Script</option>
                        <option value="fantasy">Fantasy</option>
                        <option value="Arial, sans-serif">Arial</option>
                        <option value="Verdana, sans-serif">Verdana</option>
                        <option value="Tahoma, sans-serif">Tahoma</option>
                        <option value="Trebuchet MS, sans-serif">
                          Trebuchet MS
                        </option>
                        <option value="Georgia, serif">Georgia</option>
                        <option value="Times New Roman, serif">
                          Times New Roman
                        </option>
                        <option value="Courier New, monospace">
                          Courier New
                        </option>
                        <option value="Lucida Console, monospace">
                          Lucida Console
                        </option>
                        <option value="Brush Script MT, cursive">
                          Cursive
                        </option>
                        <option value="Comic Sans MS, cursive">
                          Comic Sans
                        </option>
                        <option value="Lucida Sans, sans-serif">
                          Lucida Sans
                        </option>
                      </select>

                      {/* Font Size Selector */}
                      <FontSizeSelector
                        fontSize={formData.header.fontStyling.fontSize}
                        onChange={(size) =>
                          handleFormUpdate("header", {
                            ...formData.header,
                            fontStyling: {
                              ...formData.header.fontStyling,
                              fontSize: size,
                            },
                          })
                        }
                      />

                      {/* Bold Button */}
                      <button
                        onClick={() =>
                          handleFormUpdate("header", {
                            ...formData.header,
                            fontStyling: {
                              ...formData.header.fontStyling,
                              isBold: !formData.header.fontStyling.isBold,
                            },
                          })
                        }
                        className={`p-2 rounded-md ${
                          formData.header.fontStyling.isBold
                            ? "bg-gray-300"
                            : "hover:bg-gray-100"
                        }`}
                        title="Bold"
                      >
                        <b>B</b>
                      </button>

                      {/* Italic Button */}
                      <button
                        onClick={() =>
                          handleFormUpdate("header", {
                            ...formData.header,
                            fontStyling: {
                              ...formData.header.fontStyling,
                              isItalic: !formData.header.fontStyling.isItalic,
                            },
                          })
                        }
                        className={`p-2 rounded-md ${
                          formData.header.fontStyling.isItalic
                            ? "bg-gray-300"
                            : "hover:bg-gray-100"
                        }`}
                        title="Italic"
                      >
                        <i>I</i>
                      </button>

                      {/* Underline Button */}
                      <button
                        onClick={() =>
                          handleFormUpdate("header", {
                            ...formData.header,
                            fontStyling: {
                              ...formData.header.fontStyling,
                              isUnderline:
                                !formData.header.fontStyling.isUnderline,
                            },
                          })
                        }
                        className={`p-2 rounded-md ${
                          formData.header.fontStyling.isUnderline
                            ? "bg-gray-300"
                            : "hover:bg-gray-100"
                        }`}
                        title="Underline"
                      >
                        <u>U</u>
                      </button>

                      {/* Text Color Picker */}
                      <input
                        type="color"
                        value={formData.header.fontStyling.textColor}
                        onChange={(e) =>
                          handleFormUpdate("header", {
                            ...formData.header,
                            fontStyling: {
                              ...formData.header.fontStyling,
                              textColor: e.target.value,
                            },
                          })
                        }
                        className="p-1 w-10 h-10 border rounded-md cursor-pointer"
                        title="Text Color"
                      />
                      {alignments.map((alignment) => (
                        <button
                          key={alignment.value}
                          onClick={() =>
                            handleFormUpdate("header", {
                              ...formData.header,
                              fontStyling: {
                                ...formData.header.fontStyling,
                                alignment: alignment.value,
                              },
                            })
                          }
                          className={`p-2 rounded-md ${
                            formData.header.fontStyling.alignment ===
                            alignment.value
                              ? "bg-gray-300"
                              : "hover:bg-gray-100"
                          }`}
                          title={alignment.label}
                        >
                          {alignment.icon}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Save Button */}
                <button
                  onClick={handleClosePopup}
                  className="bg-blue-900 text-white px-6 py-2 rounded-lg"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {activePopup === "Footer" && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-10">
            <div className="relative bg-white p-6 rounded-lg shadow-xl w-96">
              <div className="flex items-center pb-4 justify-between">
                <h3 className="text-xl font-semibold text-gray-900 ">
                  Edit Footer
                </h3>
                <button
                  onClick={handleClosePopup}
                  className="text-gray-600 hover:text-gray-800 transition"
                  aria-label="Close"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <textarea
                value={formData.footer.text}
                onChange={(e) =>
                  handleFormUpdate("footer", {
                    ...formData.footer,
                    text: e.target.value,
                  })
                }
                className="w-full border p-2 rounded-md mb-4"
                rows="1"
              ></textarea>

              <div className="flex flex-col mb-4">
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={formData.footer.showPageLineBreak}
                    onChange={(e) =>
                      handleFormUpdate("footer", {
                        ...formData.footer,
                        showPageLineBreak: e.target.checked,
                      })
                    }
                    className="mr-2"
                  />
                  <label className="block text-sm font-medium">
                    Show a Page Break Line Above the Footer
                  </label>
                </div>
              </div>

              <div className="flex flex-col mb-4">
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={formData.footer.showPageNumber}
                    onChange={(e) =>
                      handleFormUpdate("footer", {
                        ...formData.footer,
                        showPageNumber: e.target.checked,
                      })
                    }
                    className="mr-2"
                  />
                  <label className="block text-sm font-medium mb-1">
                    Show Page Number
                  </label>
                </div>
                {formData.footer.showPageNumber && (
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Page Number Format
                    </label>
                    <select
                      value={formData.footer.pageNumberFormat}
                      onChange={(e) =>
                        handleFormUpdate("footer", {
                          ...formData.footer,
                          pageNumberFormat: e.target.value,
                        })
                      }
                      className="w-full border p-2 rounded-md"
                    >
                      <option value="normal">Normal Numbers</option>
                      <option value="roman">Roman Numbers</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="relative">
                  <div
                    title="Edit Header Styling"
                    className="flex items-center justify-center w-12 h-12 border rounded-md cursor-pointer hover:bg-gray-100"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <span className="font-bold text-lg underline">
                      <MdFormatColorText size={24} className="text-gray-800" />
                    </span>
                  </div>

                  {/* Modal Toolbar */}
                  {isOpen && (
                    <div className="absolute bottom-16 left-0 bg-white border rounded-md shadow-lg flex items-center p-2 space-x-2">
                      <select
                        value={formData.footer.fontStyling.fontStyle}
                        onChange={(e) =>
                          handleFormUpdate("footer", {
                            ...formData.footer,
                            fontStyling: {
                              ...formData.footer.fontStyling,
                              fontStyle: e.target.value,
                            },
                          })
                        }
                        className="p-1 text-sm border rounded-md"
                        title="Font Family"
                      >
                        <option value="sans-serif">Sans-serif</option>
                        <option value="serif">Serif</option>
                        <option value="monospace">Monospace</option>
                        <option value="cursive"> Brush Script</option>
                        <option value="fantasy">Fantasy</option>
                        <option value="Arial, sans-serif">Arial</option>
                        <option value="Verdana, sans-serif">Verdana</option>
                        <option value="Tahoma, sans-serif">Tahoma</option>
                        <option value="Trebuchet MS, sans-serif">
                          Trebuchet MS
                        </option>
                        <option value="Georgia, serif">Georgia</option>
                        <option value="Times New Roman, serif">
                          Times New Roman
                        </option>
                        <option value="Courier New, monospace">
                          Courier New
                        </option>
                        <option value="Lucida Console, monospace">
                          Lucida Console
                        </option>
                        <option value="Brush Script MT, cursive">
                          Cursive
                        </option>
                        <option value="Comic Sans MS, cursive">
                          Comic Sans
                        </option>
                        <option value="Lucida Sans, sans-serif">
                          Lucida Sans
                        </option>
                      </select>

                      <button
                        onClick={() =>
                          handleFormUpdate("footer", {
                            ...formData.footer,
                            fontStyling: {
                              ...formData.footer.fontStyling,
                              isBold: !formData.footer.fontStyling.isBold,
                            },
                          })
                        }
                        className={`p-2 rounded-md ${
                          formData.footer.fontStyling.isBold
                            ? "bg-gray-300"
                            : "hover:bg-gray-100"
                        }`}
                        title="Bold"
                      >
                        <b>B</b>
                      </button>
                      <button
                        onClick={() =>
                          handleFormUpdate("footer", {
                            ...formData.footer,
                            fontStyling: {
                              ...formData.footer.fontStyling,
                              isItalic: !formData.footer.fontStyling.isItalic,
                            },
                          })
                        }
                        className={`p-2 rounded-md ${
                          formData.footer.fontStyling.isItalic
                            ? "bg-gray-300"
                            : "hover:bg-gray-100"
                        }`}
                        title="Italic"
                      >
                        <i>I</i>
                      </button>

                      <button
                        onClick={() =>
                          handleFormUpdate("footer", {
                            ...formData.footer,
                            fontStyling: {
                              ...formData.footer.fontStyling,
                              isUnderline:
                                !formData.footer.fontStyling.isUnderline,
                            },
                          })
                        }
                        className={`p-2 rounded-md ${
                          formData.footer.fontStyling.isUnderline
                            ? "bg-gray-300"
                            : "hover:bg-gray-100"
                        }`}
                        title="Underline"
                      >
                        <u>U</u>
                      </button>

                      {alignments.map((alignment) => (
                        <button
                          key={alignment.value}
                          onClick={() =>
                            handleFormUpdate("footer", {
                              ...formData.footer,
                              fontStyling: {
                                ...formData.footer.fontStyling,
                                alignment: alignment.value,
                              },
                            })
                          }
                          className={`p-2 rounded-md ${
                            formData.footer.fontStyling.alignment ===
                            alignment.value
                              ? "bg-gray-300"
                              : "hover:bg-gray-100"
                          }`}
                          title={alignment.label}
                        >
                          {alignment.icon}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={handleClosePopup}
                  className="bg-blue-900 text-white px-6 py-2 rounded-lg"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {activePopup === "Communication Publisher" && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-10">
            <div className="relative bg-white p-6 rounded-lg shadow-xl w-96">
              <div className="flex items-center pb-4 justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                  Edit Communication Publisher
                </h3>
                <button
                  onClick={handleClosePopup}
                  className="text-gray-600 hover:text-gray-800 transition"
                  aria-label="Close"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <label className="block font-medium text-gray-700 mb-2">
                Business Unit
              </label>
              <input
                type="text"
                value={formData.approver.businessUnit}
                onChange={(e) =>
                  handleFormUpdate("approver", {
                    ...formData.approver,
                    businessUnit: e.target.value,
                  })
                }
                className="w-full border p-2 rounded-md"
              />

              <label className="block font-medium text-gray-700 mt-4 mb-2">
                Approver Name
              </label>
              <input
                type="text"
                value={formData.approver.approverName}
                onChange={(e) =>
                  handleFormUpdate("approver", {
                    ...formData.approver,
                    approverName: e.target.value,
                  })
                }
                className="w-full border p-2 rounded-md"
              />

              <div className="flex justify-end pt-4">
                <button
                  onClick={handleClosePopup}
                  className="bg-blue-900 text-white px-6 py-2 rounded-lg"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end pt-4">
          <button
            onClick={handleClosePopup}
            className="bg-blue-900 text-white px-6 py-2 rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunicationPopup;
