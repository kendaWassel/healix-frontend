import DeliveryHeader from "../../../components/headers/DeliveryHeader";
import Footer from "../../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faCheck, faClock } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
/*
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
*/
export default function MyOrders() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1)
  const [total,setTotal]=useState(0);
  const [statusFilter,setStatusFilter]= useState("all");
  const [orderId,setOrderId]= useState(null);
  
       const token=localStorage.getItem("token")
     
       const fetchMyTasks = async (pageNumber=1) => {
         setIsLoading(true);
         setError(null);
     
         try {
           let url = `https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/delivery/tasks?page=${pageNumber}&per_page=3`;
           if(statusFilter!=="all"){
            url+=`&status=${statusFilter}`;
           }
         const response = await fetch(url,
           {
             headers : {
               Accept : "application/json",
               Authorization: `Bearer ${token}` ,
               "ngrok-skip-browser-warning": "true",
             }
           }
           
           )

          if(!response.ok)  throw new Error("Request failed")

         const data = await response.json()
         console.log("Orders :",data)

         setTasks(data.data || [])
         setPage(data.meta.current_page)
         setTotal(data.meta.last_page)
        } catch (err){
          setError("failed to Load Orders")
        }
        finally{
          setIsLoading(false)
        }
      }
    useEffect(()=>{
      fetchMyTasks(1)
    },[statusFilter])



        const setAsDelivered = async (task_id,CurrentStatus) => {
          setOrderId(task_id);
        setLoadingStatus(true);
      try {
        const response = await fetch(`https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/delivery/tasks/${task_id}/update-status`,
        {
          method:"PUT",
          headers: {
            "Content-type" : "application/json",
            "Authorization": `Bearer ${token}` ,
            "ngrok-skip-browser-warning": "true",
          },
      body: JSON.stringify({ status: getNextStatus(CurrentStatus) })
        }
      )
      if(!response.ok) throw new Error("Request Failed")
     const data = await response.json()
     console.log("Updated Status :",data)
      alert("Status Updated Successfully")
      fetchMyTasks(page)

      } catch(err){
       setError("failed to Update status")
      }finally{
        setLoadingStatus(false);
        setOrderId(null);
      }
        }
      
        const getNextStatus = (status) => {
          if (status === "pending") return "picking_up_the_order";
          if (status === "picking_up_the_order") return "on_the_way";
          if (status === "on_the_way") return "delivered";
          return status;
        };

        const formatStatus = (status) => {
          switch(status) {
            case "pending": return "Pending";
            case "picking_up_the_order": return "Picking Up";
            case "on_the_way": return "On The Way";
            case "delivered": return "Delivered";
            default: return status;
          }
        };
        
      
        const handleNext = () => {
          if (page < total) fetchMyTasks(page + 1);
        };
      
        const handlePrevious = () => {
          if (page > 1) fetchMyTasks(page - 1);
        };

   
    return (
      <>
      <DeliveryHeader />
      <div className="p-8 min-h-[60vh]">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-6 text-[#024]">My Orders</h1> 
       <div className="flex gap-4 mb-6">

        <button 
        onClick={()=> setStatusFilter("all")}
        className={`px-4 py-2 rounded-lg font-semibold border hover:border-cyan-300 transition duration-300 disabled:cursor-not-allowed disabled:opacity-50
        ${statusFilter === "all"
          ? "bg-[var(--dark-blue)] text-white "
          : "bg-white text-gray-700 border-gray-300"}`}
        disabled={isLoading || error}
        >
          All Orders
          </button>
          <button
           onClick={()=>setStatusFilter("delivered")}
          className={`px-4 py-2 rounded-lg font-semibold border hover:border-cyan-300 transition duration-300 disabled:cursor-not-allowed disabled:opacity-50
          ${statusFilter==="delivered"
         ? "bg-[var(--dark-blue)] text-white"
         : "bg-white text-gray-700 border-gray-300"
        }`}
        disabled={isLoading || error}
          >
            Delivered
          </button>
       </div>

          <p className="text-lg font-semibold text-gray-600">Orders you accepted and need to deliver</p>

        </div>
{isLoading ?
  <p className="text-center text-gray-500">Loading...</p>
  :
  error?
  <p className="text-center text-red-500">{error}</p>
  :
  tasks.length > 0 ?
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div
              key={task.task_id}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md hover:border-cyan-300 transition-all max-w-2xl"
            >
              
              <h3 className="text-[25px] text-[var(--dark-blue)] font-bold mb-1">
                <span> Pharmacy: </span>
             <span> {task.pharmacy_name } </span>
              </h3>
              <p className="text-lg font-bold">
              <span className=" text-[var(--cyan)] ">Pharmacist Phone :</span>
              <span className="text-[var(--text-color)]">{task.pharmacy_phone}</span>
              
              </p>

             <p className="text-lg font-bold">
               <span className="text-[var(--cyan)]">Address:</span>{" "}
               <span className="text-[var(--text-color)]">{task.pharmacy_address}</span>
             </p>
              
              <div className="w-30 h-[1px] bg-gray-300 my-4" />

             
              <p className="text-[25px] text-[var(--dark-blue)] font-bold mb-1">
              <span>Patient:  </span>
              <span>{task.patient_name}</span>
              </p>
              
              <p className="text-lg font-bold">
                <span className="text-[var(--cyan)]">Phone:</span>{" "}
                <span className="text-[var(--text-color)]">{task.patient_phone}</span>
             </p>
             
              <p className="text-lg font-bold">
                <span className="text-[var(--cyan)]">Patient Address:</span>{" "}
                <span className="text-[var(--text-color)]">{task.patient_address}</span>
             </p>
  
                       <div className="mt-4 p-1">
            {/* Status */}
         
              <span className="text-md font-semibold text-cyan-800 mb-2">
                Status: {formatStatus(task.status)}
              </span>
            


      
            
          </div>
          
          {task.status === "pending" && (
          <button 
          className="bg-[#052443] text-white px-4 py-2 rounded-lg font-semibold text-md flex items-center gap-3 hover:bg-[#031f36] disabled:cursor-not-allowed disabled:opacity-50"  
          onClick={() => setAsDelivered(task.task_id, task.status)}
          disabled={loadingStatus}
          >
            {loadingStatus && orderId === task.task_id? "Setting as Picking up..." : "Set as Picking Up"}
          </button>
        )}
          {task.status === "picking_up_the_order" && (
          <button 
          className="bg-[#052443] text-white px-4 py-2 rounded-lg font-semibold text-md flex items-center gap-3 hover:bg-[#031f36] disabled:cursor-not-allowed disabled:opacity-50"  
          onClick={() => setAsDelivered(task.task_id, task.status)}
          disabled={loadingStatus}
          >
            {loadingStatus && orderId === task.task_id ? "Setting as On The Way..." : "Set as On The Way"}
          </button>
        )}

        {task.status === "on_the_way" && (
          <button 
          className="bg-[#052443] text-white px-4 py-2 rounded-lg font-semibold text-md flex items-center gap-3 hover:bg-[#031f36] disabled:cursor-not-allowed disabled:opacity-50" 
          onClick={() => setAsDelivered(task.task_id, task.status)}
          disabled={loadingStatus}
          >
            {loadingStatus && orderId === task.task_id ? "Setting as Delivered..." : "Set as Delivered"}
          </button>
        )}


            </div>
          ))}
        </div>
:
<p className="text-center text-gray-800">No Orders Found</p>
}

        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:border-cyan-300 transition duration-300"
            onClick={handlePrevious}
            disabled={page === 1}
          >
            <FontAwesomeIcon icon={faChevronLeft} /> Prev
          </button>

          <span className="text-sm">
            {page} of {total}
          </span>

          <button
            className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:border-cyan-300 transition duration-300"
            onClick={handleNext}
            disabled={page === total}
          >
            Next <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}
