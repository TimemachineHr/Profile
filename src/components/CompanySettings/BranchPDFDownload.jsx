import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { IoMdDownload } from "react-icons/io";
import axios from "axios";

const API_URL = "https://company-settings-one.vercel.app/api/company-settings/";

const BranchPDFDownload = ({ branch }) => {
  const [companyData, setCompanyData] = useState(null);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setCompanyData(response.data[0]);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch company data:", error);
      });
  }, []);

  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = (err) => {
        console.error(`Failed to load image: ${src}`, err);
        reject(err);
      };
    });
  };

  const downloadBranchPDF = async () => {
    if (!companyData) {
      console.error("Company data is not available!");
      return;
    }

    const pdf = new jsPDF({ unit: "mm", format: "a4" });
    const logoURL =
      "https://images.unsplash.com/profile-1446404465118-3a53b909cc82?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128&s=27a346c2362207494baa7b76f5d606e5";
    const poweredByLogo =
      "https://images.unsplash.com/profile-1446404465118-3a53b909cc82?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128&s=27a346c2362207494baa7b76f5d606e5";

    try {
      // Capture QR Code
      const qrElement = document.getElementById("qr-code");
      if (!qrElement) {
        console.error("QR Code not found!");
        return;
      }
      const qrCanvas = await html2canvas(qrElement, { scale: 3 });
      const qrImage = qrCanvas.toDataURL("image/png");

      const [logoImage, poweredByImage] = await Promise.all([
        loadImage(logoURL),
        loadImage(poweredByLogo),
      ]);

      pdf.addImage(logoImage, "PNG", 10, 10, 40, 20);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(14);
      pdf.text(companyData.businessProfile.companyName, 120, 15);
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "normal");
      pdf.text(companyData.businessProfile.address, 120, 23);
      pdf.text(`Phone: ${companyData.businessProfile.phone}`, 120, 28);
      pdf.text(`Email: ${companyData.businessProfile.email}`, 120, 33);

      pdf.setDrawColor(0);
      pdf.setLineWidth(0.5);
      pdf.line(10, 50, 200, 50);

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(22);
      pdf.text(branch.title, 105, 65, { align: "center" });

      pdf.setDrawColor(0);
      pdf.setLineWidth(1);
      pdf.roundedRect(55, 70, 100, 100, 10, 10);

      pdf.addImage(qrImage, "PNG", 65, 80, 80, 80);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(16);
      pdf.text("Step 1: Open Valluva App.", 40, 190);
      pdf.setFont("helvetica", "normal");
      pdf.text("Step 2: Log-In with your User ID & Password.", 40, 200);
      pdf.text("Step 3: Swipe from left to right.", 40, 210);
      pdf.text("Step 4: Scan QR Code to mark attendance clock-in.", 40, 220);
      pdf.text("Step 5: Take break.", 40, 230);
      pdf.text("Step 6: Scan QR Code to clock-out.", 40, 240);
      pdf.setFont("helvetica", "italic");
      pdf.text("*Ensure you are connected to Office WiFi or GPS.", 40, 250);

      pdf.addImage(poweredByImage, "PNG", 70, 270, 60, 15);
      pdf.save(`${branch.title}-Details.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <button
      className="absolute inset-0 bg-gray-700 bg-opacity-50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      onClick={downloadBranchPDF}
    >
      <IoMdDownload
        title="Download Branch PDF"
        className="text-white"
        size={24}
      />
    </button>
  );
};

export default BranchPDFDownload;
