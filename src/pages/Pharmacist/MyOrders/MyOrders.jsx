import PharmacistHeader from "../../../components/headers/PharmacistHeader";
import Footer from "../../../components/footer/Footer";
import { Clock } from "lucide-react";


import { useState, useEffect } from "react";
/*
const mockData = {
    prescriptions: [
  {
    id: 1,
    source: "Source: Doctor",
    patient: "Patient: Fadi",
    medicines: [
      { name: "Panadol", dosage: "500mg", boxes: 2, instructions: "twice daily" },
      { name: "Cetamol", dosage: "500mg", boxes: 1, instructions: "twice daily" },
    ],
    notes: "Take after meal",
    status: "ready_to_deliver",
    created_at: "2025-11-13T09:30:00Z",
  },
  {
    id: 2,
    source: "Source: Patient Upload",
    patient: "Patient: Rola",
    image_url: receipt,
    status: "ready_to_deliver",
    created_at: "2025-11-13T11:10:00Z",
  },
]};
*/
export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadingId, setLoadingId] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  
  const token = localStorage.getItem("token");

  const fetchOrders = async (pageNumber = 1) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/pharmacist/my-orders?page=${pageNumber}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      if   (!response.ok) {
            throw new Error("Request failed");
          }
      console.log("Request Accepted")
      const data = await response.json();
      setOrders(data.data)
      setPage(data.meta.current_page)
      setTotalPages(data.meta.last_page)

    } catch (err) {
      setError("Failed to load Orders");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(page);
  }, [page]);

 
  
  const handleDeliverOrder = async (order_id) => {
    try {
      setLoadingId(order_id);

      const response = await fetch(`https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/pharmacist/orders/${order_id}/ready`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
     
        }
      );

      const result = await response.json();

      if (result.status === "success") {
        setOrders((prev) =>
          prev.map((order) =>
            order.id === order_id
              ? {
                  ...order,
                  status: "ready_for_delivery",
                
                }
              : order
          )
        );
      }



    } catch (error) {
      console.error("Deliver error:", error);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <>
      <PharmacistHeader />

      <div className="min-h-screen bg-gray-50 p-10">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-[#0a3460]">My Orders</h1>
          <p className="text-gray-600 mt-2">
            Orders ready for delivery or pickup
          </p>
        </div>

         {isLoading && (
          <p className="text-center text-gray-500">Loading orders...</p>
        )}
        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}


        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-md border border-gray-100
                         p-5 hover:shadow-lg transition-all"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {order.patient}
              </h2>
              <p className="text-sm text-gray-500">Source: {order.source}</p>
              
              {/* CONTENT */}
              <div className="mt-3 text-sm text-gray-600">
         
              {order.medicines && order.medicines.length > 0 && (
             order.medicines.map((med, index) => (
            <p key={index}>
           {med.name} - {med.dosage} - {med.quantity || med.boxes} x {med.price_per_unit}
                   </p>
                          ))

                     )}
                     {order.image_url && (
                    <img
                      src={order.image_url}
                      alt="Prescription"
                      onClick={() => setSelectedImage(order.image_url)}
                      className="w-28 h-28 mt-2 rounded-lg object-cover cursor-pointer"
                    />
                  )}
              </div>
              <p className="mt-2 font-semibold">
              Total: {order.total_quantity} items - {order.total_medicine_price} $
                 </p>

        

              {/* DELIVER BUTTON */}
              <button
                onClick={() => handleDeliverOrder(order.id)}
                disabled={order.status !== "accepted"}
                className={`w-full mt-5 py-2 rounded-lg font-semibold transition ${
                  order.status === "ready_for_delivery"
                    ? "bg-[#39CCCC]/20 text-[#0a3460] cursor-default"
                    : order.status !== "accepted"
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#0a3460] text-white hover:bg-[#0a3460]/90"
                }`}
              >
                {loadingId === order.id
                  ? "Processing..."
                  : order.status === "ready_for_delivery"
                  ? "Ready for Delivery"
                  : "Marks as Ready"}
              </button>

           
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 border rounded-lg text-[#39CCCC]
                       disabled:text-gray-400"
          >
            Previous
          </button>

          <span className="font-semibold text-gray-700">
            {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 border rounded-lg text-[#39CCCC]
                       disabled:text-gray-400"
          >
            Next
          </button>
        </div>
      </div>

      {/* IMAGE POPUP */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm
                     flex justify-center items-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            className="max-w-3xl max-h-[90vh] rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>


      )}

   
        
      <Footer />
    </>
  );
}
