import { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import PatientEndCallModal from "./PatientEndCallModal";
import RatingModal from "./RatingModal";
import DoneModal from "./DoneModal";
import PaymentModal from "../../../../components/PaymentModal";

export default function PatientCallNowModal({ isOpen, onClose, doctorId, onConfirm }) {
  const [isCreatingConsultation, setIsCreatingConsultation] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [error, setError] = useState(null);
  const [consultationId, setConsultationId] = useState(null);
  const [doctorPhone, setDoctorPhone] = useState(null);
  const [message, setMessage] = useState("");
  const [showEndCallModal, setShowEndCallModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showBookingDone, setShowBookingDone] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setConsultationId(null);
      setError(null);
      setMessage("");
      setShowEndCallModal(false);
      setShowPaymentModal(false);
      setShowRatingModal(false);
      setShowBookingDone(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !doctorId) return;

    const createConsultation = async () => {
      setIsCreatingConsultation(true);
      setError(null);

      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          `https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/patient/consultations/book`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "true",
              "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
              doctor_id: doctorId,
              call_type: "call_now",
            }),
          }
        );

        const data = await response.json();
        console.log('consultation data: ',data);
        if (!response.ok || data.status !== "success") {
          throw new Error(data.message || "Failed to create consultation");
        }

        setConsultationId(data.data.consultation_id);
        setDoctorPhone(data.data.doctor_phone);
        setMessage(data.message || "You can call the doctor Now");
      } catch (err) {
        setError(err.message || "Failed to create consultation");
      } finally {
        setIsCreatingConsultation(false);
        console.log('doctor phone: ', doctorPhone);
      }
    };

    createConsultation();
  }, [isOpen, doctorId]);

  const triggerCallApi = async () => {
    if (!consultationId) return;

    const token = localStorage.getItem("token");
    try {
      await fetch(
        `https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/consultations/${consultationId}/call`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error("Failed to log call:", err);
    }
  };

  const handleCallClick = async () => {
    const phone = doctorPhone;
    if (!phone) {
      setError("Doctor phone number missing.");
      return;
    }
  
    setIsCalling(true);
  
    triggerCallApi();
  
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
    if (onConfirm) onConfirm();
  };
  

  const handleEndCallSuccess = () => {
    setShowEndCallModal(false);
    setMessage("Call ended successfully.");
    // Wait a bit longer to ensure end call modal is fully closed
    setTimeout(() => {
      setShowPaymentModal(true);
    }, 600);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    setTimeout(() => {
      setShowRatingModal(true);
    }, 300);
  };

  const handleRatingSkip = () => {
    setShowRatingModal(false);
    setTimeout(() => {
      setShowBookingDone(true);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#05244380] backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-[90%] max-w-md text-center animate-fadeIn">
        <h2 className="text-2xl font-semibold mb-6">{message}</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}
        <div className="mb-4 p-3 border-[var(--card-border)] bg-[var(--card-border)] rounded-md">
            <p className="text-[var(--dark-blue)] text-sm">{doctorPhone}</p>
        </div>

        {isCreatingConsultation ? (
          <div className="mb-4 text-lg w-[80%] mx-auto bg-gray-300 p-3 rounded-md">
            Creating consultation...
          </div>
        ) : (
          <button
            onClick={handleCallClick}
            disabled={!consultationId || error}
            className="mb-4 text-[20px] w-[80%] mx-auto flex items-center justify-center gap-2 bg-[var(--dark-blue)] px-6 py-2 rounded-md text-white hover:bg-[#052443db] transition"
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
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onPaymentSuccess={handlePaymentSuccess}
        paymentType="doctor"
      />
      <RatingModal
        isOpen={showRatingModal}
        onClose={handleRatingSkip}
        url={`consultations/${consultationId}/rate/${doctorId}`}
        onRatingSuccess={() => {
          setShowRatingModal(false);
          setTimeout(() => {
            setShowBookingDone(true);
          }, 300);
        }}
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
