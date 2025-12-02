
import LandingPage from "./pages/landingPage/LandingPage";
import { BrowserRouter } from "react-router-dom";
import { Routes,Route } from "react-router-dom";
import DoctorRegister from "./pages/registers/doctorRegister/DoctorRegister";
import PatientRegister from "./pages/registers/patientRegister/PatientRegister";
import DeliveryRegister from "./pages/registers/dileveryRegister/DileveryRegister";
import UserLogin from "./pages/login/UserLogin/UserLogin";
import NewAccountSetup from "./pages/registers/newaccountsetup/NewAccountSetup";
import FormPage from "./pages/registers/pharmacistsRegister/FormPage";
import CareProviderRegister from "./pages/registers/careProviderRegister/CareProviderRegister";
import AdminLogin from './pages/login/adminLogin/AdminLogin'
import Patient from "./pages/patient/Patient";
import Doctor from "./pages/doctor/Doctor";
import "./App.css";
import Nurse from "./pages/nurse/Nurse";
import Physio from "./pages/physio/Physio";
import Pharmacist from "./pages/Pharmacist/pharmacist";
export default function App() {
  return (
    <>


    <BrowserRouter>
    <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<UserLogin/>}/>
    <Route path="/register" element={<NewAccountSetup/>}/>
      <Route path="/patient-register" element={<PatientRegister/>}/>
      <Route path="/doctor-register" element={<DoctorRegister/>}/> {/*done*/} 
      <Route path="/pharmacist-register" element={<FormPage/>}/>
      <Route path="/care-provider-register" element={<CareProviderRegister/>}/> {/*done*/}
      <Route path="/delivery-register" element={<DeliveryRegister/>}/> {/*done*/}
      <Route path="/admin" element={<AdminLogin/>}/> {/*done*/}
    <Route path="/patient/*" element={<Patient />}/>
    <Route path="/doctor/*" element={<Doctor/>}/>
    <Route path="/nurse/*" element={<Nurse/>}/>
    <Route path="/physio/*" element={<Physio/>}/>
    <Route path="/pharmacist/*" element={<Pharmacist/>}/>
    </Routes>
    </BrowserRouter>
  
    </>
  ); 
}

