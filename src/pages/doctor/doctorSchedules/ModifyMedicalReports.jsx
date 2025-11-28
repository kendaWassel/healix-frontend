import MedicalReportModal from "../../registers/patientRegister/MedicalReportModal";
import { useEffect, useState } from "react";

export default function ModifyMedicalReport({
  onSave,
  medicalReport
})

{

  const [editOpen, setEditOpen] = useState(true);  
  const [fields, setFields] = useState({
    diagnosis: "",
    chronic_diseases: "",
    previous_surgeries: "",
    allergies: "",
    current_medications: "",
    treatment_plan:""
  });

 
  useEffect(() => {
    if (medicalReport) {
      setFields(medicalReport);
    }
  }, [medicalReport]);
  useEffect(() => {
    setEditOpen(true);  
  }, []);
  
  const handleLocalSubmit = () => {
    onSave(fields);       
    setEditOpen(false);   
  };

  return (
    <>
      <MedicalReportModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={handleLocalSubmit}
        fields={fields}
        setFields={setFields}
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
