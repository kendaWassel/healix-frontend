import PharmacistHomePage from "./PharmacistHomePage/pharmacisthomepage";
import NewOrders from "./NewOrders/NewOrders";
import MyOrders from "./MyOrders/MyOrders"
import { Routes,Route } from "react-router-dom";

const  Pharmacist=()=>{
    return (
        <>
        <Routes>
<Route index element={<PharmacistHomePage/>}/>
<Route path="MyOrders" element={<MyOrders />} />
<Route path="NewOrders" element={<NewOrders/>}/>
        </Routes>
        </>
    )
}
export default Pharmacist;