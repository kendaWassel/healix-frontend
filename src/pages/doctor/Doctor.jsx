import { Routes,Route } from "react-router-dom";
import DoctorSchedules from "./doctorSchedules/DoctorSchedules";
import DoctorHomePage from "./DoctorHomePage/DoctorHomePage";
const Doctor =()=>{
    return (
        <>
        <Routes>
        <Route index element={<DoctorHomePage />} />
            <Route path='DoctorSchedules'  element={<DoctorSchedules/>}/>
        </Routes>
        
        </>

    )
}
export default Doctor