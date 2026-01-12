import { Routes, Route } from "react-router-dom";
import CompletedServices from "./CompletedServices/CompletedServices";
import AdminSidebar from "./AdminSidebar";


export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      <AdminSidebar />

      <div className="flex-1 p-6">
        <Routes>
          <Route path="completed-services"  element={<CompletedServices />}
          />
 
        </Routes>
      </div>
    </div>
  );
}

