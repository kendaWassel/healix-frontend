import PharmacistHeader from "../../../components/headers/PharmacistHeader";
import Footer from "../../../components/footer/Footer";
import { Clock } from "lucide-react";
import receipt from "../../../assets/OIP.jpg";

import { useState, useEffect } from "react";

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


export default function MyOrders() {
  const [orders, setOrders] = useState(mockData.prescriptions);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadingId, setLoadingId] = useState(null);
  const [error, setError] = useState(null);
  const [showAcceptPopup, setShowAcceptPopup] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [price, setPrice] = useState("");
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
      setOrders(data.data);
       setPage(pageNumber);
    } catch (err) {
       setError("Failed to load orders");
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
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
            order.id === orderId
              ? {
                  ...order,
                  status: "delivered",
                  delivered_at: result.data.delivered_at,
                }
              : order
          )
        );
      }
    setShowAcceptPopup(false);
    setPrice("");

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
          {displayedOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-md border border-gray-100
                         p-5 hover:shadow-lg transition-all"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {order.patient}
              </h2>
              <p className="text-sm text-gray-500">{order.source}</p>

              {/* CONTENT */}
              <div className="mt-3 text-sm text-gray-600">
                {order.medicines ? (
                  order.medicines.map((med, index) => (
                    <p key={index}>
                      {med.name} – {med.dosage} – {med.boxes} –{" "}
                      {med.instructions}
                    </p>
                  ))
                ) : (
                  <img
                    src={order.image_url}
                    alt="Prescription"
                    onClick={() => setSelectedImage(order.image_url)}
                    className="w-28 h-28 mt-2 rounded-lg object-cover cursor-pointer"
                  />
                )}
              </div>

              {/* TIME */}
              <div className="flex items-center gap-2 mt-4 text-gray-600">
                <Clock size={16} className="text-[#39CCCC]" />
                <span className="text-sm">
                  {new Date(order.created_at).toLocaleString()}
                </span>
              </div>

              {/* DELIVER BUTTON */}
              <button
                onClick={() => handleDeliverOrder(order.id)}
                disabled={order.status === "delivered"}
                className={`w-full mt-5 py-2 rounded-lg font-semibold transition ${
                  order.status === "delivered"
                    ? "bg-[#39CCCC]/20 text-[#0a3460] cursor-default"
                    : "bg-[#0a3460] text-white hover:bg-[#0a3460]/90"
                }`}
              >
                {loadingId === order.id
                  ? "Processing..."
                  : order.status === "delivered"
                  ? "Delivered"
                  : "Set as ready to Deliver"}
              </button>

              {order.delivered_at && (
                <p className="text-xs text-gray-500 mt-2">
                  Delivered at:{" "}
                  {new Date(order.delivered_at).toLocaleString()}
                </p>
              )}
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

       {/* ACCEPT POPUP */}
      {showAcceptPopup && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm
                        flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-[400px] shadow-lg">
            <h2 className="text-xl font-semibold text-[#0a3460] mb-4">
              Confirm Order
            </h2>

            <input
              type="text"
              placeholder="Enter total price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg mb-4
                         focus:ring-2 focus:ring-[#39CCCC]"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => handleSetReady(currentOrder.id)}
                className="px-4 py-2 bg-[#39CCCC] text-white rounded-lg
                           hover:bg-[#2fb6b6]"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowAcceptPopup(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
