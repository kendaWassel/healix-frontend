import { useEffect, useState } from "react";
import { Clock,MapPin } from "lucide-react";
import NurseHeader from "../../../components/headers/NurseHeader";
import Footer from "../../../components/footer/Footer";

const NewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptingOrderId, setAcceptingOrderId] = useState(null);
  const [error, setError] = useState(null);
  const [current_page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("Order Accepted Successfully");

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
      const response = await fetch(`https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/provider/nurse/orders?page=${pageNumber}&per_page=6`,
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
      console.log("Orders Fetched:",data);
      setPage(data.meta.current_page);
      setTotal(data.meta.last_page);
      if (data.status === "success" && Array.isArray(data.data)) {
        setOrders(data.data);

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
    fetchOrders();
  }, []);

  const handleNext = () => {
    if (current_page < total) fetchOrders(current_page + 1);
  };

  const handlePrevious = () => {
    if (current_page > 1) fetchOrders(current_page - 1);
  };
  const handleAccept = async (id) => {
    setAcceptingOrderId(id);
    try {
      const response = await fetch(`https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/provider/nurse/orders/${id}/accept`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.status==="success"){
        // Show modal with message from response
        setModalMessage(data.message);
        setIsModalOpen(true);
        // Trigger refetch
        fetchOrders();
      } else {
        console.error(" Failed to accept order",data.message);
        setModalMessage(data.message || "Failed to accept order");
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error(" Error accepting order:", error);
      setModalMessage("Error accepting order. Please try again.");
      setIsModalOpen(true);
    } finally {
      setAcceptingOrderId(null);
      fetchOrders();
    }
  };
  return (
    <>
    <NurseHeader/>
    <div className="p-10 bg-gray-50 min-h-screen">
      <div className="mb-10 text-left">
        <h1 className="text-[#0a3460] text-3xl font-bold">My Orders</h1>
        <p className="text-gray-600 text-lg mt-2">Check your Orders here</p>
      </div>
{isLoading ? 
<p className="text-center text-gray-500 text-lg font-medium animate-pulse my-4">
Loading orders...
</p>
:
 orders.length > 0 ? 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        {orders.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-2xl p-5 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-[var(--dark-blue)]">
                  {item.patient_name}
                </h2>
                <div className="flex items-center gap-2">
                <p className="text-md my-5">Service:</p>
                <span className="text-[var(--text-color)] font-bold">{item.service}</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--dark-blue)] text-[13px] font-medium mt-2">
                <MapPin size={16} />
                  {item.address}
                </div>
              </div>
              <button
                onClick={() => handleAccept(item.id)}
                disabled={acceptingOrderId === item.id || (acceptingOrderId && acceptingOrderId != item.id)}
                className={`font-semibold transition duration-300 ease-in-out text-green-600 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50`}
              >
                {acceptingOrderId === item.id ? "Accepting" : "Accept"}
              </button>
            </div>

            <hr className="my-4 border-gray-200" />

            <div className="flex items-center justify-between gap-4 text-gray-700">
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-[#39CCCC]" />
                <span className="text-sm">{new Date(item.scheduled_at).toLocaleString()}</span>
              </div>
              <span>{item.status}</span>
            </div>
          </div>
        ))}
      </div>
:
error ? 
<p className="text-center text-red-500 text-lg font-semibold my-4">
{error}
</p>
:
<p className="text-center text-lg my-5">No Orders Found</p>
}

      <div className="flex justify-center items-center gap-4">
        <button
          onClick={handlePrevious}
          disabled={current_page === 1 || isLoading|| error }
          className={`px-5 py-2 rounded-lg border text-sm font-medium px-5 py-2 rounded-lg border text-sm font-medium text-[#39CCCC] border-[#39CCCC] disabled:cursor-not-allowed !disabled:hover:bg-[#39cccc97] disabled:text-gray-400 disabled:border-gray-300`}
        >
          Previous
        </button>

        <span className="text-gray-700 font-semibold">
          {current_page} of {total}
        </span>

        <button
          onClick={handleNext}
          disabled={current_page === total || isLoading || error}
          className={`px-5 py-2 rounded-lg border text-sm font-medium px-5 py-2 rounded-lg border text-sm font-medium text-[#39CCCC] border-[#39CCCC] disabled:cursor-not-allowed !disabled:hover:bg-[#39cccc97] disabled:text-gray-400 disabled:border-gray-300`}
        >
          Next
        </button>
      </div>
    </div>
    <Footer/>
    {isModalOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-[#05244380] backdrop-blur-sm z-50">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-[90%] max-w-md text-center animate-fadeIn border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            {modalMessage}
          </h2>

          <button
            onClick={() => setIsModalOpen(false)}
            className="w-full py-3 bg-[#001f3f] hover:bg-[#001634] text-white font-medium rounded-lg transition"
          >
            Cancel
          </button>
        </div>
      </div>
    )}
    </>
  );
};

export default NewOrders;
