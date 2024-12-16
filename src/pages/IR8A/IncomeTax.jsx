import React, { useState } from "react";
import { motion } from "framer-motion";
import IncomeTaxForm from "./IncomeTaxForm";
import Review from "./Review";
import Submit from "./Submit";

const steps = [
  { id: 1, title: "Generate", Component: IncomeTaxForm },
  { id: 2, title: "Review", Component: Review },
  { id: 3, title: "Submit", Component: Submit },
];

const IncomeTax = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const CurrentComponent = steps[currentStep].Component;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="h-auto w-full max-w-7xl bg-white p-8 rounded-lg shadow-md">
        {/* Step Indicator Section */}
        <div className="flex justify-between items-center w-full mb-8 relative">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center w-full relative">
              {/* Line behind the circles */}
              {index !== steps.length && (
                <div
                  className={`absolute top-5 left-0 h-1 w-full ${
                    index < currentStep ? "bg-green-500" : "bg-gray-300"
                  }`}
                  style={{ zIndex: 0 }}
                />
              )}
              {/* Step Content */}
              <div className="flex flex-col items-center w-full relative z-10">
                {/* Circle */}
                <div
                  className={`h-10 w-10 flex items-center justify-center rounded-full text-white font-semibold ${
                    index === currentStep
                      ? "bg-blue-900"
                      : index < currentStep
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                >
                  {index + 1}
                </div>

                {/* Title */}
                <div className="text-lg font-medium text-gray-800 mt-2">
                  {step.title}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Current Component */}
        <div className="w-full">
          <CurrentComponent />
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`px-6 py-2 rounded-md shadow-md font-semibold transition ${
              currentStep === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-900 text-white hover:bg-blue-600"
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            className={`px-6 py-2 ml-4 rounded-md shadow-md font-semibold transition ${
              currentStep === steps.length - 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-900 text-white hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomeTax;
