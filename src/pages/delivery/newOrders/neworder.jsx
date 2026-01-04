import React, { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import DeliveryHeader from "../../../components/headers/DeliveryHeader";
import Footer from "../../../components/footer/Footer";
/*
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
*/
const NewOrders = () => {

  const [orders, setOrders] = useState([]);
  const [price,setPrice] = useState("");
  const [showAcceptPopup,setShowAcceptPopup]=useState(false)
  const [selectedItem,setSelectedItem]=useState(null)
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  
    
const token = localStorage.getItem("token")

  const fetchOrders = async (pageNumber = 1) => {

    setLoading(true);

    try {
      const response = await fetch(
        `https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/delivery/new-orders?page=${pageNumber}&per_page=6`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if(!response.ok)  throw new Error("Request failed")

      const result = await response.json();
    
      if (result.status === "success") {
        const mappedOrders = result.data.map((item) => ({
          order_id: item.order_id,
          order_price: item.order_price,
          task_id: item.task_id,
          pharmacy_name: item.pharmacy.name,
          pharmacy_address: item.pharmacy.address,
          patient_address: item.patient_address,
        }));

       
        console.log("Orders:",result)
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
  

  
  const handleAccept = async () => {
    if (!selectedItem) return;
    try {
      const response = await fetch(
        `https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/delivery/new-orders/${selectedItem.order_id}/accept`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      if (!response.ok) throw new Error(result.message)

      if (result.status === "success") {
     console.log("Accepted result:",result)
        const task_id = result.data.task_id;
        await sendPrice(task_id);
        

        setOrders((prev) =>
          prev.filter((o) => o.order_id !== selectedItem.order_id)
        );
        setShowAcceptPopup(false)
        setSelectedItem(null)
        setPrice("")
        
        alert("Order Accepted Successfully !");
      }
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };

  const sendPrice = async (task_id) => {
    setSaveLoading(true);
    try{
      const response = await fetch(
        `https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/delivery/tasks/${task_id}/set-delivery-fee`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ delivery_fee: Number(price) }),
        }
      );
    const result = await response.json()
    console.log('sending price: ',result);
    if(!response.ok) 
    throw new Error (result.message||"Failed to Add Price")
    alert ("Price Added Successfully !")
    } catch (error) {
      console.error("Error sending price:", error);
    }finally{
      setSaveLoading(false);
    }
  };
  
  useEffect(() => {
    fetchOrders(page);
  }, [page]);
  
  const isSaveDisabled = () => !price || Number(price) <= 0;
  return (
    <>
    <DeliveryHeader/>
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
              onClick={() =>{
                setSelectedItem(order)
                setShowAcceptPopup(true)
            
                }}
              className="w-full py-2 rounded-xl bg-[var(--dark-blue)] text-white font-medium hover:bg-[var(--card-border)] hover:text-[var(--dark-blue)]  transition"
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
          onClick={()=>setPage(page-1)}
        >
          Previous
        </button>

        <span className="font-medium text-gray-700">
          Page {page} of {lastPage}
        </span>

        <button
          disabled={page === lastPage}
          className="px-5 py-2 rounded-lg border text-gray-400 border-gray-300 cursor-not-allowed"
          onClick={()=>setPage(page+1)}
        >
          Next
        </button>
      </div>
    </div>
    {showAcceptPopup && selectedItem && (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
    <div className="bg-white p-6 rounded w-[400px]">
      <h2 className="font-semibold mb-4">Enter Price</h2>

      <input
        type="number"
        min="1"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border w-full p-2 rounded"
      />

      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={handleAccept}
          disabled={isSaveDisabled() || saveLoading}
          className={`px-4 py-2 rounded text-white ${
            isSaveDisabled()
              ? "bg-gray-400"
              : "bg-[#39CCCC] hover:bg-[#2bb3b3]"
          }`}
        >
          {saveLoading ?  "Saving..." : "Save"}
        </button>

        <button onClick={() => setShowAcceptPopup(false)}>
          Cancel
        </button>
      </div>
    </div>
    </div>
    )}

    <Footer/>

    </>
  );
};

export default NewOrders;
