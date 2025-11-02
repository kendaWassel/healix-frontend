import { Routes,Route } from "react-router-dom";
import NurseHomePage from "./nurseHomePage/NurseHomePage";
const Nurse =()=>{
    return (
        <>
        <Routes>
        <Route index element={<NurseHomePage />} />
            <Route path='/new-orders'  element={<NurseNewOrders/>}/>
        </Routes>
        
        </>

    )
}
export default Nurse