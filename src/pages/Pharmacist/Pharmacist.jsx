import PharmacistHomePage from "./PharmacistHomePage/pharmacisthomepage";
import PrescreptionOrders from "./PrescriptionOrders/PrescriptionOrders";
import { Routes,Route } from "react-router-dom";

const  Pharmacist=()=>{
    return (
        <>
        <Routes>
<Route index element={<PharmacistHomePage/>}/>
<Route path="PrescreptionOrders" element={<PrescreptionOrders/>}/>
        </Routes>
        </>
    )
}
export default Pharmacist;