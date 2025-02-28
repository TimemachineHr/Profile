import { useState } from "react";

const CPFSubmissionForm = () => {
  const [formData, setFormData] = useState({
    companyName: "Valluva",
    uen: "202573826A",
    cpfSubmissionNumber: "202573826A-PTE-01",
    cpfSubmissionYear: "2025",
    cpfSubmissionMonth: "January",
    cpfPenaltyAmount: "",
    fwlContributionAmount: "",
    fwlPenaltyAmount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://sandbox.api.gov.sg/cpf/employer-cpf-contributions/v1/submitCPFContributions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      alert(`Form submitted: ${JSON.stringify(formData, null, 2)}`);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <div className="max-w-7xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-lg">
      {/* Buttons */}
      <div className="flex justify-between mb-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Download
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md">
          Summary
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Company Name & UEN */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block font-medium">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter company name"
              required
            />
          </div>
          <div>
            <label className="block font-medium">UEN</label>
            <input
              type="text"
              name="uen"
              value={formData.uen}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter UEN"
              required
            />
          </div>
          {/* CPF Submission Number */}
          <div>
            <label className="block font-medium">
              CPF Submission Number (CSN)
            </label>
            <input
              type="text"
              name="cpfSubmissionNumber"
              value={formData.cpfSubmissionNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter CPF Submission Number"
              required
            />
          </div>
        </div>
        {/* CPF Submission Period (Year & Month) */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block font-medium">CPF Submission Year</label>
            <select
              name="cpfSubmissionYear"
              value={formData.cpfSubmissionYear}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>
          <div>
            <label className="block font-medium">CPF Submission Month</label>
            <select
              name="cpfSubmissionMonth"
              value={formData.cpfSubmissionMonth}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium">
              Company CPF Penalty Amount (If Any)
            </label>
            <input
              type="text"
              name="cpfPenaltyAmount"
              value={formData.cpfPenaltyAmount}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter CPF Penalty Amount"
            />
          </div>
        </div>

        {/* CPF Penalty & FWL Contribution Fields */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block font-medium">Payment Mode</label>
            <select
              name="paymentMode"
              value={formData.paymentMode}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            >
              <option value="G">Direct Debit</option>
              <option value="P">PayNow</option>
              <option value="M">MEPS</option>
            </select>
          </div>

          {formData.paymentMode === "G" && (
            <div>
              <label className="block font-medium">Deduction Date</label>
              <input
                type="date"
                name="deductionDate"
                value={formData.deductionDate}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
          )}
          {/* Company FWL Penalty Amount */}
          <div>
            <label className="block font-medium">
              Company FWL Penalty Amount (If Any)
            </label>
            <input
              type="text"
              name="fwlPenaltyAmount"
              value={formData.fwlPenaltyAmount}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter FWL Penalty Amount"
            />
          </div>
          <div>
            <label className="block font-medium">
              Company FWL Contribution Amount
              <span className="text-sm text-gray-500">
                {" "}
                (Do not enter if on GIRO)
              </span>
            </label>
            <input
              type="text"
              name="fwlContributionAmount"
              value={formData.fwlContributionAmount}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter FWL Contribution Amount"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
          >
            Generate Summary
          </button>
        </div>
      </form>
    </div>
  );
};

export default CPFSubmissionForm;
