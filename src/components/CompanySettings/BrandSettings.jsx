import React, { useState } from "react";

const BrandSettings = () => {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [color, setColor] = useState("#FFFFFF");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleToggle = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleClose = () => {
    setIsPopupOpen(false);
  };
  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-6">Brand</h2>
      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
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
              value={color}
              readOnly
              className="p-2 w-full font-light text-gray-700 border-none focus:outline-none"
            />
            <input
              type="color"
              id="colourcode"
              name="colourcode"
              value={color}
              onChange={handleColorChange}
              className="w-12 h-10 p-1 rounded-r-md border-l"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
        {/* Functional Currency */}
        <div>
          <label className="block text-gray-700 text-md font-medium mb-2">
            Functional Currency
          </label>
          <select
            className="p-2 border rounded-md w-full"
            value={baseCurrency}
            onChange={(e) => setBaseCurrency(e.target.value)}
          >
            <option value="USD">🇺🇸 USD - United States Dollar</option>
            <option value="INR">🇮🇳 INR - Indian Rupee</option>
            <option value="SGD">🇸🇬 SGD - Singapore Dollar</option>
            <option value="MYR">🇲🇾 MYR - Malaysian Ringgit</option>
          </select>
        </div>
        {/* Currency Placement */}
        <div>
          <label className="block text-gray-700 text-md font-medium mb-2">
            Currency Placement
          </label>
          <div className="flex items-center mt-4 space-x-4">
            <label className="flex items-center space-x-2">
              <input type="radio" name="placement" value="front" />
              <span>In Front</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="placement" value="rear" />
              <span>At Rear</span>
            </label>
          </div>
        </div>
        {/* Decimals */}
        <div>
          <label className="block text-gray-700 text-md font-medium mb-2">
            Decimals
          </label>
          <div className="flex items-center mt-4 space-x-4">
            <label className="flex items-center space-x-2">
              <input type="radio" name="decimals" value="none" />
              <span>No Decimals</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="decimals" value="two" />
              <span>Keep 2 Decimals</span>
            </label>
          </div>
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
                      id="api"
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
                      id="id"
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
                      id="token"
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
                    onClick={() => alert("Submitted!")}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        {/* Date Format */}
        <div>
          <label className="block text-gray-700 text-md font-medium mb-2">
            Date Format
          </label>
          <select className="p-2 border rounded-md w-full">
            <option value="dd/mm/yyyy">DD/MM/YYYY</option>
            <option value="mm/dd/yyyy">MM/DD/YYYY</option>
            <option value="yyyy-mm-dd">YYYY-MM-DD</option>
          </select>
        </div>
        {/* Time Format */}
        <div>
          <label className="block text-gray-700 text-md font-medium mb-2">
            Time Format
          </label>
          <select className="p-2 border rounded-md w-full">
            <option value="12-hour">12-Hour</option>
            <option value="24-hour">24-Hour</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default BrandSettings;
