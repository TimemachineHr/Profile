import React, { useState } from "react";
import Draggable from "react-draggable";
import { FaTimes } from "react-icons/fa";
import { BiCheckDouble } from "react-icons/bi";
import {
  AiOutlineAlignCenter,
  AiOutlineAlignLeft,
  AiOutlineAlignRight,
} from "react-icons/ai";
import { FaUpload } from "react-icons/fa6";
import { MdFormatColorText } from "react-icons/md";
import CommunicationHeader from "../../components/Main/CommunicationHeader";
import FontSizeSelector from "../../components/Communication/FontsizeSelector";

const toRoman = (num) => {
  const romanMap = [
    ["M", 1000],
    ["CM", 900],
    ["D", 500],
    ["CD", 400],
    ["C", 100],
    ["XC", 90],
    ["L", 50],
    ["XL", 40],
    ["X", 10],
    ["IX", 9],
    ["V", 5],
    ["IV", 4],
    ["I", 1],
  ];
  let roman = "";
  for (const [symbol, value] of romanMap) {
    while (num >= value) {
      roman += symbol;
      num -= value;
    }
  }
  return roman;
};

const alignments = [
  { value: "left", icon: <AiOutlineAlignLeft />, label: "Left" },
  { value: "center", icon: <AiOutlineAlignCenter />, label: "Center" },
  { value: "right", icon: <AiOutlineAlignRight />, label: "Right" },
];

