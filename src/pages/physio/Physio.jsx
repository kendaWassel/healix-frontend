import { Routes,Route } from "react-router-dom";
import PhysioHomePage from "./physioHomePage/PhysioHomePage";
import PhysioNewOrders from "./physioNewOrders/PhysioNewOrders";
import PhysioSchedules from "./physioSchedules/PhysioSchedules";
const Physio =()=>{
    return (
        <>
        <Routes>
        <Route index element={<PhysioHomePage />} />
        <Route path='new-orders'  element={<PhysioNewOrders/>}/> 
        <Route path='my-schedules'  element={<PhysioSchedules/>}/> 
        </Routes>
        
        </>

    )
}
export default Physio