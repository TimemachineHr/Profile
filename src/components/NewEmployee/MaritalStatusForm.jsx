import React, { useState, useEffect } from "react";
import { FaCaretDown } from "react-icons/fa6";

const MaritalStatusForm = ({ data, setData }) => {
  const [formState, setFormState] = useState({
    maritalStatus: "Single",
    spouseEmploymentStatus: "",
    numberOfChildren: "",
    children: [],
    otherStatus: "",
    ...data,
  });

  const [isMaritalDropdownOpen, setIsMaritalDropdownOpen] = useState(false);
  const [isSpouseEmploymentDropdownOpen, setIsSpouseEmploymentDropdownOpen] =
    useState(false);

  const maritalOptions = ["Single", "Married", "Others", "Prefer not to say"];
  const spouseEmploymentOptions = [
    "Employed",
    "Unemployed",
    "Prefer not to say",
  ];

  useEffect(() => {
    setData(formState);
  }, [formState]);

  const handleStatusChange = (status) => {
    setFormState((prev) => ({
      ...prev,
      maritalStatus: status,
      children: [],
    }));
    setIsMaritalDropdownOpen(false);
  };

  const handleSpouseEmploymentChange = (status) => {
    setFormState((prev) => ({
      ...prev,
      spouseEmploymentStatus: status,
    }));
    setIsSpouseEmploymentDropdownOpen(false);
  };

  const handleInputChange = (field, value) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleChildrenChange = (index, field, value) => {
    setFormState((prev) => {
      const updatedChildren = [...prev.children];
      updatedChildren[index] = {
        ...updatedChildren[index],
        [field]: value,
      };
      return { ...prev, children: updatedChildren };
    });
  };

  const handleChildrenCountChange = (value) => {
    const count = parseInt(value, 10) || 0;
    const childrenArray = Array.from({ length: count }, (_, i) => ({
      childRelationship: "",
      childName: "",
      childDateOfBirth: "",
    }));
    setFormState((prev) => ({
      ...prev,
      numberOfChildren: value,
      children: childrenArray,
    }));
  };

  return (
    <div className="p-6">
      <div className="flex flex-col mb-6">
        <label className="text-2xl font-medium text-gray-800 mb-2">
          Marital Status
        </label>
        <div className="relative">
          <button
            onClick={() => setIsMaritalDropdownOpen(!isMaritalDropdownOpen)}
            className="w-[204px] h-[46px] bg-white shadow rounded-lg text-gray-700 text-md font-medium tracking-wider pl-3 text-left relative"
          >
            {formState.maritalStatus || "Single"}
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <FaCaretDown />
            </span>
          </button>

          {isMaritalDropdownOpen && (
            <div className="absolute z-10 w-[204px] bg-white shadow rounded-lg mt-1">
              {maritalOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => handleStatusChange(option)}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 text-md font-medium tracking-wider"
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {formState.maritalStatus === "Married" && (
        <div>
          <h2 className="text-2xl font-medium text-gray-800 mb-6">
            Family Details
          </h2>
          <div className="grid grid-cols-3 gap-x-2">
            <div className="flex flex-col mb-6">
              <label className="text-gray-700 text-md font-medium mb-2">
                Spouse Employment Status
              </label>
              <div className="relative">
                <button
                  onClick={() =>
                    setIsSpouseEmploymentDropdownOpen(
                      !isSpouseEmploymentDropdownOpen
                    )
                  }
                  className="w-[330px] h-[46px] bg-white shadow rounded-lg text-gray-700 text-md font-medium tracking-wider pl-3 text-left relative"
                >
                  {formState.spouseEmploymentStatus ||
                    "Select Spouse Employment Status"}
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <FaCaretDown />
                  </span>
                </button>

                {isSpouseEmploymentDropdownOpen && (
                  <div className="absolute z-10 w-[330px] bg-white shadow rounded-lg mt-1">
                    {spouseEmploymentOptions.map((option) => (
                      <div
                        key={option}
                        onClick={() => handleSpouseEmploymentChange(option)}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 text-md font-medium tracking-wider"
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col mb-6">
              <label className="text-gray-700 text-md font-medium mb-2">
                No. of Children
              </label>
              <input
                type="text"
                value={formState.numberOfChildren}
                onChange={(e) => handleChildrenCountChange(e.target.value)}
                className="w-[204px] h-[46px] bg-white shadow rounded-lg text-gray-700 text-[18px] font-normal tracking-wider pl-3"
              />
            </div>
          </div>

          {formState.children.map((child, index) => (
            <div key={index} className="grid grid-cols-3 gap-x-2 mb-6">
              <div className="flex flex-col">
                <label className="text-gray-700 text-md font-medium mb-2">
                  Relationship
                </label>
                <input
                  type="text"
                  value={child.childRelationship}
                  onChange={(e) =>
                    handleChildrenChange(
                      index,
                      "childRelationship",
                      e.target.value
                    )
                  }
                  placeholder={`Child ${index + 1}`}
                  className="w-[204px] h-[46px] bg-white shadow rounded-lg text-gray-700 text-[18px] font-normal tracking-wider pl-3"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700 text-md font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={child.childName}
                  onChange={(e) =>
                    handleChildrenChange(index, "childName", e.target.value)
                  }
                  className="w-[204px] h-[46px] bg-white shadow rounded-lg text-gray-700 text-[18px] font-normal tracking-wider pl-3"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700 text-md font-medium mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={child.childDateOfBirth}
                  onChange={(e) =>
                    handleChildrenChange(
                      index,
                      "childDateOfBirth",
                      e.target.value
                    )
                  }
                  className="w-[204px] h-[46px] bg-white shadow rounded-lg text-gray-700 text-[18px] font-normal tracking-wider pl-3 pr-10"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {formState.maritalStatus === "Others" && (
        <div className="flex flex-col">
          <label className="text-[18px] leading-[27px] text-gray-700 text-md font-medium mb-2">
            Others
          </label>
          <input
            type="text"
            value={formState.otherStatus}
            onChange={(e) => handleInputChange("otherStatus", e.target.value)}
            className="w-[204px] h-[46px] bg-white shadow rounded-lg text-gray-700 text-[18px] font-normal tracking-wider pl-3"
          />
        </div>
      )}
    </div>
  );
};

export default MaritalStatusForm;
