import Modal from "./Modal";


const ReceiptDetails = ({ open, onClose, receipt }) => {
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

        <h1 className="text-xl font-semibold text-[#0A2A4A] mb-4">
          Receipt Details
        </h1>

        <div className="overflow-y-auto max-h-[55vh] pr-2 space-y-4">
          
 
          {receipt?.type === "image" && (
            <img
            src={receipt.local_preview || receipt.image_url}
              alt="Prescription"
              className="w-full h-auto rounded-md shadow"
            />
          )}

       
          {receipt?.type === "digital" && receipt.medicines?.map((med) => (
            <div key={med.id}>
              <h3 className="font-semibold text-lg">{med.name}</h3>
              <p>{med.dosage}</p>
              {med.instructions && <p>{med.instructions}</p>}
              {med.notes && <p>{med.notes}</p>}
            </div>
          ))}

          <div className="flex justify-end mt-6">
            <button
              onClick={onClose}
              className="border border-[#0A2A4A] text-[#0A2A4A] px-6 py-2 rounded-xl hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
   
    </Modal>
  );
};

export default ReceiptDetails;


