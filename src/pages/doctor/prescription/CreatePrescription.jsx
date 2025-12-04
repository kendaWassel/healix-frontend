import React, { useState, useEffect } from "react";

const CreatePrescription = ({ isOpen, onClose, onSave, consultationId, patientId }) => {
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showFormPopup, setShowFormPopup] = useState(false);

  const [prescription, setPrescription] = useState({
    medicine: "",
    dose: "",
    duration: "",
    notes: "",
  });

  useEffect(() => {
    if (isOpen) {
      setShowConfirmPopup(true);
      setShowFormPopup(false);
      setPrescription({
        medicine: "",
        dose: "",
        duration: "",
        notes: "",
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSavePrescription = async () => {
    const token = localStorage.getItem("token");
    try {
      // Replace with actual API endpoint
      const response = await fetch(
        `https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/doctor/consultations/${consultationId}/prescription`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...prescription,
            patient_id: patientId,
            consultation_id: consultationId,
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
      {/* Confirmation Modal */}
      {showConfirmPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#05244380] backdrop-blur-sm z-[60]">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md text-center animate-fadeIn border border-gray-100">
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
                className="text-[20px] w-full flex items-center justify-center gap-2 bg-[var(--dark-blue)] px-6 py-2 rounded-md text-white hover:bg-[#052443db] transition"
              >
                Yes
              </button>

              <button
                onClick={() => {
                  setShowConfirmPopup(false);
                  if (onClose) onClose();
                }}
                className="bg-[#e71313] text-white text-[20px] w-full px-6 py-2 rounded-md hover:bg-[#e71313ad] transition"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Prescription Form Modal */}
      {showFormPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#05244380] backdrop-blur-sm z-[60]">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md animate-fadeIn border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Prescription Details
            </h2>

            <div className="flex flex-col gap-4 mb-6">
              <div>
                <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                  Medicine Name
                </label>
                <input
                  type="text"
                  placeholder="Enter medicine name"
                  value={prescription.medicine}
                  onChange={(e) =>
                    setPrescription({ ...prescription, medicine: e.target.value })
                  }
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-[var(--dark-blue)] focus:border-[var(--dark-blue)] outline-none"
                />
              </div>

              <div>
                <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                  Dose
                </label>
                <input
                  type="text"
                  placeholder="Enter dose"
                  value={prescription.dose}
                  onChange={(e) =>
                    setPrescription({ ...prescription, dose: e.target.value })
                  }
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-[var(--dark-blue)] focus:border-[var(--dark-blue)] outline-none"
                />
              </div>

              <div>
                <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  placeholder="Enter duration"
                  value={prescription.duration}
                  onChange={(e) =>
                    setPrescription({ ...prescription, duration: e.target.value })
                  }
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-[var(--dark-blue)] focus:border-[var(--dark-blue)] outline-none"
                />
              </div>

              <div>
                <label className="block text-left text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  placeholder="Enter notes (optional)"
                  value={prescription.notes}
                  onChange={(e) =>
                    setPrescription({ ...prescription, notes: e.target.value })
                  }
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-[var(--dark-blue)] focus:border-[var(--dark-blue)] outline-none"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  handleSavePrescription();
                }}
                className="text-[20px] w-full flex items-center justify-center gap-2 bg-[var(--dark-blue)] px-6 py-2 rounded-md text-white hover:bg-[#052443db] transition"
              >
                Save Prescription
              </button>

              <button
                onClick={() => {
                  setShowFormPopup(false);
                  if (onClose) onClose();
                }}
                className="bg-[#e71313] text-white text-[20px] w-full px-6 py-2 rounded-md hover:bg-[#e71313ad] transition"
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
