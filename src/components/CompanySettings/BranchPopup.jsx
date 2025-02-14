import { MdDelete } from "react-icons/md";
import { LuRefreshCw } from "react-icons/lu";
import { IoMdDownload } from "react-icons/io";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import BranchPDFDownload from "./BranchPdfDownload";

const BranchPopup = ({
  showPopup,
  selectedBranch,
  setSelectedBranch,
  setShowPopup,
  handleUpdateBranch,
  handleAddBranch,
  handleDeleteBranch,
}) => {
  // Function to download QR code
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
    showPopup &&
    selectedBranch && (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 shadow-lg w-96">
          {/* Title and Delete Button */}
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              {selectedBranch._id
                ? `${selectedBranch.title}`
                : "Add New Branch"}
            </h2>
            {selectedBranch._id && (
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => handleDeleteBranch(selectedBranch._id)}
              >
                <MdDelete title="Delete" size={22} />
              </button>
            )}
          </div>

          <div className="space-y-4 mt-4">
            {/* Input Fields */}
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={selectedBranch.title || ""}
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
                  <div className="relative">
                    <div id="qr-code" className="p-2 bg-white rounded-md">
                      <QRCodeCanvas
                        value={`https://www.google.com/maps?q=${selectedBranch.latitude},${selectedBranch.longitude}`}
                        size={80}
                        className="rounded-md"
                      />
                    </div>

                    {/* Refresh Button */}
                    <button
                      className="absolute -bottom-2 -right-2 text-gray-800 bg-white hover:bg-blue-700 rounded-full p-1 shadow-lg flex items-center justify-center"
                      onClick={() => setSelectedBranch({ ...selectedBranch })}
                      title="Refresh QR Code"
                    >
                      <LuRefreshCw size={16} />
                    </button>

                    {/* Download Icon */}

                    <BranchPDFDownload branch={selectedBranch} />
                  </div>
                </div>
              )}
            </div>

            {/* Address Field */}
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                value={selectedBranch.address || ""}
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

            {/* Latitude & Longitude Fields */}
            <div className="flex space-x-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Latitude
                </label>
                <input
                  type="text"
                  value={selectedBranch.latitude || ""}
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
                  value={selectedBranch.longitude || ""}
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

          {/* Buttons */}
          <div className="flex justify-end mt-4 space-x-4">
            <button
              className="bg-gray-300 px-4 py-2 rounded-lg"
              onClick={() => setShowPopup(false)}
            >
              Cancel
            </button>
            <button
              className="bg-blue-800 text-white px-4 py-2 rounded-lg"
              onClick={
                selectedBranch._id ? handleUpdateBranch : handleAddBranch
              }
            >
              {selectedBranch._id ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default BranchPopup;
