import { useEffect, useState } from "react";
import CareProviderModifyMedicalReport from "./CareProviderModifyMedicalReport";
import CareProviderScheduleNextSession from "./CareProviderScheduleNextSession";
import DoneModal from "../../pages/Patient/DoctorConsultation/Booking/DoneModal";

export default function CareProviderEndSession({
  isOpen,
  onClose,
  patientId,
  sessionId,
  providerType = "physiotherapist",
}) {
  const [showModifyReport, setShowModifyReport] = useState(false);
  const [showScheduleNextSession, setShowScheduleNextSession] = useState(false);
  const [showSessionDone, setShowSessionDone] = useState(false);
  const [currentMedicalReport, setCurrentMedicalReport] = useState(null);

  // Reset flow every time popup opens
  useEffect(() => {
    if (isOpen) {
      setShowModifyReport(true);
      setShowScheduleNextSession(false);
      setShowSessionDone(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* STEP 1: MODIFY MEDICAL REPORT */}
      {showModifyReport && (
        <CareProviderModifyMedicalReport
          isOpen={showModifyReport}
          medicalReport={currentMedicalReport}
          patientId={patientId}
          sessionId={sessionId}
          providerType={providerType}
          onSave={() => {
            setShowModifyReport(false);
            setShowScheduleNextSession(true);
          }}
          onClose={() => {
            setShowModifyReport(false);
            setShowScheduleNextSession(true);
          }}
        />
      )}

      {/* STEP 2: SCHEDULE NEXT SESSION */}
      {showScheduleNextSession && (
        <CareProviderScheduleNextSession
          isOpen={showScheduleNextSession}
          sessionId={sessionId}
          onConfirm={() => {
            setShowScheduleNextSession(false);
            setShowSessionDone(true);
          }}
          onClose={() => {
            setShowScheduleNextSession(false);
            setShowSessionDone(true);
          }}
        />
      )}

      {/* STEP 3: DONE */}
      <DoneModal
        isOpen={showSessionDone}
        message="Session completed successfully!"
        onHome={() => {
          setShowSessionDone(false);
          onClose();
        }}
      />
    </>
  );
}
