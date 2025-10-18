import LandingPage from "./pages/landingPage/LandingPage";
import { Routes } from "react-router";
import DoctorRegister from "./pages/registers/doctorRegister/DoctorRegister";
import "./App.css";
import PatientRegister from "./pages/registers/patientRegister/PatientRegister";

export default function App() {
  return (
    <>
      <PatientRegister />
    </>
  );
}


