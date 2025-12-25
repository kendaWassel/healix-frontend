import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import PhysioHeader from "../../../components/headers/PhysioHeader";
import Footer from "../../../components/footer/Footer";

const PhysioNewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [current_page, setPage] = useState(1);
  const [total, setTotal] = useState(2);

  // بيانات افتراضية
  /*
  const mockData = {
    1: [
      {
        id: 1,
        patient_name: "patient Ahmad Youssef",
        service: "Insulin injection + blood pressure check",
        address:"Damascus,AL Mazzeh",
        scheduled_at: "2025-11-05T10:30:00Z",
        
      },
      {
        id: 2,
        patient_name: "patient Lina H.",
        service: "Insulin injection + blood pressure check",
        address:"Homs, AL Khaldieh",
        scheduled_at: "2025-11-05T10:30:00Z",
        
      },
      {
        id: 3,
        patient_name: "patient  Rami S.",
        service: "Insulin injection + blood pressure check",
        address:"Damascus,Kudsaya",
        scheduled_at: "2025-11-05T10:30:00Z",
        
      },
      {
        id: 4,
        patient_name: "patient  Sara Khaled",
        service: "IV Therapy",
        address:"Daraa,Izraa",
        scheduled_at: "2025-11-05T10:30:00Z",
        
      },
      {
        id: 5,
        patient_name: "patient  Omar Ali",
        service: "IV Therapy",
        address:"Tartous,AL Sheikh Bader",
        scheduled_at: "2025-11-05T10:30:00Z",
      
      },
      {
        id: 6,
        patient_name: "patient  Hiba N.",
        service: "Insulin injection + blood pressure check",
        address:"Lattakia,AL Sleiba",
        scheduled_at: "2025-11-05T10:30:00Z",
        
      },
    ],
    2: [
      {
        id: 7,
        patient_name: "patient  Maher K.",
        service: "IV Therapy",
        address:"Hama, AL Ashrafiah",
        scheduled_at: "2025-11-05T10:30:00Z",
        
      },
      {
        id: 8,
        patient_name: "patient  Noor A.",
        service: "Insulin injection + blood pressure check",
        address:"Homs,Bab Sabaa",
        scheduled_at: "2025-11-05T10:30:00Z",
        
      },


    ],
  };
  
*/
  const token = localStorage.getItem("token");

  const fetchOrders = async (pageNumber = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/provider/physiotherapist/orders",
      {
        method: "GET",
        headers:{
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
          "Authorization": `Bearer ${token}`,
        },
      }
    )
    
    if (!response.ok) {
      const serverError = await response.json().catch(() => ({}));
      throw new Error(serverError.message || "Request failed");
    }

      const data = await response.json();
      console.log("Orders Fetched:",data)
      if (data.status === "success" && Array.isArray(data.data)) {
        setOrders(data.data);
        setPage(pageNumber);

      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Failed fetching orders:", error);
      setError(error.message || "Failed to load orders.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
   fetchOrders()
  },[]) /*
  setOrders(mockData[current_page]||[])
  }, [current_page]);
*/

  const handleNext = () => {
    if (current_page < total) fetchOrders(current_page + 1);
  };

  const handlePrevious = () => {
    if (current_page > 1) fetchOrders(current_page - 1);
  };
  const handleAccept = async (id) => {
    try {
      const response = await fetch(`https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/provider/physiotherapist/orders/${id}/accept`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ accepted: true }),
      });

      const data = await response.json();
      if (data.status==="success"){
        setOrders((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, status: "accepted" } : item
          )
        );
      } else {
        console.error(" Failed to accept order",data.message);
      }
    } catch (error) {
      console.error(" Error accepting order:", error);
    }
  };
  return (
    <>
    <PhysioHeader/>
    <div className="p-10 bg-gray-50 min-h-screen">
      <div className="mb-10 text-left">
        <h1 className="text-[#0a3460] text-3xl font-bold">My Orders</h1>
        <p className="text-gray-600 text-lg mt-2">Check your Orders here</p>
      </div>

      {isLoading && (
  <p className="text-center text-gray-500 text-lg font-medium animate-pulse">
    Loading orders...
  </p>
)}

{error && (
  <p className="text-center text-red-500 text-lg font-semibold mt-4">
    {error}
  </p>
)}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        {orders.slice(0, 6).map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-2xl p-5 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {item.patient_name}
                </h2>
                <p className="text-sm text-gray-500 me-[1rem]">{item.address}</p>
                <p className="text-sm text-gray-500 font-medium mt-[1rem]">{item.reason}</p>
              </div>
              <button
                onClick={() => handleAccept(item.id)}
                disabled={item.status === "accepted"}
                className={`font-semibold transition duration-300 ease-in-out ${
                  item.status === "accepted"
                    ? "text-green-600 cursor-default"
                    : "text-[#0a3460] hover:text-[#39CCCC]"
                }`}
              >
                {item.status === "accepted" ? "Accepted" : "Accept"}
              </button>
            </div>

            <hr className="my-4 border-gray-200" />

            <div className="flex items-center gap-4 text-gray-700">
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-[#39CCCC]" />
                <span className="text-sm">{new Date(item.scheduled_at).toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4">
        <button
          onClick={handlePrevious}
          disabled={current_page === 1}
          className={`px-5 py-2 rounded-lg border text-sm font-medium ${
            current_page === 1
              ? "text-gray-400 border-gray-300 cursor-pointer"
              : "text-[#39CCCC] border-[#39CCCC] hover:bg-[#39cccc97]"
          }`}
        >
          Previous
        </button>

        <span className="text-gray-700 font-semibold">
          {current_page} of {total}
        </span>

        <button
          onClick={handleNext}
          disabled={current_page === total}
          className={`px-5 py-2 rounded-lg border text-sm font-medium ${
            current_page === total
              ? "text-gray-400 border-gray-300 cursor-pointer"
              : "text-[#39CCCC] border-[#39CCCC] hover:bg-[#39cccc97] "
          }`}
        >
          Next
        </button>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default PhysioNewOrders;
