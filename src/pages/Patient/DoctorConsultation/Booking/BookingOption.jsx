import React, { useState } from "react";

export default function BookingOption({ isOpen, onClose, onConfirm }) {
  const [selectedOption, setSelectedOption] = useState("Call Now");

  if (!isOpen) return null;

  /*const handleConfirm = async (option) => {
    try {
      const res = await fetch("http://localhost:5000/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ choice: option }),
      });

      if (res.ok) {
        console.log("Option saved successfully");
        setOpen(false);
        alert(`You chose: ${option === "call" ? "Call Now" : "Schedule Later"}`);
        setTimeout(() => setOpenSuccess(true), 400); 
      } else {
        console.error("Request failed");
      }
    } catch (error) {
      console.error(error);
    }
  };*/

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
              onClose();
            }}
            className="px-6 py-2 rounded-md bg-[#001f3f] hover:bg-[#001634] text-white transition"
          >
            Confirm
          </button>
          {/* <BookingOption
        isOpen={openConsultation}
        onClose={() => setOpenConsultation(false)}
        onConfirm={handleConfirm}
      /> */}
        </div>
      </div>
    </div>
  );
}
