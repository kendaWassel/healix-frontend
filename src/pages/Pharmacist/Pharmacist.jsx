import PharmacistHomePage from "./PharmacistHomePage/pharmacisthomepage";
import PrescreptionOrders from "./PrescriptionOrders/PrescriptionOrders";
import MyOrders from "./MyOrders/MyOrders"
import { Routes,Route } from "react-router-dom";

const  Pharmacist=()=>{
    return (
        <>
        <Routes>
<Route index element={<PharmacistHomePage/>}/>
<Route path="PrescreptionOrders" element={<PrescreptionOrders/>}/>
<Route path="MyOrders" element={<MyOrders />} />
        </Routes>
        </>
    )
}
export default Pharmacist;