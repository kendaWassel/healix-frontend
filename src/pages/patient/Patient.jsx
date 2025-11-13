import { BrowserRouter } from "react-router-dom";
import { Routes,Route } from "react-router-dom";
import DoctorConsultation from "./DoctorConsultation/DoctorConsultation";
import PickDoctor from "./DoctorConsultation/pickDoctor/PickDoctor";
import PatientHomePage from "./patientHomePage/PatientHomePage";
import MySchedules from "./MySchedules/MySchedules";
import Receipts from "./Receipts/Receipts";
const Patient = () => {
  return (
    <>
    <Routes>
          <Route index element={<PatientHomePage />} />
          <Route path="consultation" element={<DoctorConsultation />} /> 
          <Route path="consultation/doctor-specialization/:id" element={<PickDoctor />} /> 
          <Route path="my-schedules" element={<MySchedules />} /> 
          <Route path="Receipts" element={<Receipts />}/>
      </Routes>
    </>
  )
}

export default Patient
