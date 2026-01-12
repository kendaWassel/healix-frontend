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
import PatientDetailsModal from "./PatientDetailsModal";
import DoctorCallNow from "../doctorCallNow/DoctorCallNow";
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
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 6,
    totalItems: 0,
    totalPages: 1,
  });
  const [patientPhone, setPatientPhone] = useState(null);
  const [showCallModal, setShowCallModal] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [selectedConsultationId, setSelectedConsultationId] = useState(null);
  const token = localStorage.getItem("token");

 const fetchSchedules = async (page, perPage) => {
    setIsLoading(true);
    setError(null);
    try {
      let url = `https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/doctor/my-schedules?page=${page}&per_page=${perPage}`;
      if (selectedFilter !== "All") {
        url += `&status=${selectedFilter}`;
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const serverError = await response.json().catch(() => ({}));
        throw new Error(serverError.message || "Request failed");
      }

      const data = await response.json();
      console.log("Schedules fetched:", data);
      if (data.status === "success" && Array.isArray(data.data)) {
        setSchedules(data.data);
        const totalItems = data.meta?.total || data.total || 0;
        const totalPages = Math.ceil(totalItems / (perPage || 6));
        setPagination((prev) => ({
          ...prev,
          totalItems: totalItems,
          totalPages: totalPages,
        }));
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
    fetchSchedules(pagination.currentPage, pagination.itemsPerPage);
  }, [pagination.currentPage, pagination.itemsPerPage, selectedFilter]);

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

const handleFilterClick = () => setFilterOpen(!filterOpen);

const handleSelectFilter = (filter) => {
  setSelectedFilter(filter);
  setFilterOpen(false);

  setPagination((prev) => ({ ...prev, currentPage: 1 }));
};



  const handleViewDetails = async (e, patientId) => {
    e.preventDefault();
    console.log("patient id: ",patientId);
    setSelectedPatientId(patientId);
    setIsLoadingDetails(true);
    setError(null);
    setDetails(null);

    try {
      const response = await fetch(
        `https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/patients/${patientId}/view-details`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch patient details");

      const data = await response.json();
      console.log("Patient details:", data);
      setDetails(data.data || data);
      setSuccessMsg("Details loaded successfully.");
    } catch (err) {
      
        setError(err.message||"Failed to load Details");
      }
     finally {
      setSelectedPatientId(null);
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
        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.CardForm}>
          {schedules && schedules.length > 0 ? schedules.map((item) => (
            <div key={item.id} className={styles.CardItem}>
              <div className={styles.CardTop}>
                <div className={styles.PatientText}>
                  <h3 className="mb-3">{item.patient_name || "Unknown"}</h3>
                  <span
                    className={`${styles.period} border-[2px] rounded-[10px] p-[0.2rem_0.5rem] ${
                      item.status === "completed"
                        ? styles.completed
                        : item.status === "pending"
                        ? styles.pending
                        : styles.inProgress
                    }`}
                  >
                    {item.status || "Unknown"}
                  </span>
                </div>
              </div>

              <button 
                className={styles.callButton}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedPatientId(item.patient_id);
                  setPatientPhone(item.patient_phone);
                  setSelectedConsultationId(item.consultation_id || item.id);
                  setShowCallModal(true);
                }}
              >
                <FontAwesomeIcon icon={faPhone} />
                Call
              </button>

              <div className={styles.divider}></div>

              <div className={styles.CardBottom}>
              <span>
                  <FontAwesomeIcon icon={faClock} className={styles.clock} />
                  {new Date(item.scheduled_at).toLocaleString() || "Unknown"}
                </span>
  <button
    type="button"
    onClick={(e) => {
      handleViewDetails(e, item.patient_id)}
    }
    disabled={isLoadingDetails}
    className={`${styles.detailsButton} bg-[#f4f4f4]`}
  >
{selectedPatientId === item.patient_id
                      ? "Loading..."
                      : "View details"}
  </button>
              </div>
            </div>
          )) : isLoading ? <p className={styles.loading}>Loading schedules...</p> : <p className={styles.loading}>No schedules found.</p>}
        </div>

        {schedules.length > 0 && (
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
          <PatientDetailsModal
            details={details}
            onClose={() => {
              setDetails(null);
              setSuccessMsg(null);
              setError(null);
            }}
          />
        )}

        <DoctorCallNow
          isOpen={showCallModal}
          onClose={() => {
            setShowCallModal(false);
            setSelectedPatientId(null);
            setPatientPhone(null);
            setSelectedConsultationId(null);
          }}
          patientId={selectedPatientId}
          patient_phone={patientPhone}
          consultationId={selectedConsultationId}
        />
      </div>
      <Footer />
    </>
  );
}
