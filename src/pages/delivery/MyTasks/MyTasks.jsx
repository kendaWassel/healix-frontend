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
export default function MyTasks() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1)
  const [total,setTotal]=useState(0);

  
       const token=localStorage.getItem("token")
     
       const fetchMyTasks = async (pageNumber=1) => {
         setIsLoading(true);
         setError(null);
     
         try {
           const response = 
            await fetch(`https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/delivery/tasks?page=${pageNumber}`,
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
         console.log("Tasks",data)

         setTasks(data.data || [])
         setPage(data.meta.current_page)
         setTotal(data.meta.last_page)
        } catch (err){
          setError("failed to Load Tasks")
        }
        finally{
          setIsLoading(false)
        }
      }
    useEffect(()=>{
      fetchMyTasks()
    },[])



        const setAsDelivered = async (task_id,CurrentStatus) => {
        
      try {
        const response = await fetch(`https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/delivery/tasks/${task_id}/update-status`,
        {
          method:"PUT",
          headers: {
            "Content-type" : "application/json",
            Authorization: `Bearer ${token}` ,
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
      }
        }
      
        const getNextStatus = (status) => {
          if (status === "picked_up_the_order") return "on_the_way";
          if (status === "on_the_way") return "delivered";
          return status;
        };

        const formatStatus = (status) => {
          switch(status) {
            case "pending": return "Pending";
            case "picked_up_the_order": return "Picked Up";
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

      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-6 text-[#024]">My Tasks</h1> 
       
          <p className="text-lg font-semibold text-gray-600">Orders you accepted and need to deliver</p>
        </div>

        {isLoading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div
              key={task.task_id}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md hover:border-cyan-300 transition-all max-w-2xl"
            >
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-1">
                <span className=" text-cyan-500 "> Pharmacy: </span>
             <span className="text-gray-500"> {task.pharmacy_name } </span>
              </h3>
              <p className="text-sm font-medium">
              <span className=" text-cyan-500 ">Pharmacist Phone :</span>
              <span className="text-gray-500">{task.pharmacy_phone}</span>
              
              </p>

             <p className="text-sm font-medium">
               <span className="text-cyan-500">Address:</span>{" "}
               <span className="text-gray-500">{task.pharmacy_address}</span>
             </p>
              
              <div className="w-30 h-[1px] bg-gray-300 my-4" />

             
              <p className="text-2xl font-semibold text-gray-900">
              <span className="text-cyan-500">  Patient:  </span>
              <span className="text-gray-500">{task.patient_name}</span>
              </p>
              
              <p className="text-sm font-medium">
                <span className="text-cyan-500">Phone:</span>{" "}
                <span className="text-gray-600">{task.patient_phone}</span>
             </p>
             
              <p className="text-sm font-medium">
                <span className="text-cyan-500">Patient Address:</span>{" "}
                <span className="text-gray-600">{task.patient_address}</span>
             </p>
  
                       <div className="mt-4 p-1">
            {/* Status */}
         
              <span className="text-md font-semibold text-cyan-800">
                {formatStatus(task.status)}
              </span>
            


      
            
          </div>
          
                      {task.status === "picked_up_the_order" && (
          <button className="bg-[#052443] text-white px-4 py-2 rounded-lg font-semibold text-md flex items-center gap-3 hover:bg-[#031f36]  "  onClick={() => setAsDelivered(task.task_id, task.status)}>
            Set as On The Way
          </button>
        )}

        {task.status === "on_the_way" && (
          <button className="bg-[#052443] text-white px-4 py-2 rounded-lg font-semibold text-md flex items-center gap-3 hover:bg-[#031f36]" onClick={() => setAsDelivered(task.task_id, task.status)}>
            Set as Delivered
          </button>
        )}


            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handlePrevious}
            disabled={page === 1}
          >
            <FontAwesomeIcon icon={faChevronLeft} /> Prev
          </button>

          <span className="text-sm">
            {page} of {total}
          </span>

          <button
            className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
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
