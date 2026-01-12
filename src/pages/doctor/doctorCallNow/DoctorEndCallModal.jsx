import { useState, useEffect } from "react";
import { FileText } from "lucide-react";
import PatientDetailsModal from "../doctorSchedules/PatientDetailsModal";
import CreatePrescription from "../prescription/CreatePrescription";
import ModifyMedicalReport from "../doctorSchedules/ModifyMedicalReports";

export default function DoctorEndCallModal({ isOpen, onClose, consultationId, patientId, onEndSuccess }) {
  const [isEnding, setIsEnding] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("Consultation is in progress");
  const [serviceReason, setServiceReason] = useState("");
  const [type, setType] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [isSendingRequest, setIsSendingRequest] = useState(false);
  const [medicalReport, setMedicalReport] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportError, setReportError] = useState(null);
  
  // Post-call flow states
  const [showCareProviderPopup, setShowCareProviderPopup] = useState(false);
  const [showPrescriptionPopup, setShowPrescriptionPopup] = useState(false);
  const [showModifyReport, setShowModifyReport] = useState(false);
  const [currentMedicalReport, setCurrentMedicalReport] = useState(null);

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

  // Reset states when modal closes
  useEffect(() => {
    if (!isOpen) {
      setShowCareProviderPopup(false);
      setShowPrescriptionPopup(false);
      setShowModifyReport(false);
      setCurrentMedicalReport(null);
      setError(null);
      setMessage("Consultation is in progress");
      setServiceReason("");
      setType("");
      setScheduledTime("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (showModifyReport && patientId && !currentMedicalReport) {
      const fetchMedicalReport = async () => {
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
          if (response.ok) {
            const data = await response.json();
            setCurrentMedicalReport(data.data?.medical_record || data.medical_record || {});
          }
        } catch (err) {
          console.error("Failed to fetch medical report:", err);
        }
      };
      fetchMedicalReport();
    }
  }, [showModifyReport, patientId, currentMedicalReport]);

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
      const response = await fetch(`https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/consultations/${consultationId}/end`, {
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

      setTimeout(() => {
        setShowCareProviderPopup(true);
      }, 500);
    } catch (err) {
      setError(err.message || "Failed to end call. Please try again.");
    } finally {
      setIsEnding(false);
    }
  };

  const handleCareProviderRequest = async () => {
    if (!type) {
      setError("Please select a service type");
      return;
    }
    if (!serviceReason.trim()) {
      setError("Please enter a reason for the service");
      return;
    }
    if (!scheduledTime) {
      setError("Please select a scheduled time");
      return;
    }
setIsSendingRequest(true);
    const token = localStorage.getItem("token");
    console.log("consultationId: ",consultationId,",patientId: ",patientId,",type: ",type,",serviceReason: ",serviceReason,",scheduledTime:",scheduledTime)
    try {
      const response = await fetch(
        `https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/doctor/home-visit/request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({
            consultation_id: consultationId,
            patient_id: patientId,
            service_type: type,
            reason: serviceReason,
            scheduled_at: scheduledTime,
          })
        }
      );
      if (response.ok) {
        console.log(`${type} requested successfully`);
        setShowCareProviderPopup(false);
        setShowPrescriptionPopup(true);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.message || "Failed to request service");
      }
    } catch (err) {
      console.error(`Failed to request ${type}:`, err);
      setError("Failed to request service. Please try again.");
    }
setIsSendingRequest(false);
  };

  const handleSkipCareProvider = () => {
    setShowCareProviderPopup(false);
    setShowPrescriptionPopup(true);
  };

  const handlePrescriptionComplete = () => {
    setShowPrescriptionPopup(false);
    setShowModifyReport(true);
  };

  const handlePrescriptionSkip = () => {
    setShowPrescriptionPopup(false);
    setShowModifyReport(true);
  };

  const handleModifyReportComplete = () => {
    setShowModifyReport(false);
    if (onEndSuccess) {
      onEndSuccess();
    }
    setTimeout(() => {
      onClose();
    }, 300);
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

      {/* Care Provider Request Modal */}
      {showCareProviderPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#05244380] backdrop-blur-sm z-[60]">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md text-center animate-fadeIn border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Request Care Provider
            </h2>
            <p className="text-gray-700 mb-6">Choose physiotherapist or nurse</p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            <div className="flex flex-col gap-3 mb-4">
              <button
                onClick={() => {
                  setType("physiotherapist");
                  setError(null);
                }}
                className={`px-5 py-2 rounded-lg transition ${
                  type === "physiotherapist"
                    ? "bg-[var(--dark-blue)] text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Request Physiotherapist
              </button>
              <button
                onClick={() => {
                  setType("nurse");
                  setError(null);
                }}
                className={`px-5 py-2 rounded-lg transition ${
                  type === "nurse"
                    ? "bg-[var(--dark-blue)] text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Request Nurse
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                Reason for Service
              </label>
              <input 
                type="text"
                value={serviceReason}
                onChange={(e) => {
                  setServiceReason(e.target.value);
                  setError(null);
                }}
                placeholder="Enter the reason for the care service"
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-[var(--dark-blue)] focus:border-[var(--dark-blue)] outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                Scheduled Time
              </label>
              <input 
                type="time"
                value={scheduledTime}
                onChange={(e) => {
                  setScheduledTime(e.target.value);
                  setError(null);
                }}
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-[var(--dark-blue)] focus:border-[var(--dark-blue)] outline-none"
              />
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleCareProviderRequest}
                disabled={!type || !serviceReason.trim() || !scheduledTime ||isSendingRequest }
                className="text-[20px] w-full flex items-center justify-center gap-2 bg-[var(--dark-blue)] px-6 py-2 rounded-md text-white hover:bg-[#052443db] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSendingRequest ? <>SendingRequest...</> : <>Send Request</>}
              </button>
              <button
                onClick={handleSkipCareProvider}
                className="bg-[#e71313] text-white text-[20px] w-full px-6 py-2 rounded-md hover:bg-[#e71313ad] transition"
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Prescription Popup */}
      {showPrescriptionPopup && (
        <CreatePrescription
          isOpen={showPrescriptionPopup}
          onClose={handlePrescriptionSkip}
          onSave={handlePrescriptionComplete}
          consultationId={consultationId}
          patientId={patientId}
        />
      )}

      {/* Modify Medical Report */}
      {showModifyReport && (
        <ModifyMedicalReport
          isOpen={showModifyReport}
          onClose={handleModifyReportComplete}
          onSave={handleModifyReportComplete}
          medicalReport={currentMedicalReport}
          patientId={patientId}
          consultationId={consultationId}
        />
      )}
    </div>
  );
}

