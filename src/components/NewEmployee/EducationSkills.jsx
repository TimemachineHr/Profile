import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { PiUploadSimpleBold } from "react-icons/pi";
import { FaPlus, FaMinus } from "react-icons/fa";

const EducationForm = ({ data, setData }) => {
  const defaultEducationEntry = {
    instituteName: "",
    qualification: "",
    grade: "",
    startDate: "",
    endDate: "",
    document: "",
    documentFile: null,
    isUploading: false,
    fileName: "",
  };

  const [educationSections, setEducationSections] = useState(
    data?.educationEntries?.length > 0
      ? data.educationEntries.map((entry) => ({
          ...defaultEducationEntry,
          ...entry,
          fileName: entry.documentFile?.name || "",
        }))
      : [defaultEducationEntry]
  );
  const [skills, setSkills] = useState(data?.skills || ["Observer"]);
  const [currentSkill, setCurrentSkill] = useState("");

  useEffect(() => {
    const formattedEducationEntries = educationSections.map((section) => ({
      instituteName: section.instituteName,
      qualification: section.qualification,
      grade: section.grade,
      startDate: section.startDate,
      endDate: section.endDate,
      document: section.document,
    }));

    setData({
      educationEntries: formattedEducationEntries,
      skills: skills,
    });
  }, [educationSections, skills]);

  const addEducationSection = () => {
    setEducationSections([...educationSections, defaultEducationEntry]);
  };

  const removeEducationSection = (indexToRemove) => {
    if (educationSections.length > 1) {
      setEducationSections(
        educationSections.filter((_, index) => index !== indexToRemove)
      );
    }
  };

  const updateEducationSection = (index, field, value) => {
    const updatedSections = educationSections.map((section, i) => {
      if (i === index) {
        return { ...section, [field]: value };
      }
      return section;
    });
    setEducationSections(updatedSections);
  };

  const handleFileUpload = async (index, file) => {
    if (!file) return;

    const updatedSections = [...educationSections];
    updatedSections[index] = {
      ...updatedSections[index],
      isUploading: true,
      fileName: file.name,
      documentFile: file,
    };
    setEducationSections(updatedSections);

    try {
      const fileUrl = await handleFile(file);

      const finalUpdatedSections = [...educationSections];
      finalUpdatedSections[index] = {
        ...finalUpdatedSections[index],
        document: fileUrl,
        isUploading: false,
        fileName: file.name,
      };
      setEducationSections(finalUpdatedSections);
    } catch (error) {
      console.error("File upload failed:", error);
      const resetSections = [...educationSections];
      resetSections[index] = {
        ...resetSections[index],
        isUploading: false,
        fileName: "",
        documentFile: null,
        document: "",
      };
      setEducationSections(resetSections);
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter" && currentSkill.trim()) {
      e.preventDefault();
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };

  return (
    <div className="p-6 max-w-4xl">
      <h2 className="text-2xl font-medium text-gray-800 mb-6">Education</h2>

      <div
        className={`relative space-y-8 ${
          educationSections.length > 1 ? "pl-12" : ""
        }`}
      >
        {educationSections.map((section, index) => (
          <div key={index} className="relative">
            {educationSections.length > 1 && (
              <div className="absolute -left-12 top-0 bottom-0 flex items-stretch">
                <div className="relative flex gap-2 items-stretch">
                  <div className="-left-4 self-center top-0 text-3xl font-bold text-blue-900">
                    {index + 1}
                  </div>
                  <div className="w-1 bg-blue-900 rounded-full"></div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="text-[18px] leading-[27px]  text-gray-700 text-md font-medium mb-2">
                    Institute Name
                  </label>
                  <input
                    type="text"
                    value={section.instituteName || ""}
                    onChange={(e) =>
                      updateEducationSection(
                        index,
                        "instituteName",
                        e.target.value
                      )
                    }
                    className="w-full h-[46px] bg-white shadow-[4px_4px_4px_rgba(0,0,0,0.25),-1px_-1px_4px_rgba(0,0,0,0.25)] rounded-lg text-gray-700 text-[18px] font-normal tracking-wider pl-3"
                  />
                </div>
                <div className="w-1/4">
                  <label className="text-[18px] leading-[27px]  text-gray-700 text-md font-medium mb-2">
                    Qualification
                  </label>
                  <input
                    type="text"
                    value={section.qualification || ""}
                    onChange={(e) =>
                      updateEducationSection(
                        index,
                        "qualification",
                        e.target.value
                      )
                    }
                    className="w-full h-[46px] bg-white shadow-[4px_4px_4px_rgba(0,0,0,0.25),-1px_-1px_4px_rgba(0,0,0,0.25)] rounded-lg text-gray-700 text-[18px] font-normal tracking-wider pl-3"
                  />
                </div>
                <div className="w-1/4">
                  <label className="text-[18px] leading-[27px]  text-gray-700 text-md font-medium mb-2">
                    Grade
                  </label>
                  <input
                    type="text"
                    value={section.grade || ""}
                    onChange={(e) =>
                      updateEducationSection(index, "grade", e.target.value)
                    }
                    className="w-full h-[46px] bg-white shadow-[4px_4px_4px_rgba(0,0,0,0.25),-1px_-1px_4px_rgba(0,0,0,0.25)] rounded-lg text-gray-700 text-[18px] font-normal tracking-wider pl-3"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div>
                  <label className="text-[18px] leading-[27px]  text-gray-700 text-md font-medium mb-2">
                    Start Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={section.startDate || ""}
                      onChange={(e) =>
                        updateEducationSection(
                          index,
                          "startDate",
                          e.target.value
                        )
                      }
                      className="w-[204px] h-[46px] bg-white shadow-[4px_4px_4px_rgba(0,0,0,0.25),-1px_-1px_4px_rgba(0,0,0,0.25)] rounded-lg text-gray-700 text-[18px] font-normal tracking-wider pl-3 pr-3"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[18px] leading-[27px]  text-gray-700 text-md font-medium mb-2">
                    End Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={section.endDate || ""}
                      onChange={(e) =>
                        updateEducationSection(index, "endDate", e.target.value)
                      }
                      className="w-[204px] h-[46px] bg-white shadow-[4px_4px_4px_rgba(0,0,0,0.25),-1px_-1px_4px_rgba(0,0,0,0.25)] rounded-lg text-gray-700 text-[18px] font-normal tracking-wider pl-3 pr-3"
                    />
                  </div>
                </div>
                <div className="flex items-end gap-2">
                  <label className="h-[46px] px-4 bg-gray-200 rounded-full flex items-center gap-2 cursor-pointer">
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(index, e.target.files[0])
                      }
                    />
                    <PiUploadSimpleBold />
                    {section.isUploading
                      ? "Uploading..."
                      : section.document
                      ? "Change Document"
                      : "Upload Document"}
                  </label>
                  {section.fileName && (
                    <span className="text-sm text-gray-600 ml-2 truncate max-w-xs">
                      {section.fileName}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="flex gap-4 w-fit mx-auto mt-4">
          <button
            onClick={addEducationSection}
            className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors"
          >
            <FaPlus size={24} />
          </button>

          {educationSections.length > 1 && (
            <button
              onClick={() =>
                removeEducationSection(educationSections.length - 1)
              }
              className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-colors"
            >
              <FaMinus size={24} />
            </button>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-medium text-gray-800 mb-4">Skills</h2>
        <div className="p-4 bg-white shadow-[4px_4px_4px_rgba(0,0,0,0.25),-1px_-1px_4px_rgba(0,0,0,0.25)] rounded-lg">
          <input
            type="text"
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            onKeyDown={handleSkillKeyDown}
            placeholder="Type a skill and press Enter"
            className="w-full mb-2 p-2 outline-none"
          />
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div
                key={skill}
                className="px-3 py-1 bg-gray-300 rounded-full flex items-center gap-1"
              >
                <span>{skill}</span>
                <button
                  onClick={() => removeSkill(skill)}
                  className="hover:bg-gray-400 rounded-full"
                >
                  <RxCross2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationForm;
