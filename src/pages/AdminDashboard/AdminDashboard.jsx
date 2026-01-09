import { Routes, Route, Navigate } from "react-router-dom";
import CompletedServices from "./CompletedService/CompletedServices";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      <div className="flex-1 p-6">
        <Routes>
          <Route
            path="completed-services"
            element={<CompletedServices />}
          />
 
        </Routes>
      </div>
    </div>
  );
}

