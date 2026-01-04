import { Routes,Route } from "react-router-dom";
import DeliveryHomePage from "./deliveryHomePage/DeliveryHomePage";
import MyOrders from "./myOrders/MyOrders";
import NewOrders from "./newOrders/neworder";

const Delivery =()=>{
    return (
        <>
        <Routes>
         <Route index element={<DeliveryHomePage />} />
         <Route path="new-orders" element={<NewOrders />} />
         <Route path="my-orders" element={<MyOrders />} />
        </Routes>
        
        </>

    )
}
export default Delivery;