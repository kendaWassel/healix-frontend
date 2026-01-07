import { Routes,Route } from "react-router-dom";
import NurseHomePage from "./nurseHomePage/NurseHomePage";
import NewOrders from "./newOrders/NewOrders";
import Appointments from "./Appointments/Appointments";
const Nurse =()=>{
    return (
        <>
        <Routes>
        <Route index element={<NurseHomePage />} />
            <Route path='new-orders'  element={<NewOrders/>}/>
            <Route path="my-schedules" element={<Appointments />} /> 
        </Routes>
        
        </>

    )
}
export default Nurse