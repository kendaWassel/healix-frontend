import PharmacistHeader from "../../../components/headers/PharmacistHeader";
import Footer from "../../../components/footer/Footer";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

export default function NewOrders() {

  const [prescriptions, setPrescriptions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [showAcceptPopup, setShowAcceptPopup] = useState(false);
  const [showRejectPopup,setShowRejectPopup]= useState(false);

  const [RejectReason,setRejectReason]=useState("");

  const [selectedItem, setSelectedItem] = useState(null);
  
  const [prices, setPrices] = useState({});

  const [dosages, setDosages] = useState([]);

  const token = localStorage.getItem("token");

    const fetchPrescriptions = async (pageNumber = 1) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/pharmacist/prescriptions?page=${pageNumber}&per_page=3`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      if (!response.ok) throw new Error("Request failed");

      const data = await response.json();
      console.log('prescriptions: ',data);
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
    fetchPrescriptions(page);
  }, [page]);

  const handleAccept = async (prescription_id) => {


    try {
      
     const response = await fetch(
        `https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/pharmacist/prescriptions/${prescription_id}/accept`,
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
        await sendPrice(prescription_id);
      }
      
      console.log("Accepted response : ",result)
      
      setPrescriptions((prev) =>
      prev.filter((p) => p.prescription_id !== prescription_id)
    );
    

      setPrices({});
      setDosages([])

      setShowAcceptPopup(false);

    } catch (err) {
      alert(err.message);
    }
  };


const sendPrice= async (order_id)=>{

  const items = dosages.map((d) => ({
    medicine_name: d.dosageName,
    dosage: d.dosage,
    price: Number(d.price),
  }));

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




  const handleReject = async (prescription_id) => {
    if(!RejectReason){
      alert("please enter your rejection reason")
      return;
    }
    setRejectLoading(true);
    try {
    const response=  await fetch(
        `https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/pharmacist/prescriptions/${prescription_id}/reject`,
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
      console.log('reject response: ',result);
      if (!response.ok || result.status !== "success") {
        throw new Error(result.message || "Reject failed");
      }
      const rejectedId = result.data.prescription_id;

      
      setPrescriptions((prev) =>
        prev.filter((p) => p.prescription_id !== rejectedId)
      );
      setRejectReason('');
      setShowRejectPopup(false);
    

      
    } catch (err){
      alert(err.message);
    }finally{
      setRejectLoading(false);
      setShowRejectPopup(false);
      fetchPrescriptions();

    }
  };

  
  const isSaveDisabled = () => {
    // إذا هناك أدوية موجودة في prescription
    if (selectedItem?.medicines && selectedItem.medicines.length > 0) {
      if (Object.keys(prices).length !== selectedItem.medicines.length) return true;
      return Object.values(prices).some((price) => !price || Number(price) <= 0);
    }
  

    if (dosages.length === 0) return true;
  return dosages.some(
    (d) => !d.dosageName.trim() || !d.dosage.trim() || !d.price || Number(d.price) <= 0
  );
};
  
  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };
  return (
    <>
      <PharmacistHeader />

      <div className="p-10 bg-gray-50 min-h-[60vh]">

        <h1 className="text-3xl font-bold text-[#0a3460] mb-2">
          Prescription Orders
        </h1>
{loading ?
  <p className="text-center text-lg my-5">Loading...</p>
  :
prescriptions.length > 0 ?  
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {prescriptions.map((item) => (
  <div
    key={item.prescription_id}
    className="bg-white p-5 rounded-xl shadow"
  >

    <h2 className="font-semibold">{item.patient}</h2>
    <p className="text-sm text-gray-500">
      Source: {item.source}
    </p>
    
    {item.medicines && item.medicines.length>0 ? (
      <ul className="mt-2 text-sm">
        {item.medicines.map((m, i) => (
          <li key={i}>
            {m.name} - {m.dosage} x {m.boxes} - {m.instructions}
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
          setShowAcceptPopup(true)
   
  
     
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
  ))
  }
  </div>
  :
  error ?
  <p className="text-red-500 text-center">{error}</p>
  :
  <p className="text-center text-lg my-5">No Receipts Found</p>
      }
        <div className="flex justify-center gap-4 mt-8 ">
          <button
          onClick={handlePrevious}
                    disabled={page === 1 || loading || error}
                    className={`px-5 py-2 rounded-lg border text-sm font-medium text-[#39CCCC] border-[#39CCCC] cursor-not-allowed !disabled:cursor-pointer !disabled:hover:bg-[#39cccc97] disabled:text-gray-400 disabled:border-gray-300`}
          >
            Previous
          </button>

          <span>{page} / {totalPages}</span>

          <button
          onClick={handleNext}
                    disabled={page === totalPages || loading || error}
                    className={`px-5 py-2 rounded-lg border text-sm font-medium text-[#39CCCC] border-[#39CCCC] cursor-not-allowed !disabled:cursor-pointer !disabled:hover:bg-[#39cccc97] disabled:text-gray-400 disabled:border-gray-300`}
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
          <h2 className="font-semibold mb-2">Add Dosage</h2>
          
          <button
            type="button"
            onClick={() =>
              setDosages((prev) => [
                ...prev,
                { dosageName: "", dosage: "", price: "" },
              ])
            }
            className="text-[#39CCCC] font-semibold mb-3"
          >
            Add Dosage Name
          </button>

          {dosages.map((item, index) => (
            <div key={index} className="mb-3 border-b pb-2">
              <input
                type="text"
                placeholder="Add Dosage Name"
                value={item.dosageName}
                onChange={(e) => {
                  const newDosages = [...dosages];
                  newDosages[index].dosageName = e.target.value;
                  setDosages(newDosages);
                }}
                className="border w-full p-2 rounded mb-2"
              />
              <input
                type="text"
                placeholder="Add Dosage"
                value={item.dosage}
                onChange={(e) => {
                  const newDosages = [...dosages];
                  newDosages[index].dosage = e.target.value;
                  setDosages(newDosages);
                }}
                className="border w-full p-2 rounded mb-2"
              />
              <input
                type="number"
                min="1"
                placeholder="Add price"
                value={item.price}
                onChange={(e) => {
                  const newDosages = [...dosages];
                  newDosages[index].price = e.target.value;
                  setDosages(newDosages);
                }}
                className="border w-full p-2 rounded mb-2"
              />
            </div>
          ))}
        </>
      )}

      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={() => {
            handleAccept(selectedItem.prescription_id);
            setDosages([]); 
          }}
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
          onClick={() => {
            setShowAcceptPopup(false);
            setDosages([]); 
          }}
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
          <button disabled={rejectLoading} 

          onClick={()=>handleReject(selectedItem.prescription_id)}

           className="bg-red-600 px-4 py-2 text-white rounded disabled:cursor-not-allowed disabled:opacity-50" >
             {rejectLoading ? "Rejecting..." : "Reject"} 

             </button> 
             <button disabled={rejectLoading}
              onClick={() => setShowRejectPopup(false)}
               className="disabled:cursor-not-allowed disabled:opacity-50" > 
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
