import { useState } from "react";
import { Search, ChevronDown, Star, Clock, MapPin } from "lucide-react";
import { Modal, Box } from "@mui/material";

const SendToPharmacy = ({ open, onClose,onDone }) => {
  const pharmacies = [
    {
      name: "Ahmad Pharmacy",
      desc: "specializes in diagnosing and treating heart and blood vessel diseases",
      rating: "4.0 (34)",
      time: "from 8 Am to 9 Pm",
      address: "Damascus/maza/45street",
    },
    {
      name: "Ahmad Pharmacy",
      desc: "specializes in diagnosing and treating heart and blood vessel diseases",
      rating: "4.0 (34)",
      time: "from 8 Am to 9 Pm",
      address: "Damascus/maza/45street",
    },
  ];


  const [selectedPharmacy, setSelectedPharmacy] = useState(null);

  return (
    
    <Modal
    open={open}
    onClose={onClose}
    slotProps={{
      backdrop: {
        style: { backgroundColor: "rgba(0,0,0,0.5)" }
     
      }
    }}
  >
    <Box
      sx={{
        width: "90%",
        maxWidth: 500,
        margin: "120px auto",
        bgcolor: "#f8f8f8",
        p: 3,
        borderRadius: "12px"
      }}
    >
      <h1 className="text-xl font-semibold text-[#0A2A4A] mb-4">Send to pharmacy</h1>
  
      <div className="flex items-center gap-3 w-full mb-4">
        <div className="border rounded-xl px-3 py-2 flex items-center gap-2 flex-1">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search pharmacy..."
            className="w-full outline-none"
          />
        </div>
  
        <button className="border rounded-xl px-4 py-2 flex items-center gap-2 text-[#0A2A4A]">
          Damascus <ChevronDown size={18} />
        </button>
      </div>
  
      <div className="overflow-y-auto max-h-[55vh] pr-2 space-y-4" >
        {pharmacies.map((p, index) => (
    <div
    key={index}
    onClick={() => setSelectedPharmacy(index)}
    className={`
      border p-4 rounded-lg cursor-pointer transition
      ${selectedPharmacy === index ? "border-[#39CCCC] text-[#39CCCC]" : "border-gray-300"}
      hover:border-[#39CCCC] hover:text-[#39CCCC]
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
  
      <div className="flex justify-between mt-6">
        <button
          onClick={()=>{
            
            setSelectedPharmacy(null);
            onClose() }}
          className="border border-[#0A2A4A] text-[#0A2A4A] px-6 py-2 rounded-xl hover:bg-gray-100"
        >
          Cancel
        </button>
  
        <button
  onClick={() => {
    if (!selectedPharmacy===null) return;
            onClose();
            onDone();
  }}
  className="bg-[#0A2A4A] text-white px-10 py-2 rounded-xl hover:bg-[#082a3d]"
>
  Send
</button>

      </div>
    </Box>
  </Modal>
  
  );
};

export default SendToPharmacy;