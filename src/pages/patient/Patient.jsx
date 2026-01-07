import { Routes,Route } from "react-router-dom";
import { useState} from "react";
import DoctorConsultation from "./DoctorConsultation/DoctorConsultation";
import PickDoctor from "./DoctorConsultation/pickDoctor/PickDoctor";
import PatientHomePage from "./patientHomePage/PatientHomePage";
import MySchedules from "./MySchedules/MySchedules";
import Receipts from "./Receipts/Receipts";

const Patient = () => {
  const [userInfo, setUserInfo] = useState(null);

  return (
    <>
      <Routes>
        <Route index element={<PatientHomePage />} />
        <Route path="consultation" element={<DoctorConsultation />} /> 
        <Route path="consultation/doctor-specialization/:id" element={<PickDoctor />} /> 
        <Route path="my-schedules" element={<MySchedules />} /> 
        <Route path="receipts" element={<Receipts />}/>
      </Routes>
    </>
  )
}

export default Patient
