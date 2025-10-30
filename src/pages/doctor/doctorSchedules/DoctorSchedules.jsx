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
const Schedules = [ 
  { key: "mhd", title: " Patient Mohammed", time: "At 9 Am", call: "Call", period: "Morning" },
  { key: "ali", title: " Patient Ali", time: "At 10 Am", call: "Call", period: "Morning"},
  { key: "mustafa", title: " Patient Mustafa", time: "At 11 Am", call: "Call", period: "Morning" }, 
  { key: "leen", title: " Patient Leen", time: "At 12 Pm", call: "Call", period: "Afternoon" }, 
  { key: "hadeel", title: " Patient Hadeel", time: "At 1 Pm", call: "Call", period: "Afternoon" },
  { key: "sara", title: " Patient Sara", time: "At 2 Pm", call: "Call", period: "Afternoon" },
 ];
export default function DoctorSchedules() {
  const [schedules, setSchedules] = useState(Schedules);  
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null) 

 /*const fetchSchedules = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/schedules",
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
*/
  const handleFilterClick = () => setFilterOpen(!filterOpen);

  const handleSelectFilter = (filter) => {
    setSelectedFilter(filter);
    setFilterOpen(false);
  };

  const filteredSchedules =
    selectedFilter === "All"
      ? schedules
      : schedules.filter((s) => s.period === selectedFilter);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 3,
    totalItems: filteredSchedules.length,
    totalPages: Math.ceil(filteredSchedules.length / 3),
  });

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      totalItems: filteredSchedules.length,
      totalPages: Math.ceil(filteredSchedules.length / prev.itemsPerPage),
      currentPage: 1,
    }));
  }, [filteredSchedules]);

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

  const handleViewDetails = async (e, scheduleKey) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setDetails(null);

    try {
      const response = await fetch(
        `https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/schedule/test`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch schedule details");

      const data = await response.json();
      console.log("Details:", data);
      setDetails(data);
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
      <DoctorHeader />
      <div className={styles.CardContainer}>
        <header className={styles.CardHeader}>
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
                  <p onClick={() => handleSelectFilter("Morning")}>Morning</p>
                  <p onClick={() => handleSelectFilter("Afternoon")}>
                    Afternoon
                  </p>
                </div>
              )}
            </div>
          </div>
          <p>Check your schedules here</p>
        </header>

        {isLoading && <p className={styles.loading}>Loading schedules...</p>}
        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.CardForm}>
          {currentSchedules.map((type) => (
            <div key={type.key || type.id} className={styles.CardItem}>
              <div className={styles.CardTop}>
                <div className={styles.PatientText}>
                  <h3>{type.title || type.patient_name}</h3>
                </div>
              </div>

              <button className={styles.callButton}>
                <FontAwesomeIcon icon={faPhone} />
                {type.call || "Call"}
              </button>

              <div className={styles.divider}></div>

              <div className={styles.CardBottom}>
                <span>
                <FontAwesomeIcon icon={faClock} className={styles.clock} />
                  {type.time || type.appointment_time}
                  </span>
                <button
                  type="button"
                  onClick={(e) => handleViewDetails(e, type.key || type.id)}
                  className={styles.detailsButton}
                >
                  View Details
                </button>
                {isLoading && <p>Loading Details ...</p>}
    
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
