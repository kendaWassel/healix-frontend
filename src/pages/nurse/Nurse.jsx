import { Routes,Route } from "react-router-dom";
import NurseHomePage from "./nurseHomePage/NurseHomePage";
import NewOrders from "./newOrders/NewOrders";
const Nurse =()=>{
    return (
        <>
        <Routes>
        <Route index element={<NurseHomePage />} />
            <Route path='/new-orders'  element={<NewOrders/>}/>
        </Routes>
        
        </>

    )
}
export default Nurse