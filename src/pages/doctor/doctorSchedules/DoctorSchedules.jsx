import styles from "./DoctorSchedules.module.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faFilter,
  faChevronLeft,
  faChevronRight,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import DoctorHeader from "../../../components/headers/DoctorHeader";
import Footer from "../../../components/footer/Footer";
/*
const Schedules = [ 
  { key: "mhd", title: " Patient Mohammed", time: "At 9 Am", call: "Call", period: "pending" },
  { key: "ali", title: " Patient Ali", time: "At 10 Am", call: "Call", period: "pending"},
  { key: "mustafa", title: " Patient Mustafa", time: "At 11 Am", call: "Call", period: "pending" }, 
  { key: "leen", title: " Patient Leen", time: "At 12 Pm", call: "Call", period: "completed" }, 
  { key: "hadeel", title: " Patient Hadeel", time: "At 1 Pm", call: "Call", period: "completed" },
  { key: "sara", title: " Patient Sara", time: "At 2 Pm", call: "Call", period: "completed" },
];
*/
export default function DoctorSchedules() {
  const [schedules, setSchedules] = useState([]); 
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  
  const token = localStorage.getItem("token");

 const fetchSchedules = async (page=1,perPage=10) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/doctor/my-schedules?page=1&per_page=10",
      
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
      console.log("Schedules fetched:", data);

 
      if (data.status === "success" && Array.isArray(data.data)) {
        setSchedules(data.data);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Failed fetching schedules:", error);
      setError(error.message || "Failed to load schedules.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

const handleFilterClick = () => setFilterOpen(!filterOpen);

const handleSelectFilter = (filter) => {
  setSelectedFilter(filter);
  setFilterOpen(false);
};


const filteredSchedules =
  selectedFilter === "All"
    ? schedules
    : schedules.filter((s) => s.status === selectedFilter);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 3,
    totalItems: filteredSchedules.length,
    totalPages: Math.ceil(filteredSchedules.length / 3),
  });

  useEffect(() => {
    const totalPages = Math.ceil(filteredSchedules.length / pagination.itemsPerPage);
    if (
      pagination.totalItems !== filteredSchedules.length ||
      pagination.totalPages !== totalPages
    ) {
      setPagination((prev) => ({
        ...prev,
        totalItems: filteredSchedules.length,
        totalPages: totalPages,
      }));
    }
  }, [filteredSchedules, pagination.itemsPerPage, pagination.totalItems, pagination.totalPages]);
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
  const currentSchedules = filteredSchedules.slice(
    startIndex,
    startIndex + pagination.itemsPerPage
  );

  const handleViewDetails = async (e, consultationId) => {
    e.preventDefault();
    setIsLoadingDetails(true);
    setError(null);
    setDetails(null);

    try {
      const response = await fetch(
        `https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/doctor/schedules/${consultationId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch schedule details");

      const data = await response.json();
      console.log("Details:", data);
      setDetails(data);
      setSuccessMsg("Details loaded successfully.");
    } catch (err) {
      
        setError(err.message||"Failed to load Details");
      }
     finally {
      setIsLoadingDetails(false);
    }
  };


  return (
    <>
      <DoctorHeader />
      <div className={styles.CardContainer}>
        <div className={styles.CardHeader}>
          <div className={styles.headerTop}>
            <h1>My Schedules</h1>
            <div className={styles.filterContainer}>
              <button
                onClick={handleFilterClick}
                className={styles.filterButton}
              >
                <FontAwesomeIcon icon={faFilter} />
                Filter
              </button>
              {filterOpen && (
  <div className={styles.filterMenu}>
         <p onClick={() => handleSelectFilter("All")}>All</p>
    <p onClick={() => handleSelectFilter("pending")}>Pending</p>
    <p onClick={() => handleSelectFilter("in_progress")}>In Progress</p>
    <p onClick={() => handleSelectFilter("completed")}>Completed</p>
  </div>
)}

            </div>
          </div>
          <p>Check your schedules here</p>
        </div>

        {isLoading && <p className={styles.loading}>Loading schedules...</p>}
        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.CardForm}>
          {currentSchedules.map((item) => (
            <div key={item.consultation_id} className={styles.CardItem}>
              <div className={styles.CardTop}>
                <div className={styles.PatientText}>
                  <h3>{item.patient_name}</h3>
                  <p>{item.patient_phone}</p>
                </div>
              </div>

              <button className={styles.callButton}>
                <FontAwesomeIcon icon={faPhone} />
                {item.call_type === "schedule_later" ? "Schedule Later" : "Call Now"}
              </button>

              <div className={styles.divider}></div>

              <div className={styles.CardBottom}>
              <span>
                  <FontAwesomeIcon icon={faClock} className={styles.clock} />
                  {new Date(item.scheduled_at).toLocaleString()}
                  <span
                    className={`${styles.period} ${
                      item.status === "completed"
                        ? styles.completed
                        : item.status === "pending"
                        ? styles.pending
                        : styles.inProgress
                    }`}
                  >
                    {" "}
                    {item.status}
                  </span>
                </span>
  <button
    type="button"
    onClick={(e) => handleViewDetails(e, item.consultation_id)}
    className={styles.detailsButton}
  >
    View Details
  </button>

  {isLoadingDetails && <p>Loading Details ...</p>}
    
          {error && <div className={styles.errorMsg}>{error}</div>}
          {successMsg && <div className={styles.successMsg}>{successMsg}</div>}
              </div>
            </div>
          ))}
        </div>

        {filteredSchedules.length > 0 && (
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
        )}

        {details && (
          <div className={styles.detailsBox}>
            <h3>Details Loaded:</h3>
            <pre>{JSON.stringify(details, null, 2)}</pre>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
