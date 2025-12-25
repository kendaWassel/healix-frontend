import { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import PatientEndCallModal from "../DoctorConsultation/Booking/PatientEndCallModal";
import RatingModal from "../DoctorConsultation/Booking/RatingModal";
import DoneModal from "../DoctorConsultation/Booking/DoneModal";

export default function PatientScheduleCall({ isOpen, onClose, consultationId, doctorId, doctorPhone }) {
  const [isCalling, setIsCalling] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [showEndCallModal, setShowEndCallModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showBookingDone, setShowBookingDone] = useState(false);
  const [canCall, setCanCall] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setError(null);
      setMessage("");
      setShowEndCallModal(false);
      setShowRatingModal(false);
      setShowBookingDone(false);
      setCanCall(false);
    }
  }, [isOpen]);

  // Initiate call on open
  useEffect(() => {
    if (!isOpen || !consultationId) return;

    const initiateCall = async () => {
      setIsLoading(true);
      setError(null);
      setCanCall(false);

      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          `https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/patient/consultations/${consultationId}/call`,
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
        
        setMessage(data.message || "You can call the doctor now");
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
  }, [isOpen, consultationId]);

  const handleCallClick = async () => {
    const phone = doctorPhone;
    if (!phone) {
      setError("Doctor phone number missing.");
      return;
    }
  
    setIsCalling(true);
  
    // Open phone dialer
    window.open(`tel:${phone}`, "_self");
  
    // Detect returning from call
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
    setShowRatingModal(true);
  };

  const handleRatingSuccess = () => {
    setShowRatingModal(false);
    setShowBookingDone(true);
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
        {doctorPhone && (
          <div className="mb-4 p-3 border-[var(--card-border)] bg-[var(--card-border)] rounded-md">
            <p className="text-[var(--dark-blue)] text-sm">Doctor Phone: {doctorPhone}</p>
          </div>
        )}

        {isLoading ? (
          <div className="mb-4 text-lg w-[80%] mx-auto bg-gray-300 p-3 rounded-md">
            Preparing call...
          </div>
        ) : (
          <button
            onClick={handleCallClick}
            disabled={!canCall || !doctorPhone || error}
            className={`mb-4 text-[20px] w-[80%] mx-auto flex items-center justify-center gap-2 px-6 py-2 rounded-md text-white transition ${
              !canCall || !doctorPhone || error
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

      <PatientEndCallModal
        isOpen={showEndCallModal}
        onClose={() => setShowEndCallModal(false)}
        consultationId={consultationId}
        onEndSuccess={handleEndCallSuccess}
      />
      <RatingModal
        isOpen={showRatingModal}
        onClose={() => {
          setShowRatingModal(false);
          setShowBookingDone(true);
        }}
        consultationId={consultationId}
        doctor_id={doctorId}
        onRatingSuccess={handleRatingSuccess}
      />
      <DoneModal
        isOpen={showBookingDone}
        onHome={() => {
          setShowBookingDone(false);
          onClose();
        }}
        message="Thank you for your feedback!"
      />
    </div>
  );
}

