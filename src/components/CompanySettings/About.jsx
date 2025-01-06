import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";

const FileUploadSection = () => {
  const [files, setFiles] = useState([
    {
      name: "HandBook_1.pdf",
      date: "18/12/2024 17:35",
      section: "Hand Book",
      uploadedBy: "John",
      profile: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      name: "HandBook_2.pdf",
      date: "17/12/2024 16:20",
      section: "Hand Book",
      uploadedBy: "Jane",
      profile: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      name: "Policy_1.pdf",
      date: "18/12/2024 14:00",
      section: "Policy",
      uploadedBy: "Alice",
      profile: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      name: "Policy_2.pdf",
      date: "17/12/2024 12:45",
      section: "Policy",
      uploadedBy: "Bob",
      profile: "https://randomuser.me/api/portraits/men/2.jpg",
    },
  ]);

  const handleFileUpload = (event, section) => {
    const newFile = event.target.files[0];
    if (newFile) {
      setFiles((prevFiles) => [
        ...prevFiles,
        {
          name: newFile.name,
          date: new Date().toLocaleString(),
          section,
          uploadedBy: "Admin", // Change this to dynamic user if available
        },
      ]);
    }
  };

  const truncateName = (name, length = 10) => {
    return name.length > length ? `${name.slice(0, length)}...` : name;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
      {/* About Us Block */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">About Us</h2>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu
          enim quis nisi venenatis bibendum ut ut arcu.
        </p>
      </div>

      {/* Policy Block */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Policy</h2>
          <label className=" text-blue-800 px-3 py-1 rounded-lg cursor-pointer">
            <FiUpload title="Upload Policy" className="font-bold" />
            <input
              type="file"
              accept=".pdf, .doc, .docx"
              onChange={(e) => handleFileUpload(e, "Policy")}
              className="hidden"
            />
          </label>
        </div>
        <div className="space-y-2 h-40 overflow-y-auto">
          {files
            .filter((file) => file.section === "Policy")
            .map((file, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm"
              >
                <div className="flex items-center">
                  <span className="text-gray-800 tooltip" title={file.name}>
                    {truncateName(file.name)}
                  </span>
                  <span className="text-gray-500 font-semibold ml-1  text-sm">
                    By
                  </span>
                  <img
                    src={file.profile}
                    alt="Profile"
                    className="w-6 h-6 rounded-full ml-2"
                    title={file.uploadedBy}
                  />
                  <span className="text-gray-500 ml-2">{file.uploadedBy}</span>
                </div>
                <span className="text-gray-500 font-semibold mr-1 ml-1 text-sm">
                  At
                </span>
                <span className="text-gray-500 text-sm">{file.date}</span>
              </div>
            ))}
        </div>
      </div>

      {/* Hand Book Block */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Hand Book</h2>
          <label className=" text-blue-800 px-3 py-1 rounded-lg cursor-pointer">
            <FiUpload title="Upload Hand Book" className="font-bold" />
            <input
              type="file"
              accept=".pdf, .doc, .docx"
              onChange={(e) => handleFileUpload(e, "Hand Book")}
              className="hidden"
            />
          </label>
        </div>
        <div className="space-y-2 h-40 overflow-y-auto">
          {files
            .filter((file) => file.section === "Hand Book")
            .map((file, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm"
              >
                <div className="flex items-center">
                  <span className="text-gray-800 tooltip" title={file.name}>
                    {truncateName(file.name)}
                  </span>

                  <span className="text-gray-500 font-semibold ml-1  text-sm">
                    By
                  </span>
                  <img
                    src={file.profile}
                    alt="Profile"
                    className="w-6 h-6 rounded-full ml-2"
                    title={file.uploadedBy}
                  />
                  <span className="text-gray-500 ml-2">{file.uploadedBy}</span>
                </div>

                <span className="text-gray-500 font-semibold mr-1 ml-1 text-sm">
                  At
                </span>
                <span className="text-gray-500 text-sm">{file.date}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FileUploadSection;
