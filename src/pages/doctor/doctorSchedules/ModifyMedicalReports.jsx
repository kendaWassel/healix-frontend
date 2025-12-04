import MedicalReportModal from "../../registers/patientRegister/MedicalReportModal";
import { useEffect, useState } from "react";

export default function ModifyMedicalReport({
  isOpen,
  onClose,
  onSave,
  medicalReport,
  patientId,
  consultationId
}) {
  const [editOpen, setEditOpen] = useState(false);  
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
    try {
      // Merge treatment_plan from fields state since MedicalReportModal doesn't include it
      const dataToSubmit = {
        ...formFields,
        treatment_plan: fields.treatment_plan,
        consultation_id: consultationId,
      };
      
      // Replace with actual API endpoint
      const response = await fetch(
        `https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/doctor/patients/${patientId}/medical-record`,
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
        setEditOpen(false);
        if (onSave) onSave(dataToSubmit);
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to update medical report");
      }
    } catch (err) {
      console.error("Error updating medical report:", err);
      alert("Failed to update medical report. Please try again.");
    }
  };

  if (!isOpen || !editOpen) return null;

  return (
    <>
      <MedicalReportModal
        open={editOpen}
        onClose={() => {
          setEditOpen(false);
          if (onClose) onClose();
        }}
        onSubmit={handleLocalSubmit}
        initialValues={fields}
        isEdit={true}
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
