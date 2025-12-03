import React, { useState } from "react";

const PrescriptionPage = () => {
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showFormPopup, setShowFormPopup] = useState(false);

  const [prescription, setPrescription] = useState({
    medicine: "",
    dose: "",
    duration: "",
    notes: "",
  });

  return (
    <div className="p-10">
      {/* زر يفتح البوب أب الأول */}
      <button
        onClick={() => setShowConfirmPopup(true)}
        className="px-6 py-3 bg-[#39CCCC] text-white rounded-xl hover:bg-[#2fa9a9]"
      >
        Create Prescription
      </button>

      {/* Popup 1 — Confirmation */}
      {showConfirmPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-7 rounded-xl shadow-xl w-[350px] text-center">
            <h2 className="text-xl font-bold text-[#0a3460] mb-4">
              Do you want to create prescription?
            </h2>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setShowConfirmPopup(false);
                  setShowFormPopup(true);
                }}
                className="px-5 py-2 bg-[#39CCCC] text-white rounded-lg hover:bg-[#2fa9a9]"
              >
                Yes
              </button>

              <button
                onClick={() => setShowConfirmPopup(false)}
                className="px-5 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup 2 — Form */}
      {showFormPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-7 rounded-xl shadow-xl w-[400px]">
            <h2 className="text-xl font-bold text-[#0a3460] mb-6 text-center">
              Prescription Details
            </h2>

            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Medicine name"
                value={prescription.medicine}
                onChange={(e) =>
                  setPrescription({ ...prescription, medicine: e.target.value })
                }
                className="border p-2 rounded-lg w-full"
              />

              <input
                type="text"
                placeholder="Dose"
                value={prescription.dose}
                onChange={(e) =>
                  setPrescription({ ...prescription, dose: e.target.value })
                }
                className="border p-2 rounded-lg w-full"
              />

              <input
                type="text"
                placeholder="Duration"
                value={prescription.duration}
                onChange={(e) =>
                  setPrescription({ ...prescription, duration: e.target.value })
                }
                className="border p-2 rounded-lg w-full"
              />

              <textarea
                placeholder="Notes"
                value={prescription.notes}
                onChange={(e) =>
                  setPrescription({ ...prescription, notes: e.target.value })
                }
                className="border p-2 rounded-lg w-full"
                rows={3}
              />
            </div>

            {/* الأزرار */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => {
                  alert("Prescription Saved!");
                  setShowFormPopup(false);
                }}
                className="px-5 py-2 bg-[#39CCCC] text-white rounded-lg hover:bg-[#2fa9a9]"
              >
                Save
              </button>

              <button
                onClick={() => setShowFormPopup(false)}
                className="px-5 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrescriptionPage;
