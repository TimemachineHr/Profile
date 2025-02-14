import React, { useState, useEffect } from "react";
import { FiUpload, FiEdit, FiSave } from "react-icons/fi";

const FileUploadSection = () => {
  const [aboutText, setAboutText] = useState("");
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [files, setFiles] = useState([]);
  const [hoverAbout, setHoverAbout] = useState(false);

  useEffect(() => {
    // Fetch data from the API
    fetch("https://company-settings-one.vercel.app/api/company-settings/")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setAboutText(data[0].aboutCompany);
          setFiles(data[0].companyFiles);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleFileUpload = (event, section) => {
    const newFile = event.target.files[0];
    if (newFile) {
      setFiles((prevFiles) => [
        ...prevFiles,
        {
          name: newFile.name,
          date: new Date().toLocaleString(),
          section,
          uploadedBy: "Admin", // Change this to a dynamic user if available
        },
      ]);
    }
  };

  const handleAboutEdit = () => {
    setIsEditingAbout(true);
  };

  const handleAboutSave = () => {
    fetch(
      "https://company-settings-one.vercel.app/api/company-settings/678a2037c1292667ec884236",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ aboutCompany: aboutText }),
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update About section");
        }
        return res.json();
      })
      .then(() => {
        setIsEditingAbout(false);
      })
      .catch((error) => console.error("Error updating About section:", error));
  };

  const truncateName = (name, length = 10) => {
    return name.length > length ? `${name.slice(0, length)}...` : name;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
      {/* About Us Block */}
      <div
        className="bg-white shadow-md rounded-lg p-6 relative"
        onMouseEnter={() => setHoverAbout(true)}
        onMouseLeave={() => setHoverAbout(false)}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">About Us</h2>
          {hoverAbout && !isEditingAbout && (
            <FiEdit
              className="cursor-pointer text-gray-600 hover:text-gray-800"
              onClick={handleAboutEdit}
            />
          )}
        </div>
        {isEditingAbout ? (
          <div>
            <textarea
              rows="4"
              className="w-full p-2 border rounded mt-2"
              value={aboutText}
              onChange={(e) => setAboutText(e.target.value)}
            />
            <div className="mt-4 flex justify-end">
              <button
                className=" bg-blue-800 text-white px-3 py-1 rounded-lg "
                onClick={handleAboutSave}
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-600 mt-4 font-normal">{aboutText}</p>
        )}
      </div>

      {/* Policy Block */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Policy</h2>
          <label className="text-blue-800 px-3 py-1 rounded-lg cursor-pointer">
            <FiUpload title="Upload Policy" />
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
                  <span className="text-gray-500 font-semibold ml-1 text-sm">
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
          <label className="text-blue-800 px-3 py-1 rounded-lg cursor-pointer">
            <FiUpload title="Upload Hand Book" />
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
