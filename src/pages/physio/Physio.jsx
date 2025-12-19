import { Routes,Route } from "react-router-dom";
import PhysioHomePage from "./physioHomePage/PhysioHomePage";
import PhysioNewOrders from "./physioNewOrders/PhysioNewOrders";
const Physio =()=>{
    return (
        <>
        <Routes>
        <Route index element={<PhysioHomePage />} />
        <Route path='new-orders'  element={<PhysioNewOrders/>}/> 
        </Routes>
        
        </>

    )
}
export default Physio