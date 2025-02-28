import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const OEDSubmissionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      dateSent: new Date().toISOString().split("T")[0].replace(/-/g, ""),
      uen: data.uen,
      requestorEmail: data.requestorEmail,
      requestorName: data.requestorName,
      batchID: "batch001",
      currentBatch: 1,
      totalBatches: 1,
      oedData: [data],
    };

    try {
      const response = await axios.post(
        "https://sandbox.api.gov.sg/mom/oed/lssp/ez/laboursurvey/prc/v1/Submission",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer YOUR_ACCESS_TOKEN",
          },
        }
      );
      alert("Submission successful: " + response.data.responseMessage);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Submission failed. Check console for details.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">OED Submission Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">UEN</label>
            <input
              {...register("uen", { required: true })}
              className="w-full border p-2 rounded"
              placeholder="Enter UEN"
            />
            {errors.uen && (
              <p className="text-red-500 text-sm">UEN is required.</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Requestor Email</label>
            <input
              {...register("requestorEmail", { required: true })}
              type="email"
              className="w-full border p-2 rounded"
              placeholder="example@company.com"
            />
            {errors.requestorEmail && (
              <p className="text-red-500 text-sm">Email is required.</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Requestor Name</label>
          <input
            {...register("requestorName", { required: true })}
            className="w-full border p-2 rounded"
            placeholder="Enter your name"
          />
          {errors.requestorName && (
            <p className="text-red-500 text-sm">Name is required.</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">
              Full Name (Employee)
            </label>
            <input
              {...register("fullName", { required: true })}
              className="w-full border p-2 rounded"
              placeholder="Enter employee full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">NRIC</label>
            <input
              {...register("nric", { required: true })}
              className="w-full border p-2 rounded"
              placeholder="Enter NRIC"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Date Joined</label>
            <input
              {...register("dateJoined", { required: true })}
              type="date"
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Highest Education
            </label>
            <select
              {...register("highestEducation", { required: true })}
              className="w-full border p-2 rounded"
            >
              <option value="">Select</option>
              <option value="Bachelor’s or Equivalent">
                Bachelor’s or Equivalent
              </option>
              <option value="Master’s and Doctorate">
                Master’s and Doctorate
              </option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Job Title</label>
          <input
            {...register("pwJobTitle", { required: true })}
            className="w-full border p-2 rounded"
            placeholder="Enter job title"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Basic Wage</label>
            <input
              {...register("basicWage", { required: true })}
              type="number"
              className="w-full border p-2 rounded"
              placeholder="Enter basic wage"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Gross Wage</label>
            <input
              {...register("grossWage", { required: true })}
              type="number"
              className="w-full border p-2 rounded"
              placeholder="Enter gross wage"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-900 text-white p-3 rounded hover:bg-blue-700 font-medium"
        >
          Submit Data
        </button>
      </form>
    </div>
  );
};

export default OEDSubmissionForm;
