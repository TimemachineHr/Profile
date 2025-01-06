import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";

const BusinessSection = () => {
  const [logo, setLogo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [companyName, setCompanyName] = useState("Valluva Inc.");
  const [location, setLocation] = useState("Singapore");
  const [email, setEmail] = useState("example@valluva.com");
  const [phone, setPhone] = useState("123-456-7890");
  const [website, setWebsite] = useState("www.valluva.com");
  const [address, setAddress] = useState("1234 Elm Street, City, Country");

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <section id="business" className="mb-6 mt-10 relative">
      <div className="flex items-center justify-between bg-white shadow-md rounded-lg p-12">
        {/* Edit Icon */}
        <button
          onClick={toggleEditMode}
          className="absolute top-4 right-4 text-gray-600 hover:text-blue-600"
        >
          <FaEdit size={20} />
        </button>

        {/* Company Logo and Name */}
        <div className="flex w-1/2 items-start">
          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
            {logo ? (
              <img
                src={logo}
                alt="Company Logo"
                className="w-full h-full object-cover"
              />
            ) : (
              <label className="text-gray-700 text-sm font-semibold cursor-pointer">
                Upload Logo
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
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="text-4xl w-64 font-bold text-gray-800 mb-2 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="text-lg font-medium text-gray-600 mb-2 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </>
            ) : (
              <>
                <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center">
                  {companyName}
                  <p className="text-lg font-medium text-gray-600 ml-2">
                    {location}
                  </p>
                </h1>
              </>
            )}
            <p className="text-sm text-gray-500">Reg: 201945787K</p>
          </div>
        </div>

        {/* Contact Details */}
        <div className="w-1/2 grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label
              className="text-gray-700 text-sm font-medium mb-1"
              htmlFor="email"
            >
              Email<span className="ml-1 text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditing}
              className={`border bg-gray-100 ${
                isEditing ? "border-gray-300" : "border-transparent"
              } rounded-lg p-2 focus:outline-none ${
                isEditing ? "focus:ring-2 focus:ring-primary" : ""
              }`}
            />
          </div>
          <div className="flex flex-col">
            <label
              className="text-gray-700 text-sm font-medium mb-1"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              id="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={!isEditing}
              className={`border bg-gray-100 ${
                isEditing ? "border-gray-300" : "border-transparent"
              } rounded-lg p-2 focus:outline-none ${
                isEditing ? "focus:ring-2 focus:ring-primary" : ""
              }`}
            />
          </div>
          <div className="flex flex-col">
            <label
              className="text-gray-700 text-sm font-medium mb-1"
              htmlFor="website"
            >
              Website<span className="ml-1 text-red-500">*</span>
            </label>
            <input
              id="website"
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              disabled={!isEditing}
              className={`border bg-gray-100 ${
                isEditing ? "border-gray-300" : "border-transparent"
              } rounded-lg p-2 focus:outline-none ${
                isEditing ? "focus:ring-2 focus:ring-primary" : ""
              }`}
            />
          </div>
          <div className="flex flex-col">
            <label
              className="text-gray-700 text-sm font-medium mb-1"
              htmlFor="address"
            >
              Address
            </label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={!isEditing}
              className={`border bg-gray-100 ${
                isEditing ? "border-gray-300" : "border-transparent"
              } rounded-lg p-2 focus:outline-none ${
                isEditing ? "focus:ring-2 focus:ring-primary" : ""
              }`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessSection;
