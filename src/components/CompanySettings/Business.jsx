import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";

const API_URL = "https://company-settings-one.vercel.app/api/company-settings/";

const BusinessSection = () => {
  const [business, setBusiness] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setBusiness(response.data[0]);
          // setLogo(response.data[0]?.businessProfile?.logo || null);
        } else {
          setError("Invalid API response");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBusiness((prev) => ({
      ...prev,
      businessProfile: { ...prev.businessProfile, [name]: value },
    }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!business?._id) {
      console.error("Missing business ID");
      return;
    }
    try {
      await axios.put(`${API_URL}${business._id}`, {
        businessProfile: { ...business.businessProfile, logo },
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating business profile", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!business) return <p>No business data available.</p>;

  return (
    <section id="business" className="mb-6 mt-10 relative">
      <div className="relative flex items-center justify-between bg-white shadow-md rounded-lg p-12">
        <button
          onClick={toggleEditMode}
          className="absolute top-4 right-4 text-gray-600 hover:text-blue-600"
        >
          <FaEdit size={20} />
        </button>

        <div className="flex w-1/2 items-start">
          <div className="w-24 h-24  rounded-full border-3 border-gray-500 flex items-center justify-center ">
            {logo ? (
              <img
                src={logo}
                alt="Company Logo"
                className="w-full h-full object-cover"
              />
            ) : (
              <label className=" w-24 h-24 rounded-full border-2 border-dashed flex items-center justify-center border-gray-300 text-sm font-semibold cursor-pointer">
                Logo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                  disabled={!isEditing}
                />
              </label>
            )}
          </div>

          <div className="flex flex-col items-start ml-6">
            {isEditing ? (
              <>
                {/* Editable Company Name */}
                <input
                  type="text"
                  name="companyName"
                  value={business.businessProfile.companyName || ""}
                  onChange={handleChange}
                  className="text-4xl w-72 font-bold text-gray-800 mb-2 border border-gray-300 rounded-lg p-2"
                />

                {/* Editable Location */}
                <input
                  type="text"
                  name="location"
                  value={business.businessProfile.location || ""}
                  onChange={handleChange}
                  className="text-lg font-medium text-gray-600 mb-2 border border-gray-300 rounded-lg p-2"
                />

                {/* Editable Registration Number */}
                <input
                  type="text"
                  name="registrationNumber"
                  value={business.businessProfile.registrationNumber || ""}
                  onChange={handleChange}
                  className="text-sm text-gray-500 border border-gray-300 rounded-lg p-2"
                />
              </>
            ) : (
              <>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                  {business.businessProfile.companyName || "No Company Name"}
                </h1>
                <p className="text-lg font-medium text-gray-600">
                  {business.businessProfile.location || "No Location"}
                </p>
                <p className="text-sm text-gray-500">
                  Reg: {business.businessProfile.registrationNumber || "N/A"}
                </p>
              </>
            )}
          </div>
        </div>

        <div className="w-1/2 grid grid-cols-2 gap-4">
          {["email", "phone", "website", "address"].map((field) => (
            <div className="flex flex-col" key={field}>
              <label
                className="text-gray-700 text-sm font-medium mb-1"
                htmlFor={field}
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
                {["email", "website"].includes(field) && (
                  <span className="ml-1 text-red-500">*</span>
                )}
              </label>
              <input
                id={field}
                name={field}
                type="text"
                value={business.businessProfile[field] || ""}
                onChange={handleChange}
                disabled={!isEditing}
                className="border bg-gray-100 border-gray-300 rounded-lg p-2"
              />
            </div>
          ))}
        </div>

        {isEditing && (
          <div className="absolute bottom-4 right-4">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Save
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BusinessSection;
