import React, { useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { ImCross } from "react-icons/im";
import { FaShareNodes, FaDownload } from "react-icons/fa6";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const UpcomingExpense = () => {
  const [showModal, setShowModal] = useState(false);

  // Data for bar chart (Expense By Month)
  const barData = {
    labels: ["Aug 2024", "Sep 2024", "Oct 2024", "Nov 2024", "Dec 2024"],
    datasets: [
      {
        label: "Amount ($)",
        data: [800, 1500, 1200, 3000, 4500],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const barOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 500,
          callback: (value) => `$${value}`,
        },
      },
    },
  };

  // Data for donut chart (Expense By Type)
  const donutData = {
    labels: [
      "Food",
      "Gym",
      "Travel",
      "Uniform",
      "Childcare",
      "Overseas",
      "NightShift",
      "Examination",
    ],
    datasets: [
      {
        data: [300, 100, 400, 150, 250, 200, 50, 350],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#C9CBCF",
          "#E8C3B9",
        ],
      },
    ],
  };

  // Open modal for detailed review
  const handleDonutClick = () => {
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="space-y-4 p-2">
      <div className="bg-blue-900 p-4 text-white rounded-lg shadow">
        <h2 className="text-xl font-semibold text-center mb-4">
          Expense By Month
        </h2>
      </div>
      <Bar data={barData} options={barOptions} />

      <div className="bg-blue-900 p-4 text-white rounded-lg shadow">
        <h2 className="text-xl font-semibold text-center mb-4">
          Expense By Type
        </h2>
      </div>
      <div onClick={handleDonutClick} className="cursor-pointer">
        <Doughnut data={donutData} />
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white pb-4 rounded-lg shadow-lg max-w-md w-full">
            <div className="bg-blue-900 p-6 text-white rounded-lg shadow flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-center">
                Expense By Type
              </h3>
              <ImCross
                onClick={closeModal}
                className="text-white cursor-pointer hover:text-gray-300"
                size={15}
              />
            </div>

            <Doughnut data={donutData} />
            <div className="flex justify-center gap-3 mt-6">
              <button className="bg-violet-600 text-white px-4 py-2 rounded-md flex items-center">
                <FaShareNodes />
                <span className="ml-2">Share</span>
              </button>

              <button className="bg-violet-600 text-white px-4 py-2 rounded-md flex items-center">
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

export default UpcomingExpense;
