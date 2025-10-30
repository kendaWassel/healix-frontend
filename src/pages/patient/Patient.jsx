import { BrowserRouter } from "react-router-dom";
import { Routes,Route } from "react-router-dom";
import DoctorConsultation from "./DoctorConsultation/DoctorConsultation";
import PatientHomePage from "./patientHomePage/PatientHomePage";
const Patient = () => {
  return (
    <>
    <Routes>
          <Route index element={<PatientHomePage />} />
          <Route path="consultation" element={<DoctorConsultation />} /> 
          {/* <Route path="my-schedules" element={<MySchedules />} />  */}
      </Routes>
    </>
  )
}

export default Patient
