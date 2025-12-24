import PharmacistHeader from "../../../components/headers/PharmacistHeader";
import Footer from "../../../components/footer/Footer";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

export default function PrescriptionOrders() {

  const [prescriptions, setPrescriptions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [showAcceptPopup, setShowAcceptPopup] = useState(false);
  const [showRejectPopup,setShowRejectPopup]= useState(false);

  const [RejectReason,setRejectReason]=useState("");

  const [selectedItem, setSelectedItem] = useState(null);
  
  const [prices, setPrices] = useState({});
  const [singlePrice, setSinglePrice] = useState("");

  const [ShowImageInputs,setShowImageInputs]=useState(false);
  const [dosageName,setdosageName]=useState("");

  const [dosage,setDosage]=useState("")

  const token = localStorage.getItem("token");

    const fetchPrescriptions = async (pageNumber = 1) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/pharmacist/prescriptions?status=sent_to_pharmacy&page=${pageNumber}&per_page=6`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      if (!response.ok) throw new Error("Request failed");

      const data = await response.json();

      setPrescriptions(data.data);
      setPage(data.meta.current_page);
      setTotalPages(data.meta.last_page);

    } catch (err) {
      setError("Failed to load prescriptions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const formatSource = (source) =>
    source === "doctor" ? "Source: Doctor" : "Source: Patient Upload";

  const handleAccept = async (order_id) => {


    try {
      
     const response = await fetch(
        `https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/pharmacist/prescriptions/${order_id}/accept`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
       
        }
      );
      
      const result = await response.json()
      if (!response.ok) throw new Error(result.message)
  
    

      if (result.data?.status === "accepted") {
        await sendPrice(order_id);
      }
      

      
      setPrescriptions((prev) =>
      prev.filter((p) => p.order_id !== order_id)
    );
    
      setShowAcceptPopup(false)
      setPrices({});
      setSinglePrice("")
      setdosageName("")
      setDosage("")

    } catch (err) {
      alert(err.message);
    }
  };


const sendPrice= async (order_id)=>{

  let items = [];
  if (selectedItem?.medicines && selectedItem.medicines.length > 0) {
  
    items = selectedItem.medicines.map((med, index) => ({
      medicine_name: med.name ,
      dosage: med.dosage,
      price: Number(prices[index]),
    }));
  } else {
   // ${med.dosage}`
    items = [
      {
        medicine_name: dosageName,
        dosage: dosage ,
        price: Number(singlePrice),
      },
    ];
  }

  const response = await fetch(`https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/pharmacist/prescriptions/${order_id}/add-price`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
  },
  body: JSON.stringify({items}),
  }
)
const result = await response.json();
if(!response.ok) {
 throw new Error(result.message||"Failed to add price") 
}
 alert("Medicine Prices Added successfully")
}




  const handleReject = async (order_id) => {
    if(!RejectReason){
      alert("please enter your rejection reason")
      return;
    }
    try {
    const response=  await fetch(
        `https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/pharmacist/prescriptions/${order_id}/reject`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
          body:JSON.stringify({reason:RejectReason})
        }
      );
      const result = await response.json();

      if (!response.ok || result.status !== "success") {
        throw new Error(result.message || "Reject failed");
      }
      const rejectedId = result.data.order_id;

      
      setPrescriptions((prev) =>
        prev.filter((p) => p.order_id !== rejectedId)
      );
      setRejectReason('');
      setShowRejectPopup(false);
    

      
    } catch (err){
      alert(err.message);
    }
  };

  
  const isSaveDisabled = () => {
    // حالة medicines
    if (selectedItem?.medicines && selectedItem.medicines.length > 0) {
      if (Object.keys(prices).length !== selectedItem.medicines.length) return true;
  
      return Object.values(prices).some(
        (price) => !price || Number(price) <= 0
      );
    }
  
    // حالة صورة
    if (ShowImageInputs) {
      return !singlePrice || Number(singlePrice) <= 0 || !dosageName.trim();
    }
  
    return true; // قبل إدخال أي شيء


  };
  
  return (
    <>
      <PharmacistHeader />

      <div className="p-10 bg-gray-50 min-h-screen">

        <h1 className="text-3xl font-bold text-[#0a3460] mb-2">
          Prescription Orders
        </h1>

        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {prescriptions.map((item) => (
            <div
              key={item.id}
              className="bg-white p-5 rounded-xl shadow"
            >

              <h2 className="font-semibold">{item.patient}</h2>
              <p className="text-sm text-gray-500">
                {formatSource(item.source)}
              </p>

              {item.medicines ? (
                <ul className="mt-2 text-sm">
                  {item.medicines.map((m, i) => (
                    <li key={i}>
                      {m.name} - {m.dosage} x {m.boxes}
                    </li>
                  ))}
                </ul>
              ) : (
                <img
                  src={item.image_url}
                  className="w-24 mt-3 rounded cursor-pointer"
                  onClick={() => setSelectedImage(item.image_url)}
                />
              )}

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => {
                    setSelectedItem(item);
                    setPrices({})
                    setSinglePrice('')
                    setShowAcceptPopup(true)
                    setdosageName('')
                    setShowImageInputs(false)
                    setDosage('')
                  }}
                 
                  className="text-green-600 font-semibold"
                >
                  Accept
                </button>

                <button
                  onClick={() => { 
                   setSelectedItem(item)
                  setShowRejectPopup(true);
                  setRejectReason('')
                  } 
                }
             
                  className="text-red-600 font-semibold disabled:opacity-50"
                >
                  Reject
                </button>
              </div>
          
              <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
                <Clock size={16} />
                {new Date(item.created_at).toLocaleString()}
              </div>
            </div>
          ))}

        </div>

        <div className="flex justify-center gap-4 mt-8 ">
          <button
            onClick={() => fetchPrescriptions(page - 1)}
            disabled={page === 1}
            className={`px-5 py-2 rounded-lg border text-sm font-medium ${
              page === 1
                ? "text-gray-400 border-gray-300 cursor-not-allowed"
                : "text-[#39CCCC] border-[#39CCCC] hover:bg-[#39cccc97] transition-all duration-300"
            }`}
          >
            Previous
          </button>

          <span>{page} / {totalPages}</span>

          <button
            onClick={() => fetchPrescriptions(page + 1)}
            disabled={page === totalPages}
            className={`px-5 py-2 rounded-lg border text-sm font-medium ${
              page === totalPages
                  ? "text-gray-400 border-gray-300 cursor-not-allowed"
                  : "text-[#39CCCC] border-[#39CCCC] hover:bg-[#39cccc97] transition-all duration-300"
          }`}
          >
            Next
          </button>
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/40 flex justify-center items-center"
          onClick={() => setSelectedImage(null)}
        >
          <img src={selectedImage} className="max-h-[90vh] rounded" />
        </div>
      )}

      {showAcceptPopup && selectedItem && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-[400px]">
    
            


    {selectedItem.medicines && selectedItem.medicines.length > 0 ? (
      <>
            <h2 className="font-semibold mb-4">Enter Price</h2>
      {selectedItem.medicines.map((med, index) => (
      <div key={index} className="mb-3">
      <label className="block text-sm font-medium mb-1">

        {med.name} ({med.dosage})
        </label>
      
         <input
        type="number"
        min='1'
        placeholder="Enter price"
        value={prices[index] || ""}
        onChange={(e) =>
          setPrices((prev) => ({
            ...prev,
            [index]: e.target.value,
          }))
        }
        className="border w-full p-2 rounded"
      />
   
       </div>
       ))} </>
      ) : (
        <>
        {!ShowImageInputs && (
          <button type="button"
           onClick={()=>setShowImageInputs(true)}
           className="text-[#39CCCC] font-semibold mb-3"
           >
            Add Dosage Name
             </button>
        )}
       
     {ShowImageInputs&& (
      <> 
      <input
       type="text"
      placeholder="Add Dosage Name"
      value={dosageName}
      onChange={(e)=>setdosageName(e.target.value)}
      className="border w-full p-2 rounded mb-2"
      />
      <input
      type="text"
      placeholder="Ad Dosage"
      value={dosage}
      onChange={(e)=>setDosage(e.target.value)}
      className="border w-full p-2 rounded mb-2"
      />
      <input
      type="number"
      min='1'
      placeholder="Add price"
      value={singlePrice}
      onChange={(e)=>setSinglePrice(e.target.value)}
      className="border w-full p-2 rounded"
      />
      </>
     )}
     </>
      )}
    
 
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => handleAccept(selectedItem.order_id)}
                className={`px-4 py-2 rounded text-white ${
                  isSaveDisabled()
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#39CCCC] hover:bg-[#2bb3b3] transition-colors duration-300"
                }`}
                disabled={isSaveDisabled()}
              >
                Save
              </button>

              <button
                onClick={() => setShowAcceptPopup(false)}
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}
      {showRejectPopup && selectedItem && (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
    <div className="bg-white p-6 rounded w-[400px]">
      <h2 className="font-semibold mb-4">Reject Reason</h2>

      <textarea
        value={RejectReason}
        onChange={(e) => setRejectReason(e.target.value)}
        className="border w-full p-2 rounded"
        placeholder="Medicine not available..."
      />

      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={()=>handleReject(selectedItem.order_id)}
          className="bg-red-600 px-4 py-2 text-white rounded"
        >
          Reject
        </button>

        <button
          onClick={() => setShowRejectPopup(false)}
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
