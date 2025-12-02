import { Routes, Route } from "react-router-dom";
import DoctorSchedules from "./doctorSchedules/DoctorSchedules";
import DoctorHomePage from "./DoctorHomePage/DoctorHomePage";
import ModifyMedicalReport from "./doctorSchedules/ModifyMedicalReports";
const Doctor = () => {
  return (
    <>
      <Routes>
        <Route index element={<DoctorHomePage />} />
        <Route path="ModifyMedicalReport" element={<ModifyMedicalReport />} />
        <Route path="doctor-schedules" element={<DoctorSchedules />} />
      </Routes>
    </>
  );
};
export default Doctor;
