import PharmacistHeader from "../../../components/headers/PharmacistHeader"
import Footer from "../../../components/footer/Footer"
import receipt from "../../../assets/OIP.jpg"
import { Clock } from "lucide-react";

import { useState,useEffect } from "react";

const mockData = {
    prescriptions: [
        {
            id: 1,
            source: " Source: Doctor",
            patient: "Patient: Fadi",
            medicines: [
                { name: "Panadol", dosage: "500mg", boxes: 2,instructions:'twice daily' },
                { name: "Cetamol", dosage: "500mg", boxes: 1,instructions:'twice daily' }
            ],
            total_boxes: 3,
            notes:'Notes: take after meal',
            status: "sent to pharmacy",
            created_at: "27/11/2025 3:40 PM"
        },
        {
            id: 2,
            source: "Soucre: Doctor",
            patient: "Patient: Sami",
            medicines: [
                { name: "Panadol", dosage: "500mg", boxes: 1 ,instructions:'twice daily'},
                { name: "Cetamol", dosage: "500mg", boxes: 1 ,instructions:'twice daily'}
            ],
            total_boxes: 2,
            notes:'Notes: take after meal',
            status: "sent to pharmacy",
            created_at: "18/10/2025 1:15 PM"
        },
        {
            id: 3,
            source: "Source: Doctor",
            patient: "Patient: Alaa",
            medicines: [
                { name: "Panadol", dosage: "500mg", boxes: 2,instructions:'twice daily' },
                { name: "Cetamol", dosage: "500mg", boxes: 3,instructions:'twice daily' }
            ],
            total_boxes: 4,
            notes:'Notes: take after meal',
            status: "sent to pharmacy",
            created_at: "2/9/2025 11:30 PM"
        },
        {
            id: 4,
            source: "Soucre: patient upload",
            patient: "Patient: Rola",
            image_url: receipt,
            status: "sent to pharmacy",
            created_at: "20/8/2025 12:20 PM"
        },
        {
          id: 5,
          source: "Soucre: patient upload",
          patient: "Patient: Lama",
          image_url: receipt,
          status: "sent to pharmacy",
          created_at: "30/10/2025 9:39 AM"
      },
      {
        id: 6,
        source: "Soucre: patient upload",
        patient: "Patient: Kareem",
        image_url: receipt,
        status: "sent to pharmacy",
        created_at: "2/9/2025 6:30 PM"
    }
    
    ]
};
export default function PrescreptionOrders(){
    const [prescriptions,setPrescreption]=useState(mockData.prescriptions)
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(2);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const itemsPerPage = 6;

    /*const token = localStorage.getItem("token");
    const fetchPrescreptions = async (pageNumber = 1) => {
 setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("",
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
      console.log("Prescreptions Fetched:",data)
      if (data.status === "success" && Array.isArray(data.data)) {
        setOrders(data.data);
        setPage(pageNumber);

      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Failed fetching prescreptions:", error);
      setError(error.message || "Failed to load prescreptions.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
      fetchPrescreptions();
  }, []);
*/
useEffect(() => {
  setTotalPages(Math.ceil(prescriptions.length / itemsPerPage));
}, [prescriptions]);

const displayedItems = prescriptions.slice(
  (page - 1) * itemsPerPage,
  page * itemsPerPage
);
  const handleNext = () => {
      if (page < totalPages) fetchPrescreptions(page + 1);
  };

  const handlePrevious = () => {
      if (page > 1) fetchPrescreptions(page - 1);
  };

    const handleAccept = async (id) => {
        try {
          const response = await fetch('', {
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
            setPrescreption((prev) =>
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
      const handleReject = async (id) => {
        try{
          const response = await fetch('', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "true",
              "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ rejected: true }),
          });
    
          const data = await response.json();
    
          if (data.status === "success") {
            setPrescreption((prev) =>
              prev.map((item) =>
                item.id === id ? { ...item, status: "rejected" } : item
              )
            );
          } else {
            console.error("Failed to reject order", data.message);
          }
        } catch (error) {
          console.error("Error rejecting order:", error);
        }
      }; 
        
      
    return (
        <>
          <PharmacistHeader />
          <div className="p-10 bg-gray-50 min-h-screen">
            <div className="mb-10 text-left">
              <h1 className="text-[#0a3460] text-3xl font-bold">Prescription Orders</h1>
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
              {displayedItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white shadow-md rounded-2xl p-5 hover:shadow-xl transition-all duration-300"
                >
                 <div className="flex items-start justify-start gap-4">
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-gray-800">{item.patient}</h2>
                      <p className="text-sm text-gray-500">{item.source}</p>
                      <div className="mt-2 text-sm text-gray-600">
                {item.medicines?(
                   <ul className="mt-2 text-sm text-gray-600">
                    {item.medicines.map((med, index) => (
      <li key={index}>
        {med.name} - {med.dosage} - {med.boxes} - {med.instructions}
      </li>
    ))}
                    </ul>
                ): item.image_url &&(
                  <img
      src={item.image_url}
      onClick={() => setSelectedImage(item.image_url)}
      alt="Prescription"
      className="w-25 h-25 object-cover rounded-lg mt-2 cursor-pointer hover:opacity-80"
    />
                )}
              </div>
              <div className="text-sm text-gray-500 font-medium mt-2">
             {item.notes}
             </div>
                      {item.total_boxes && (
                        <p className="text-sm text-gray-500 font-medium mt-2">
                          Total Boxes: {item.total_boxes}
                        </p>

                      )}
            
                    </div>
                    <div className="flex flex-col gap-2">
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
                    <button
                      onClick={() => handleReject(item.id)}
                      disabled={item.status === "rejected"}
                      className={`font-semibold transition duration-300 ease-in-out  ${
                        item.status === "rejected"
                          ? "text-red-600 cursor-default"
                          : "text-[#0a3460] hover:text-[#39CCCC]"
                      }`}
                    >
                      {item.status === "rejected" ? "Rejected" : "Reject"}
                    </button>
                    </div>
                  </div>
                  <hr className="my-4 border-gray-200" />
                  <div className="flex items-center gap-4 text-gray-700">
                    <div className="flex items-center gap-2">
                      <Clock size={18} className="text-[#39CCCC]" /> 
                     <span className="text-sm">{item.created_at}</span>
                    </div>
                    <div className="flex items-center gap-2">

                      {item.status}
                      </div>
                    
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center gap-4">
                <button
                    onClick={handlePrevious}
                    disabled={page === 1}
                    className={`px-5 py-2 rounded-lg border text-sm font-medium ${page === 1
                        ? "text-gray-400 border-gray-300 cursor-pointer"
                        : "text-[#39CCCC] border-[#39CCCC] hover:bg-[#39cccc97]"
                        }`}
                >
                    Previous
                </button>

                <span className="text-gray-700 font-semibold">
                     {page} of {totalPages}
                </span>

                <button
                    onClick={handleNext}
                    disabled={page === totalPages}
                    className={`px-5 py-2 rounded-lg border text-sm font-medium ${page === totalPages
                        ? "text-gray-400 border-gray-300 cursor-pointer"
                        : "text-[#39CCCC] border-[#39CCCC] hover:bg-[#39cccc97]"
                        }`}
                >
                    Next
                </button>
            </div>
          </div>
          {selectedImage && (
  <div
   className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
    onClick={() => setSelectedImage(null)}
  >
    <img
      src={selectedImage}
      className="max-w-3xl max-h-[90vh] rounded-lg shadow-lg"
      onClick={(e) => e.stopPropagation()} 
    />
  </div>
)}

          <Footer />
        </>
      );
}