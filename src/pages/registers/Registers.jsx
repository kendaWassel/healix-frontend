import { Routes,Route } from "react-router-dom";
import CareProviderRegister from "./careProviderRegister/CareProviderRegister";
import DeliveryRegister from "./dileveryRegister/DileveryRegister";
import DoctorRegister from "./doctorRegister/DoctorRegister";
import NewAccountSetup from "./newaccountsetup/NewAccountSetup";
import PatientRegister from "./patientRegister/PatientRegister";
import FormPage from "./pharmacistsRegister/FormPage";

const Registers = () => {

  return (
    <>
      <Routes>
        <Route index element={<NewAccountSetup />} />
        <Route path="patient-register" element={<PatientRegister />} /> 
        <Route path="doctor-register" element={<DoctorRegister />} /> 
        <Route path="pharmacist-register" element={<FormPage />} /> 
        <Route path="care-provider-register" element={<CareProviderRegister />}/>
        <Route path="delivery-register" element={<DeliveryRegister />}/>
      </Routes>
    </>
  )
}

export default Registers
