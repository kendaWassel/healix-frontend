import styles from "./Receipts.module.css";
import PatientHeader from "../../../components/headers/PatientHeader";
import { Send } from "lucide-react";
import SendToPharmacy from "./SendtoPharmacy";
import ReceiptDetails from "./ReceiptsDetails";
import YouAreDone from "./YouAreDone";
import Footer from "../../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ReceiptsData = [
  { 
    id: 1,
    Name: "Dr.Mohammed",
    Date: "23/11/2025",
    type: "digital",
    medicines: [
      {
        id: 1,
        name: "Paracetamol",
        dosage: "500mg twice daily",
        instructions: "Take after meals",
        notes: "Avoid using more than 3 days"
      },
      {
        id: 2,
        name: "Amoxicillin",
        dosage: "250mg three times daily",
        instructions: "Take with water",
        notes: "Complete full course"
      }
    ]
  },

  { 
    id: 2,
    Name: "Dr.Ahmed",
    Date: "5/1/2026",
    type: "image",
    image_url: "/receipts/receipt1.png"
  },

  { 
    id: 3,
    Name: "Dr.Sara",
    Date: "10/1/2026",
    type: "digital",
    medicines: [
      {
        id: 1,
        name: "Vitamin D",
        dosage: "1000 IU daily",
        instructions: "Take in the morning",
        notes: "Avoid overdose"
      }
    ]
  },

  { 
    id: 4,
    Name: "Dr.Ahmed",
    Date: "12/1/2026",
    type: "image",
    image_url: "/receipts/receipt2.png"
  }
];



export default function Receipts() {
  const [receipts, setReceipts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [error, setError] = useState(null);
  const [sendPharmacy, setSendPharmacy] = useState(false);
  const [done, setDone] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 6,
  });

  /*
const token = localStorage.getItem('token');

const fetchReceipts= async (page=1,perPage=10) => {
  setIsLoading(true);
  setError(null);
  try {
    const response = await fetch(
      "",
    
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
          "Authorization": `Bearer ${token}`,
        },
      }
    );
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
    console.error("Failed fetching Receipts:", error);
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
  const navigate = useNavigate();
  return (
    <>
      <PatientHeader />

      <div className={styles.CardContainer}>
        <div className={styles.CardHeader}>
          <h1>My Receipts</h1>
          <button className={styles.AddButton}>Upload Receipt</button>
          <p>Check Your Receipts and send them or add new ones</p>
        </div>

        {isLoading && <p className={styles.loading}>Loading receipts...</p>}
        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.CardsWrapper}>
          {currentItems.map((item) => (
            <div
              key={item.id}
              className={styles.Cardbtn}
              onClick={() => setSelectedReceipt(item)} 
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
                  setSendPharmacy(true);
                  
                }}
              >
                <Send size={16} />
                Send to Pharmacy
              </button>
            </div>
          ))}
        </div>

      
        <SendToPharmacy 
  open={sendPharmacy}
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

       
        {selectedReceipt && (
          <ReceiptDetails
            open={true}
            onClose={() => setSelectedReceipt(null)}
            receipt={selectedReceipt}
          />
        )}
      </div>

     
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

      <Footer />
    </>
  );
}
