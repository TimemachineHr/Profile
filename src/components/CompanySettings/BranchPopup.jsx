import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { LuRefreshCw } from "react-icons/lu";
import { MdDelete } from "react-icons/md";

const BranchPopup = () => {
  const qrCodeRef = useRef();

  const [showPopup, setShowPopup] = useState(false);

  const handleDownloadQRCode = () => {
    if (qrCodeRef.current) {
      const canvas = qrCodeRef.current.querySelector("canvas");
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = "branch-qr-code.png";
      link.click();
    }
  };

  return (
    <>
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
                {selectedBranch.latitude && selectedBranch.longitude && (
                  <div className="relative group" ref={qrCodeRef}>
                    <QRCodeCanvas
                      value={`https://www.google.com/maps?q=${selectedBranch.latitude},${selectedBranch.longitude}`}
                      size={70}
                    />
                    <button
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 rounded-lg"
                      onClick={handleDownloadQRCode}
                      title="Download QR Code"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </button>
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
    </>
  );
};

export default BranchPopup;
