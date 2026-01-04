import MedicalReportModal from "../../pages/registers/patientRegister/MedicalReportModal";
import { useEffect, useState } from "react";

export default function CareProviderModifyMedicalReport({
  isOpen,
  onClose,
  onSave,
  medicalReport,
  patientId,
  sessionId,
  providerType = "physiotherapist"
}) {
  const [editOpen, setEditOpen] = useState(false);
  const [error, setError] = useState(null);
  const [fields, setFields] = useState({
    diagnosis: "",
    chronic_diseases: "",
    previous_surgeries: "",
    allergies: "",
    current_medications: "",
    treatment_plan: ""
  });

  useEffect(() => {
    if (isOpen) {
      setEditOpen(true);
      setError(null); // Reset error when modal opens
      if (medicalReport) {
        setFields({
          diagnosis: medicalReport.diagnosis || "",
          chronic_diseases: medicalReport.chronic_diseases || "",
          previous_surgeries: medicalReport.previous_surgeries || "",
          allergies: medicalReport.allergies || "",
          current_medications: medicalReport.current_medications || "",
          treatment_plan: medicalReport.treatment_plan || ""
        });
      }
    }
  }, [isOpen, medicalReport]);
  
  const handleLocalSubmit = async (formFields) => {
    const token = localStorage.getItem("token");
    setError(null); // Clear previous error
    
    try {
      const dataToSubmit = {
        ...formFields,
        treatment_plan: fields.treatment_plan,
        session_id: sessionId,
      };
      
      const response = await fetch(
        `https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/patients/${patientId}/medical-record/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(dataToSubmit),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Medical report updated:", data);
        setError(null);
        setEditOpen(false);
        if (onSave) onSave(dataToSubmit);
      } else {
        const errorData = await response.json();
        setError("Failed to save try again");
      }
    } catch (err) {
      console.error("Error updating medical report:", err);
      setError("Failed to save try again");
    }
  };

  if (!isOpen || !editOpen) return null;

  return (
    <>
      <MedicalReportModal
        open={editOpen}
        onClose={() => {
          setEditOpen(false);
          setError(null);
          if (onClose) onClose();
        }}
        onSubmit={handleLocalSubmit}
        initialValues={fields}
        isEdit={true}
        errorMessage={error}
      >
        <label className="block font-medium mb-1 text-gray-800">Treatment Plan</label>
        <input
          name="treatment_plan"
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2 outline-blue-400 focus:border-blue-500 placeholder:text-gray-400"
          placeholder="Treatment Plan ..."
          value={fields.treatment_plan}
          onChange={e => setFields({ ...fields, treatment_plan: e.target.value })}
        />
      </MedicalReportModal>
    </>
  );
}

