import React, { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

const API_BASE_URL = "https://unjuicy-schizogenous-gibson.ngrok-free.dev";
const token = "YOUR_BEARER_TOKEN";

const NewOrders = () => {
  const [orders, setOrders] = useState([
    {
      order_id: 1,
      pharmacy_name: "Al Shifa Pharmacy",
      pharmacy_address: "Damascus - Mazzeh",
      patient_address: "Damascus - Abu Rummaneh",
    },
    {
      order_id: 2,
      pharmacy_name: "Life Care Pharmacy",
      pharmacy_address: "Damascus - Baramkeh",
      patient_address: "Damascus - Malki",
    },
    {
      order_id: 3,
      pharmacy_name: "Green Cross Pharmacy",
      pharmacy_address: "Damascus - Kafr Sousa",
      patient_address: "Damascus - Mezzeh Villas",
    },
  ]);

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  /* 
        //---------------------------- كود API (مؤقتاً متوقف)---------------------------------

  const fetchOrders = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/delivery/new-orders?page=${pageNumber}&per_page=6`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (result.status === "success") {
        const mappedOrders = result.data.map((item) => ({
          order_id: item.order_id,
          pharmacy_name: item.pharmacy.pharmacy_name,
          pharmacy_address: item.pharmacy.pharmacy_address,
          patient_address: item.patient_address,
        }));

        setOrders(mappedOrders);
        setPage(result.meta.current_page);
        setLastPage(result.meta.last_page);
      }
    } catch (error) {
      console.error("Error fetching delivery orders:", error);
    } finally {
      setLoading(false);
    }
  };
  */

  /*
  const handleAccept = async (orderId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/delivery/new-orders/${orderId}/accept`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (result.status === "success") {
        setOrders((prev) =>
          prev.filter((order) => order.order_id !== orderId)
        );
        alert(result.message);
      }
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };
  */

  const handleAccept = (orderId) => {
    setOrders((prev) => prev.filter((order) => order.order_id !== orderId));
  };

  /*
  useEffect(() => {
    fetchOrders(page);
  }, []);
  */

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <div className="mb-10">
        <h1 className="text-[#0a3460] text-3xl font-bold">New Orders</h1>
        <p className="text-gray-600 mt-2">Orders ready for delivery</p>
      </div>

      {loading && (
        <p className="text-center text-gray-500 mb-6">Loading...</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {orders.map((order) => (
          <div
            key={order.order_id}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              {order.pharmacy_name}
            </h2>

            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <MapPin size={18} className="text-[#39CCCC]" />
              <span className="text-sm">{order.pharmacy_address}</span>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              Deliver to: {order.patient_address}
            </p>

            <hr className="my-4" />

            <button
              onClick={() => handleAccept(order.order_id)}
              className="w-full py-2 rounded-xl bg-[#39CCCC] text-white font-medium hover:bg-[#2fa9a9] transition"
            >
              Accept
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          disabled={page === 1}
          className="px-5 py-2 rounded-lg border text-gray-400 border-gray-300 cursor-not-allowed"
        >
          Previous
        </button>

        <span className="font-medium text-gray-700">
          Page {page} of {lastPage}
        </span>

        <button
          disabled={page === lastPage}
          className="px-5 py-2 rounded-lg border text-gray-400 border-gray-300 cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NewOrders;
