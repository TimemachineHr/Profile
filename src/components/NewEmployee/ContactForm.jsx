import React, { useState, useRef, useEffect } from "react";

import { FaPlus, FaMinus } from "react-icons/fa";

const countries = [
  { code: "+65", name: "Singapore", symbol: "🇸🇬" },
  { code: "+1", name: "USA", symbol: "🇺🇸" },
  { code: "+60", name: "Malaysia", symbol: "🇲🇾" },
  { code: "+91", name: "India", symbol: "🇮🇳" },
  { code: "+44", name: "UK", symbol: "🇬🇧" },
  { code: "+61", name: "Australia", symbol: "🇦🇺" },
];

const ContactForm = ({ data, setData }) => {
  const [referenceContacts, setReferenceContacts] = useState(
    data?.referenceContacts || [
      {
        name: "",
        relationship: "",
        phone: "",
        email: "",
        countryCode: countries[0].code,
      },
    ]
  );

  const [emergencyContacts, setEmergencyContacts] = useState(
    data?.emergencyContacts || [
      { name: "", relationship: "", phone: "", countryCode: countries[0].code },
    ]
  );

  useEffect(() => {
    setData({
      referenceContacts,
      emergencyContacts,
    });
  }, [referenceContacts, emergencyContacts]);

  const handleInputChange = (type, index, field, value) => {
    if (type === "reference") {
      const newContacts = [...referenceContacts];
      newContacts[index][field] = value;
      setReferenceContacts(newContacts);
    } else {
      const newContacts = [...emergencyContacts];
      newContacts[index][field] = value;
      setEmergencyContacts(newContacts);
    }
  };

  const addContact = (type) => {
    const newContact = {
      name: "",
      relationship: "",
      phone: "",
      countryCode: countries[0].code,
      ...(type === "reference" ? { email: "" } : {}),
    };

    if (type === "reference") {
      setReferenceContacts([...referenceContacts, newContact]);
    } else {
      setEmergencyContacts([...emergencyContacts, newContact]);
    }
  };

  const removeContact = (type, index) => {
    if (type === "reference") {
      const newContacts = [...referenceContacts];
      newContacts.splice(index, 1);
      setReferenceContacts(newContacts);
    } else {
      const newContacts = [...emergencyContacts];
      newContacts.splice(index, 1);
      setEmergencyContacts(newContacts);
    }
  };

  const handleCountryChange = (type, index, newCode) => {
    if (type === "reference") {
      const newContacts = [...referenceContacts];
      newContacts[index].countryCode = newCode;
      setReferenceContacts(newContacts);
    } else {
      const newContacts = [...emergencyContacts];
      newContacts[index].countryCode = newCode;
      setEmergencyContacts(newContacts);
    }
  };

  const ContactSection = ({ type, contacts, showEmail = false }) => (
    <div className="mb-8">
      <h2 className="text-2xl font-medium text-black mb-6">
        {type === "reference" ? "Reference Contact" : "Emergency Contact"}
      </h2>
      {contacts.map((contact, index) => {
        const nameRef = useRef(null);
        const relationshipRef = useRef(null);
        const phoneRef = useRef(null);
        const emailRef = useRef(null);

        return (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 relative"
          >
            <div>
              <label className="block text-gray-700 text-md font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                defaultValue={contact.name}
                onBlur={(e) =>
                  handleInputChange(type, index, "name", e.target.value)
                }
                ref={nameRef}
                placeholder="Name"
                className="w-full h-[46px] bg-white shadow rounded-lg text-gray-700 text-md font-normal tracking-wider pl-3"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-md font-medium mb-1">
                Relationship
              </label>
              <input
                type="text"
                defaultValue={contact.relationship}
                onBlur={(e) =>
                  handleInputChange(type, index, "relationship", e.target.value)
                }
                ref={relationshipRef}
                placeholder="Relationship"
                className="w-full h-[46px] bg-white shadow rounded-lg text-gray-700 text-md font-normal tracking-wider pl-3"
              />
            </div>
            <div className="relative">
              <label className="block text-gray-700 text-md font-medium mb-1">
                Phone
              </label>
              <div className="flex">
                <select
                  value={contact.countryCode}
                  onChange={(e) =>
                    handleCountryChange(type, index, e.target.value)
                  }
                  className="h-[46px] bg-white shadow rounded-l-lg pl-3 text-gray-700"
                >
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.code}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  defaultValue={contact.phone}
                  onBlur={(e) =>
                    handleInputChange(type, index, "phone", e.target.value)
                  }
                  ref={phoneRef}
                  placeholder="91234567"
                  className="w-full h-[46px] bg-white shadow rounded-r-lg text-gray-700 text-md font-normal tracking-wider pl-3"
                />
              </div>
            </div>
            {showEmail && (
              <div>
                <label className="block text-gray-700 text-md font-medium mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  defaultValue={contact.email}
                  onBlur={(e) =>
                    handleInputChange(type, index, "email", e.target.value)
                  }
                  ref={emailRef}
                  placeholder="E-mail"
                  className="w-full h-[46px] bg-white shadow rounded-lg text-gray-700 text-md font-normal tracking-wider pl-3"
                />
              </div>
            )}
            <div className="flex items-center mt-6 space-x-2">
              {index === contacts.length - 1 && (
                <>
                  <button
                    onClick={() => addContact(type)}
                    className="flex items-center justify-center w-8 h-8 bg-blue-800 rounded-full hover:bg-blue-500 transition-colors"
                  >
                    <FaPlus className="w-5 h-5 text-white" />
                  </button>
                  {contacts.length > 1 && (
                    <button
                      onClick={() => removeContact(type, index)}
                      className="flex items-center justify-center w-8 h-8 bg-red-600 rounded-full hover:bg-red-500 transition-colors"
                    >
                      <FaMinus className="w-5 h-5 text-white" />
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <ContactSection
        type="reference"
        contacts={referenceContacts}
        showEmail={true}
      />
      <ContactSection type="emergency" contacts={emergencyContacts} />
    </div>
  );
};

export default ContactForm;
