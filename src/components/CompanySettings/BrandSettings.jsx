import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const BrandSettings = () => {
  const [brandSettings, setBrandSettings] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [settingsId, setSettingsId] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleToggle = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleClose = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    fetch("https://company-settings-one.vercel.app/api/company-settings/")
      .then((response) => response.json())
      .then((data) => {
        setBrandSettings(data[0].brandSettings);
        setSettingsId(data[0]._id);
      });
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    if (!settingsId) return;
    fetch(
      `https://company-settings-one.vercel.app/api/company-settings/${settingsId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ brandSettings }),
      }
    ).then(() => setIsEditing(false));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setBrandSettings((prev) => {
      if (name in prev) {
        // Updating top-level fields
        return { ...prev, [name]: value };
      } else {
        // Updating nested fields (exchangeRateConfig)
        return {
          ...prev,
          exchangeRateConfig: {
            ...prev.exchangeRateConfig,
            [name]: value,
          },
        };
      }
    });
  };

  if (!brandSettings) return <div>Loading...</div>;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Brand</h2>
        <button
          onClick={handleEditToggle}
          className=" py-2 text-gray-600 hover:text-blue-600"
        >
          {isEditing ? (
            <ImCross size={18} title="Close" />
          ) : (
            <FaEdit title="Edit" size={20} />
          )}
        </button>
      </div>

      {/* Brand Color */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        <div className="flex flex-col">
          <label className="text-gray-700 text-md font-medium mb-2">
            Brand Color
          </label>
          <input
            type="color"
            name="brandColor"
            value={brandSettings.brandColor}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-12 h-10 p-1 rounded-md border"
          />
        </div>
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
        <div className="flex flex-col">
          <label
            htmlFor="colourcode"
            className="text-gray-700 text-md font-medium mb-2"
          >
            Brand Color
          </label>
          <div className="flex items-center border rounded-md">
            <input
              type="text"
              value={brandSettings.brandColor}
              onChange={handleChange}
              disabled={!isEditing}
              className="p-2 w-full font-light text-gray-700 border-none focus:outline-none"
            />
            <input
              type="color"
              id="colourcode"
              name="brandColor"
              value={brandSettings.brandColor}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-12 h-10 p-1 rounded-r-md border-l"
            />
          </div>
        </div>
      </div>

      {/* Functional Currency, Currency Placement, Decimals */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
        <div>
          <label className="block text-gray-700 text-md font-medium mb-2">
            Functional Currency
          </label>
          <select
            name="baseCurrency"
            className="p-2 border rounded-md w-full"
            value={brandSettings.baseCurrency}
            onChange={handleChange}
            disabled={!isEditing}
          >
            <option value="USD">🇺🇸 USD - United States Dollar</option>
            <option value="INR">🇮🇳 INR - Indian Rupee</option>
            <option value="SGD">🇸🇬 SGD - Singapore Dollar</option>
            <option value="MYR">🇲🇾 MYR - Malaysian Ringgit</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 text-md font-medium mb-2">
            Currency Placement
          </label>
          <select
            name="currencyPlacement"
            className="p-2 border rounded-md w-full"
            value={brandSettings.currencyPlacement}
            onChange={handleChange}
            disabled={!isEditing}
          >
            <option value="front">Before Currency</option>
            <option value="rear">After Currency</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 text-md font-medium mb-2">
            Decimals
          </label>
          <select
            name="decimals"
            className="p-2 border rounded-md w-full"
            value={brandSettings.decimals}
            onChange={handleChange}
            disabled={!isEditing}
          >
            <option value="none">No Decimals</option>
            <option value="two">Keep 2 Decimals</option>
          </select>
        </div>
        <div className="relative">
          {/* Toggle Button */}
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-gray-700 text-md font-medium mb-2">
              Exchange Rate
            </span>
            <button
              onClick={handleToggle}
              className={`relative w-10 h-5 rounded-full transition-colors ${
                isPopupOpen ? "bg-blue-500" : "bg-gray-400"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  isPopupOpen ? "transform translate-x-5" : ""
                }`}
              ></span>
            </button>
          </div>

          {/* Popup */}
          {isPopupOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Exchange Rate Configuration
                </h2>
                {/* Form Inputs */}
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="base"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Base
                    </label>
                    <input
                      type="text"
                      id="base"
                      value={brandSettings.baseCurrency}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="Enter base currency (e.g., USD)"
                      className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="api"
                        className="block text-gray-700 font-medium mb-1"
                      >
                        OANDA's Exchange Rates API
                      </label>
                      <a
                        href="http://developer.oanda.com/exchange-rates-api/?_gl=1*1uc1w4d*_gcl_au*MTg0NzI4MDUxOC4xNzM0NTI5NjI4*_ga*MTIzNDI0Mzk1Mi4xNzM0NTI5NjI4*_ga_Q2HXMSGECM*MTczNDUyOTYyNi4xLjEuMTczNDUyOTY1NC4zMi4wLjA."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline text-sm"
                      >
                        Get API
                      </a>
                    </div>
                    <input
                      type="text"
                      id="apiURL"
                      name="apiURL"
                      value={brandSettings.exchangeRateConfig.apiURL}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="https://exchange-rates-api.oanda.com"
                      className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="id"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      ID
                    </label>
                    <input
                      type="text"
                      name="id"
                      value={brandSettings.exchangeRateConfig.id}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="Enter your ID"
                      className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="token"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      API Token
                    </label>
                    <input
                      type="text"
                      name="token"
                      value={brandSettings.exchangeRateConfig.token}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="Enter API Token"
                      className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </form>

                {/* Buttons */}
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    onClick={handleClose}
                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleClose}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Date Format, Time Format, Choose Theme */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
        <div>
          <label className="block text-gray-700 text-md font-medium mb-2">
            Date Format
          </label>
          <select
            name="dateFormat"
            className="p-2 border rounded-md w-full"
            value={brandSettings.dateFormat}
            onChange={handleChange}
            disabled={!isEditing}
          >
            <option value="dd/mm/yyyy">DD/MM/YYYY</option>
            <option value="mm/dd/yyyy">MM/DD/YYYY</option>
            <option value="yyyy-mm-dd">YYYY-MM-DD</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 text-md font-medium mb-2">
            Time Format
          </label>
          <select
            name="timeFormat"
            className="p-2 border rounded-md w-full"
            value={brandSettings.timeFormat}
            onChange={handleChange}
            disabled={!isEditing}
          >
            <option value="12-hour">12-Hour</option>
            <option value="24-hour">24-Hour</option>
          </select>
        </div>
        {/* <div>
          <label className="block text-gray-700 text-md font-medium mb-2">
            Choose Theme
          </label>
          <select
            name="systemTheme"
            className="p-2 border rounded-md w-full"
            value={brandSettings.systemTheme}
            onChange={handleChange}
            disabled={!isEditing}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system-default">System default</option>
          </select>
        </div> */}
      </div>

      {/* Save Button */}
      {isEditing && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default BrandSettings;