const CommunicationSettings = () => {
  const [activePopup, setActivePopup] = useState(null);
  const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0 });
  const [background, setBackground] = useState("#ffffff");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [headerText, setHeaderText] = useState("Welcome to Our Company");
  const [headerAlignment, setHeaderAlignment] = useState("center");
  const [footerText, setFooterText] = useState(
    "© 2024 Company Name. All rights reserved."
  );
  const [footerAlignment, setFooterAlignment] = useState("center");
  const [pageNumberFormat, setPageNumberFormat] = useState("normal");
  const [pageNumber, setPageNumber] = useState(1);
  const [showPageNumber, setShowPageNumber] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [isLogoVisible, setIsLogoVisible] = useState(true);
  const [isAssigned, setIsAssigned] = useState(false);
  const [isLineVisible, setIsLineVisible] = useState(false);
  const [isLineVisibleFooter, setIsLineVisibleFooter] = useState(false);
  const [textStyleOpen, setTextStyleOpen] = useState(false);
  const [headerStyles, setHeaderStyles] = useState({
    bold: false,
    underline: false,
    strikeThrough: false,
    fontSize: "text-base",
    fontFamily: "sans-serif",
  });
  const [footerStyles, setFooterStyles] = useState({
    bold: false,
    underline: false,
    strikeThrough: false,
    fontSize: "text-base",
    fontFamily: "sans-serif",
  });

  const handleAssign = () => {
    setIsAssigned(true);
  };

  const handleDeleteLogo = () => {
    setIsLogoVisible(false);
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
    setActivePopup(section);
  };

  const handleClosePopup = () => {
    setActivePopup(null);
    setActiveSection(null);
  };

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setBackgroundImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <CommunicationHeader />
      <div className="flex h-screen">
        {/* Sidebar Buttons */}
        <div className="w-1/4 bg-gray-200 text-white flex flex-col items-center py-8">
          <div className="flex flex-col gap-6 w-4/5">
            {[
              { label: "Logo Position" },
              { label: "Background" },
              { label: "Header" },
              { label: "Footer" },
              { label: "Communication Publisher" },
            ].map(({ label }) => (
              <button
                key={label}
                onClick={() => handleSectionClick(label)}
                className={`flex justify-start gap-3 py-3 px-4 rounded-lg shadow-lg transition-all ${
                  activeSection === label
                    ? "bg-blue-600 text-white ring-2 ring-blue-300"
                    : "bg-gray-400 text-white hover:bg-blue-600 hover:text-white"
                }`}
              >
                <span className="text-md font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="w-3/4 flex flex-col items-center justify-between bg-gray-50 p-4 pb-8">
          <div
            className="relative w-[45%] h-[90%] bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between"
            style={{
              backgroundColor: background,
              backgroundImage: backgroundImage
                ? `url(${backgroundImage})`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Logo and Header Row */}
            <div className="flex items-center mb-4">
              {/* Draggable Logo */}
              {isLogoVisible && (
                <Draggable
                  position={logoPosition}
                  onStop={(_, data) =>
                    activeSection === "Logo Position" &&
                    setLogoPosition({ x: data.x, y: data.y })
                  }
                  disabled={activeSection !== "Logo Position"}
                >
                  <div
                    className={`relative w-16 h-16 border-dashed border-2 rounded-full flex items-center justify-center transition-all
          ${
            activeSection === "Logo Position"
              ? "cursor-move border-blue-800 text-blue-800"
              : "cursor-default border-gray-400 text-gray-400"
          }`}
                  >
                    {activeSection === "Logo Position" && (
                      <button
                        onClick={handleDeleteLogo}
                        className="absolute -top-3 -right-3 bg-red-600 text-white w-6 h-6 rounded-full 
              flex items-center justify-center hover:bg-red-700 transition-colors shadow-md z-10"
                        aria-label="Delete Logo"
                      >
                        <FaTimes size={12} />
                      </button>
                    )}
                    Logo
                  </div>
                </Draggable>
              )}

              {/* Header Text */}
              <h1
                className={`
      flex-1 ${
        headerAlignment === "left"
          ? "text-left"
          : headerAlignment === "right"
          ? "text-right"
          : "text-center"
      } ${headerStyles.fontSize} 
      ${headerStyles.bold ? "font-bold" : ""}
      ${headerStyles.italic ? "italic" : ""}
      ${headerStyles.underline ? "underline" : ""}
      ${headerStyles.strikeThrough ? "line-through" : ""}
      text-gray-800
    `}
                style={{
                  fontFamily: headerStyles.fontFamily || "inherit",
                  color: headerStyles.color || "#000000",
                }}
              >
                {headerText}
              </h1>
            </div>

            {/* Movable Dotted Line */}
            {isLineVisible && (
              <Draggable
                axis="y"
                onStop={(_, data) => setDottedLinePosition(data.y)}
              >
                <div className="w-full h-[2px] border-t border-dotted border-gray-400 cursor-move mb-4"></div>
              </Draggable>
            )}
            {/* Main Content */}
            <div className="flex-1 flex flex-col justify-center items-center">
              <p className="text-center text-gray-600 text-lg ">
                Form or Letter content goes here
              </p>
            </div>

            {/* Movable Dotted Line */}
            {isLineVisibleFooter && (
              <Draggable
                axis="y"
                onStop={(_, data) => setDottedLinePosition(data.y)}
              >
                <div className="w-full h-[2px] border-t border-dotted border-gray-400 cursor-move mb-4"></div>
              </Draggable>
            )}
            {/* Footer */}
            <footer
              className={`w-full py-4 text-gray-500 text-sm ${
                footerAlignment === "left"
                  ? "text-left"
                  : footerAlignment === "right"
                  ? "text-right"
                  : "text-center"
              }`}
              style={{
                fontFamily: footerStyles.fontFamily,
                fontWeight: footerStyles.bold ? "bold" : "normal",
                textDecoration: footerStyles.underline
                  ? "underline"
                  : footerStyles.strikeThrough
                  ? "line-through"
                  : "none",
              }}
            >
              {footerText}
              {showPageNumber && (
                <div className="mt-2">
                  Page{" "}
                  {pageNumberFormat === "roman"
                    ? `${toRoman(pageNumber)}/V`
                    : `${pageNumber}/5`}
                </div>
              )}
            </footer>
          </div>
        </div>
      </div>
      {/* Background Popup */}
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
                  value={background}
                  readOnly
                  className="p-2 w-full font-light text-gray-700 border-none focus:outline-none"
                />
                <input
                  type="color"
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
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
                  if (file) handleFileUpload(file);
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) handleFileUpload(file);
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
      {/* Header Popup */}
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

            {/* Editable Content */}
            <textarea
              value={headerText}
              onChange={(e) => setHeaderText(e.target.value)}
              className="w-full border p-2 rounded-md mb-4"
              rows="2"
            ></textarea>

            <div className="flex items-center justify-between mb-4">
              {/* Align and Text Styling */}
              <div className="relative">
                {/* Button to Open/Close Modal */}
                <div
                  title="Edit Header Styling"
                  className="flex items-center justify-center w-12 h-12 border rounded-md cursor-pointer hover:bg-gray-100"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span className="font-bold text-lg ">
                    <MdFormatColorText size={24} className="text-gray-800" />
                  </span>
                </div>

                {/* Modal Toolbar */}
                {isOpen && (
                  <div className="absolute bottom-16 left-0 bg-white border rounded-md shadow-lg flex items-center p-2 space-x-2">
                    {/* Font Family */}
                    <select
                      value={headerStyles.fontFamily}
                      onChange={(e) =>
                        setHeaderStyles({
                          ...headerStyles,
                          fontFamily: e.target.value,
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
                      <option value="Brush Script MT, cursive">Cursive</option>
                      <option value="Comic Sans MS, cursive">Comic Sans</option>
                      <option value="Lucida Sans, sans-serif">
                        Lucida Sans
                      </option>
                      {/* Add more font options */}
                    </select>

                    {/* Font Size */}
                    <FontSizeSelector
                      headerStyles={headerStyles}
                      setHeaderStyles={setHeaderStyles}
                    />

                    {/* Bold Button */}
                    <button
                      onClick={() =>
                        setHeaderStyles({
                          ...headerStyles,
                          bold: !headerStyles.bold,
                        })
                      }
                      className={`p-2 rounded-md ${
                        headerStyles.bold ? "bg-gray-300" : "hover:bg-gray-100"
                      }`}
                      title="Bold"
                    >
                      <b>B</b>
                    </button>

                    {/* Italic Button */}
                    <button
                      onClick={() =>
                        setHeaderStyles({
                          ...headerStyles,
                          italic: !headerStyles.italic,
                        })
                      }
                      className={`p-2 rounded-md ${
                        headerStyles.italic
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
                        setHeaderStyles({
                          ...headerStyles,
                          underline: !headerStyles.underline,
                        })
                      }
                      className={`p-2 rounded-md ${
                        headerStyles.underline
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
                      value={headerStyles.color || "#000000"}
                      onChange={(e) =>
                        setHeaderStyles({
                          ...headerStyles,
                          color: e.target.value,
                        })
                      }
                      className="p-1 w-10 h-10 border rounded-md cursor-pointer"
                      title="Text Color"
                    />

                    {/* Alignment Buttons */}
                    {alignments.map((alignment) => (
                      <button
                        key={alignment.value}
                        onClick={() => setHeaderAlignment(alignment.value)}
                        className={`p-2 rounded-md ${
                          headerAlignment === alignment.value
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

      {/* Footer Popup */}
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
              value={footerText}
              onChange={(e) => setFooterText(e.target.value)}
              className="w-full border p-2 rounded-md mb-4"
              rows="1"
            ></textarea>
            <div className="flex flex-col mb-4">
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  className="mr-2"
                  onChange={(e) => setIsLineVisibleFooter(e.target.checked)}
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
                  checked={showPageNumber}
                  onChange={() => setShowPageNumber(!showPageNumber)}
                  className="mr-2"
                />
                <label className="block text-sm font-medium mb-1">
                  Show Page Number
                </label>
              </div>
              {showPageNumber && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Page Number Format
                  </label>
                  <select
                    value={pageNumberFormat}
                    onChange={(e) => setPageNumberFormat(e.target.value)}
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
                    {/* Font Family */}
                    <select
                      value={footerStyles.fontFamily}
                      onChange={(e) =>
                        setFooterStyles({
                          ...footerStyles,
                          fontFamily: e.target.value,
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
                      <option value="Brush Script MT, cursive">Cursive</option>
                      <option value="Comic Sans MS, cursive">Comic Sans</option>
                      <option value="Lucida Sans, sans-serif">
                        Lucida Sans
                      </option>
                    </select>

                    {/* Font Size */}
                    <FontSizeSelector
                      headerStyles={footerStyles}
                      setHeaderStyles={setFooterStyles}
                    />

                    {/* Font Styling Buttons */}
                    <button
                      onClick={() =>
                        setFooterStyles({
                          ...footerStyles,
                          bold: !footerStyles.bold,
                        })
                      }
                      className={`p-2 rounded-md ${
                        footerStyles.bold ? "bg-gray-300" : "hover:bg-gray-100"
                      }`}
                      title="Bold"
                    >
                      <b>B</b>
                    </button>

                    <button
                      onClick={() =>
                        setFooterStyles({
                          ...footerStyles,
                          underline: !footerStyles.underline,
                        })
                      }
                      className={`p-2 rounded-md ${
                        footerStyles.underline
                          ? "bg-gray-300"
                          : "hover:bg-gray-100"
                      }`}
                      title="Underline"
                    >
                      <u>U</u>
                    </button>

                    {/* Alignment Buttons */}
                    {alignments.map((alignment) => (
                      <button
                        key={alignment.value}
                        onClick={() => setFooterAlignment(alignment.value)}
                        className={`p-2 rounded-md ${
                          footerAlignment === alignment.value
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
      {/* Communication Publisher Popup */}
      {activePopup === "Communication Publisher" && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-10">
          <div className="relative bg-white p-6 rounded-lg shadow-xl w-96">
            <div className="flex items-center pb-4 justify-between">
              <h3 className="text-xl font-semibold text-gray-900 ">
                Communication Publisher
              </h3>
              <button
                onClick={handleClosePopup}
                className="text-gray-600 hover:text-gray-800 transition"
                aria-label="Close"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <select
                id="business-unit"
                className="p-3 border border-gray-300 rounded-md w-full focus:ring-[#1A72A7] focus:border-[#1A72A7] transition"
              >
                <option value="">Select Business Unit</option>
                <option value="unit1">Unit 1</option>
                <option value="unit2">Unit 2</option>
              </select>
              <select
                id="approver"
                className="p-3 border border-gray-300 rounded-md w-full focus:ring-[#1A72A7] focus:border-[#1A72A7] transition"
              >
                <option value="">Select Publisher Name</option>
                <option value="manager">Manager</option>
                <option value="hr">HR</option>
              </select>

              {!isAssigned ? (
                <div className="flex justify-end">
                  <button
                    onClick={handleAssign}
                    className="mt-4 bg-blue-800 text-white px-6 py-2 rounded-lg"
                  >
                    Assign Publisher
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex justify-end">
                    <button
                      onClick={handleAssign}
                      className="bg-green-600 text-white px-6 py-2 rounded-lg"
                    >
                      <BiCheckDouble size={28} className="inline mr-2" />
                      Assigned
                    </button>
                  </div>
                  <hr className="my-6 border-gray-300" />
                  <h4 className="text-md font-semibold mb-2">Assigned To</h4>
                  <div className="text-sm grid grid-cols-2 gap-4">
                    <div className="font-medium">Business Unit</div>
                    <div className="font-medium">Department</div>
                    <div>Unit-1</div>
                    <div>Hr</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommunicationSettings;
