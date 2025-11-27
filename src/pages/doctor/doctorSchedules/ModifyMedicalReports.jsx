import MedicalReportModal from "../../registers/patientRegister/MedicalReportModal";
import { useEffect, useState } from "react";

export default function ModifyMedicalReport({
  editOpen,
  setEditOpen,
  onSave,
  medicalReport
}) {
  const [fields, setFields] = useState({
    diagnosis: "",
    chronic_diseases: "",
    previous_surgeries: "",
    allergies: "",
    current_medications: ""
  });

 
  useEffect(() => {
    if (medicalReport) {
      setFields(medicalReport);
    }
  }, [medicalReport]);

  const handleLocalSubmit = () => {
    onSave(fields);       
    setEditOpen(false);   
  };

  return (
    <MedicalReportModal
      open={editOpen}
      onClose={() => setEditOpen(false)}
      onSave={handleLocalSubmit}
      fields={fields}
      setFields={setFields}
      isEdit={true}
    />
  );
}
