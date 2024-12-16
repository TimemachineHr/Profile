import React, { useState } from "react";
import CompanySettingsHeader from "../../components/Main/CompanySettingsHeader";

const CompanySettings = () => {
  const [companyColor, setCompanyColor] = useState("#FF5733");
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [logo, setLogo] = useState(null);
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <CompanySettingsHeader />
      <div className="min-h-screen p-8 bg-gray-100">
        {/* Top Section: Logo and Company Name */}
        <div className="flex items-center justify-between bg-white shadow-md rounded-lg p-6 mb-6">
          {/* Bug Logo Upload */}
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
                />
              </label>
            )}
          </div>

          {/* Company Name and Registration */}
          <div className="flex flex-col items-start ml-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Valluva Inc.
            </h1>
            <p className="text-lg font-medium text-gray-600">Singapore</p>
            <p className="text-sm text-gray-500">Reg: 201945787K</p>
          </div>
        </div>
        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* About Us Block */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">About Us</h2>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu
              enim quis nisi venenatis bibendum ut ut arcu.
            </p>
          </div>

          {/* Company Data Block */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Company Data</h2>
            <p className="text-gray-600">
              Duis auctor, velit vel viverra pulvinar, orci est facilisis augue,
              at volutpat sapien arcu eget nulla.
            </p>
          </div>
        </div>

        {/* Settings Section */}
        <div className="mt-8 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Settings</h2>
          {/* Company Color Picker */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Company Color
            </label>
            <input
              type="color"
              value={companyColor}
              onChange={(e) => setCompanyColor(e.target.value)}
              className="w-12 h-12 cursor-pointer border-none outline-none"
            />
          </div>
          {/* & USD - United States Dollar Currency Placement: In Front At the Rear */}
          {/* Base Currency Selector */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Base Currency
            </label>
            <select
              value={baseCurrency}
              onChange={(e) => setBaseCurrency(e.target.value)}
              className="p-2 border rounded-md w-full"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="INR">INR</option>
              <option value="JPY">JPY</option>
            </select>
          </div>
          {/* Additional Fields */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Other Related Field
            </label>
            <input
              type="text"
              placeholder="Enter value"
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanySettings;
