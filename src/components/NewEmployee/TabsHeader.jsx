import React, { useState } from "react";
import PersonalDetails from "./Personaldetails";
import EducationSkills from "./EducationSkills";
import ExperienceForm from "./ExperienceForm";
import ContactForm from "./ContactForm";
import MaritalStatusForm from "./MaritalStatusForm";
import EmployeeForm from "./EmployeeForm";
import Earning from "./Earning";
import LeaveBenefits from "./LeaveBenefits";
import EmployeeHeader from "../NewEmployee/EmployeeHeader";

const navItems = [
  { id: 1, label: "Personal Details", active: true },
  { id: 2, label: "Education & Skills", active: false },
  { id: 3, label: "Experience", active: false },
  { id: 4, label: "Reference & Emergency Contact", active: false },
  { id: 5, label: "Family Details", active: false },
  { id: 6, label: "Employment", active: false },
  { id: 7, label: "Earnings", active: false },
  { id: 8, label: "Benefits", active: false },
];

const initialFormState = {
  personalDetails: {},
  education: {},
  experience: {},
  contact: {},
  maritalStatus: {},
  employment: {},
  earning: {},
  Benefits: {},
};

const TabsHeader = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [formData, setFormData] = useState(initialFormState);
  const [userName, setUserName] = useState("");

  const handleFormDataChange = (key, data) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: data,
    }));

    if (key === "personalDetails" && data.fullName) {
      setUserName(data.fullName);
    }
  };

  return (
    <div>
      <EmployeeHeader userName={userName} />

      <div className="flex mx-auto my-8 flex-col w-[1110px]">
        <div className="flex gap-4 p-1 border-b-[3px] pb-3 border-b-[#333333] justify-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                navItems.forEach((navItem) => {
                  navItem.active = navItem.id === item.id;
                });
              }}
              className={`w-auto rounded-xl whitespace-nowrap px-4 py-3 text-xs font-bold text-center font-poppins transition-colors
              ${
                item.active
                  ? "bg-blue-900 text-white"
                  : "bg-gray-100 shadow-[inset_-6px_-6px_4px_rgba(255,233,233,0.25),inset_6px_6px_4px_#CFCFCF] hover:bg-gray-200"
              }`}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="w-full my-4 h-[450px] overflow-y-auto custom-scrollbar">
          {activeTab === 1 && (
            <PersonalDetails
              data={formData.personalDetails}
              setUserName={setUserName}
              setData={(data) => handleFormDataChange("personalDetails", data)}
            />
          )}
          {activeTab === 2 && (
            <EducationSkills
              data={formData.education}
              setData={(data) => handleFormDataChange("education", data)}
            />
          )}
          {activeTab === 3 && (
            <ExperienceForm
              data={formData.experience}
              setData={(data) => handleFormDataChange("experience", data)}
            />
          )}
          {activeTab === 4 && (
            <ContactForm
              data={formData.contact}
              setData={(data) => handleFormDataChange("contact", data)}
            />
          )}
          {activeTab === 5 && (
            <MaritalStatusForm
              data={formData.maritalStatus}
              setData={(data) => handleFormDataChange("maritalStatus", data)}
            />
          )}
          {activeTab === 6 && (
            <EmployeeForm
              data={formData.employment}
              setData={(data) => handleFormDataChange("employment", data)}
            />
          )}
          {activeTab === 7 && (
            <Earning
              data={formData.earning}
              setData={(data) => handleFormDataChange("earning", data)}
            />
          )}
          {activeTab === 8 && (
            <LeaveBenefits
              data={formData.Benefits}
              setData={(data) => handleFormDataChange("Benefits", data)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TabsHeader;
