import PharmacistHomePage from "./PharmacistHomePage/pharmacisthomepage";
import NewOrders from "./NewOrders/NewOrders";
import MyOrders from "./MyOrders/MyOrders"
import { Routes,Route } from "react-router-dom";

const  Pharmacist=()=>{
    return (
        <>
        <Routes>
<Route index element={<PharmacistHomePage/>}/>
<Route path="NewOrders" element={<NewOrders/>}/>
<Route path="MyOrders" element={<MyOrders />} />
        </Routes>
        </>
    )
}
export default Pharmacist;