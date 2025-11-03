import styles from "./DoctorConsultation.module.css";
import Footer from "../../../components/footer/Footer.jsx";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

const Specialitytypes = [
  { key: "Cardiology", title: "Cardiology" },
  { key: "Dermatology", title: "Dermatology" },
  { key: "General Surgery", title: "General Surgery" },
  { key: "Gynecology", title: "Gynecology" },
  { key: "Neurology", title: "Neurology" },
  { key: "Oncology", title: "Oncology" },
  { key: "Ophthalomology", title: "Ophthalomology" },
  { key: "Orthopedics", title: "Orthopedics" },
  { key: "Pediatrics", title: "Pediatrics" },
  { key: "Psychiatry", title: "Psychiatry" },
];

export default function DoctorConsultation() {
  const [selected, setSelected] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  /*const [ Specialitytypes ,  setSpecialitytypes ] = useState([]);
  const [specsLoaded, setSpecsLoaded] = useState(false);

  const fetchSpecializations = async () => {
    setIsLoading(true);
    setError(null);
  
    try {
      const response = await fetch(
        "https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/specializations",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
  
      if (!response.ok) {
        const serverError = await response.json().catch(() => ({}));
        throw new Error(serverError.message || "Specializations request failed");
      }
  
      const data = await response.json();
      console.log("success getting specs: ", data);
  
      if (data.status === "success" && data.data) {
        setSpecialitytypes (data.data);
        setSpecsLoaded(true);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("failed getting specs:", error);
      setError(error.message || "Failed to get specializations. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  */
  // pagination state
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 5,
    totalItems:  Specialitytypes.length,
    totalPages: Math.ceil( Specialitytypes.length / 5),
  });

  const handleItemsPerPageChange = (e) => {
    const items = Number(e.target.value);
    setPagination((prev) => ({
      ...prev,
      itemsPerPage: items,
      totalPages: Math.ceil(prev.totalItems / items),
      currentPage: 1,
    }));
  };
  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      totalItems: Specialitytypes.length,
      totalPages: Math.ceil(Specialitytypes.length / prev.itemsPerPage),
      currentPage: 1, 
    }));
  }, [Specialitytypes]);
  const handleNextPage = () => {
    if (pagination.currentPage < pagination.totalPages) {
      setPagination((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }));
    }
  };

  const handlePrevPage = () => {
    if (pagination.currentPage > 1) {
      setPagination((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }));
    }
  };


  const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
  const currentSpecs = Specialitytypes.slice(
    startIndex,
    startIndex + pagination.itemsPerPage
  );

  useEffect(() => {
    document.title = "Doctor Consultation";
  /*  fetchSpecializations() */
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selected) {
      setError("Please select a speciality before proceeding.");
      return;
    }
    setError(null);
    setSuccessMsg(null);
    setIsLoading(true);
    try {
      const response = await fetch("https://example.com/api/fake-endpoint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ speciality: selected }),
      });

      if (!response.ok) throw new Error("Can't continue. Please try again.");

      await response.json();
      setSuccessMsg("Speciality type selected successfully!");
    } catch (err) {
        
        if (err.message === "Failed to fetch") {
          setError("Failed please try again");
        } else {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
  

  return (
    <>
      <div className={`md:p-[5rem] p-[2.5rem_2rem] ${styles.CardContainer}`}>
          <span className={styles.backArrow}>
            <Link to="/patient">
            <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
          </span>
        <div className={`flex md:flex-row flex-col md:items-end justify-between ${styles.CardHeader}`}>
          <div className="md:order-1 order-2">
          <h1>Pick a Speciality</h1>
          <p className="mt-[1rem]">Click one of the specialities to choose and then click next</p>
          </div>
          <button
           className={`md:order-2 order-1 ${styles.nextButton} md:m-0 mt-[2rem] mb-[1rem] self-end`} 
           onClick={(e) => handleSubmit(e)}
           >
             Next
         </button>
          {isLoading && <p>Loading specialities...</p>}
     {/*      {!isLoading && specsLoaded && currentSpecs.length === 0 && <p>No specialities found.</p>} */}
          {error && <div className={styles.errorMsg}>{error}</div>}
          {successMsg && <div className={styles.successMsg}>{successMsg}</div>}
        </div>

        <div className={styles.ConsultationForm} onSubmit={handleSubmit}>
          {currentSpecs.map((type) => (
            <button
              key={type.key}
              type="button"
              className={`${styles.SpecialityButton} ${
                selected === type.key ? styles.selected : ""
              }`}
              onClick={() => setSelected(type.key)}
            >
              <h3>{type.title}</h3>
            </button>
          ))}

          {/* Pagination Controls */}
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
              {pagination.currentPage} / {pagination.totalPages}
            </span>

            <button
              type="button"
              className={styles.pageButton}
              onClick={handleNextPage}
              disabled={pagination.currentPage === pagination.totalPages}
            >
              Next <FontAwesomeIcon icon={faChevronRight} />
            </button>
            
          </div>
          
        </div>
      </div>

      <Footer />
    </>
  );
}
