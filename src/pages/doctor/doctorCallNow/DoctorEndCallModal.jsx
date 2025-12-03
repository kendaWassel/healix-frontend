import { useState } from "react";
import { FileText } from "lucide-react";
import PatientDetailsModal from "../doctorSchedules/PatientDetailsModal";

export default function DoctorEndCallModal({ isOpen, onClose, consultationId, patientId, onEndSuccess }) {
  const [isEnding, setIsEnding] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("Consultation is in progress");
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [medicalReport, setMedicalReport] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportError, setReportError] = useState(null);

  const handleViewMedicalReport = async () => {
    if (!patientId) {
      setReportError("Patient ID is missing");
      return;
    }

    setIsLoadingReport(true);
    setReportError(null);
    setMedicalReport(null);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/doctor/patients/${patientId}/view-details`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const serverError = await response.json().catch(() => ({}));
        throw new Error(serverError.message || "Failed to fetch medical report");
      }

      const data = await response.json();
      console.log("Medical report data:", data);
      
      // Set medical report data
      setMedicalReport(data.data || data);
      setShowReportModal(true);
    } catch (err) {
      setReportError(err.message || "Failed to load medical report. Please try again.");
    } finally {
      setIsLoadingReport(false);
    }
  };

  if (!isOpen) return null;

  const handleEndCall = async () => {
    if (!consultationId) {
      setError("Consultation ID is missing");
      return;
    }

    setIsEnding(true);
    setError(null);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/doctor/consultations/${consultationId}/end`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const serverError = await response.json().catch(() => ({}));
        throw new Error(serverError.message || "Failed to end call");
      }

      const data = await response.json();
      setMessage(data.message || "Call ended successfully");

      if (onEndSuccess) {
        onEndSuccess();
      }

      setTimeout(() => {
        onClose();
      }, 500);
    } catch (err) {
      setError(err.message || "Failed to end call. Please try again.");
    } finally {
      setIsEnding(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#05244380] backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md text-center animate-fadeIn border border-gray-100">
        <p className="text-gray-700 mb-4">{message}</p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <button
            onClick={handleViewMedicalReport}
            disabled={isLoadingReport || !patientId}
            className="text-[20px] w-full flex items-center justify-center gap-2 bg-[var(--dark-blue)] px-6 py-2 rounded-md text-white hover:bg-[#052443db] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileText size={18} />
            {isLoadingReport ? "Loading..." : "View Medical Report"}
          </button>

          {reportError && (
            <div className="mb-2 p-2 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800 text-xs">{reportError}</p>
            </div>
          )}

          <button
            onClick={handleEndCall}
            disabled={isEnding}
            className="text-[20px] w-full flex items-center justify-center gap-2 bg-[#e71313] px-6 py-2 rounded-md text-white hover:bg-[#c00f0f] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isEnding ? "Ending call..." : "End Call"}
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Close
          </button>
        </div>
      </div>

      {showReportModal && medicalReport && (
        <PatientDetailsModal
          details={medicalReport}
          onClose={() => {
            setShowReportModal(false);
            setMedicalReport(null);
            setReportError(null);
          }}
        />
      )}
    </div>
  );
}

