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
 // Interactions 
  const [interactionWarnings, setInteractionWarnings] = useState([]);
  const [showInteractionPopup, setShowInteractionPopup] = useState(false);
  const [checking, setChecking] = useState(false);

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
// handle Interactions
const checkInteractions = async () => {
  const drugNames = medicines
    .map((m) => m.name.trim())
    .filter((name) => name !== "");

  if (drugNames.length < 2) return [];

  try {
    const response = await fetch("http://localhost:8000/screen", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ drugs: drugNames }),
    });
    if (!response.ok) return [];
    const data = await response.json();

    const dangerous = (data.findings || []).filter(
      (f) => f.severity === "Major" || f.severity === "Moderate"
    );

    // 👇Alternatives
    const withAlternatives = await Promise.all(
      dangerous.map(async (f) => {
        try {
          const res = await fetch(
            `http://localhost:8000/interaction?drug_a=${encodeURIComponent(f.drug_a)}&drug_b=${encodeURIComponent(f.drug_b)}`
          );
          const detail = await res.json();
          return {
            ...f,
            alternatives: detail.alternatives?.candidates || [],
            alt_for: f.drug_b, 
          };
        } catch {
          return { ...f, alternatives: [], alt_for: f.drug_b };
        }
      })
    );

    return withAlternatives;
  } catch (err) {
    console.error("DDI check failed:", err);
    return [];
  }
};

  const handleSavePrescription = async () => {
  // Interaction check first
  setChecking(true);
  const warnings = await checkInteractions();
  setChecking(false);

  //  if interaction -> dont save
  if (warnings.length > 0) {
    setInteractionWarnings(warnings);
    setShowInteractionPopup(true);
    return; 
  }

  // no interaction , save direct
  await saveToServer();
};

const saveToServer = async () => {
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
      setShowInteractionPopup(false);
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
            {/*Interaction popup*/}
{showInteractionPopup && (
  <div className="fixed inset-0 flex items-center justify-center bg-[#05244380] backdrop-blur-sm z-[70]">
    <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md max-h-[80vh] overflow-y-auto">
      <h2 className="text-2xl font-semibold text-red-600 mb-2 text-center">
         Warning : Drug Interaction ⚠️
      </h2>
      <p className="text-gray-700 mb-4 text-center">
       Interaction between this Drugs : 
      </p>

      {/* Interaction List */}
      <div className="space-y-3 mb-6">
        {interactionWarnings.map((w, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg border-2 ${
              w.severity === "Major"
                ? "border-red-500 bg-red-50"
                : "border-yellow-500 bg-yellow-50"
            }`}
          >
            <div className="font-semibold">
              {w.drug_a} + {w.drug_b}
            </div>
            <div
              className={`text-sm font-bold ${
                w.severity === "Major" ? "text-red-600" : "text-yellow-700"
              }`}
            >
              Sevirity : {w.severity === "Major" ? "Major 🔴" : "Moderate 🟠"}
            </div>

            {/* Alternatives */}
            {w.alternatives && w.alternatives.length > 0 && (
              <div className="mt-2 pt-2 border-t border-gray-300">
                <div className="text-xs text-gray-600 mb-1">
                         Alternatives Suggestions : <b>{w.alt_for}</b>:
                </div>
                <div className="flex flex-wrap gap-1">
                  {w.alternatives.slice(0, 4).map((alt, j) => (
                    <span
                      key={j}
                      className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-md"
                    >
                      {alt.name}
                    </span>
                  ))}
                </div>
                  
                  <div className="text-[10px] text-gray-400 mt-1">
                    Initial Suggestions - Doctor Decides 
                    </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={saveToServer}
          className="w-full bg-[var(--dark-blue)] text-white py-2 text-[18px] rounded-lg"
        >
         I Understood the Risks - Save Prescription
        </button>
        <button
          onClick={() => setShowInteractionPopup(false)}
          className="w-full bg-[#e71313] text-white py-2 text-[18px] rounded-lg"
        >
         Cancel - Edit Drugs
        </button>
      </div>
    </div>
  </div>
)}
            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleSavePrescription}
                disabled={checking}
                className="w-full bg-[var(--dark-blue)] text-white py-2 text-[18px] rounded-lg disabled:opacity-50"
              >
                  {checking ? "Checking Interactions ..." : "Save Prescription"}
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
