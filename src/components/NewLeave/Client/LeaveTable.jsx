import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { IoChatboxEllipses } from "react-icons/io5";

const LeaveTable = () => {
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const [isSelf, setIsSelf] = useState(true);

  const selfTableData = [
    {
      slno: 1,
      appliedDate: "10 Dec 2024",
      from: "12 Dec 2024",
      to: "14 Dec 2024",
      code: "L000001",
      type: "Annual",
      daysHours: "2 Days",
      status: "Approved",
    },
    {
      slno: 2,
      appliedDate: "05 Dec 2024",
      from: "06 Dec 2024",
      to: "07 Dec 2024",
      code: "L000002",
      type: "Sick",
      daysHours: "1 Day",
      status: "Pending",
    },
    {
      slno: 3,
      appliedDate: "28 Nov 2024",
      from: "01 Dec 2024",
      to: "02 Dec 2024",
      code: "L000003",
      type: "Casual",
      daysHours: "2 Days",
      status: "Approved",
    },
    {
      slno: 4,
      appliedDate: "01 Dec 2024",
      from: "03 Dec 2024",
      to: "05 Dec 2024",
      code: "L000004",
      type: "Annual",
      daysHours: "3 Days",
      status: "Rejected",
    },
    {
      slno: 5,
      appliedDate: "09 Dec 2024",
      from: "10 Dec 2024",
      to: "11 Dec 2024",
      code: "L000005",
      type: "Sick",
      daysHours: "2 Days",
      status: "Pending",
    },
  ];

  const teamTableData = [
    {
      id: 1,
      profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
      name: "John Doe",
      fromDate: "22 Dec 2024",
      toDate: "22 Dec 2024",
      code: "V000781",
      type: "Annual Leave",
      daysHours: "2 Days",
      status: "Pending",
      isNew: true,
    },
    {
      id: 2,
      profileImage: "https://randomuser.me/api/portraits/women/2.jpg",
      name: "Jane Smith",
      fromDate: "20 Dec 2024",
      toDate: "21 Dec 2024",
      code: "V000348",
      type: "Sick Leave",
      daysHours: "5 Days",
      status: "Pending",
      isNew: true,
    },
    {
      id: 3,
      profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
      name: "Bob Johnson",
      fromDate: "22 Dec 2024",
      toDate: "22 Dec 2024",
      code: "V000781",
      type: "Annual Leave",
      daysHours: "2 Days",
      status: "Approved",
      isNew: false,
    },
    {
      id: 4,
      profileImage: "https://randomuser.me/api/portraits/women/4.jpg",
      name: "Samantha Williams",
      fromDate: "20 Dec 2024",
      toDate: "21 Dec 2024",
      code: "V000348",
      type: "Sick Leave",
      daysHours: "5 Days",
      status: "Pending",
      isNew: false,
    },
  ];

  const filteredData = (data) =>
    data.filter((item) =>
      Object.values(item).join(" ").toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="p-4">
      {/* Controls */}
      <div className="flex items-center justify-between mb-4">
        {/* Left: Entries Dropdown */}
        <div className="flex items-center space-x-2">
          <label htmlFor="entries" className="text-sm font-medium">
            Show
          </label>
          <select
            id="entries"
            value={entries}
            onChange={(e) => setEntries(Number(e.target.value))}
            className="p-2 border rounded-md"
          >
            {[10, 20, 30, 40].map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
          <span>entries</span>
        </div>

        {/* Right: Search Bar and Toggle Button */}
        <div className="flex items-center space-x-6 ml-auto">
          {/* Search Bar */}
          <div className="flex items-center border border-gray-500 rounded-full p-2">
            <IoIosSearch />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ml-2 flex-grow outline-none"
            />
          </div>

          {/* Toggle Button */}
          <div className="flex items-center">
            <span
              className={`mr-3 text-sm font-semibold ${
                isSelf ? "text-gray-400" : "text-blue-800"
              }`}
            >
              Team
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isSelf}
                onChange={() => setIsSelf(!isSelf)}
                className="sr-only peer"
              />
              <div
                className={`w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 ${
                  isSelf ? "peer-checked:bg-blue-500" : ""
                }`}
              ></div>
              <span
                className={`absolute top-0.5 left-[2px] w-5 h-5 bg-white rounded-full transition-transform ${
                  isSelf ? "transform translate-x-full" : ""
                }`}
              ></span>
            </label>
            <span
              className={`ml-3 text-sm font-semibold ${
                isSelf ? "text-blue-800" : "text-gray-400"
              }`}
            >
              Self
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-sm rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-800 text-center text-white">
              {isSelf
                ? [
                    "Slno",
                    "Applied Date",
                    "From",
                    "To",
                    "Code",
                    "Type",
                    "Days/Hours",
                    "Status",
                    "Action",
                  ].map((header) => (
                    <th key={header} className="border border-gray-300 p-2">
                      {header}
                    </th>
                  ))
                : [
                    "Profile",
                    "Name",
                    "From",
                    "To",
                    "Code",
                    "Type",
                    "Days",
                    "Status",
                    "Action",
                  ].map((header) => (
                    <th key={header} className="border border-gray-300 p-2">
                      {header}
                    </th>
                  ))}
            </tr>
          </thead>
          <tbody>
            {(isSelf
              ? filteredData(selfTableData)
              : filteredData(teamTableData)
            )
              .slice(0, entries)
              .map((row, index) =>
                isSelf ? (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 text-center even:bg-gray-200"
                  >
                    <td className="border border-gray-300 p-2 py-3">
                      {row.slno}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {row.appliedDate}
                    </td>
                    <td className="border border-gray-300 p-2">{row.from}</td>
                    <td className="border border-gray-300 p-2">{row.to}</td>
                    <td className="border border-gray-300 p-2">
                      <span className="bg-violet-500 text-white rounded-md text-sm px-1 ">
                        {row.code}
                      </span>
                    </td>
                    <td className="border border-gray-300 p-2">{row.type}</td>
                    <td className="border border-gray-300 p-2">
                      {row.daysHours}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <span
                        className={`relative  text-white px-1 text-sm rounded-md ${
                          row.status === "Approved"
                            ? "bg-green-600"
                            : row.status === "Rejected"
                            ? "bg-red-600"
                            : "bg-yellow-600"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="border border-gray-300 p-2 flex justify-center space-x-2">
                      {row.status === "Approved" && (
                        <button className="px-1 py-1 text-gray-800  rounded">
                          <FaSearch />
                        </button>
                      )}

                      {row.status === "Pending" && (
                        <>
                          <button className="px-1 py-1 text-gray-800  rounded">
                            <FaSearch />
                          </button>
                          <button className="px-1 py-1 text-gray-800  text-md rounded">
                            <ImCross />
                          </button>
                        </>
                      )}

                      {row.status === "Rejected" && (
                        <>
                          <button className="px-1 py-1 text-gray-800  rounded">
                            <FaSearch />
                          </button>
                          <button className="px-1 py-1 text-gray-800  rounded">
                            <IoChatboxEllipses size={19} />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ) : (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 text-center even:bg-gray-200"
                  >
                    <td className="border border-gray-300 p-2">
                      <div className="relative inline-block">
                        <img
                          src={row.profileImage || "/path/to/placeholder.jpg"}
                          alt="Profile"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        {row.isNew && (
                          <div
                            className="absolute top-0 left-0 flex items-center justify-center "
                            aria-label="New user"
                          >
                            <svg
                              width="33"
                              height="33"
                              viewBox="0 0 33 33"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M2.33872 32.9996C1.89559 32.799 1.52856 32.5476 1.1955 32.249C0.591158 31.7066 0.177897 31.056 0.0461451 30.2534C0.0187308 30.0873 0.000727411 29.9171 0.000727411 29.749C-0.000909264 24.4824 0.000727411 19.2158 0.000727411 13.9492C0.000727411 13.3699 0.258094 12.8915 0.618163 12.4564C0.978641 12.0208 1.41809 11.6778 1.92218 11.4111C4.28472 10.1625 6.64358 8.90675 9.00898 7.66295C12.7574 5.69178 16.5045 3.7186 20.2628 1.76504C21.7349 1.00003 23.3029 0.479213 24.9461 0.183777C25.6998 0.0480683 26.4596 -0.0267915 27.2244 0.00883692C28.6495 0.07529 29.9543 0.459597 31.0079 1.4596C31.521 1.94679 31.9052 2.52725 32.2449 3.13654C32.6242 3.81668 32.8758 4.54326 32.9654 5.31348C33.0783 6.28465 32.9114 7.2194 32.5145 8.11451C31.9601 9.36391 31.073 10.3603 30.0464 11.2586C29.3414 11.8755 28.5169 12.2923 27.6908 12.7158C23.5136 14.8563 19.3384 17.0012 15.1625 19.1441C13.2345 20.1337 11.2926 21.0981 9.38133 22.1177C7.10062 23.3347 4.85961 24.6185 2.75034 26.1117C2.44715 26.3263 2.32276 26.546 2.32726 26.9259C2.35181 28.8795 2.33872 30.8335 2.33872 32.7874V33V32.9996ZM15.6261 8.04526C15.6694 8.10611 15.6968 8.14814 15.7279 8.18737C16.4526 9.10971 17.178 10.032 17.9031 10.9544C18.5676 11.7995 19.2333 12.6433 19.8933 13.492C19.9813 13.6049 20.0459 13.6369 20.1834 13.5589C20.4907 13.3839 20.8094 13.2274 21.1257 13.0681C21.2129 13.0244 21.2493 12.98 21.2169 12.8767C20.8581 11.7334 20.505 10.5881 20.1466 9.44438C20.0762 9.2194 19.9903 8.99922 19.9195 8.80026C20.8143 9.95118 21.7202 11.1161 22.6302 12.2866C23.0394 12.0753 23.4166 11.8759 23.7984 11.6858C23.9052 11.6325 23.922 11.5789 23.8855 11.4688C23.1777 9.33389 22.4743 7.19778 21.7693 5.06167C21.7525 5.01043 21.7309 4.96079 21.7055 4.89514C21.3503 5.07889 21.0128 5.25183 20.6768 5.42717C20.4866 5.52645 20.4862 5.52805 20.5647 5.72661C21.1408 7.18137 21.7169 8.63613 22.2931 10.0909C22.3053 10.1225 22.3143 10.1553 22.325 10.1874C21.3393 8.87432 20.3352 7.58089 19.3352 6.28425C19.2599 6.18697 19.2006 6.18577 19.1019 6.23982C18.8601 6.37272 18.6171 6.50443 18.3671 6.62172C18.2484 6.67737 18.2402 6.73701 18.2771 6.8487C18.6809 8.06968 19.0782 9.29306 19.4812 10.5144C19.5954 10.8607 19.7214 11.203 19.8421 11.5473C19.7906 11.4992 19.7538 11.444 19.7161 11.3895C19.1637 10.5857 18.6146 9.77985 18.0582 8.97921C17.7108 8.47921 17.354 7.98521 16.9955 7.49242C16.9657 7.45158 16.8753 7.40555 16.8433 7.42116C16.4419 7.61892 16.0459 7.82748 15.6257 8.04486L15.6261 8.04526ZM11.5156 15.2426C10.3764 14.2802 9.14687 13.2434 7.92182 12.2018C7.82567 12.1201 7.75693 12.1137 7.64973 12.173C7.3719 12.3263 7.08957 12.4728 6.80357 12.6113C6.68041 12.671 6.66731 12.7222 6.7336 12.8431C7.64604 14.5192 8.55194 16.199 9.45948 17.8775C9.6301 18.1926 9.80236 18.5068 9.98117 18.8351C10.3547 18.6417 10.7128 18.4564 11.0945 18.2586C10.34 16.9123 9.59614 15.5853 8.85227 14.2582C8.89074 14.3211 8.94884 14.3703 9.00244 14.4236C10.0953 15.504 11.3249 16.432 12.4959 17.4256C12.5659 17.4852 12.6199 17.4724 12.6915 17.4344C12.9906 17.2758 13.2922 17.1225 13.5925 16.9664C13.6322 16.9456 13.6682 16.9188 13.7107 16.8915C13.6805 16.8307 13.6567 16.7798 13.6301 16.7306C12.8278 15.2466 12.025 13.763 11.2222 12.279C10.9701 11.8131 10.7185 11.3467 10.4656 10.8815C10.4358 10.8263 10.4133 10.7446 10.3183 10.7935C9.98199 10.9672 9.64647 11.1429 9.26881 11.3391C10.0425 12.6838 10.8069 14.012 11.5147 15.2422L11.5156 15.2426ZM18.0872 14.6393C17.8867 14.2706 17.6989 13.9252 17.5091 13.5753C17.4415 13.6069 17.3941 13.6277 17.3483 13.6517C16.9227 13.8723 16.4951 14.0889 16.0741 14.3175C15.9415 14.3895 15.8634 14.3991 15.804 14.2406C15.7652 14.1357 15.6973 14.0416 15.6432 13.942C15.4391 13.5629 15.2349 13.1838 15.0242 12.7919C15.5013 12.5433 15.9657 12.3019 16.4477 12.0509C16.2595 11.7042 16.0802 11.3731 15.8941 11.03C15.4076 11.2806 14.9427 11.5204 14.4673 11.7658C14.2177 11.3039 13.9767 10.8579 13.7287 10.3987C14.2365 10.1345 14.7275 9.87872 15.2279 9.61852C15.0291 9.25302 14.8413 8.90715 14.6477 8.55166C13.7218 9.03165 12.8171 9.50042 11.8985 9.9764C13.0102 12.0312 14.113 14.0697 15.2234 16.1221C16.1838 15.6249 17.1253 15.1373 18.0872 14.6393Z"
                                fill="#FF0000"
                              />
                              <path
                                d="M15.5312 8.29219C15.9583 8.06996 16.3608 7.85714 16.7687 7.65575C16.8011 7.63982 16.893 7.68679 16.9234 7.72846C17.2872 8.23132 17.6502 8.73541 18.0033 9.24562C18.5688 10.063 19.1268 10.8849 19.6881 11.7052C19.7264 11.7607 19.7634 11.8171 19.8162 11.8661C19.6936 11.5148 19.5655 11.1656 19.4495 10.8122C19.0399 9.56588 18.6361 8.31751 18.2257 7.07159C18.1883 6.95762 18.1966 6.89676 18.3172 6.83998C18.5713 6.72029 18.8183 6.58589 19.064 6.45027C19.1642 6.39512 19.2245 6.39635 19.301 6.49561C20.3169 7.81874 21.3377 9.1386 22.3394 10.4785C22.3286 10.4458 22.3198 10.4123 22.3069 10.38C21.7215 8.89554 21.136 7.41106 20.5505 5.92658C20.4707 5.72437 20.4711 5.72233 20.6645 5.62102C21.0063 5.4421 21.3489 5.26563 21.7098 5.07812C21.7356 5.14553 21.7577 5.19618 21.7747 5.24806C22.4907 7.4274 23.2059 9.60755 23.9253 11.7861C23.9623 11.8984 23.9453 11.9536 23.8367 12.0075C23.4484 12.2015 23.065 12.4049 22.6496 12.6206C21.7248 11.4262 20.8046 10.2379 19.8948 9.06302C19.9663 9.26605 20.0541 9.49072 20.1256 9.7203C20.4898 10.8874 20.8487 12.0557 21.2134 13.2228C21.2462 13.3282 21.2088 13.3731 21.1206 13.418C20.7992 13.5806 20.4753 13.7403 20.163 13.9188C20.0233 13.9985 19.9572 13.9662 19.8682 13.8506C19.1979 12.9846 18.521 12.1235 17.8457 11.2611C17.1089 10.32 16.372 9.37879 15.6352 8.43761C15.6036 8.39717 15.5757 8.35428 15.5317 8.2926L15.5312 8.29219Z"
                                fill="white"
                              />
                              <path
                                d="M11.3587 15.36C10.6407 14.0998 9.86531 12.7401 9.08042 11.3632C9.46311 11.1619 9.80346 10.9823 10.1451 10.8044C10.2409 10.7544 10.2638 10.8376 10.2945 10.8946C10.5514 11.3714 10.8063 11.8485 11.062 12.3257C11.8763 13.8449 12.6903 15.3645 13.5046 16.8841C13.5316 16.9345 13.5557 16.9866 13.5864 17.0489C13.5436 17.0763 13.5067 17.1042 13.4664 17.1255C13.1618 17.2854 12.8559 17.4424 12.5525 17.6047C12.4798 17.6437 12.425 17.6568 12.3541 17.5957C11.1661 16.5783 9.91885 15.6281 8.81021 14.5217C8.75542 14.4671 8.69648 14.4167 8.65788 14.3524C9.41247 15.7113 10.1671 17.0702 10.9325 18.4488C10.5452 18.6513 10.182 18.8411 9.80305 19.0391C9.62166 18.7029 9.44651 18.3815 9.27384 18.0585C8.3528 16.3397 7.43384 14.6196 6.50865 12.9033C6.44183 12.7791 6.45469 12.727 6.57963 12.6659C6.86976 12.5241 7.15574 12.374 7.43799 12.217C7.54674 12.1564 7.61647 12.1629 7.71401 12.2466C8.95673 13.3132 10.204 14.3749 11.3596 15.3604L11.3587 15.36Z"
                                fill="white"
                              />
                              <path
                                d="M18.1204 14.8841C17.2152 15.4268 16.3293 15.9582 15.4256 16.5C14.3806 14.2633 13.343 12.0419 12.2969 9.80263C13.1613 9.28392 14.0122 8.77307 14.8839 8.25C15.0656 8.63739 15.2427 9.01432 15.4298 9.41262C14.9589 9.69618 14.4969 9.97495 14.0191 10.2629C14.2528 10.7637 14.4792 11.2492 14.7141 11.7527C15.1615 11.4857 15.5992 11.2244 16.0567 10.9508C16.2318 11.3247 16.4005 11.6855 16.5776 12.0633C16.124 12.3368 15.6874 12.5999 15.2381 12.8708C15.4368 13.2979 15.6285 13.711 15.8206 14.1242C15.8711 14.2328 15.935 14.3353 15.972 14.4496C16.0274 14.6224 16.1013 14.6119 16.2261 14.5334C16.6223 14.2843 17.0246 14.0483 17.425 13.8079C17.4682 13.7821 17.5132 13.7595 17.5764 13.7246C17.755 14.1054 17.9321 14.4823 18.1204 14.8841Z"
                                fill="white"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="border border-gray-300 p-2">{row.name}</td>
                    <td className="border border-gray-300 p-2">
                      {row.fromDate}
                    </td>
                    <td className="border border-gray-300 p-2">{row.toDate}</td>
                    <td className="border border-gray-300 p-2">
                      <span className="bg-violet-500 text-white rounded-md text-sm px-1 ">
                        {row.code}
                      </span>
                    </td>
                    <td className="border border-gray-300 p-2">{row.type}</td>
                    <td className="border border-gray-300 p-2">
                      {row.daysHours}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <span
                        className={`relative  text-white px-1 text-sm rounded-md ${
                          row.status === "Approved"
                            ? "bg-green-600"
                            : row.status === "Rejected"
                            ? "bg-red-600"
                            : "bg-yellow-600"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="border border-gray-300 p-2 flex justify-center space-x-2">
                      <button className="px-1 py-1 text-gray-800 rounded">
                        <FaSearch />
                      </button>
                      <button className="px-1 py-1 text-gray-800  rounded">
                        <ImCross />
                      </button>
                    </td>
                  </tr>
                )
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveTable;
