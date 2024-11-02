export const orgData = {
  name: "CEO",
  title: "John Doe",
  role: "CEO",
  children: [
    {
      name: "CTO",
      title: "Jane Smith",
      role: "CTO",
      children: [
        { name: "Lead Engineer", title: "Alice Brown", role: "Lead Engineer" },
        {
          name: "Senior Engineer",
          title: "Bob Johnson",
          role: "Senior Engineer",
        },
        {
          name: "Developer",
          title: "John Doe",
          role: "Developer",
          highlight: true,
        },
      ],
    },
    {
      name: "CFO",
      title: "Chris White",
      role: "CFO",
      children: [
        { name: "Accountant", title: "Sarah Taylor", role: "Accountant" },
      ],
    },
  ],
};
