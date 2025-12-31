import DeliveryHeader from "../../../components/headers/DeliveryHeader";
import Footer from "../../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faCheck, faClock } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function MyTasks() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 3,
    totalPages: 1,
  });

  const fetchMyTasks = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // mock data 
      const data = {
        status: "success",
        data: [
          {
            task_id: 1,
            pharmacy_name: "Ahmad Pharmacy",
            pharmacy_address: "Damascus  Baramkeh",
            patient_name: "Ali Ahmad",
            patient_phone: "+963999888777",
            patient_address: "Damascus  Kafarsoseh",
            status: "pending",
          },
          {
            task_id: 2,
            pharmacy_name: "Al-Shifa Pharmacy",
            pharmacy_address: "Damascus  Mazzeh",
            patient_name: "Sara Khaled",
            patient_phone: "+963944556677",
            patient_address: "Damascus  Malki",
            status: "delivered",
          },
        ],
        meta: {
          last_page: 1,
        },
      };

      const formatted = data.data.map((task) => ({
        id: task.task_id,
        pharmacyName: task.pharmacy_name,
        pharmacyAddress: task.pharmacy_address,
        patientName: task.patient_name,
        patientPhone: task.patient_phone,
        deliveryAddress: task.patient_address,
        status: task.status,
      }));

      setTasks(formatted);
      setPagination((prev) => ({
        ...prev,
        totalPages: data.meta.last_page,
      }));
      
    } catch (err) {
      console.error(err);
      setError("Failed to load tasks");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyTasks();
  }, [pagination.currentPage]);

  const setAsDelivered = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: "delivered" } : task
      )
    );
  };

  const nextPage = () => {
    if (pagination.currentPage < pagination.totalPages) {
      setPagination((p) => ({ ...p, currentPage: p.currentPage + 1 }));
    }
  };

  const prevPage = () => {
    if (pagination.currentPage > 1) {
      setPagination((p) => ({ ...p, currentPage: p.currentPage - 1 }));
    }
  };

  return (
    <>
      <DeliveryHeader />

      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">My Tasks</h1>
          <p className="text-lg font-semibold text-gray-600">Orders you accepted and need to deliver</p>
        </div>

        {isLoading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all"
            >
              
              <h3 className="text-3xl font-bold text-gray-900 mb-1">
                Pharmacy: {task.pharmacyName}
              </h3>

             <p className="text-sm font-medium">
               <span className="text-cyan-500">Address:</span>{" "}
               <span className="text-gray-500">{task.pharmacyAddress}</span>
             </p>
              
              <div className="w-30 h-[1px] bg-gray-300 my-4" />

             
              <p className="text-2xl font-semibold text-gray-900">
                Patient: {task.patientName}
              </p>
              
              <p className="text-sm font-medium">
                <span className="text-cyan-500">Phone:</span>{" "}
                <span className="text-gray-600">{task.patientPhone}</span>
             </p>
             
              <p className="text-sm font-medium">
                <span className="text-cyan-500">Delivery Address:</span>{" "}
                <span className="text-gray-600">{task.deliveryAddress}</span>
             </p>
  
              <div className="flex justify-between  items-center mt-4">
 
               {task.status !== "pending" && (
                <span className="text-sm font-semibold text-cyan-800">
                 {task.status === "delivered" ? "Delivered" : task.status}
                 </span> 
                )}
              </div>

             <div className="flex justify-between items-center mt-4">
             {task.status === "pending" && (
                <div className="flex items-center gap-2 text-cyan-800 font-semibold text-sm">
                 <FontAwesomeIcon icon={faClock} />
                 <span>Pending</span>
               </div>
             )}
              </div>

              {task.status !== "delivered" && task.status !== "Pending" && (
                
                  <button
                    className="bg-[#052443] text-white px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-3 hover:bg-[#031f36]"
                    onClick={() => setAsDelivered(task.id)}
                  >
                    <FontAwesomeIcon icon={faCheck} /> Set as Delivered
                  </button>
                
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={prevPage}
            disabled={pagination.currentPage === 1}
          >
            <FontAwesomeIcon icon={faChevronLeft} /> Prev
          </button>

          <span className="text-sm">
            {pagination.currentPage} of {pagination.totalPages}
          </span>

          <button
            className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={nextPage}
            disabled={pagination.currentPage === pagination.totalPages}
          >
            Next <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}
