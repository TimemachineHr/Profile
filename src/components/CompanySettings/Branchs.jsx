import React, { useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { LuRefreshCw } from "react-icons/lu";
import { QRCodeCanvas } from "qrcode.react";
import { IoMdDownload } from "react-icons/io";
import BranchPopup from "./BranchPopup";
import axios from "axios";

const API_URL = "https://company-settings-one.vercel.app/api/company-settings/";

const Branches = () => {
  const [branches, setBranches] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await axios.get(API_URL);
      const data = response.data[0]?.branches || [];
      setBranches(data);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  const handleAddBranch = async () => {
    try {
      const response = await axios.put(`${API_URL}678a2037c1292667ec884236`, {
        branches: [...branches, selectedBranch],
      });
      setBranches(response.data.branches);
      setShowPopup(false);
      setSelectedBranch(null);
    } catch (error) {
      console.error("Error adding branch:", error);
    }
  };

  const handleUpdateBranch = async () => {
    try {
      const updatedBranches = branches.map((branch) =>
        branch._id === selectedBranch._id ? selectedBranch : branch
      );
      const response = await axios.put(`${API_URL}678a2037c1292667ec884236`, {
        branches: updatedBranches,
      });
      setBranches(response.data.branches);
      setShowPopup(false);
      setSelectedBranch(null);
    } catch (error) {
      console.error("Error updating branch:", error);
    }
  };

  const handleDeleteBranch = async (id) => {
    try {
      const updatedBranches = branches.filter((branch) => branch._id !== id);
      const response = await axios.put(`${API_URL}678a2037c1292667ec884236`, {
        branches: updatedBranches,
      });
      setBranches(response.data.branches);
      setShowPopup(false);
    } catch (error) {
      console.error("Error deleting branch:", error);
    }
  };

  const downloadQRCode = () => {
    const qrElement = document.getElementById("qr-code");
    if (!qrElement) return;

    html2canvas(qrElement).then((canvas) => {
      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, `${selectedBranch.title || "branch"}-qrcode.png`);
        }
      });
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Branch</h2>
        <button
          className="bg-primary text-blue-700 py-2 rounded-lg"
          onClick={() => {
            setSelectedBranch({
              title: "",
              address: "",
              latitude: "",
              longitude: "",
            });
            setShowPopup(true);
          }}
        >
          <IoIosAddCircle size={32} />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {branches.map((branch) => (
          <div
            key={branch._id}
            className="flex bg-gray-100 rounded-lg shadow-sm"
          >
            <div className="p-4 flex-1">
              <h3 className="text-lg font-semibold text-gray-800">
                {branch.title}
              </h3>
              <p className="text-gray-600">Address: {branch.address}</p>
            </div>
            <div className="p-4 flex items-center">
              <QRCodeCanvas
                value={`https://www.google.com/maps?q=${branch.latitude},${branch.longitude}`}
                size={50}
              />
            </div>
            <div className="w-20 border-l-2 border-gray-300 flex items-center justify-center">
              <button
                className="text-gray-500 hover:text-blue-600"
                onClick={() => {
                  setSelectedBranch(branch);
                  setShowPopup(true);
                }}
              >
                <BsThreeDotsVertical size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <BranchPopup
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        selectedBranch={selectedBranch}
        setSelectedBranch={setSelectedBranch}
        handleAddBranch={handleAddBranch}
        handleUpdateBranch={handleUpdateBranch}
        handleDeleteBranch={handleDeleteBranch}
      />
    </div>
  );
};

export default Branches;
