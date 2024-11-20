import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { PiUploadSimpleBold } from "react-icons/pi";
const ExperienceForm = ({ data, setData }) => {
  const defaultExperienceEntry = {
    location: "",
    companyName: "",
    designation: "",
    periodFrom: "",
    periodTo: "",
    reasonForLeaving: "",
    document: "",
    isUploading: false,
    fileName: "",
  };

  const [experienceSections, setExperienceSections] = useState(
    data?.experienceEntries?.length > 0
      ? data.experienceEntries.map((entry) => ({
          ...defaultExperienceEntry,
          ...entry,
          fileName: entry.document ? entry.document.split("/").pop() : "",
        }))
      : [defaultExperienceEntry]
  );

  useEffect(() => {
    setData({
      experienceEntries: experienceSections.map((section) => ({
        location: section.location,
        companyName: section.companyName,
        designation: section.designation,
        periodFrom: section.periodFrom,
        periodTo: section.periodTo,
        reasonForLeaving: section.reasonForLeaving,
        document: section.document,
      })),
    });
  }, [experienceSections]);

  const addExperienceSection = () => {
    setExperienceSections([...experienceSections, defaultExperienceEntry]);
  };

  const removeExperienceSection = (indexToRemove) => {
    if (experienceSections.length > 1) {
      setExperienceSections(
        experienceSections.filter((_, index) => index !== indexToRemove)
      );
    }
  };

  const updateExperienceSection = (index, updates) => {
    setExperienceSections((prevSections) =>
      prevSections.map((section, i) =>
        i === index ? { ...section, ...updates } : section
      )
    );
  };

  const handleFileUpload = async (index, file) => {
    if (!file) return;

    updateExperienceSection(index, {
      isUploading: true,
      fileName: file.name,
    });

    try {
      const fileUrl = await handleFile(file);
      if (fileUrl) {
        updateExperienceSection(index, {
          document: fileUrl,
          isUploading: false,
          fileName: file.name,
        });
      } else {
        updateExperienceSection(index, {
          isUploading: false,
          fileName: "",
          document: "",
        });
      }
    } catch (error) {
      console.error("Error uploading file:", error);

      updateExperienceSection(index, {
        isUploading: false,
        fileName: "",
        document: "",
      });
    }
  };

  const handleFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "http://localhost:5000/api/upload/document",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        console.log(data.url);
        return data.url;
      } else {
        throw new Error("File upload failed");
      }
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  return (
    <div className="p-6 max-w-4xl">
      <h2 className="text-2xl font-medium text-gray-800 mb-6">Experience</h2>

      <div
        className={`relative space-y-8 ${
          experienceSections.length > 1 ? "pl-12" : ""
        }`}
      >
        {experienceSections.map((section, index) => (
          <div key={index} className="relative">
            {experienceSections.length > 1 && (
              <div className="absolute -left-12 top-0 bottom-0 flex items-center">
                <div className="relative flex items-center h-full">
                  <div className="w-1 ml-2 bg-blue-900 h-full rounded-full"></div>
                  <div className="absolute -left-4 top-1/2 -translate-y-1/2 text-3xl font-bold text-blue-900">
                    {index + 1}
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-1/5">
                  <label className="text-md leading-[27px]  font-semibold text-black mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={section.location || ""}
                    onChange={(e) =>
                      updateExperienceSection(index, {
                        location: e.target.value,
                      })
                    }
                    className="w-full h-[46px] bg-white shadow-[4px_4px_4px_rgba(0,0,0,0.25),-1px_-1px_4px_rgba(0,0,0,0.25)] rounded-lg text-gray-700 text-md font-light tracking-wider pl-3"
                  />
                </div>
                <div className="w-2/5">
                  <label className="text-md leading-[27px]  font-semibold text-black mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={section.companyName || ""}
                    onChange={(e) =>
                      updateExperienceSection(index, {
                        companyName: e.target.value,
                      })
                    }
                    className="w-full h-[46px] bg-white shadow-[4px_4px_4px_rgba(0,0,0,0.25),-1px_-1px_4px_rgba(0,0,0,0.25)] rounded-lg text-gray-700 text-md font-light tracking-wider pl-3"
                  />
                </div>
                <div className="w-2/5">
                  <label className="text-md leading-[27px]  font-semibold text-black mb-2">
                    Designation
                  </label>
                  <input
                    type="text"
                    value={section.designation || ""}
                    onChange={(e) =>
                      updateExperienceSection(index, {
                        designation: e.target.value,
                      })
                    }
                    className="w-full h-[46px] bg-white shadow-[4px_4px_4px_rgba(0,0,0,0.25),-1px_-1px_4px_rgba(0,0,0,0.25)] rounded-lg text-gray-700 text-md font-light tracking-wider pl-3"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-1/4">
                  <label className="text-md leading-[27px]  font-semibold text-black mb-2">
                    Period From
                  </label>
                  <div className="relative">
                    <input
                      type="month"
                      value={section.periodFrom || ""}
                      onChange={(e) =>
                        updateExperienceSection(index, {
                          periodFrom: e.target.value,
                        })
                      }
                      className="w-full h-[46px] bg-white shadow-[4px_4px_4px_rgba(0,0,0,0.25),-1px_-1px_4px_rgba(0,0,0,0.25)] rounded-lg text-gray-700 text-md text-md font-normal tracking-wider pl-3 pr-10"
                    />
                  </div>
                </div>
                <div className="w-1/4">
                  <label className="text-md leading-[27px]  font-semibold text-black mb-2">
                    To
                  </label>
                  <div className="relative">
                    <input
                      type="month"
                      value={section.periodTo || ""}
                      onChange={(e) =>
                        updateExperienceSection(index, {
                          periodTo: e.target.value,
                        })
                      }
                      className="w-full h-[46px] bg-white shadow-[4px_4px_4px_rgba(0,0,0,0.25),-1px_-1px_4px_rgba(0,0,0,0.25)] rounded-lg text-gray-700 text-md text-md font-normal tracking-wider pl-3 pr-10"
                    />
                  </div>
                </div>
                <div className="w-1/4">
                  <label className="text-md leading-[27px]  font-semibold text-black mb-2">
                    Reason for Leaving
                  </label>
                  <input
                    type="text"
                    value={section.reasonForLeaving || ""}
                    onChange={(e) =>
                      updateExperienceSection(index, {
                        reasonForLeaving: e.target.value,
                      })
                    }
                    className="w-full h-[46px] bg-white shadow-[4px_4px_4px_rgba(0,0,0,0.25),-1px_-1px_4px_rgba(0,0,0,0.25)] rounded-lg text-gray-700 text-md font-light tracking-wider pl-3"
                  />
                </div>
                <div className="w-1/4">
                  <label className="text-md leading-[27px]  font-semibold text-black mb-2">
                    Upload Document
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id={`file-${index}`}
                      onChange={(e) =>
                        handleFileUpload(index, e.target.files[0])
                      }
                      className="hidden"
                    />
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor={`file-${index}`}
                        className="h-[46px] px-4 bg-gray-100 rounded-full flex items-center gap-2 cursor-pointer border border-gray-300 hover:bg-gray-200 transition-colors"
                      >
                        <PiUploadSimpleBold />
                        {section.isUploading
                          ? "Uploading..."
                          : section.document
                          ? "Change File"
                          : "Choose File"}
                      </label>
                      {section.fileName && (
                        <span className="text-sm text-gray-600 truncate max-w-[150px]">
                          {section.fileName}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="flex w-fit mx-auto gap-4 mt-4">
          <button
            onClick={addExperienceSection}
            className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-colors"
          >
            <FaPlus size={24} />
          </button>

          {experienceSections.length > 1 && (
            <button
              onClick={() =>
                removeExperienceSection(experienceSections.length - 1)
              }
              className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-400 transition-colors"
            >
              <FaMinus size={24} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperienceForm;
