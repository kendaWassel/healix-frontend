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
import Modal from "./Modal";
import PaymentModal from "../../../components/PaymentModal";
import RatingModal from "../DoctorConsultation/Booking/RatingModal";
import DoneModal from "../DoctorConsultation/Booking/DoneModal";
import styles from "./Receipts.module.css";
export default function Receipts() {
  const [receipts, setReceipts] = useState([]);
  const [pharmacistReceipts, setPharmacistReceipts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPharmacist, setIsLoadingPharmacist] = useState(false);
  const [error, setError] = useState(null);
  const [errorPharmacist, setErrorPharmacist] = useState(null);
  const [selectedSessionId, setSelectedSessionId] = useState(null);

  const [sendPharmacy, setSendPharmacy] = useState(false);
  const [done, setDone] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showBookingDone, setShowBookingDone] = useState(false);

  const [uploadDisabled, setUploadDisabled] = useState(false);
  const [selectedReceiptId, setSelectedReceiptId] = useState(null);
  const [sendPharmacyReceiptId, setSendPharmacyReceiptId] = useState(null);
  const [phLoadBtn, setPhLoadBtn] = useState(false);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [deliveryLoading, setDeliveryLoading] = useState(false);
  const [deliveryData, setDeliveryData] = useState(null);
  const [deliveryMessage, setDeliveryMessage] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 3,
    totalPages: 1,
  });

  const [pharmacistPagination, setPharmacistPagination] = useState({
    currentPage: 1,
    itemsPerPage: 3,
    totalPages: 1,
  });

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const fetchMyReceipts = async () => {
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
console.log('my reciepts: ',data);
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

  const fetchPharmacistReceipts = async () => {
    if(!phLoadBtn)return;
    setIsLoadingPharmacist(true);
    setErrorPharmacist(null);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/patient/view-prescriptions-with-pricing?page=${pharmacistPagination.currentPage}&per_page=${pharmacistPagination.itemsPerPage}`,
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
      console.log('pharmacist receipts: ', data);
      
      // Handle response structure: {data: [...], meta: {...}} or {status: "success", data: [...], meta: {...}}
      const receiptData = Array.isArray(data?.data) ? data.data : (Array.isArray(data) ? data : []);
      const meta = data?.meta || data.meta;
      
      if (Array.isArray(receiptData)) {
        const formatted = receiptData.map((p) => ({
          id: p.order_id,
          name: p.pharmacy?.name || "Unknown Pharmacy",
          source: p.source || "Unknown",
          date: p.priced_at ? new Date(p.priced_at).toLocaleDateString() : "",
          status: p.status || "Unknown",
          pharmacy: p.pharmacy,
          items: p.items || [],
          total_quantity: p.total_quantity || 0,
          total_price: p.total_price || 0,
          total_amount: p.total_amount || 0,
        }));

        setPharmacistReceipts(formatted);

        setPharmacistPagination((prev) => ({
          ...prev,
          totalPages: Math.ceil(
            (meta?.total_pages || 0) / (meta?.per_page || 1)
          ),
        }));
      } else {
        setPharmacistReceipts([]);
        setPharmacistPagination((prev) => ({ ...prev, totalPages: 1 }));
      }
    } catch (err) {
      console.error(err);
      setErrorPharmacist("Failed to load pharmacist receipts.");
    } finally {
      setIsLoadingPharmacist(false);
    }
  };
  const fetchDeliveryInfo = async (order_id) => {
    setDeliveryLoading(true);
    setDeliveryData(null);
    setDeliveryMessage("");
  
    const token = localStorage.getItem("token");
  
    try {
      const response = await fetch(
        `https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/patient/orders/${order_id}/delivery-info`,
        {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
  
      const data = await response.json();
      console.log("delivery info:", data);
  
      if (data.status === "success") {
        setDeliveryData(data.data);
      } else {
        setDeliveryMessage(data.message || "No delivery assigned yet");
      }
    } catch (err) {
      console.error(err);
      setDeliveryMessage("Failed to load delivery info");
    } finally {
      setDeliveryLoading(false);
      console.log("delivery data:", deliveryData);
    }
  };
  

  useEffect(() => {
    setShowPaymentModal(false);
    fetchMyReceipts();
  }, [pagination.currentPage]);

  useEffect(() => {
    setShowPaymentModal(false);
    if(phLoadBtn)
      fetchPharmacistReceipts();
  }, [phLoadBtn,pharmacistPagination.currentPage]);

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    setTimeout(() => {
      setShowRatingModal(true);
    }, 300);
  };

  const handleRatingSkip = () => {
    setSelectedSessionId(null);
    setShowRatingModal(false);
    setTimeout(() => {
      setShowBookingDone(true);
    }, 300);
  };
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
        fetchMyReceipts();
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

  const handlePharmacistNextPage = () => {
    if (pharmacistPagination.currentPage < pharmacistPagination.totalPages) {
      setPharmacistPagination((prev) => ({
        ...prev,
        currentPage: prev.currentPage + 1,
      }));
    }
  };

  const handlePharmacistPrevPage = () => {
    if (pharmacistPagination.currentPage > 1) {
      setPharmacistPagination((prev) => ({
        ...prev,
        currentPage: prev.currentPage - 1,
      }));
    }
  };

  return (
    <>
      <PatientHeader />
      <div className="min-h-[60vh]">
      <div className="my-receipts">
      <div className={`${styles.CardContainer} pt-[0_!important]`}>
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
{isLoading ?
  <div className="text-center my-5">
  <p className={styles.loading}>Loading...</p>
  </div>
:
error?
<div className="text-center my-5">
<p className={styles.error}>{error}</p>
</div>
:
receipts.length > 0 ?
<>
        <div className={styles.CardsWrapper}>
          {receipts.map((item) => (
            <div
              key={item.id}
              className={`${styles.Cardbtn} cursor-pointer`}
              onClick={() => setSelectedReceiptId(item.id)}
            >
              <div className={styles.CardTop}>
                <div className={styles.DoctorText}>
                  <h3>{item.Name}</h3>
                  <p>{item.Date}</p>
                  {item.status=== "rejected" && 
                  <h4 className="text-white bg-red-400 rounded-md px-3 py-1 w-[fit-content] my-3">{item.status}</h4>
                  }
                </div>
              </div>
{item.status === "created" || item.status=== "rejected" ? 
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
              :
              <h3 className="mt-3 bg-[var(--card-border)] w-[fit-content] p-1 rounded-[12px] cursor-default">
                Sent
              </h3>
}
            </div>
          ))}
        </div>
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
</>
:
<div className="text-center my-5">
<p className="text-lg">No Delivery Orders Found</p>
</div>
}

        <SendToPharmacy
          open={sendPharmacy}
          prescription_id={sendPharmacyReceiptId}
          onClose={() => setSendPharmacy(false)}
          onDone={() => {
            setSendPharmacy(false);
            setDone(true);
          }}
        />

        <YouAreDone
          isOpen={done}
          onHome={() => {
            setDone(false);
            navigate("/home");
          }}
        />

        {selectedReceiptId && (
          <ReceiptDetails
            open={true}
            prescription_id={selectedReceiptId}
            onClose={() => setSelectedReceiptId(null)}
          />
        )}
      </div>
    </div>
      <div className="ph-receipts">
      <div className={styles.CardContainer}>
        <div className={styles.CardHeader}>
          <h1>Receipts from pharmacist</h1>

          <p className="mt-[1rem_!important]">Check Your accepted receipts</p>
        </div>
        {phLoadBtn === false ? 
  <div className="text-center my-5">
    <button
  onClick={() => setPhLoadBtn(true)}
  className="px-6 py-2 my-5 rounded-lg text-white text-[18px] bg-[var(--dark-blue)] hover:opacity-90 transition"
>
  Load Orders
</button>
    </div>
      :
      isLoadingPharmacist?
      <div className="text-center my-5"> 
<p className={styles.loading}>Loading...</p>
      </div>
      :
      errorPharmacist?
      <div className="text-center my-5"> 
<p className={styles.error}>{errorPharmacist}</p>
      </div>
      :
      pharmacistReceipts.length > 0 ?
      <> 
        <div className={styles.CardsWrapper}>
          {pharmacistReceipts.map((item) => (
            <div
              key={item.id}
              className={styles.Cardbtn}
            >
                <div className={styles.DoctorText}>
                  <h3 className="text-[22px]">{item.name}</h3>
                  <p className="font-medium my-2 text-[var(--cyan)]">Source: {item.source}</p>
                  {item.items && item.items.length > 0 && (
                    <div className="border-b py-3">
                      <h4 className="text-[19px] font-medium">Medicines:</h4>
                      <div className="my-1">
                        {item.items.map((medicine, index) => (
                          <div key={index} className="flex justify-between items-center text-sm">
                            <div className="flex-1 my-1">
                              <p className="font-medium">{medicine.medicine_name}</p>
                              <p className="text-gray-500">Quantity: {medicine.quantity}</p>
                            </div>
                            <p className="font-semibold text-[var(--text-color)]">${medicine.price?.toFixed(2) || '0.00'}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-sm text-gray-600 font-semibold">Total: ${item.total_price.toFixed(2)}</p>
                    <p className="text-sm text-[var(--text-color)] font-semibold">{item.date}</p>
                  </div>
                  <button
  onClick={() => {
    setShowDeliveryModal(true);
    console.log('order_id : ',item.id);
    fetchDeliveryInfo(item.id);
  }}
  className="px-6 py-2 my-5 rounded-lg text-white text-[18px] bg-[var(--dark-blue)] hover:opacity-90 transition"
>
  Delivery info
</button>
<button
  onClick={() => {
    setSelectedSessionId(item.id);
    setShowPaymentModal(true);
    console.log('pay and rate modal ');
  }}
  className="px-6 py-2 my-5 rounded-lg text-white text-[18px] bg-[var(--dark-blue)] hover:opacity-90 transition"
>
  Pay and Rate
</button>
<p className="text-lg text-gray-600 font-semibold">Total Price with delivery fee: $ {item.total_amount.toFixed(2)}</p>
                </div>
            </div>
          ))}
        </div>
        <div className={styles.paginationControls}>
        <button
          className={styles.pageButton}
          onClick={handlePharmacistPrevPage}
          disabled={pharmacistPagination.currentPage === 1}
        >
          <FontAwesomeIcon icon={faChevronLeft} /> Prev
        </button>

        <span className={styles.pageInfo}>
          {pharmacistPagination.currentPage} of {pharmacistPagination.totalPages}
        </span>

        <button
          className={styles.pageButton}
          onClick={handlePharmacistNextPage}
          disabled={pharmacistPagination.currentPage === pharmacistPagination.totalPages}
        >
          Next <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      </>
        :
        <p className="text-center text-lg my-5">No Accepted Reciepts Found</p>
        }
      </div>
    </div>
      </div>
    <Modal open={showDeliveryModal} onClose={() => setShowDeliveryModal(false)}>
  <h2 className="text-2xl font-bold text-[#0a3460] mb-4">
    Delivery Information
  </h2>

  {deliveryLoading ? (
    <p className="text-center text-gray-500">Loading delivery info...</p>
  ) : deliveryData ? (
    <div className="flex items-center gap-4">
      <img
        src={deliveryData.delivery.image || "/no-photo.png"}
        alt={deliveryData.delivery.name}
        className="w-20 h-20 rounded-full object-cover border-2 border-[var(--cyan)]"
      />

      <div className="space-y-1">
        <p className="text-lg font-bold">{deliveryData.delivery.name}</p>
        <p>
          <span className="text-[var(--cyan)] font-medium">Phone:</span>{" "}
          {deliveryData.delivery.phone}
        </p>
        <p>
          <span className="text-[var(--cyan)] font-medium">Vehicle:</span>{" "}
          {deliveryData.delivery.vehicle_type}
        </p>
        <p>
          <span className="text-[var(--cyan)] font-medium">Plate Number:</span>{" "}
          {deliveryData.delivery.plate_number}
        </p>
        <p>
          <span className="text-[var(--cyan)] font-medium">Delivery Fee:</span>{" "}
          {deliveryData.delivery.delivery_fee}$
        </p>
        <p>
          <span className="text-[var(--cyan)] font-medium">Status:</span>{" "}
          {deliveryData.order_status}
        </p>
      </div>
    </div>
  ) : (
    <p className="text-center text-gray-600 font-medium">
      {deliveryMessage}
    </p>
  )}
</Modal>

<RatingModal
        isOpen={showRatingModal}
        onClose={handleRatingSkip}
        url={`consultations/${selectedSessionId}/rate/`}
        onRatingSuccess={() => {
          setShowRatingModal(false);
          setTimeout(() => {
            setShowBookingDone(true);
          }, 300);
        }}
      />
<PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onPaymentSuccess={handlePaymentSuccess}
        paymentType="delivery"
      />
            <DoneModal
        isOpen={showBookingDone}
        onHome={() => {
          setShowBookingDone(false);
          onClose();
        }}
        message="Thank you for your feedback!"
      />
      <Footer />
    </>
  );
}
