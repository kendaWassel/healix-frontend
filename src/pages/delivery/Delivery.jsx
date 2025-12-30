import { Routes,Route } from "react-router-dom";
import DeliveryHomePage from "./deliveryHomePage/DeliveryHomePage";
import MyOrders from "../Pharmacist/MyOrders/MyOrders";
import MyTasks from "../delivery/MyTasks/MyTasks";

const Delivery =()=>{
    return (
        <>
        <Routes>
         <Route index element={<DeliveryHomePage />} />
         <Route path="my-tasks" element={<MyTasks />} />
        </Routes>
        
        </>

    )
}
export default Delivery;