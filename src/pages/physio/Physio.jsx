import { Routes,Route } from "react-router-dom";
import PhysioHomePage from "./physioHomePage/PhysioHomePage";
const Physio =()=>{
    return (
        <>
        <Routes>
        <Route index element={<PhysioHomePage />} />
            {/* <Route path='physio/new-orders'  element={<PhysioNewOrders/>}/> */}
        </Routes>
        
        </>

    )
}
export default Physio