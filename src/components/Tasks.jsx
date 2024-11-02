import React from "react";

const Tasks = () => {
  const tasks = [
    {
      id: 1,
      content: "Home Page Development",
      project: "Global App",
      time: "4 hrs ago",
      status: "On Track",
      progress: 45, // Progress percentage
      assignedMembers: [
        "https://i.pravatar.cc/40?img=7",
        "https://i.pravatar.cc/40?img=8",
      ], // Profile pictures
      deadline: "Nov-10",
      projectImage: "https://picsum.photos/40/40?random=1", // Random project image
    },
    {
      id: 2,
      content: "Payroll System",
      project: "Finance Management",
      time: "2 days ago",
      status: "Pending",
      progress: 20,
      assignedMembers: [
        "https://i.pravatar.cc/40?img=3",
        "https://i.pravatar.cc/40?img=4",
      ],
      deadline: "Nov-15",
      projectImage: "https://picsum.photos/40/40?random=2",
    },
    {
      id: 3,
      content: "Inventory Management System",
      project: "Inventory Control",
      time: "1 week ago",
      status: "On Track",
      progress: 60,
      assignedMembers: [
        "https://i.pravatar.cc/40?img=5",
        "https://i.pravatar.cc/40?img=6",
      ],
      deadline: "Nov-20",
      projectImage: "https://picsum.photos/40/40?random=3",
    },
    {
      id: 4,
      content: "Time & Attendance System",
      project: "HR Solutions",
      time: "3 days ago",
      status: "Lagging",
      progress: 25,
      assignedMembers: [
        "https://i.pravatar.cc/40?img=1",
        "https://i.pravatar.cc/40?img=2",
      ],
      deadline: "Nov-12",
      projectImage: "https://picsum.photos/40/40?random=4",
    },
    {
      id: 5,
      content: "Customer Relationship Management",
      project: "CRM Pro",
      time: "1 day ago",
      status: "On Track",
      progress: 80,
      assignedMembers: [
        "https://i.pravatar.cc/40?img=9",
        "https://i.pravatar.cc/40?img=10",
      ],
      deadline: "Nov-25",
      projectImage: "https://picsum.photos/40/40?random=5",
    },
  ];

  return (
    <div className="rounded-2xl bg-white shadow-lg p-4 flex flex-col md:col-span-2 h-60 w-full">
      <h3 className="font-bold text-lg text-gray-800 mb-2 flex items-center">
        Tasks
      </h3>

      <div className="overflow-y-auto flex-grow space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between bg-gray-50 rounded-lg shadow-sm p-4"
          >
            <div className="flex flex-col items-center">
              <img
                src={task.projectImage}
                alt="Task image"
                className="mb-2 rounded-xl"
              />
              <span
                className={`text-sm font-semibold ${
                  task.status === "On Track"
                    ? "text-[#007b5e]"
                    : "text-orange-700"
                }`}
              >
                {task.status}
              </span>
            </div>

            <div className="flex-1 text-left mx-4">
              <span className="block text-gray-800 text-lg font-semibold">
                {task.content}
              </span>
              <span className="block text-gray-500 text-sm">
                {task.project}
              </span>
              <div className="relative mt-2 w-full h-2 bg-gray-200 rounded">
                <div
                  className={`absolute top-0 left-0 h-2 rounded ${
                    task.progress < 30 ? "bg-orange-700" : "bg-[#007b5e]"
                  }`}
                  style={{ width: `${task.progress}%` }}
                ></div>
                <span
                  className={`absolute  bottom-4 right-2 text-xs ${
                    task.progress < 30 ? "text-orange-700" : "text-[#007b5e]"
                  }`}
                >
                  {task.progress}%
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex  mb-1">
                {task.assignedMembers.map((member, index) => (
                  <img
                    key={index}
                    src={member}
                    alt={`Member ${index + 1}`}
                    className="rounded-full w-6 h-6"
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-800">
                {task.deadline}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
