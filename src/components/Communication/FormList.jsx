import { useState } from "react";

const FormBuilder = () => {
  const [formFields, setFormFields] = useState([]); // To store fields added by the user
  const [formTitle, setFormTitle] = useState(""); // Form title
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [selectedField, setSelectedField] = useState(""); // To select field type

  const addField = () => {
    const newField = {
      id: Date.now(), // Unique ID for the field
      type: selectedField,
      label: "",
      options: selectedField === "select" ? [] : undefined,
      required: false,
    };
    setFormFields([...formFields, newField]);
  };

  const handleFieldLabelChange = (id, newLabel) => {
    setFormFields(
      formFields.map((field) =>
        field.id === id ? { ...field, label: newLabel } : field
      )
    );
  };

  const handleOptionChange = (id, newOption, index) => {
    setFormFields(
      formFields.map((field) => {
        if (field.id === id && field.type === "select") {
          const updatedOptions = [...field.options];
          updatedOptions[index] = newOption;
          return { ...field, options: updatedOptions };
        }
        return field;
      })
    );
  };

  const handleFormSubmit = () => {
    console.log("Form submitted with fields:", formFields);
    // You can save the form data to the backend here
  };

  return (
    <div className="px-4">
      <h3 className="text-xl font-semibold mb-4">Form Builder</h3>

      {/* Form Title */}
      <div className="mb-4">
        <input
          type="text"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="Enter form title"
        />
      </div>

      {/* Add Fields */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setSelectedField("text")}
          className="p-2 bg-blue-500 text-white rounded-md"
        >
          Add Text Field
        </button>
        <button
          onClick={() => setSelectedField("checkbox")}
          className="p-2 bg-blue-500 text-white rounded-md"
        >
          Add Checkbox
        </button>
        <button
          onClick={() => setSelectedField("select")}
          className="p-2 bg-blue-500 text-white rounded-md"
        >
          Add Select (Dropdown)
        </button>
        <button
          onClick={() => setSelectedField("file")}
          className="p-2 bg-blue-500 text-white rounded-md"
        >
          Add File Upload
        </button>
        <button
          onClick={addField}
          className="p-2 bg-green-500 text-white rounded-md"
        >
          Add Field
        </button>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        {formFields.map((field) => (
          <div key={field.id} className="border p-4 rounded-md shadow-md">
            <div className="mb-2">
              <input
                type="text"
                value={field.label}
                onChange={(e) =>
                  handleFieldLabelChange(field.id, e.target.value)
                }
                placeholder="Field Label"
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Render different input types */}
            {field.type === "text" && (
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Enter text"
              />
            )}

            {field.type === "checkbox" && (
              <div>
                <input type="checkbox" className="mr-2" />
                <span>Option 1</span>
              </div>
            )}

            {field.type === "select" && (
              <div>
                {field.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(field.id, e.target.value, index)
                      }
                      className="w-1/2 p-2 border rounded-md"
                    />
                  </div>
                ))}
                <button
                  onClick={() =>
                    setFormFields(
                      formFields.map((f) =>
                        f.id === field.id
                          ? { ...f, options: [...f.options, ""] }
                          : f
                      )
                    )
                  }
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Add Option
                </button>
              </div>
            )}

            {field.type === "file" && (
              <input type="file" className="w-full p-2 border rounded-md" />
            )}
          </div>
        ))}
      </div>

      {/* Form Submit Button */}
      <button
        onClick={handleFormSubmit}
        className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-md"
      >
        Submit Form
      </button>
    </div>
  );
};

export default FormBuilder;
