import React, { useState } from "react";
import { FaDownload } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdPrint, MdOutlineFileDownload } from "react-icons/md";
import { IoMdShareAlt } from "react-icons/io";
import jsPDF from "jspdf";
import axios from "axios";

const AuditLog = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [selectedRange, setSelectedRange] = useState([null, null]);
  const [isFiltered, setIsFiltered] = useState(false);
  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  thirtyDaysAgo.setDate(today.getDate() - 30);

  const fetchLogs = async () => {
    try {
      const response = await axios.get(
        "https://company-settings-one.vercel.app/api/audit-log/"
      );
      setLogs(response.data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  const handleDateChange = (dates) => {
    const [fromDate, toDate] = dates;
    setSelectedRange([fromDate, toDate]);
  };

  const handleGoButtonClick = async () => {
    if (selectedRange[0] && selectedRange[1]) {
      await fetchLogs();
      const filteredData = logs.filter((log) => {
        const logDate = new Date(`${log.date} ${log.time}`);
        return logDate >= selectedRange[0] && logDate <= selectedRange[1];
      });
      setFilteredLogs(filteredData);
      setIsFiltered(true);
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Audit Log", 10, 10);

    doc.setFontSize(12);
    doc.text("Date & Time", 10, 20);
    doc.text("Who", 50, 20);
    doc.text("Action", 150, 20);

    filteredLogs.forEach((log, index) => {
      const y = 30 + index * 10;
      doc.text(`${log.date} ${log.time}`, 10, y);
      doc.text(`${log.user.name} (${log.user.designation})`, 50, y);
      doc.text(log.action, 150, y);
    });
    doc.save("AuditLog.pdf");
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6 relative">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">
          Audit Log
        </h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <DatePicker
              selected={selectedRange[0]}
              onChange={handleDateChange}
              selectsRange
              startDate={selectedRange[0]}
              endDate={selectedRange[1]}
              dateFormat="dd MMM yyyy"
              maxDate={today}
              minDate={thirtyDaysAgo}
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800"
              placeholderText="Select Date Range"
            />
          </div>
          <button
            onClick={handleGoButtonClick}
            className="bg-blue-800 text-white px-6 py-2 rounded-lg"
          >
            Go
          </button>
        </div>
      </div>
      <div className="mb-4 text-gray-800">
        {selectedRange[0] && selectedRange[1] && (
          <span>
            Selected Range: {selectedRange[0].toLocaleDateString()} -{" "}
            {selectedRange[1].toLocaleDateString()}
          </span>
        )}
      </div>
      <div className="overflow-x-auto relative">
        {/* <button
          title="Download PDF"
          onClick={handleDownloadPDF}
          className="absolute top-2 right-1 bg-primary text-gray-800 px-4 py-2 rounded-lg flex items-center"
        >
          <FaDownload className="mr-2" />
        </button> */}
        <div className="relative">
          <div className="absolute right-4 top-2 z-10">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center justify-center w-10 h-10 bg-blue-300 rounded-full text-gray-600 hover:bg-blue-400 focus:outline-none"
              title="Options"
            >
              ⋮
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-14 bg-white shadow-lg border rounded-md text-left z-20 flex flex-col">
                <button className="flex items-center justify-center w-full p-2 hover:bg-gray-100 transition">
                  <MdPrint size={22} className="text-gray-600" title="Print" />
                </button>
                <button className="flex items-center justify-center w-full p-2 hover:bg-gray-100 transition">
                  <MdOutlineFileDownload
                    size={22}
                    className="text-gray-600"
                    title="Download"
                  />
                </button>
                <button className="flex items-center justify-center w-full p-2 hover:bg-gray-100 transition">
                  <IoMdShareAlt
                    size={22}
                    className="text-gray-600"
                    title="Share"
                  />
                </button>
              </div>
            )}
          </div>
        </div>
        <table className="min-w-full bg-gray-100 rounded-lg border border-gray-300">
          <thead className="bg-blue-400 text-center">
            <tr>
              <th className="px-6 py-3 text-md font-semibold text-gray-800 border-b border-gray-300">
                When
              </th>
              <th className="px-6 py-3 text-md font-semibold text-gray-800 border-b border-gray-300">
                Who
              </th>
              <th className="px-6 py-3 text-md font-semibold text-left text-gray-800 border-b border-gray-300">
                Action
              </th>
              <th className="px-6 py-3 text-md font-semibold text-left text-gray-800 border-b border-gray-300">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {isFiltered && filteredLogs.length > 0 ? (
              filteredLogs.map((log, index) => (
                <tr
                  key={index}
                  className={`$ {index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-200 border-b border-gray-300`}
                >
                  <td className="px-6 py-3 text-sm text-gray-800">
                    <div className="flex flex-col items-center">
                      <div>{log.time}</div>
                      <div>{log.date}</div>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-800">
                    <div className="flex flex-col items-center">
                      <div>{log.user.name}</div>
                      <div>{log.user.designation}</div>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-800">
                    {log.action}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600">
                    {log.details || "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-3 text-center text-gray-800">
                  No logs available for the selected date range.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLog;
