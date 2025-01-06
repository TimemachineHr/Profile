// import React from "react";
// import * as FaIcons from "react-icons/fa";

// const ScheduleItem = ({ item, index, toggleComplete }) => {
//   const IconComponent = FaIcons[item.icon] || FaIcons.FaTasks;

//   return (
//     <li
//       className={`flex items-center justify-between p-3 rounded-lg border ${
//         item.completed ? "line-through text-gray-400 bg-gray-100" : ""
//       }`}
//     >
//       <div className="flex items-center space-x-3">
//         <IconComponent style={{ color: item.iconColor, fontSize: "20px" }} />
//         <span>{item.time}</span>
//         <span>{item.description}</span>
//       </div>
//       <button
//         onClick={() => toggleComplete(index)}
//         className="text-sm text-[#007b5e] hover:underline"
//       >
//         {item.completed ? "Undo" : "Complete"}
//       </button>
//     </li>
//   );
// };

// export default ScheduleItem;
import React from "react";
import { FaUndo } from "react-icons/fa";
import * as FaIcons from "react-icons/fa";

const ScheduleItem = ({ item, index, toggleComplete }) => {
  const IconComponent = FaIcons[item.icon] || FaIcons.FaTasks; // Fallback to FaTasks

  return (
    <li
      className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
        item.completed
          ? "line-through text-gray-400 bg-gray-100"
          : "text-gray-800 bg-white"
      } border-gray-200 hover:shadow-md`}
    >
      <div className="flex items-center space-x-3">
        <span>
          <IconComponent style={{ color: item.iconColor, fontSize: "20px" }} />
        </span>
        <div>
          <span className="block font-semibold">{item.time}</span>
          <span className="block text-sm text-gray-500">
            {item.description}
          </span>
        </div>
      </div>
      <button
        onClick={() => toggleComplete(index)}
        aria-label={item.completed ? "Mark as incomplete" : "Mark as complete"}
        className={`text-sm font-medium ${
          item.completed
            ? "text-red-500 hover:text-red-600"
            : "text-green-500 hover:text-green-600"
        }`}
      >
        {item.completed ? <FaUndo /> : "Complete"}
      </button>
    </li>
  );
};

export default ScheduleItem;
