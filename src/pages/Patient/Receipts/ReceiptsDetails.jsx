import { useEffect, useState } from "react";
import Modal from "./Modal";

const ReceiptDetails = ({ open, onClose, prescription_id }) => {
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!open || !prescription_id) return;

    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");

        const response = await fetch(
          `https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/patient/prescriptions/${prescription_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "true",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (data.status === "success") {
          setReceipt(data.data);
        } else {
          setError("Failed to load prescription details.");
        }
      } catch (err) {
        setError("Network error");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [open, prescription_id]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      slotProps={{
        backdrop: { style: { backgroundColor: "rgba(0,0,0,0.5)" } },
      }}
    >
      <h1 className="text-xl font-semibold text-[#0A2A4A] mb-4">
        Prescription Details
      </h1>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* ===== CONTENT ===== */}
      {receipt && (
        <div className="overflow-y-auto max-h-[55vh] pr-2 space-y-4">
          {/* ===== CASE 1: IMAGE PRESCRIPTION ===== */}
          {receipt.prescription_image_url ? (
            <div className="flex flex-col items-center gap-4">
              <img
                src={receipt.prescription_image_url }
                alt="Prescription"
                className="max-w-full max-h-[45vh] rounded-lg border"
              />
              <p className="text-sm text-gray-500">Uploaded prescription image</p>
            </div>
          ) : (
            /* ===== CASE 2: DIGITAL PRESCRIPTION ===== */
            <>
              <div>
                <p><strong>Doctor:</strong> {receipt.doctor_name}</p>
                <p><strong>Diagnosis:</strong> {receipt.diagnosis}</p>
                <p><strong>Notes:</strong> {receipt.notes}</p>
                <p><strong>Status:</strong> {receipt.status}</p>
              </div>

              <hr />

              <h3 className="font-semibold text-lg">Medicines</h3>
              {receipt.medicines?.map((med, index) => (
                <div key={index} className="p-3 border rounded-lg shadow-sm">
                  <p><strong>Name:</strong> {med.name}</p>
                  <p><strong>Dosage:</strong> {med.dosage}</p>
                  <p><strong>Quantity:</strong> {med.quantity}</p>
                  <p><strong>Instructions:</strong> {med.instructions}</p>
                </div>
              ))}
            </>
          )}

          <div className="flex justify-end mt-6">
            <button
              onClick={onClose}
              className="border border-[#0A2A4A] text-[#0A2A4A] px-6 py-2 rounded-xl hover:bg-gray-100"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ReceiptDetails;
