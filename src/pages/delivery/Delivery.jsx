import { Routes,Route } from "react-router-dom";
import DeliveryHomePage from "./deliveryHomePage/DeliveryHomePage";
import MyTasks from "../delivery/MyTasks/MyTasks";
import NewOrders from "./newOrders/neworder";

const Delivery =()=>{
    return (
        <>
        <Routes>
         <Route index element={<DeliveryHomePage />} />
         <Route path="my-tasks" element={<MyTasks />} />
         <Route path="new-orders" element={<NewOrders/>}/>
        </Routes>
        
        </>

    )
}
export default Delivery;