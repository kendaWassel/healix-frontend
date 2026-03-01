import { useState, useEffect, useRef } from "react";
import { FileText } from "lucide-react";
import PatientDetailsModal from "../../pages/doctor/doctorSchedules/PatientDetailsModal";
import CareProviderModifyMedicalReport from "./CareProviderModifyMedicalReport";
import DoneModal from "../../pages/Patient/DoctorConsultation/Booking/DoneModal";

export default function CareProviderStartSession({ isOpen, onClose, patientId, sessionId, providerType = "physiotherapist" }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [sessionStarted, setSessionStarted] = useState(false);
  const [showSessionDone, setShowSessionDone] = useState(false);
  
  const [isEnding, setIsEnding] = useState(false);
  const [endError, setEndError] = useState(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [patientDetails, setPatientDetails] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsError, setDetailsError] = useState(null);
  const [showModifyReport, setShowModifyReport] = useState(false);
  const [currentMedicalReport, setCurrentMedicalReport] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      setError(null);
      setMessage("");
      setSessionStarted(false);
      setShowSessionDone(false);
      setIsEnding(false);
      setEndError(null);
      setPatientDetails(null);
      setShowDetailsModal(false);
      setDetailsError(null);
      setShowModifyReport(false);
      setCurrentMedicalReport(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !sessionId) return;
    

    const startSession = async () => {
      setIsLoading(true);
      setError(null);
      setSessionStarted(false);

      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          `https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/provider/${providerType}/schedules/${sessionId}/start-session`,
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
        console.log('Start session response: ', data);
        
        if (!response.ok || data.status !== "success") {
          throw new Error(data.message || "Failed to start session");
        }
        
        setMessage(data.message || "Session started successfully");
        setSessionStarted(true);
      } catch (err) {
        setError(err.message || "Failed to start session");
        setMessage(err.message || "Failed to start session");
        setSessionStarted(false);
      } finally {
        setIsLoading(false);
      }
    };

    startSession();
  }, [isOpen]);

  const handleViewDetails = async () => {
    if (!patientId) {
      setDetailsError("Patient ID is missing");
      return;
    }

    setIsLoadingDetails(true);
    setDetailsError(null);
    setPatientDetails(null);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/patients/${patientId}/view-details`,
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
        throw new Error(serverError.message || "Failed to fetch patient details");
      }

      const data = await response.json();
      console.log("Patient details data:", data);
      
      setPatientDetails(data.data || data);
      setShowDetailsModal(true);
    } catch (err) {
      setDetailsError(err.message || "Failed to load patient details. Please try again.");
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const handleEndSession = async () => {
    if (!sessionId) {
      setEndError("Session ID is missing");
      return;
    }

    setIsEnding(true);
    setEndError(null);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/provider/${providerType}/schedules/${sessionId}/end-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const serverError = await response.json().catch(() => ({}));
        throw new Error(serverError.message || "Failed to end session");
      }

      const data = await response.json();
      setMessage(data.message || "Session ended successfully");

      // Fetch medical report for modification
      try {
        const reportResponse = await fetch(
          `https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/patients/${patientId}/view-details`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "true",
              "Authorization": `Bearer ${token}`,
            },
          }
        );
        if (reportResponse.ok) {
          const reportData = await reportResponse.json();
          setCurrentMedicalReport(reportData.data?.medical_record || reportData.medical_record || {});
        }
      } catch (err) {
        console.error("Failed to fetch medical report:", err);
      }

      // Show modify medical report modal
      setTimeout(() => {
        setShowModifyReport(true);
      }, 500);
    } catch (err) {
      setEndError(err.message || "Failed to end session. Please try again.");
    } finally {
      setIsEnding(false);
    }
  };

  const handleModifyReportComplete = () => {
    setShowModifyReport(false);
    setShowSessionDone(true);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-[#05244380] backdrop-blur-sm z-50">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-[90%] max-w-md text-center animate-fadeIn">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {sessionStarted ? "Session Control" : "Starting Session"}
          </h2>

          {endError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800 text-sm">{endError}</p>
            </div>
          )}

          {error ?
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800 text-sm">{error}</p>
          <button
              onClick={onClose}
              className="bg-[#e71313] text-white text-[20px] w-[80%] px-6 py-2 rounded-md hover:bg-[#e71313ad] transition"
            >
              Cancel
            </button>
        </div>
        :
          isLoading ? (
            <div className="mb-4 text-lg w-[80%] mx-auto bg-gray-300 p-3 rounded-md">
              Starting session...
            </div>
          ) : sessionStarted ? (
            <div className="flex flex-col gap-3 mb-4">
              <button
                onClick={handleViewDetails}
                disabled={isLoadingDetails}
                className="text-[20px] w-full flex items-center justify-center gap-2 bg-[var(--dark-blue)] px-6 py-2 rounded-md text-white hover:bg-[#052443db] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FileText size={18} />
                {isLoadingDetails ? "Loading..." : "View Details"}
              </button>

              {detailsError && (
                <div className="mb-2 p-2 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-800 text-xs">{detailsError}</p>
                </div>
              )}

              <button
                onClick={handleEndSession}
                disabled={isEnding}
                className="text-[20px] w-full flex items-center justify-center gap-2 bg-[#e71313] px-6 py-2 rounded-md text-white hover:bg-[#c00f0f] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isEnding ? "Ending session..." : "End Session"}
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Close
              </button>
            </div>
          ) : (
            <button
              onClick={onClose}
              className="bg-[#e71313] text-white text-[20px] w-[80%] px-6 py-2 rounded-md hover:bg-[#e71313ad] transition"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {showDetailsModal && patientDetails && (
        <PatientDetailsModal
          details={patientDetails}
          onClose={() => {
            setShowDetailsModal(false);
            setPatientDetails(null);
            setDetailsError(null);
          }}
        />
      )}

      {showModifyReport && (
        <CareProviderModifyMedicalReport
          isOpen={showModifyReport}
          onClose={handleModifyReportComplete}
          onSave={handleModifyReportComplete}
          medicalReport={currentMedicalReport}
          patientId={patientId}
          sessionId={sessionId}
          providerType={providerType}
        />
      )}

      <DoneModal
        isOpen={showSessionDone}
        onHome={() => {
          setShowSessionDone(false);
          onClose();
        }}
        message="Session completed successfully!"
      />
    </>
  );
}

