import React, { useState } from "react";
import FileUploadSection from "../../components/CompanySettings/About";
import CompanySettingsHeader from "../../components/Main/CompanySettingsHeader";
import Branches from "../../components/CompanySettings/Branchs";
import AuditLog from "../../components/CompanySettings/AuditLog";
import BrandSettings from "../../components/CompanySettings/BrandSettings";
import Business from "../../components/CompanySettings/Business";

const CompanySettings = () => {
  return (
    <>
      <CompanySettingsHeader />
      <div className="pt-20 min-h-screen p-8 bg-gray-100">
        <Business />

        <FileUploadSection />
        {/* Branches Section */}
        <section id="branches" className="mb-12">
          <Branches />
        </section>

        {/* Brand Section */}
        <section id="brand" className="mb-12">
          <BrandSettings />
        </section>

        {/* Audit Log Section */}
        <section id="audit-log" className="mb-12">
          <AuditLog />
        </section>
      </div>
    </>
  );
};

export default CompanySettings;
