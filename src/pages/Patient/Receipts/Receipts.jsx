import styles from "./Receipts.module.css";
import PatientHeader from "../../../components/headers/PatientHeader";
import { Send, Maximize2 } from "lucide-react";
import Footer from "../../../components/footer/Footer";
import receipts1 from "../../../assets/receipts1.png";
import receipts2 from "../../../assets/receipts2.png";
import receipts3 from "../../../assets/receipts3.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight,faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState,useEffect } from "react";

const ReceiptsData = [
  { id: 1, img: receipts1 },
  { id: 2, img: receipts2 },
  { id: 3, img: receipts3 },
  { id: 4, img: receipts1 },
  { id: 5, img: receipts2 },
  { id: 6, img: receipts3 },
];

export default function Receipts() {
    const [receipts,setReceipts]=useState([]);
    const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 6,
  });
  /*const fetchReceipts = async (page=1,perPage=10) => {
    setIsLoading(true);
    setError(null);
    try {
const response = await fetch("API_URL_HERE", {
  method: "GET",
  headers: {
      "Content-Type": "application/json",
  }
});
      if (!response.ok) {
        const serverError = await response.json().catch(() => ({}));
        throw new Error(serverError.message || "Request failed");
      }

      const data = await response.json();
      console.log("Receipts fetched:", data);

 
      if (data.status === "success" && Array.isArray(data.data)) {
        setReceipts(data.data);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Failed fetching receipts:", error);
      setError(error.message || "Failed to load receipts.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReceipts();
  }, []);

 */
  const totalItems = ReceiptsData.length;
  const totalPages = Math.ceil(totalItems / pagination.itemsPerPage);

  
  const indexOfLastItem = pagination.currentPage * pagination.itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - pagination.itemsPerPage;
  const currentItems = ReceiptsData.slice(indexOfFirstItem, indexOfLastItem);


  const handleNextPage = () => {
    if (pagination.currentPage < totalPages) {
      setPagination((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }));
    }
  };

  const handlePrevPage = () => {
    if (pagination.currentPage > 1) {
      setPagination((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }));
    }
  };

  return (
    <>
      <PatientHeader />
      <div className={styles.Container}>
        <div className={styles.Header}>
          <h1>My Receipts</h1>
          <button className={styles.AddButton}>Add A Receipt</button>
          <p>Check Your Receipts and send them or add new ones</p>
        </div>

        {isLoading && <p className={styles.loading}>Loading receipts...</p>}
        {error && <p className={styles.error}>{error}</p>}
 
        <div className={styles.ReceiptsImage}>
  {currentItems.map((type) => (
    <div key={type.id} className={styles.ReceiptsButton}>
      <div className={styles.imageWrapper}>
        <img src={type.img} alt="Receipt" className={styles.ReceiptImage} />

        <button
          className={styles.zoomBtn}
          onClick={() => {
            setSelectedImage(type.img);
            setShowModal(true);
          }}
        >
          <Maximize2 size={23} />
        </button>

        <button className={styles.sendBtn}>
          <Send size={16} />
           Send to Pharmacy 
        </button>
      </div>
    </div>
  ))}
</div>


       
        {showModal && (
          <div className={styles.modal} onClick={() => setShowModal(false)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setShowModal(false)}>
              <FontAwesomeIcon icon={faXmark}  />
              </button>
              <img src={selectedImage} alt="Zoomed receipt" />
           
            </div>
          </div>
        )}

        
        <div className={styles.paginationControls}>
          <button
            type="button"
            className={styles.pageButton}
            onClick={handlePrevPage}
            disabled={pagination.currentPage === 1}
          >
            <FontAwesomeIcon icon={faChevronLeft} /> Prev
          </button>

          <span className={styles.pageInfo}>
            {pagination.currentPage} of {totalPages}
          </span>

          <button
            type="button"
            className={styles.pageButton}
            onClick={handleNextPage}
            disabled={pagination.currentPage === totalPages}
          >
            Next <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}
