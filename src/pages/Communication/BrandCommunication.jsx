import React, { useState, useEffect } from "react";
import CommunicationHeader from "../../components/Main/CommunicationHeader";
import Sidebar from "../../components/Communication/SideBar";
import CommunicationEditor from "../../components/Communication/CommunicationEditor";
import CommunicationPopup from "../../components/Communication/CommunicationPopup";
import axios from "axios";

const BrandCommunication = () => {
  const [activePopup, setActivePopup] = useState(null);
  const [formData, setFormData] = useState({
    header: {
      logoPosition: { x: 0, y: 0 },
      text: "Welcome to Our Company",
      fontStyling: {
        fontStyle: "sans-serif",
        fontSize: "text-lg",
        textColor: "#000000",
        isBold: false,
        isItalic: false,
        isUnderline: false,
        alignment: "center",
      },
    },
    footer: {
      text: "© 2024 Company Name. All rights reserved.",
      fontStyling: {
        fontStyle: "sans-serif",
        fontSize: "text-base",
        textColor: "#000000",
        isBold: false,
        isItalic: false,
        isUnderline: false,
        alignment: "center",
      },
      showPageLineBreak: false,
      showPageNumber: false,
      pageNumberFormat: "normal",
    },
    background: {
      imageUrl: "",
      backgroundColor: "#ffffff",
    },
    content: {
      text: "Form or Letter content goes here",
      fontStyling: {
        fontStyle: "sans-serif",
        fontSize: "text-base",
        textColor: "#000000",
        isBold: false,
        isItalic: false,
        isUnderline: false,
        alignment: "left",
      },
    },
    approver: {
      businessUnit: "",
      approverName: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/communication-branding"
        );
        if (response.data) {
          setFormData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handlePopup = (section) => setActivePopup(section);
  const handleClosePopup = () => setActivePopup(null);
  const handleFormUpdate = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = async () => {
    try {
      await axios.delete("http://localhost:5000/api/v1/communication-branding");
      setFormData({
        header: {
          logoPosition: { x: 0, y: 0 },
          text: "Welcome to Our Company",
          fontStyling: {
            fontStyle: "sans-serif",
            fontSize: "text-lg",
            textColor: "#000000",
            isBold: false,
            isItalic: false,
            isUnderline: false,
            alignment: "center",
          },
        },
        footer: {
          text: "© 2024 Company Name. All rights reserved.",
          fontStyling: {
            fontStyle: "sans-serif",
            fontSize: "text-base",
            textColor: "#000000",
            isBold: false,
            isItalic: false,
            isUnderline: false,
            alignment: "center",
          },
          showPageLineBreak: false,
          showPageNumber: false,
          pageNumberFormat: "normal",
        },
        background: {
          imageUrl: "",
          backgroundColor: "#ffffff",
        },
        content: {
          text: "Form or Letter content goes here",
          fontStyling: {
            fontStyle: "sans-serif",
            fontSize: "text-base",
            textColor: "#000000",
            isBold: false,
            isItalic: false,
            isUnderline: false,
            alignment: "left",
          },
        },
        approver: {
          businessUnit: "",
          approverName: "",
        },
      });
      alert("Data reset to deault!");
    } catch (error) {
      console.error("Error resetting data:", error);
      alert("Error resetting data.");
    }
  };

  const handleSave = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/v1/communication-branding",
        formData
      );
      console.log("Data saved successfully!");
      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error saving data.");
    }
  };

  return (
    <>
      <CommunicationHeader />

      <div className="flex h-screen">
        <Sidebar activeSection={activePopup} handleSectionClick={handlePopup} />

        <CommunicationEditor
          formData={formData}
          handleFormUpdate={handleFormUpdate}
          activeSection={activePopup}
          handleReset={handleReset}
          handleSave={handleSave}
        />
      </div>
      {activePopup && (
        <CommunicationPopup
          activePopup={activePopup}
          handleClosePopup={handleClosePopup}
          formData={formData}
          handleFormUpdate={handleFormUpdate}
        />
      )}
    </>
  );
};

export default BrandCommunication;
