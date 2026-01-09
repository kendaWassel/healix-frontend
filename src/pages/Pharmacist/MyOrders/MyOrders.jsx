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


  const itemsPerPage = 6;
  const token = localStorage.getItem("token");

  /*
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch("", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("Request Accepted: ", data);
      setOrders(data.data || []);
      setPage(data.meta?.current_page || 1);
      setTotalPages(data.meta?.last_page || 1);

    } catch (err) {
      console.error("Failed fetching orders:", err);
      setError(err?.message || "Failed to load orders.");
    } finally {
       setIsLoading(false);
    };
   
    useEffect(() => {
     fetchOrders();
  }, []); */

  useEffect(() => {
    setTotalPages(Math.ceil(orders.length / itemsPerPage));
  }, [orders]);

  const displayedOrders = orders.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  
  const handleDeliverOrder = async (orderId) => {
    try {
      setLoadingId(orderId);

      const response = await fetch("",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
          body: JSON.stringify({
            delivered: true,
            delivery_method: "pickup",
          }),
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
      <div className="bg-gray-50 py-7">
{/* pharmacist accepted orders  */}
      <div className="px-10">
        {/* HEADER */}
        <div className="mb-5">
          <h1 className="text-3xl font-bold text-[#0a3460]">Your Reciepts</h1>
          <p className="text-gray-600 mt-2">
            Make your orders ready for delivery or pickup
          </p>
        </div>
        {/* CARDS */}
        {isLoading ?
          <p className="text-center text-gray-500">Loading orders...</p>
        :
        orders.length > 0 ?
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition-all"
            >
              <h2 className="text-xl font-bold text-gray-800">
                {order.patient}
              </h2>
              <p className="text-md text-gray-500 my-2"><span className="text-[var(--cyan)] font-bold">Source:</span> {order.source}</p>
              {/* CONTENT */}
              <div className="my-4">
                {order.medicines.length > 0 && (
                  order.medicines.map((med, index) => (
                    <div> 
                      <h3 key={index} className="text-gray-700 font-bold">
                        {med.name} - {med.dosage} :
                      </h3>
                      <div className="flex flex-col ms-5 font-bold text-[var(--text-color)]">
                        <p>Box: { med.quantity || med.boxes }</p> 
                        <p>Price per box: {med.price_per_unit}</p>
                      </div>
                    </div>
                  ))
                ) }
                {order.image_url && (
                    <img
                      src={order.image_url}
                      alt="Prescription"
                      onClick={() => setSelectedImage(order.image_url)}
                      className="w-28 h-28 mt-2 rounded-lg object-cover cursor-pointer"
                    />
                  )}
              </div>
              <p className="mt-2 text-[18px] text-[var(--dark-blue)] font-bold">
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
        :
        error ? 
        <p className="text-center text-red-500">{error}</p>
        :
<p className="text-center text-lg my-5">No Orders Found</p>
      }

        {/* PAGINATION */}
        <div className="flex justify-center items-center gap-4 mt-5">
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
{/* ORDERS ACCEPTED BY DELIVERY */}
<div className="px-10">
  {/* HEADER */}
  <div className="mb-5">
    <h1 className="text-3xl font-bold text-[#0a3460]">
      Orders Assigned to Delivery
    </h1>
    <p className="text-gray-600 mt-3">
      Track Orders currently assigned to delivery agents
    </p>
  </div>
  {deliveryLoadBtn === false ? 
  <div className="text-center">
    <button
  onClick={() => setDeliveryLoadBtn(true)}
  className="px-6 py-2 my-5 rounded-lg text-white text-[18px] bg-[var(--dark-blue)] hover:opacity-90 transition"
>
  Load Orders
</button>
    </div>

      :
      <>
      {deliveryLoading ? (
        <p className="text-center text-gray-500">Loading delivery orders...</p>
      ) : deliveryOrders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deliveryOrders.map((order) => {
            const delivery = order.delivery;
            const agent = delivery?.delivery_agent;
    console.log('agent:',agent)
            return (
              <div
                key={order.order_id}
                className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition-all"
              >
                <h2 className="text-xl font-bold text-gray-800">
                  Order #{order.order_id}
                </h2>
    
                <p className="text-md text-[var(--text-color)] font-medium mt-1">
                <span className="text-[var(--cyan)] font-medium">Status: </span>
                  {agent ? 
                  agent?.driver_status
                    :
                    order.message
                }
                </p>
    
                <p className="text-md text-[var(--text-color)] font-medium mt-1">
                  {delivery ?
                  <>
                <span className="text-[var(--cyan)] font-medium">Assigned at: </span>
                {new Date(delivery?.assigned_at)?.toLocaleString()}
                  </>
                  :
                  <>
                <span className="text-[var(--cyan)] font-medium">Created at: </span>
                  {new Date(order?.created_at)?.toLocaleString()}
                  </>
                }
                </p>
                {order.medications && 
                <button
  onClick={() => {
    setSelectedOrderMeds(order.medications);
    setShowMedsModal(true);
  }}
  className="block m-[0_auto] mt-4 w-50 py-2 rounded-lg text-[16px]
             bg-[var(--dark-blue)] text-white
             hover:bg-[var(--card-border)] hover:text-[var(--dark-blue)] transition font-medium"
>
  View Medications
</button>      
              }

                {/* DELIVERY AGENT */}
                {agent && (
                  <div className="mt-4 border-t pt-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={agent.driver_image || '../no-photo.png'}
                        alt={agent.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-[var(--cyan)]"
                      />
                      <div>
                        <p className="font-bold text-gray-800 text-[19px]">{agent.name}</p>
                        <p className="text-sm text-gray-800">
                        <span className="text-[var(--cyan)] font-medium">Vehicle: </span>
                          {agent.vehicle_type} • {agent.plate_number}
                        </p>
                        <p className=""><span className="text-[var(--cyan)] font-medium">Phone: </span>{agent?.phone}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : deliveryError ? (
        <p className="text-center text-red-500">{deliveryError}</p>
      ) : (
        <p className="text-center text-lg my-5">No Delivery Orders Found</p>
      )}
    
      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-4 mt-5">
        <button
          disabled={deliveryPage === 1}
          onClick={() => setDeliveryPage((p) => p - 1)}
          className="px-4 py-2 border rounded-lg text-[#39CCCC]
                     disabled:text-gray-400"
        >
          Previous
        </button>
    
        <span className="font-semibold text-gray-700">
          {deliveryPage} of {deliveryTotalPages}
        </span>
    
        <button
          disabled={deliveryPage === deliveryTotalPages}
          onClick={() => setDeliveryPage((p) => p + 1)}
          className="px-4 py-2 border rounded-lg text-[#39CCCC]
                     disabled:text-gray-400"
        >
          Next
        </button>
      </div>
      </>
      }
</div>
{/* past orders  */}
<div className="px-10">
  {/* HEADER */}
  <div className="mb-5">
    <h1 className="text-3xl font-bold text-[#0a3460]">
      Past Orders
    </h1>
    <p className="text-gray-600 mt-3">
      Check your past orders here
    </p>
  </div>
  {pastLoadBtn === false ? 
  <div className="text-center">
    <button
  onClick={() => setPastLoadBtn(true)}
  className="px-6 py-2 my-5 rounded-lg text-white text-[18px] bg-[var(--dark-blue)] hover:opacity-90 transition"
>
  Load Orders
</button>
    </div>

      :
      <>
  {pastLoading ? (
    <p className="text-center text-gray-500">Loading past orders...</p>
  ) : pastOrders.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {pastOrders.map((order) => (
        <div
          key={order.order_id}
          className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition-all"
        >
          <h2 className="text-xl font-bold text-gray-800">
            Order #{order.order_id}
          </h2>

          <p className="text-lg mt-3">
            <span className="text-[20px] text-[var(--dark-blue)] font-bold">Delivered at: </span>
            {new Date(order.delivered_at).toLocaleString()}
          </p>

          {/* PATIENT */}
          {order.patient ?
          <>
          <h3 className="mt-2 font-bold text-[var(--dark-blue)] text-[20px]">Patient: </h3>
          <div className="ms-3">
            <h4><span className="font-bold text-[var(--cyan)]">Name:</span> {order.patient.name}</h4>
            <h4><span className="font-bold text-[var(--cyan)]">Address:</span> {order.patient.address}</h4>
            <h4><span className="font-bold text-[var(--cyan)]">Phone:</span> {order.patient.phone}</h4>
          </div>
          </> 
          
        :
        "Unknown patient"
        }
          <h3 className="font-bold text-[var(--dark-blue)] text-[20px] mt-2">Medications: </h3>
          {/* MEDICATION */}
          {order.medications.length > 0 ? 
            order.medications.map((med, index) => (
              <div className="ms-3 mt-1"> 
                      <h3 key={index} className="text-gray-700 font-bold">
                        {med.medication_name} :
                      </h3>
                      <div className="flex flex-col ms-5 font-bold text-[var(--text-color)]">
                        <p>Box: { med.quantity }</p> 
                        <p>Price per box: {med.price}</p>
                      </div>
                    </div>
                  ))
                  :
                  "Unknown medications"
}

          <p className="mt-3 font-bold text-[var(--dark-blue)] text-[20px]">
            Total: ${order.total_medicine_price}
          </p>

          {/* DELIVERY */}
          <h3 className="font-bold text-[var(--dark-blue)] text-[20px] mt-2">Delivered By: </h3>
          {order.delivery ? 
          <div className="ms-3 text-md text-gray-700">
            <h4><span className="font-bold text-[var(--cyan)]">Name:</span> {order.delivery.name}</h4>
            <h4><span className="font-bold text-[var(--cyan)]">Phone:</span> {order.delivery.phone}</h4>
          </div>
        :
        "Uknown delivery agent"
        }
        </div>
      ))}
    </div>
  ) : pastError ? (
    <p className="text-center text-red-500">{pastError}</p>
  ) : (
    <p className="text-center text-lg my-5">No Past Orders Found</p>
  )}

  {/* PAGINATION */}
  <div className="flex justify-center items-center gap-4 mt-10">
    <button
      disabled={pastPage === 1}
      onClick={() => setPastPage((p) => p - 1)}
      className="px-4 py-2 border rounded-lg text-[#39CCCC]
                 disabled:text-gray-400"
    >
      Previous
    </button>

    <span className="font-semibold text-gray-700">
      {pastPage} of {pastTotalPages}
    </span>

    <button
      disabled={pastPage === pastTotalPages}
      onClick={() => setPastPage((p) => p + 1)}
      className="px-4 py-2 border rounded-lg text-[#39CCCC]
                 disabled:text-gray-400"
    >
      Next
    </button>
  </div>
</>
}
</div>
      </div>

      {showMedsModal && (
  <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
    <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-lg p-6 relative">
      
      {/* HEADER */}
      <h2 className="text-2xl font-bold text-[#0a3460] mb-4">
        Medications
      </h2>

      {/* CONTENT */}
      {selectedOrderMeds.length > 0 ? (
        <div className="space-y-3">
          {selectedOrderMeds.map((med, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <p className="font-semibold text-gray-800">
                  {med.name} - {med.dosage}
                </p>
                <p className="text-sm text-gray-600">
                  Quantity: {med.quantity}
                </p>
              </div>
              <p className="font-bold text-[#0a3460]">
                ${med.price}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No medications found
        </p>
      )}

      {/* CLOSE BUTTON */}
      <button
        onClick={() => setShowMedsModal(false)}
        className="mt-6 w-full py-2 rounded-lg bg-[#0a3460]
                   text-white font-medium hover:opacity-90 transition"
      >
        Close
      </button>
    </div>
  </div>
)}

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
