import { BrowserRouter } from "react-router-dom";
import { Routes,Route } from "react-router-dom";
import DoctorConsultation from "./DoctorConsultation/DoctorConsultation";
import PickDoctor from "./DoctorConsultation/pickDoctor/PickDoctor";
import PatientHomePage from "./patientHomePage/PatientHomePage";
import MySchedules from "./MySchedules/MySchedules";
const Patient = () => {
  return (
    <>
    <Routes>
          <Route index element={<PatientHomePage />} />
          <Route path="consultation" element={<DoctorConsultation />} /> 
          <Route path="doctor-specialization" element={<PickDoctor />} /> 
          <Route path="my-schedules" element={<MySchedules />} /> 
      </Routes>
    </>
  )
}

export default Patient
