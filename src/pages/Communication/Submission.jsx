import React, { useState } from "react";
import { FaDownload, FaShareAlt, FaTimes } from "react-icons/fa";
import CommunicationHeader from "../../components/Main/CommunicationHeader";

const Submissions = () => {
  const [search, setSearch] = useState("");
  const [timeFilter, setTimeFilter] = useState("All Time");
  const [modalData, setModalData] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedTypeID, setSelectedTypeID] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const tableData = [
    {
      typeId: "FAC0001",
      type: "Feedback Form",
      name: "John Doe",
      date: "26,Nov,2024",
      status: "Completed",
      info: "Some additional info",
      employeeId: "E12345",
      businessUnit: "Technology",
      phoneNumber: "123-456-7890",
      team: "Development",
    },
    {
      typeId: "FAC0001",
      type: "Feedback Form",
      name: "Jane Smith",
      date: "20,Nov,2024",
      status: "Completed",
      info: "Submission info",
      employeeId: "E67890",
      businessUnit: "Operations",
      phoneNumber: "987-654-3210",
      team: "Logistics",
    },
    {
      typeId: "FAC0001",
      type: "Feedback Form",
      name: "Alice White",
      date: "15,Nov,2024",
      status: "Pending",
      info: "Pending approval",
      employeeId: "E23456",
      businessUnit: "Human Resources",
      phoneNumber: "555-555-5555",
      team: "Recruitment",
    },
    {
      typeId: "TMS0023",
      type: "New Laptop Request",
      name: "Alice Brown",
      date: "18,Nov,2024",
      status: "Pending",
      info: "Waiting for approval",
      employeeId: "E54321",
      businessUnit: "Technology",
      phoneNumber: "555-555-5555",
      team: "Development",
    },
    {
      typeId: "TMS0023",
      type: "New Laptop Request",
      name: "Chris Green",
      date: "16,Nov,2024",
      status: "Completed",
      info: "Laptop issued",
      employeeId: "E11111",
      businessUnit: "Operations",
      phoneNumber: "444-444-4444",
      team: "Logistics",
    },
    {
      typeId: "TMS0023",
      type: "New Laptop Request",
      name: "Eve Black",
      date: "10,Nov,2024",
      status: "Completed",
      info: "Received by employee",
      employeeId: "E99999",
      businessUnit: "Finance",
      phoneNumber: "333-333-3333",
      team: "Accounting",
    },
    {
      typeId: "VAL0046",
      type: "Request for Leave Extension",
      name: "Bob Green",
      date: "15,Nov,2024",
      status: "Pending",
      info: "Under process",
      employeeId: "E09876",
      businessUnit: "Finance",
      phoneNumber: "444-444-4444",
      team: "Accounting",
    },
    {
      typeId: "VAL0046",
      type: "Request for Leave Extension",
      name: "Grace Brown",
      date: "10,Nov,2024",
      status: "Completed",
      info: "Leave approved",
      employeeId: "E22222",
      businessUnit: "Human Resources",
      phoneNumber: "555-666-7777",
      team: "Recruitment",
    },
    {
      typeId: "VAL0046",
      type: "Request for Leave Extension",
      name: "Hannah Gray",
      date: "26,Oct,2024",
      status: "Completed",
      info: "Leave granted",
      employeeId: "E33333",
      businessUnit: "Technology",
      phoneNumber: "111-222-3333",
      team: "Development",
    },
  ];

  const uniqueTypes = Array.from(new Set(tableData.map((row) => row.type)));

  const openModal = (type) => {
    setSelectedType(type);
    setSelectedTypeID(tableData.find((row) => row.type === type).typeId);
    const filteredData = tableData.filter((row) => row.type === type);
    setModalData(filteredData);
  };

  console.log(selectedTypeID);

  const closeModal = () => {
    setModalData([]);
    setSelectedTypeID("");
    setSelectedType("");
  };

  return (
    <>
      <CommunicationHeader />
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-md px-4 py-2 w-60"
            />
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="border rounded-md px-4 py-2"
            >
              <option value="All Time">All Time</option>
              <option value="Today">Today</option>
              <option value="Last Week">Last Week</option>
              <option value="Last Month">Last Month</option>
            </select>
          </div>
          {/* <div className="flex items-center space-x-4">
            <button className="text-blue-800 hover:text-blue-600 transition">
              <FaDownload size={20} />
            </button>
            <button className="text-blue-800 hover:text-blue-600 transition">
              <FaShareAlt size={20} />
            </button>
          </div> */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full text-gray-600"
            >
              ⋮
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg border rounded-md text-left z-10">
                <button className="w-full px-4 py-2 text-sm hover:bg-gray-100">
                  Share
                </button>
                <button className="w-full px-4 py-2 text-sm hover:bg-gray-100">
                  Download
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="overflow-hidden rounded-lg shadow-md border border-gray-300">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-800 text-left text-sm text-white font-semibold">
                <th className="px-4 py-3 border-b border-r-2 border-gray-400">
                  ID
                </th>
                <th className="px-4 py-3 border-b border-r-2 border-gray-400">
                  Name
                </th>
                <th className="px-4 py-3 border-b text-center border-r-2 border-gray-400">
                  Date
                </th>
                <th className="px-4 py-3 border-b text-center">Submission</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(
                tableData.reduce((acc, row) => {
                  if (!acc[row.type])
                    acc[row.type] = { typeId: row.typeId, rows: [] };
                  acc[row.type].rows.push(row);
                  return acc;
                }, {})
              ).map(([type, data], index) => {
                const submissionCount = data.rows.length;
                const latestSubmissionDate = data.rows[0]?.date || "N/A";

                return (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 cursor-pointer transition bg-white even:bg-gray-100"
                  >
                    <td className="px-4 py-3 border-b border-r-2">
                      {data.typeId}
                    </td>
                    <td className="px-4 py-3 border-b border-r-2">{type}</td>
                    <td className="px-4 py-3 border-b border-r-2 text-center">
                      {latestSubmissionDate}
                    </td>
                    <td className="px-4 py-3 border-b text-center">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => openModal(type)}
                          className="text-blue-600 underline"
                        >
                          {submissionCount}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {modalData.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-3/4 max-h-[80%]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {selectedType} ({selectedTypeID})
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-800 transition"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <div className="overflow-auto max-w-full">
              <table className="w-full border-collapse border border-gray-300 text-left text-sm rounded-md overflow-hidden">
                <thead>
                  <tr>
                    <th className="bg-blue-800 text-white border px-4 py-2 font-bold">
                      Employee ID
                    </th>
                    {Object.keys(modalData[0])
                      .filter(
                        (key) =>
                          key !== "typeId" &&
                          key !== "type" &&
                          key !== "employeeId"
                      )
                      .map((field, index) => (
                        <th
                          key={index}
                          className="border px-4 py-2 bg-blue-800 text-white font-bold"
                        >
                          {field
                            .replace(/([a-z])([A-Z])/g, "$1 $2")
                            .replace(/^./, (str) => str.toUpperCase())}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {modalData.map((submission, index) => (
                    <tr key={index} className="bg-white even:bg-gray-100">
                      <td className="border px-4 py-2 font-medium border-b-2 border-gray-300 bg-gray-200">
                        {submission.employeeId}
                      </td>
                      {Object.keys(submission)
                        .filter(
                          (key) =>
                            key !== "typeId" &&
                            key !== "type" &&
                            key !== "employeeId"
                        )
                        .map((key, idx) => (
                          <td key={idx} className="border px-4 py-2">
                            {submission[key]}
                          </td>
                        ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Submissions;
