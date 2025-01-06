import React, { useState, useEffect } from "react";
import { FaDownload } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import jsPDF from "jspdf";

const AuditLog = () => {
  const [logs] = useState([
    {
      date: "27 Dec 2024",
      time: "14:32",
      action: "User logged in",
      user: "John Doe",
      designation: "Developer",
      details: "Successfully logged into the system from IP 192.168.1.10.",
    },
    {
      date: "25 Dec 2024",
      time: "10:20",
      action: "Password reset",
      user: "Jane Smith",
      designation: "Manager",
      details: "Password reset due to a security breach alert.",
    },
    {
      date: "22 Dec 2024",
      time: "09:15",
      action: "Data export",
      user: "Alice Brown",
      designation: "Analyst",
      details: "Exported sales data for Q4 2024 in CSV format.",
    },
    {
      date: "20 Dec 2024",
      time: "16:45",
      action: "Settings updated",
      user: "Eve White",
      designation: "Admin",
      details: "Updated notification preferences for all users.",
    },
    {
      date: "19 Dec 2024",
      time: "11:30",
      action: "File uploaded",
      user: "Bob Green",
      designation: "Designer",
      details: "Uploaded a new logo design for the project.",
    },
    {
      date: "17 Dec 2024",
      time: "08:05",
      action: "Session expired",
      user: "Charlie Black",
      designation: "Support",
      details: "Session expired after 30 minutes of inactivity.",
    },
    {
      date: "15 Dec 2024",
      time: "14:00",
      action: "Access denied",
      user: "David Grey",
      designation: "Developer",
      details:
        "Attempted access to restricted database without sufficient permissions.",
    },
    {
      date: "1 Dec 2024",
      time: "13:00",
      action: "Feature deployed",
      user: "Grace Green",
      designation: "DevOps",
      details: "Deployed new reporting feature to the production environment.",
    },
    {
      date: "30 Nov 2024",
      time: "12:50",
      action: "User logged out",
      user: "Helen Blue",
      designation: "HR",
      details: "Logged out after completing daily tasks.",
    },
    {
      date: "30 Nov 2024",
      time: "09:00",
      action: "System update",
      user: "Ivan Yellow",
      designation: "IT Support",
      details: "Applied security patches to all systems.",
    },
  ]);

  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);

  // States for DatePicker
  const [selectedRange, setSelectedRange] = useState([null, null]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false); // To control when to display filtered data

  // Date Change Handler
  const handleDateChange = (dates) => {
    const [fromDate, toDate] = dates;
    setSelectedRange([fromDate, toDate]);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Audit Log", 10, 10);

    // Add table headers
    doc.setFontSize(12);
    doc.text("Date & Time", 10, 20);
    doc.text("Who", 50, 20);
    doc.text("Action", 150, 20);

    // Add log entries
    filteredLogs.forEach((log, index) => {
      const y = 30 + index * 10;
      doc.text(`${log.date} ${log.time}`, 10, y);
      doc.text(`${log.user} (${log.designation})`, 50, y);
      doc.text(log.action, 150, y);
    });

    // Save the PDF
    doc.save("AuditLog.pdf");
  };

  const handleGoButtonClick = () => {
    if (selectedRange[0] && selectedRange[1]) {
      const filteredData = logs.filter((log) => {
        const logDate = new Date(`${log.date} ${log.time}`);
        return logDate >= selectedRange[0] && logDate <= selectedRange[1];
      });

      setFilteredLogs(filteredData);
      setIsFiltered(true); // Set to show the filtered data
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6 relative">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">
          Audit Log
        </h2>

        {/* Date Range Picker */}
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
        <button
          title="Download PDF"
          onClick={handleDownloadPDF}
          className="absolute top-2 right-1 bg-primary text-gray-800 px-4 py-2 rounded-lg flex items-center"
        >
          <FaDownload className="mr-2" />
        </button>
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
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-200 border-b border-gray-300`}
                >
                  <td className="px-6 py-3 text-sm text-gray-800">
                    <div className="flex flex-col items-center">
                      <div>{log.time}</div>
                      <div>{log.date}</div>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-800">
                    <div className="flex flex-col items-center">
                      <div>{log.user}</div>
                      <div>{log.designation}</div>
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
