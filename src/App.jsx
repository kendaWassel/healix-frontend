import LandingPage from "./pages/landingPage/LandingPage";
import { Routes } from "react-router";
import DoctorRegister from "./pages/registers/doctorRegister/DoctorRegister";
import "./App.css";
import PatientRegister from "./pages/registers/patientRegister/PatientRegister";
import DeliveryRegister from "./pages/registers/dileveryRegister/DileveryRegister";
import UserLogin from "./pages/login/UserLogin/UserLogin";
import NewAccountSetup from "./pages/registers/newaccountsetup/NewAccountSetup";

// import Login from "./login";
export default function App() {
  return (
    <>
    <UserLogin/>
    </>
  );
}

