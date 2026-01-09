
import LandingPage from "./pages/landingPage/LandingPage";
import { BrowserRouter } from "react-router-dom";
import { Routes,Route } from "react-router-dom";
import UserLogin from "./pages/login/UserLogin/UserLogin";
import AdminLogin from './pages/login/adminLogin/AdminLogin'
import Patient from "./pages/Patient/Patient";
import Doctor from "./pages/doctor/Doctor";
import Nurse from "./pages/nurse/Nurse";
import Physio from "./pages/physio/Physio";
import Pharmacist from "./pages/Pharmacist/pharmacist";
import Delivery from "./pages/delivery/Delivery";
import Registers from "./pages/registers/Registers";
import "./App.css";
export default function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<UserLogin/>}/>
    <Route path="/register/*" element={<Registers/>}/> 
    <Route path="/admin" element={<AdminLogin/>}/> 
    <Route path="/patient/*" element={<Patient />}/>
    <Route path="/doctor/*" element={<Doctor/>}/>
    <Route path="/nurse/*" element={<Nurse/>}/>
    <Route path="/physio/*" element={<Physio/>}/>
    <Route path="/pharmacist/*" element={<Pharmacist/>}/>
    <Route path="/delivery/*" element={<Delivery/>}/>
    <Route path="/admin-dashboard/*" element={<AdminDashboard/>}/>

    </Routes>
    </BrowserRouter>
  
    </>
  ); 
}

