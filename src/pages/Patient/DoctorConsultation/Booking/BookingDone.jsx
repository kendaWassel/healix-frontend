import React from "react";
import { CheckCircle2 } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "./BookingDone.module.css";

export default function BookingDone({ isOpen, onClose, onHome, message = "You Are Done" }) {
  if (!isOpen) return null;


 /* const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:....api/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "done" }),
      });

      if (res.ok) {
        setOpen(true); 
      } else {
        console.error("Request failed");
      }
    } catch (error) {
      console.error(error);
    }
  };*/

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#05244380] backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-[90%] max-w-md text-center animate-fadeIn border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          {message}
        </h2>

        <div className="flex justify-center mb-8">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle2 className="text-green-600 w-12 h-12" />
          </div>
        </div>

        <button
          onClick={onHome}
          className="w-full py-3 bg-[#001f3f] hover:bg-[#001634] text-white font-medium rounded-lg transition"
        >
          Go to Home Screen
        </button>
         {/* <BookingDone isOpen={open} onClose={() => setOpen(false)} /> */}
      </div>
    </div>
  );
}

