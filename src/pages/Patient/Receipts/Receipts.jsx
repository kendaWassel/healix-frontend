import styles from "./Receipts.module.css";
import PatientHeader from "../../../components/headers/PatientHeader";
import { Send } from "lucide-react";
import SendToPharmacy from "./SendtoPharmacy";
import ReceiptDetails from "./ReceiptsDetails";
import YouAreDone from "./YouAreDone";
import Footer from "../../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Receipts() {
  const [receipts, setReceipts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [sendPharmacy, setSendPharmacy] = useState(false);
  const [done, setDone] = useState(false);

  const [uploadDisabled, setUploadDisabled] = useState(false);
  const [selectedReceiptId, setSelectedReceiptId] = useState(null);
  const [sendPharmacyReceiptId, setSendPharmacyReceiptId] = useState(null);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 6,
    totalPages: 1,
  });

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  /* ================= Fetch Receipts ================= */
  const fetchReceipts = async () => {
    setIsLoading(true);
    setError(null);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/patient/prescriptions?page=${pagination.currentPage}&per_page=${pagination.itemsPerPage}`,
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

      if (data?.status === "success" && Array.isArray(data?.data?.items)) {
        const formatted = data.data.items.map((p) => ({
          id: p.id,
          Name: p.doctor_name || "Uploaded by you",
          Date: p.issued_at ? new Date(p.issued_at).toLocaleDateString() : "",
          status: p.status || "N/A",
          diagnosis: p.diagnosis || "N/A",
          prescription_image_url: p.prescription_image_url || null,
        }));

        setReceipts(formatted);

        setPagination((prev) => ({
          ...prev,
          totalPages: Math.ceil(
            (data.data.meta?.total || 0) / (data.data.meta?.per_page || 1)
          ),
        }));
      } else {
        setReceipts([]);
        setPagination((prev) => ({ ...prev, totalPages: 1 }));
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load receipts.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReceipts();
  }, [pagination.currentPage]);

  /* ================= Upload ================= */
  const handleUpload = () => {
    setUploadDisabled(true);
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setUploadDisabled(false);
      return;
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("image", file);
    formData.append("category", "prescription");

    try {
      setIsLoading(true);

      const response = await fetch(
        "https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/patient/prescriptions/upload",
        {
          method: "POST",
          headers: {
      
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        const prescriptionId = data.data.prescription_id;
        fetchReceipts();
      }
    } catch (err) {
      console.error(err);
      setError("Failed to upload receipt.");
    } finally {
      setIsLoading(false);
      setUploadDisabled(false);
      fileInputRef.current.value = "";
    }
  };

  /* ================= Pagination ================= */
  const handleNextPage = () => {
    if (pagination.currentPage < pagination.totalPages) {
      setPagination((prev) => ({
        ...prev,
        currentPage: prev.currentPage + 1,
      }));
    }
  };

  const handlePrevPage = () => {
    if (pagination.currentPage > 1) {
      setPagination((prev) => ({
        ...prev,
        currentPage: prev.currentPage - 1,
      }));
    }
  };

  return (
    <>
      <PatientHeader />

      <div className={styles.CardContainer}>
        <div className={styles.CardHeader}>
          <h1>My Receipts</h1>

          <button
            className={styles.AddButton}
            onClick={handleUpload}
            disabled={uploadDisabled}
          >
            Upload Receipt
          </button>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          <p>Check Your Receipts and send them or add new ones</p>
        </div>

        {isLoading && <p className={styles.loading}>Loading...</p>}
        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.CardsWrapper}>
          {receipts.map((item) => (
            <div
              key={item.id}
              className={styles.Cardbtn}
              onClick={() => setSelectedReceiptId(item.id)}
            >
              <div className={styles.CardTop}>
                <div className={styles.DoctorText}>
                  <h3>{item.Name}</h3>
                  <p>{item.Date}</p>
                </div>
              </div>

              <button
                className={styles.sendBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  setSendPharmacyReceiptId(item.id);
                  setSendPharmacy(true);
                }}
              >
                <Send size={16} /> Send to Pharmacy
              </button>
            </div>
          ))}
        </div>

        {/* ===== Send To Pharmacy ===== */}
        <SendToPharmacy
          open={sendPharmacy}
          prescription_id={sendPharmacyReceiptId}
          onClose={() => setSendPharmacy(false)}
          onDone={() => {
            setSendPharmacy(false);
            setDone(true);
          }}
        />

        {/* ===== Done ===== */}
        <YouAreDone
          isOpen={done}
          onHome={() => {
            setDone(false);
            navigate("/home");
          }}
        />

        {/* ===== Receipt Details ===== */}
        {selectedReceiptId && (
          <ReceiptDetails
            open={true}
            prescription_id={selectedReceiptId}
            onClose={() => setSelectedReceiptId(null)}
          />
        )}
      </div>

      {/* ===== Pagination ===== */}
      <div className={styles.paginationControls}>
        <button
          className={styles.pageButton}
          onClick={handlePrevPage}
          disabled={pagination.currentPage === 1}
        >
          <FontAwesomeIcon icon={faChevronLeft} /> Prev
        </button>

        <span className={styles.pageInfo}>
          {pagination.currentPage} of {pagination.totalPages}
        </span>

        <button
          className={styles.pageButton}
          onClick={handleNextPage}
          disabled={pagination.currentPage === pagination.totalPages}
        >
          Next <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>

      <Footer />
    </>
  );
}
