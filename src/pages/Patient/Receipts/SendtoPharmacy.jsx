import { useState,useEffect } from "react";
import { Search, ChevronDown, Star, Clock, MapPin } from "lucide-react";
import Modal from "./Modal";

const SendToPharmacy = ({ open, onClose, onDone, receiptId }) => {
  
  const pharmaciesData = [
    {
      name: "Ahmad Pharmacy",
      desc: "specializes in diagnosing and treating heart and blood vessel diseases",
      rating: "4.0 (34)",
      time: "from 8 Am to 9 Pm",
      address: "Damascus/maza/45street",
    },
    {
      name: "Leen Pharmacy",
      desc: "specializes in diagnosing and treating heart and blood vessel diseases",
      rating: "4.0 (34)",
      time: "from 8 Am to 9 Pm",
      address: "Damascus/maza/45street",
    },
  ];

  const [search, setSearch] = useState("");
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [loadingSend, setLoadingSend] = useState(false);
/*
 useEffect(() => {
 if (!open) return; 
  const fetchPharmacies = async () => 
  { 
    try

     { const response = await fetch("http://localhost:8000/api/pharmacies");
      const data = await response.json(); setPharmacies(data); } catch (error) 
      { console.error("Error fetching pharmacies:", error); } 
    }
      ; fetchPharmacies(); 
    }, [open]); 
      
      */


  const filtered = pharmaciesData.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );


  const handleSend = async () => {
    if (selectedPharmacy === null) return;

    setLoadingSend(true);

    try {
      await fetch("http://localhost:8000/api/sendReceipt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pharmacyId: selectedPharmacy,
          receiptId: receiptId,
        }),
      });

      onClose();
      onDone();
      
    } catch (error) {
      alert("Something went wrong!");
      console.error(error);
    }

    setLoadingSend(false);
  };

  return (
    <Modal open={open} onClose={onClose}>
      
      <h1 className="text-xl font-semibold text-[#0A2A4A] mb-4">Send to pharmacy</h1>

      {/* Search Bar */}
      <div className="flex items-center gap-3 w-full mb-4">
        <div className="border rounded-xl px-3 py-2 flex items-center gap-2 flex-1">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search pharmacy..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none"
          />
        </div>

        <button className="border rounded-xl px-4 py-2 flex items-center gap-2 text-[#0A2A4A]">
          Damascus <ChevronDown size={18} />
        </button>
      </div>

      {/* List */}
      <div className="overflow-y-auto max-h-[55vh] pr-2 space-y-4">
        {filtered.map((p, index) => (
          <div
            key={index}
            onClick={() => setSelectedPharmacy(index)}
            className={`border p-4 rounded-lg cursor-pointer transition
              ${
                selectedPharmacy === index
                  ? "border-[#39CCCC] text-[#39CCCC]"
                  : "border-gray-300"
              }
              hover:border-[#39CCCC] hover:text-[#39CCCC]"
            `}
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-semibold text-[#0A2A4A]">{p.name}</h2>
                <p className="text-gray-600 text-sm">{p.desc}</p>
              </div>

              <div className="flex items-center gap-1 text-[#0A2A4A] font-semibold text-sm">
                <Star size={16} /> {p.rating}
              </div>
            </div>

            <div className="flex gap-6 mt-4 text-gray-600 text-sm">
              <div className="flex items-center gap-1">
                <Clock size={16} /> {p.time}
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={16} /> {p.address}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => {
            setSelectedPharmacy(null);
            onClose();
          }}
          className="border border-[#0A2A4A] text-[#0A2A4A] px-6 py-2 rounded-xl hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          onClick={handleSend}
          className="bg-[#0A2A4A] text-white px-10 py-2 rounded-xl hover:bg-[#082a3d]"
        >
          {loadingSend ? "Sending..." : "Send"}
        </button>
      </div>

    </Modal>
  );
};

export default SendToPharmacy;
