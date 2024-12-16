import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import * as XLSX from "xlsx";

const Review = () => {
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [tableData, setTableData] = useState([]); // State to store imported data

  const handleFileImport = (files) => {
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        setTableData(jsonData); // Update state with parsed data
      };
      reader.readAsArrayBuffer(files[0]);
    }
  };
  // const handleFileImport = (files) => {
  //   if (files && files[0]) {
  //     const file = files[0];
  //     const reader = new FileReader();

  //     reader.onload = (e) => {
  //       const data = new Uint8Array(e.target.result);
  //       const workbook = XLSX.read(data, { type: "array" });
  //       const sheetName = workbook.SheetNames[0];
  //       const worksheet = workbook.Sheets[sheetName];
  //       const jsonData = XLSX.utils.sheet_to_json(worksheet);

  //       console.log("Imported Data:", jsonData);
  //       setEmployeeData(jsonData);
  //     };

  //     reader.readAsArrayBuffer(file);
  //   }
  // };

  const employees = [
    {
      sNo: 2,
      name: "Employee1",
      identity: "M3067572R",
      salary: 8322.0,
      cpf: 675.0,
      donations: 3.0,
    },
    {
      sNo: 1,
      name: "Employee2",
      identity: "M3070191N",
      salary: 16976.0,
      cpf: 0.0,
      donations: 24.0,
    },
  ];

  const filteredEmployees = employees
    .filter((emp) =>
      search === ""
        ? true
        : emp.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => (sortOrder === "asc" ? a.sNo - b.sNo : b.sNo - a.sNo));

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h3 className="font-semibold">IR8A</h3>
      <h2 className="text-2xl font-bold mb-4">Review Income Tax</h2>
      <p className="text-sm text-gray-600 mb-6">
        Review the generated report for accuracy.
      </p>

      {/* Employer Info */}
      <h3 className="text-lg font-semibold mb-4">Employer Info</h3>
      <div className="space-y-2">
        <p className="text-sm">
          <span className="font-medium">Year of Income:</span> 2024
        </p>
        <p className="text-sm">
          <span className="font-medium">Organisation Type:</span> UEN
        </p>
        <p className="text-sm">
          <span className="font-medium">Organization:</span> 180011032C
        </p>
      </div>

      <hr className="my-6 border-gray-300" />

      {/* Authorized Submitting Personnel */}
      <h3 className="text-lg font-semibold mb-4">
        Authorized Submitting Personnel
      </h3>
      <div className="space-y-2">
        <p className="text-sm">
          <span className="font-medium">Name (as in NRIC/FIN):</span> John Doe
        </p>
        <p className="text-sm">
          <span className="font-medium">Designation:</span> Manager
        </p>
        <p className="text-sm">
          <span className="font-medium">Identity Type:</span> FIN
        </p>
        <p className="text-sm">
          <span className="font-medium">Identity:</span> M3070191N
        </p>
        <p className="text-sm">
          <span className="font-medium">Email:</span> example@example.com
        </p>
        <p className="text-sm">
          <span className="font-medium">Phone Number:</span> 1234567890
        </p>
      </div>

      <hr className="my-6 border-gray-300" />

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold mb-4">
          Optional Declaration for individual employee(s)
        </h3>
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
      <div className="p-6 bg-gray-100 rounded-lg ">
        <h3 className="text-lg font-semibold mb-4">List of Employees</h3>
        <div className="flex justify-between items-center mb-4">
          {/* Entries Dropdown */}

          <div className="flex items-center space-x-2">
            <label htmlFor="entries" className="text-sm font-medium">
              Show
            </label>
            <select
              id="entries"
              value={entries}
              onChange={(e) => setEntries(Number(e.target.value))}
              className="border border-gray-300 rounded-md text-sm p-1"
            >
              {[10, 20, 30, 40].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span className="text-sm font-medium">entries</span>
          </div>

          {/* Search Box */}
          <div>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded-md text-sm p-1 w-48"
            />
          </div>
        </div>

        {/* Table */}
        {/* <table className="table-auto w-full bg-white rounded-lg ">
          <thead className="bg-gray-200 text-gray-600 text-sm">
            <tr>
              <th className="px-4 py-2 flex items-center">
                S.No
                <button
                  onClick={() =>
                    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
                  }
                  className="ml-2 text-xs bg-gray-300 text-gray-700 px-2 py-1 rounded-md"
                >
                  {sortOrder === "asc" ? (
                    <IoMdArrowDropup className="font-semibold text-lg" />
                  ) : (
                    <IoMdArrowDropdown className="font-semibold text-lg" />
                  )}
                </button>
              </th>
              <th className="px-4 py-2">Employee Name</th>
              <th className="px-4 py-2">Identity</th>
              <th className="px-4 py-2">Salary</th>
              <th className="px-4 py-2">CPF</th>
              <th className="px-4 py-2">Donations</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.slice(0, entries).map((employee) => (
              <tr key={employee.sNo} className="text-sm text-gray-700">
                <td className="border px-4 py-2">{employee.sNo}</td>
                <td className="border px-4 py-2">{employee.name}</td>
                <td className="border px-4 py-2">{employee.identity}</td>
                <td className="border px-4 py-2">
                  S${employee.salary.toFixed(2)}
                </td>
                <td className="border px-4 py-2">
                  S${employee.cpf.toFixed(2)}
                </td>
                <td className="border px-4 py-2">
                  S${employee.donations.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
        {/* Review Table */}
        {tableData.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Review Imported Data</h3>
            <div className="overflow-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    {tableData[0].map((header, index) => (
                      <th
                        key={index}
                        className="border border-gray-300 px-4 py-2 bg-gray-200 text-gray-700 font-semibold text-sm"
                      >
                        {header || `Column ${index + 1}`}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.slice(1).map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-gray-50">
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="border border-gray-300 px-4 py-2 text-sm text-gray-700"
                        >
                          {cell || "-"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <span className="text-sm font-medium text-gray-700">
            Do you want to turn on Bypass
          </span>
        </label>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <span className="text-sm font-medium text-gray-700">
            Validate Only
          </span>
        </label>
      </div>

      <div className="mt-8 flex justify-end">
        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md ">
          <a
            href="https://auth.singpass.gov.sg/main"
            target="_blank"
            rel="noopener noreferrer"
          >
            Submit
          </a>
        </button>
      </div>
    </div>
  );
};

export default Review;

// import React, { useState } from "react";
// import * as XLSX from "xlsx";

// const IncomeTaxForm = () => {
//   const [tableData, setTableData] = useState([]); // State to store imported data

//   const handleFileImport = (files) => {
//     if (files && files[0]) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const data = new Uint8Array(e.target.result);
//         const workbook = XLSX.read(data, { type: "array" });
//         const firstSheetName = workbook.SheetNames[0];
//         const worksheet = workbook.Sheets[firstSheetName];
//         const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
//         setTableData(jsonData); // Update state with parsed data
//       };
//       reader.readAsArrayBuffer(files[0]);
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 rounded-lg shadow-md">
//       <h3 className="font-semibold">IR8A</h3>
//       <h2 className="text-2xl font-bold mb-4">
//         Return of Employee’s Remuneration
//       </h2>

//       {/* File Import Section */}
//       <div className="mb-6">
//         <button className="bg-blue-900 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300">
//           <label htmlFor="import-file" className="cursor-pointer">
//             Import XLSX
//           </label>
//         </button>
//         <input
//           id="import-file"
//           type="file"
//           accept=".xlsx"
//           className="hidden"
//           onChange={(e) => handleFileImport(e.target.files)}
//         />
//       </div>

//       {/* Review Table */}
//       {tableData.length > 0 && (
//         <div>
//           <h3 className="text-lg font-semibold mb-4">Review Imported Data</h3>
//           <div className="overflow-auto">
//             <table className="min-w-full border-collapse border border-gray-300">
//               <thead>
//                 <tr>
//                   {tableData[0].map((header, index) => (
//                     <th
//                       key={index}
//                       className="border border-gray-300 px-4 py-2 bg-gray-200 text-gray-700 font-semibold text-sm"
//                     >
//                       {header || `Column ${index + 1}`}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {tableData.slice(1).map((row, rowIndex) => (
//                   <tr key={rowIndex} className="hover:bg-gray-50">
//                     {row.map((cell, cellIndex) => (
//                       <td
//                         key={cellIndex}
//                         className="border border-gray-300 px-4 py-2 text-sm text-gray-700"
//                       >
//                         {cell || "-"}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default IncomeTaxForm;
