import { Routes,Route } from "react-router-dom";
import DeliveryHomePage from "./deliveryHomePage/DeliveryHomePage";
const Delivery =()=>{
    return (
        <>
        <Routes>
        <Route index element={<DeliveryHomePage />} />
        </Routes>
        
        </>

    )
}
export default Delivery