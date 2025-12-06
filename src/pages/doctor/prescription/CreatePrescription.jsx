import React, { useState, useEffect } from "react";

const CreatePrescription = ({ isOpen, onClose, onSave, consultationId }) => {
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showFormPopup, setShowFormPopup] = useState(false);

  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");

  // Medicines (Array)
  const [medicines, setMedicines] = useState([
    { name: "", dosage: "", boxes: "", instructions: "" },
  ]);

  useEffect(() => {
    if (isOpen) {
      setShowConfirmPopup(true);
      setShowFormPopup(false);
      setDiagnosis("");
      setNotes("");
      setMedicines([{ name: "", dosage: "", boxes: "", instructions: "" }]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAddMedicine = () => {
    setMedicines([
      ...medicines,
      { name: "", dosage: "", boxes: "", instructions: "" },
    ]);
  };

  const handleMedicineChange = (index, field, value) => {
    const updated = [...medicines];
    updated[index][field] = value;
    setMedicines(updated);
  };

  const handleSavePrescription = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/doctor/prescriptions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            consultation_id: consultationId,
            diagnosis,
            notes,
            medicines,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Prescription saved:", data);

        if (onSave) onSave();
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to save prescription");
      }
    } catch (err) {
      console.error("Error saving prescription:", err);
      alert("Failed to save prescription. Please try again.");
    }
  };

  return (
    <>
      {/* Confirm Popup */}
      {showConfirmPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#05244380] backdrop-blur-sm z-[60]">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Create Prescription
            </h2>
            <p className="text-gray-700 mb-6">
              Do you want to create a prescription for this patient?
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setShowConfirmPopup(false);
                  setShowFormPopup(true);
                }}
                className="text-[20px] w-full bg-[var(--dark-blue)] px-6 py-2 rounded-md text-white"
              >
                Yes
              </button>

              <button
                onClick={() => {
                  setShowConfirmPopup(false);
                  if (onClose) onClose();
                }}
                className="bg-[#e71313] text-white text-[20px] w-full px-6 py-2 rounded-md"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Prescription Form */}
      {showFormPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#05244380] backdrop-blur-sm z-[60]">
         <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md 
     max-h-[80vh] overflow-y-auto">

            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Prescription Details
            </h2>

            {/* Diagnosis */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">Diagnosis</label>
              <input
                type="text"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                className="w-full border px-3 py-2 rounded-lg"
                placeholder="Enter diagnosis"
              />
            </div>

            {/* Notes */}
            <div className="mb-6">
              <label className="block mb-2 font-medium">Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full border px-3 py-2 rounded-lg"
                placeholder="General notes"
              />
            </div>

            {/* Medicines */}
            <h3 className="text-lg font-semibold mb-3">Medicines</h3>

            {medicines.map((med, index) => (
              <div key={index} className="border p-3 rounded-lg mb-3">
                <input
                  type="text"
                  placeholder="Medicine Name"
                  value={med.name}
                  onChange={(e) =>
                    handleMedicineChange(index, "name", e.target.value)
                  }
                  className="w-full mb-2 border px-3 py-2 rounded-lg"
                />

                <input
                  type="text"
                  placeholder="Dosage (e.g., 500mg)"
                  value={med.dosage}
                  onChange={(e) =>
                    handleMedicineChange(index, "dosage", e.target.value)
                  }
                  className="w-full mb-2 border px-3 py-2 rounded-lg"
                />

                <input
                  type="text"
                  placeholder="Boxes"
                  value={med.boxes}
                  onChange={(e) =>
                    handleMedicineChange(index, "boxes", e.target.value)
                  }
                  className="w-full mb-2 border px-3 py-2 rounded-lg"
                />

                <input
                  type="text"
                  placeholder="Instructions"
                  value={med.instructions}
                  onChange={(e) =>
                    handleMedicineChange(index, "instructions", e.target.value)
                  }
                  className="w-full border px-3 py-2 rounded-lg"
                />
              </div>
            ))}

            <button
              onClick={handleAddMedicine}
              className="w-full mb-4 py-2 bg-gray-200 rounded-lg font-medium"
            >
              + Add Another Medicine
            </button>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleSavePrescription}
                className="w-full bg-[var(--dark-blue)] text-white py-2 text-[18px] rounded-lg"
              >
                Save Prescription
              </button>

              <button
                onClick={() => {
                  setShowFormPopup(false);
                  if (onClose) onClose();
                }}
                className="w-full bg-[#e71313] text-white py-2 text-[18px] rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePrescription;
