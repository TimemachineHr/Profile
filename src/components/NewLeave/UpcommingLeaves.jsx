import React, { useEffect, useRef, useState } from "react";
import { FaClock, FaCalendarAlt } from "react-icons/fa";
import { FaShareNodes, FaDownload } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
const UpcomingLeaves = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += 1;
        if (
          scrollRef.current.scrollLeft >=
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth
        ) {
          scrollRef.current.scrollLeft = 0;
        }
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const leaveData = [
    {
      id: 1,
      profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
      name: "John Doe",
      date: "01/01/2024",
      hours: "2 Days",
      designation: "Software Engineer",
      department: "Engineering",
      status: "1 Days",
    },
    {
      id: 2,
      profileImage: "https://randomuser.me/api/portraits/women/2.jpg",
      name: "Jane Smith",
      date: "02/15/2024",
      hours: "3 days",
      designation: "Project Manager",
      department: "HR",
      status: "Pending",
    },
    {
      id: 3,
      profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
      name: "John Appleseed",
      date: "03/10/2024",
      hours: "2 days",
      designation: "Designer",
      department: "Marketing",
      status: "2 Days",
    },
  ];

  const scrollRef = useRef(null);
  const [isModalOpen, setModalOpen] = useState(false);

  // Data for the donut chart
  const leaveDataChart = {
    labels: [
      "Annual",
      "Hospitalization",
      "Maternity",
      "Adoption",
      "ChildCare",
      "Compassionate",
      "Paternity",
      "Examination",
    ],
    datasets: [
      {
        data: [30, 10, 15, 5, 7, 8, 10, 15],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF9F40",
          "#4BC0C0",
          "#9966FF",
          "#FF6384",
          "#FFCE56",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF9F40",
          "#4BC0C0",
          "#9966FF",
          "#FF6384",
          "#FFCE56",
        ],
      },
    ],
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += 1;
        if (
          scrollRef.current.scrollLeft >=
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth
        ) {
          scrollRef.current.scrollLeft = 0;
        }
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const handleChartClick = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handlePrint = () => window.print();
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob(["Detailed Leave Status"], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "LeaveStatus.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="space-y-4 ">
      <div className="bg-blue-900 p-4 text-white rounded-lg shadow">
        <h2 className="text-xl font-semibold text-center">Upcoming Leaves</h2>
      </div>

      <div
        ref={scrollRef}
        className="p-4 flex space-x-4 overflow-x-auto whitespace-nowrap scrollbar-hide"
      >
        {leaveData.map((leave) => (
          <div
            key={leave.id}
            className="w-64 h-48 p-4 bg-gray-50 rounded-lg shadow-md flex flex-col justify-between"
          >
            <div className="flex justify-between">
              <div className="flex flex-col items-center">
                <img
                  src={leave.profileImage}
                  alt="Profile"
                  className="w-12 h-12 rounded-full mb-1"
                />
                <span className="text-sm font-semibold">{leave.name}</span>
              </div>

              <div className="flex flex-col items-start space-y-2">
                <div className="flex items-center space-x-1 text-gray-600">
                  <FaClock />
                  <span className="text-xs">{leave.hours}</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-600">
                  <FaCalendarAlt />
                  <span className="text-xs">{leave.date}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-1 mt-2 text-sm">
              <span>
                <strong>Designation:</strong> {leave.designation}
              </span>
              <span>
                <strong>Department:</strong> {leave.department}
              </span>
              <span>
                <strong>Approved:</strong> {leave.status}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-blue-900 p-4 text-white rounded-lg shadow">
        <h2 className="text-xl font-semibold text-center">
          Overall Leave Status
        </h2>
      </div>

      <div className="p-4 flex gap-3">
        <select className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none">
          <option>Month</option>
          <option>January</option>
          <option>February</option>
          <option>March</option>
        </select>
        <select className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none">
          <option>Department</option>
          <option>HR</option>
          <option>Engineering</option>
          <option>Sales</option>
        </select>
        <select className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none">
          <option>Year</option>
          <option>2023</option>
          <option>2024</option>
          <option>2025</option>
        </select>
      </div>

      <div className="p-4">
        <Doughnut data={leaveDataChart} onClick={handleChartClick} />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white pb-4 rounded-lg shadow-lg w-96">
            <div className="bg-blue-900 p-6 text-white rounded-lg shadow flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-center">
                Expense By Type
              </h3>
              <ImCross
                onClick={handleCloseModal}
                className="text-white cursor-pointer hover:text-gray-300"
                size={15}
              />
            </div>

            <Doughnut data={leaveDataChart} />
            <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={handlePrint}
                className="bg-violet-600 text-white px-4 py-2 rounded-md flex items-center"
              >
                <FaShareNodes />
                <span className="ml-2">Share</span>
              </button>

              <button
                onClick={handleDownload}
                className="bg-violet-600 text-white px-4 py-2 rounded-md flex items-center"
              >
                <FaDownload />
                <span className="ml-2">Download</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingLeaves;
