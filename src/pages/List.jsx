import React, { useState } from "react";
import { FaFile, FaCog } from "react-icons/fa";
import Header from "../components/Main/Header";
import DepartmentBrush from "../assets/DepartmentsBrush.svg";
import BusinessBrush from "../assets/BusinessBrush.svg";
import EmployeeBrush from "../assets/EmployeesBrush.svg";
import DesignationBrush from "../assets/DesignationsBrush.svg";
import verticalLine from "../assets/VerticalLine.svg";

const employees = [
  {
    id: 1232,
    profile: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "John Doe",
    unit: "Sales",
    department: "Marketing",
    designation: "Manager",
    reportingTo: "Admin",
    actionIcon: FaFile,
  },
  {
    id: 2342,
    profile: "https://randomuser.me/api/portraits/women/2.jpg",
    name: "Jane Smith",
    unit: "IT",
    department: "Development",
    designation: "Developer",
    reportingTo: "Admin",
    actionIcon: FaCog,
  },
  {
    id: 3232,
    profile: "https://randomuser.me/api/portraits/men/3.jpg",
    name: "Michael Johnson",
    unit: "Finance",
    department: "Accounting",
    designation: "Analyst",
    reportingTo: "Admin",
    actionIcon: FaCog,
  },
  {
    id: 4532,
    profile: "https://randomuser.me/api/portraits/men/5.jpg",
    name: " Emily Davis",
    unit: "Sales",
    department: "Marketing",
    designation: "Manager",
    reportingTo: "Admin",
    actionIcon: FaFile,
  },
];

