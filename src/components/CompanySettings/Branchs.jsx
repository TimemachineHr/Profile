import React, { useState, useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { LuRefreshCw } from "react-icons/lu";
import { QRCodeCanvas } from "qrcode.react";
import { IoMdDownload } from "react-icons/io";

const Branches = () => {
  const [branches, setBranches] = useState([
    {
      id: 1,
      title: "Singapore Branch",
      address: "123, Orchard Road, Singapore",
      latitude: "1.3521",
      longitude: "103.8198",
    },
    {
      id: 2,
      title: "India Branch",
      address: "456, MG Road, Bangalore, India",
      latitude: "12.9716",
      longitude: "77.5946",
    },
    {
      id: 3,
      title: "India Branch",
      address: "9876, Rk Road, Chennai, India",
      latitude: "13.0827",
      longitude: "80.2707",
    },
    {
      id: 4,
      title: "USA Branch",
      address: "123, Main Street, New York",
      latitude: "40.7128",
      longitude: "-74.0060",
    },
    {
      id: 5,
      title: "Malaysia Branch",
      address: "789, KL Tower, Kuala Lumpur",
      latitude: "17.361431",
      longitude: "78.474533",
    },
  ]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

  const handleAddBranch = () => {
    setBranches([...branches, { id: Date.now(), ...selectedBranch }]);
    setShowPopup(false);
    setSelectedBranch(null);
  };

  const downloadQRCode = () => {
    const qrCodeCanvas = document.querySelector("canvas");
    const link = document.createElement("a");
    link.download = "QRCode.png";
    link.href = qrCodeCanvas.toDataURL("image/png");
    link.click();
  };

  const handleUpdateBranch = () => {
    setBranches((prevBranches) =>
      prevBranches.map((branch) =>
        branch.id === selectedBranch.id ? selectedBranch : branch
      )
    );
    setShowPopup(false);
    setSelectedBranch(null);
  };

  const handleDeleteBranch = (id) => {
    setBranches(branches.filter((branch) => branch.id !== id));
    setShowPopup(false);
  };

  const handleEditClick = (branch) => {
    setSelectedBranch(branch);
    setShowPopup(true);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Branch</h2>
        <button
          title="Add Branch"
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
            key={branch.id}
            className="flex bg-gray-100 rounded-lg shadow-sm"
          >
            {/* <div className="p-4 flex items-center">
              <QRCodeCanvas
                value={`https://www.google.com/maps?q=${branch.latitude},${branch.longitude}`}
                size={55}
              />
            </div> */}
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
                title="Edit Branch"
                className="text-gray-500 hover:text-blue-600"
                onClick={() => handleEditClick(branch)}
              >
                <BsThreeDotsVertical size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showPopup && selectedBranch && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">
                {selectedBranch.id
                  ? `${selectedBranch.title}`
                  : "Add New Branch"}
              </h2>
              {selectedBranch.id && (
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDeleteBranch(selectedBranch.id)}
                >
                  <MdDelete title="Delete" size={22} />
                </button>
              )}
            </div>
            <div className="space-y-4 mt-4">
              <div className="flex items-start gap-4">
                {/* Input Section */}
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={selectedBranch.title}
                    onChange={(e) =>
                      setSelectedBranch({
                        ...selectedBranch,
                        title: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg p-2"
                    placeholder="Enter title"
                  />
                </div>

                {/* QR Code Section */}
                {selectedBranch.latitude && selectedBranch.longitude && (
                  <div className="relative inline-block group">
                    {/* QR Code Section */}
                    <div className="relative">
                      <QRCodeCanvas
                        value={`https://www.google.com/maps?q=${selectedBranch.latitude},${selectedBranch.longitude}`}
                        size={70}
                        className="rounded-md"
                      />

                      {/* Refresh Button */}
                      <button
                        className="absolute -bottom-2 -right-2 text-gray-800 bg-white hover:bg-blue-700 rounded-full p-1 shadow-lg flex items-center justify-center"
                        onClick={() => setSelectedBranch({ ...selectedBranch })}
                        title="Refresh QR Code"
                      >
                        <LuRefreshCw size={16} />
                      </button>

                      {/* Download Icon */}
                      <button
                        className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => downloadQRCode()}
                        title="Download QR Code"
                      >
                        <IoMdDownload className="text-white" size={24} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value={selectedBranch.address}
                  onChange={(e) =>
                    setSelectedBranch({
                      ...selectedBranch,
                      address: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="Enter address"
                />
              </div>
              <div className="flex space-x-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Latitude
                  </label>
                  <input
                    type="text"
                    value={selectedBranch.latitude}
                    onChange={(e) =>
                      setSelectedBranch({
                        ...selectedBranch,
                        latitude: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg p-2"
                    placeholder="Enter latitude"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Longitude
                  </label>
                  <input
                    type="text"
                    value={selectedBranch.longitude}
                    onChange={(e) =>
                      setSelectedBranch({
                        ...selectedBranch,
                        longitude: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg p-2"
                    placeholder="Enter longitude"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-4 space-x-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded-lg"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
              <button
                className="bg-primary text-white bg-blue-800 px-4 py-2 rounded-lg"
                onClick={
                  selectedBranch.id ? handleUpdateBranch : handleAddBranch
                }
              >
                {selectedBranch.id ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Branches;
