import React, { useState } from "react";

export default function BookingOption({ isOpen, onClose, onConfirm, isLoading }) {
  const [selectedOption, setSelectedOption] = useState("Call Now");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#05244380] z-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-[90%] max-w-md animate-fadeIn">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
          Pick one
        </h2>

      
        <div className="space-y-4 mb-8">
          {["Call Now", "Schedule For later"].map((option) => (
            <label
              key={option}
              className={`flex justify-between items-center border rounded-lg py-3 px-4 cursor-pointer transition ${
                selectedOption === option
                  ? "border-cyan-700 bg-cyan-50"
                  : "border-gray-300 hover:border-cyan-600"
              }`}
            >
              <span className="text-gray-800 font-medium">{option}</span>
              <input
                type="radio"
                name="consultOption"
                value={option}
                checked={selectedOption === option}
                onChange={() => setSelectedOption(option)}
                className="accent-cyan-700 w-5 h-5"
              />
            </label>
          ))}
        </div>

       
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm(selectedOption);
            }}
            disabled={isLoading}
            className="px-6 py-2 rounded-md bg-[#001f3f] hover:bg-[#001634] text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Processing..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
