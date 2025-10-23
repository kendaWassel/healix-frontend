import LandingPage from "./pages/landingPage/LandingPage";
import { BrowserRouter } from "react-router-dom";
import { Routes,Route } from "react-router-dom";
import DoctorRegister from "./pages/registers/doctorRegister/DoctorRegister";
import "./App.css";
import PatientRegister from "./pages/registers/patientRegister/PatientRegister";
import DeliveryRegister from "./pages/registers/dileveryRegister/DileveryRegister";
import Login from "./pages/login/Login";
import NewAccountSetup from "./pages/registers/newaccountsetup/NewAccountSetup";
import FormPage from "./pages/registers/pharmacistsRegister/FormPage";
import CareProviderRegister from "./pages/registers/careProviderRegister/CareProviderRegister";
// import Login from "./login";
export default function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<NewAccountSetup />} />
      <Route path="/patient-register" element={<PatientRegister/>}/>
      <Route path="/doctor-register" element={<DoctorRegister/>}/>
      <Route path="/pharmacist-register" element={<FormPage/>}/>
      <Route path="/nurse-register" element={<CareProviderRegister/>}/>
      <Route path="/physiotherapist-register" element={<CareProviderRegister/>}/>
      <Route path="/delivery-register" element={<DeliveryRegister/>}/>
    </Routes>
    </BrowserRouter>

  
    </>
  );
}

