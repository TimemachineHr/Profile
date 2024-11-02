import React from "react";
import OrganizationChart from "../components/OrgChart/OrganizationChart";

const Chart = () => {
  return (
    <div className="p-8">
      <h1 className="text-center text-2xl font-bold mb-6">
        Organization Chart
      </h1>
      <OrganizationChart />
    </div>
  );
};

export default Chart;
