import { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import DoctorEndCallModal from "./DoctorEndCallModal";
import DoneModal from "../../Patient/DoctorConsultation/Booking/DoneModal";

export default function DoctorCallNow({ isOpen, onClose, patientId, consultationId ,patient_phone}) {
  const [isCalling, setIsCalling] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [patientPhone, setPatientPhone] = useState(patient_phone);
  const [message, setMessage] = useState("");
  const [showEndCallModal, setShowEndCallModal] = useState(false);
  const [showConsDone, setShowConsDone] = useState(false);
  const [canCall, setCanCall] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setError(null);
      setMessage("");
      setPatientPhone(null);
      setShowEndCallModal(false);
      setShowConsDone(false);
      setCanCall(false);
    } else {
      if (patient_phone) {
        console.log("Setting patient phone from prop:", patient_phone);
        setPatientPhone(patient_phone);
      }
    }
  }, [isOpen, patient_phone]);

  useEffect(() => {
    if (!isOpen || !patientId || !consultationId) return;

    const initiateCall = async () => {
      setIsLoading(true);
      setError(null);
      setCanCall(false);

      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          `https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/doctor/consultations/${consultationId}/call`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "true",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        console.log('Call initiation response: ', data);
        
        if (!response.ok || data.status !== "success") {
          throw new Error(data.message || "Failed to initiate call");
        }
        // Set message from response
        setMessage(data.message || "You can call the patient now");
        setCanCall(true);
      } catch (err) {
        setError(err.message || "Failed to initiate call");
        setMessage(err.message || "Failed to initiate call");
        setCanCall(false);
      } finally {
        setIsLoading(false);
      }
    };

    initiateCall();
  }, [isOpen, patientId, consultationId]);
  const handleCallClick = async () => {
    const phone = patientPhone || patient_phone;
    if (!phone) {
      setError("Patient phone number missing.");
      return;
    }
  
    setIsCalling(true);

    window.open(`tel:${phone}`, "_self");
    let callWasOpened = false;  
    window.onblur = () => {
      callWasOpened = true; 
    };
  
    window.onfocus = () => {
      if (callWasOpened) {
        setTimeout(() => setShowEndCallModal(true), 300);
        callWasOpened = false;
        window.onblur = null;
        window.onfocus = null;
      }
    };
  
    setIsCalling(false);
  };
  

  const handleEndCallSuccess = () => {
    setShowEndCallModal(false);
    setMessage("Call ended successfully.");
    setTimeout(() => {
      setShowConsDone(true);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#05244380] backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-[90%] max-w-md text-center animate-fadeIn">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}
        {(patientPhone || patient_phone) && (
          <div className="mb-4 p-3 border-[var(--card-border)] bg-[var(--card-border)] rounded-md">
            <p className="text-[var(--dark-blue)] text-sm">Patient Phone: {patientPhone || patient_phone}</p>
          </div>
        )}

        {isLoading ? (
          <div className="mb-4 text-lg w-[80%] mx-auto bg-gray-300 p-3 rounded-md">
            Preparing call...
          </div>
        ) : (
          <button
            onClick={handleCallClick}
            disabled={!canCall || !(patientPhone || patient_phone) || error}
            className={`mb-4 text-[20px] w-[80%] mx-auto flex items-center justify-center gap-2 px-6 py-2 rounded-md text-white transition ${
              !canCall || !(patientPhone || patient_phone) || error
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[var(--dark-blue)] hover:bg-[#052443db]"
            }`}
          >
            <Phone size={18} />
            Start consultation
          </button>
        )}

        <button
          onClick={onClose}
          className="bg-[#e71313] text-white text-[20px] w-[80%] px-6 py-2 rounded-md hover:bg-[#e71313ad] transition"
        >
          Cancel
        </button>
      </div>

      <DoctorEndCallModal
        isOpen={showEndCallModal}
        onClose={() => setShowEndCallModal(false)}
        consultationId={consultationId}
        patientId={patientId}
        onEndSuccess={handleEndCallSuccess}
      />
      <DoneModal
        isOpen={showConsDone}
        onHome={() => {
          setShowConsDone(false);
          onClose();
        }}
        message="Call completed successfully!"
      />
    </div>
  );
}
