import React, { useState } from "react";
import * as XLSX from "xlsx";

const IncomeTaxForm = ({ setEmployeeData }) => {
  const handleFileImport = (files) => {
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        console.log("Imported Data:", jsonData);
        setEmployeeData(jsonData);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h3 className="font-semibold">IR8A</h3>
      <h2 className="text-2xl font-bold mb-4">
        Return of Employee’s Remuneration
      </h2>

      {/* Employer Info */}
      <h3 className="text-lg font-semibold mb-4">Employer Info</h3>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Year of Income
          </label>
          <select className="block w-full border border-gray-300 rounded-md p-2">
            <option>2023</option>
            <option>2024</option>
            <option>2025</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Organization
          </label>
          <input
            type="text"
            value="180011032C"
            readOnly
            className="block w-full border border-gray-300 rounded-md p-2 bg-gray-200 cursor-not-allowed"
          />
        </div>
      </div>

      {/* Authorized Submitting Personnel */}
      <h3 className="text-lg font-semibold mb-4">
        Authorized Submitting Personnel
      </h3>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name (as in NRIC/FIN)
          </label>
          <input
            type="text"
            value="John Doe"
            readOnly
            className="block w-full border border-gray-300 rounded-md p-2 bg-gray-200 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Designation
          </label>
          <input
            type="text"
            value="Manager"
            readOnly
            className="block w-full border border-gray-300 rounded-md p-2 bg-gray-200 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Identity Type
          </label>
          <input
            type="text"
            value="FIN"
            readOnly
            className="block w-full border border-gray-300 rounded-md p-2 bg-gray-200 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Identity
          </label>
          <input
            type="text"
            value="M3070191N"
            readOnly
            className="block w-full border border-gray-300 rounded-md p-2 bg-gray-200 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            className="block w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter email"
            defaultValue="johndoe@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            className="block w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter phone number"
            defaultValue="1234567890"
          />
        </div>
      </div>

      <hr className="my-6 border-gray-300" />

      {/* Employee Info */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold mb-4">Employee Info</h3>
          <div>
            <button className="bg-blue-900 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300">
              <label htmlFor="import-file" className="cursor-pointer">
                Import
              </label>
            </button>
            <input
              id="import-file"
              type="file"
              accept=".xlsx"
              className="hidden"
              onChange={(e) => handleFileImport(e.target.files)}
            />
          </div>
        </div>

        {[
          "Optional Declaration for individual employee(s)",
          "Excess/Voluntary contribution to CPF",
          "Refund claimed / to be claimed on excess CPF contributions",
          "Benefits-in-kind",
          "Any Tax payment Borne by Employer",
          "ESOP/ESOW Provided",
        ].map((label) => (
          <div className="flex items-center justify-between" key={label}>
            <span className="text-sm font-medium text-gray-700">{label}</span>
            <div className="space-x-4">
              <label>
                <input type="radio" name={label} value="Yes" className="mr-1" />
                Yes
              </label>
              <label>
                <input type="radio" name={label} value="No" className="mr-1" />
                No
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncomeTaxForm;