const List = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownIndex, setDropdownIndex] = useState(null);

  const handleView = (id) => {
    window.location.href = `/employees/${id}`;
  };

  const handleEdit = (id) => {
    window.location.href = `/employees/edit/${id}`;
  };

  const handleDelete = (id) => {
    alert(`Employee ${id} deleted`);
  };

  const handlePrint = () => {
    alert("Print function triggered");
  };

  const handleDownload = () => {
    alert("Download function triggered");
  };

  const [selectedEmployees, setSelectedEmployees] = useState(
    Array(employees.length).fill(false)
  );

  // State to track if "select all" is checked
  const [selectAll, setSelectAll] = useState(false);

  // Function to handle row checkbox toggle
  const handleRowCheckboxChange = (index) => {
    const newSelectedEmployees = [...selectedEmployees];
    newSelectedEmployees[index] = !newSelectedEmployees[index];
    setSelectedEmployees(newSelectedEmployees);

    // Check if all checkboxes are selected
    setSelectAll(newSelectedEmployees.every((selected) => selected));
  };

  // Function to handle "select all" checkbox toggle
  const handleSelectAllCheckboxChange = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setSelectedEmployees(Array(employees.length).fill(newSelectAll));
  };

  const [activeButton, setActiveButton] = useState("Active");

  return (
    <div>
      <Header />
      <div className="p-6">
        <div className="flex justify-center items-center mb-8 space-x-6">
          <div className="flex flex-row items-center space-x-2">
            <img src={EmployeeBrush} alt="Employees" />
            <span className="text-lg font-semibold">Employee</span>
          </div>

          <img src={verticalLine} alt="Vertical Line" />

          <div className="flex flex-row items-center space-x-2">
            <img src={DesignationBrush} alt="Designations" />
            <span className="text-lg font-semibold">Designation</span>
          </div>

          <img src={verticalLine} alt="Vertical Line" />

          <div className="flex flex-row items-center space-x-2">
            <img src={DepartmentBrush} alt="Departments" />
            <span className="text-lg font-semibold">Department</span>
          </div>

          <img src={verticalLine} alt="Vertical Line" />

          <div className="flex flex-row items-center space-x-2">
            <img src={BusinessBrush} alt="Business" />
            <span className="text-lg font-semibold">Business Unit</span>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <span>Show</span>
            <select className="border border-gray-300 rounded-lg px-2 py-1">
              <option>10</option>
              <option>20</option>
              <option>30</option>
              <option>40</option>
              <option>50</option>
            </select>
            <span>Entries</span>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex">
              <button
                onClick={() => setActiveButton("Active")}
                className={`px-4 py-2 rounded-l-full border-r-2 focus:outline-none transition-colors duration-200 ${
                  activeButton === "Active"
                    ? "bg-blue-900 text-white font-semibold"
                    : "bg-gray-300 text-black font-normal"
                }`}
              >
                Active
              </button>

              <button
                onClick={() => setActiveButton("Inactive")}
                className={`px-4 py-2 focus:outline-none transition-colors duration-200 ${
                  activeButton === "Inactive"
                    ? "bg-blue-900 text-white font-semibold"
                    : "bg-gray-300 text-black font-normal"
                }`}
              >
                Inactive
              </button>

              <button
                onClick={() => setActiveButton("All")}
                className={`px-4 py-2 rounded-r-full border-l-2 focus:outline-none transition-colors duration-200 ${
                  activeButton === "All"
                    ? "bg-blue-900 text-white font-semibold"
                    : "bg-gray-300 text-black font-normal"
                }`}
              >
                All
              </button>
            </div>

            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded-xl px-3 py-2"
            />

            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full text-gray-600"
              >
                ⋮
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg border rounded-md text-left z-10">
                  <button
                    onClick={handlePrint}
                    className="w-full px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Print
                  </button>
                  <button
                    onClick={handleDownload}
                    className="w-full px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Download
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full bg-white">
            <thead className="bg-blue-900 text-white rounded-t-xl overflow-hidden">
              <tr>
                <th className="py-2 px-4 border-r-2 border-gray-400 rounded-tl-xl">
                  <input
                    type="checkbox"
                    title="Select All"
                    className="cursor-pointer"
                    checked={selectAll}
                    onChange={handleSelectAllCheckboxChange}
                  />
                </th>
                <th className="py-2 px-4 border-r-2 border-gray-400">
                  Employee ID
                </th>
                <th className="py-2 px-4 border-r-2 border-gray-400">
                  Profile
                </th>
                <th className="py-2 px-4 border-r-2 border-gray-400">Name</th>
                <th className="py-2 px-4 border-r-2 border-gray-400">
                  Business Unit
                </th>
                <th className="py-2 px-4 border-r-2 border-gray-400">
                  Department
                </th>
                <th className="py-2 px-4 border-r-2 border-gray-400">
                  Designation
                </th>
                <th className="py-2 px-4 border-r-2 border-gray-400">
                  Reporting To
                </th>
                <th className="py-2 px-4 border-r-2 border-gray-400 rounded-tr-xl">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr
                  key={employee.id}
                  className={`text-center ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-100"
                  }`}
                >
                  <td className="py-2 px-4 border-b-2">
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      checked={selectedEmployees[index]}
                      onChange={() => handleRowCheckboxChange(index)}
                    />
                  </td>
                  <td className="py-2 px-4 border-b-2">{employee.id}</td>
                  <td className="py-2 px-4 border-b-2">
                    <img
                      src={employee.profile}
                      alt={employee.name}
                      className="w-10 h-10 rounded-full mx-auto"
                    />
                  </td>
                  <td className="py-2 px-4 border-b-2">{employee.name}</td>
                  <td className="py-2 px-4 border-b-2">{employee.unit}</td>
                  <td className="py-2 px-4 border-b-2">
                    {employee.department}
                  </td>
                  <td className="py-2 px-4 border-b-2">
                    {employee.designation}
                  </td>
                  <td className="py-2 px-4 border-b-2">
                    {employee.reportingTo}
                  </td>
                  <td className="py-2 px-4 border-b-2 relative">
                    <div className="flex justify-center items-center">
                      <employee.actionIcon
                        size={24}
                        className="text-gray-600 cursor-pointer"
                        title={
                          employee.actionIcon === FaFile ? "Draft" : "Settings"
                        }
                        onClick={() =>
                          setDropdownIndex(
                            dropdownIndex === index ? null : index
                          )
                        }
                      />
                    </div>
                    {dropdownIndex === index && (
                      <div className="absolute top-0 right-full ml-1 bg-white shadow-lg border rounded-lg text-left w-32 z-10">
                        <button
                          onClick={() => handleView(employee.id)}
                          className="w-full px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleEdit(employee.id)}
                          className="w-full px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(employee.id)}
                          className="w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default List;
