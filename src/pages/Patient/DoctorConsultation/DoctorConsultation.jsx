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

// const Specialitytypes = [
//   { key: "Cardiology", title: "Cardiology" },
//   { key: "Dermatology", title: "Dermatology" },
//   { key: "General Surgery", title: "General Surgery" },
//   { key: "Gynecology", title: "Gynecology" },
//   { key: "Neurology", title: "Neurology" },
//   { key: "Oncology", title: "Oncology" },
//   { key: "Ophthalomology", title: "Ophthalomology" },
//   { key: "Orthopedics", title: "Orthopedics" },
//   { key: "Pediatrics", title: "Pediatrics" },
//   { key: "Psychiatry", title: "Psychiatry" },
// ];

export default function DoctorConsultation() {
  const [selected, setSelected] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [ Specialitytypes ,  setSpecialitytypes ] = useState([]);
  const [specsLoaded, setSpecsLoaded] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 6,
    totalItems: 0,
    totalPages: 1,
  });

  const fetchSpecializations = (page, perPage) => {
    setIsLoading(true);
    setError(null);

    const token = localStorage.getItem("token");
    fetch(`https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/patient/specializations?page=${page}&per_page=${perPage}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
        "Authorization": `Bearer ${token}`
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((serverError) => {
            throw new Error(serverError.message || "Specializations request failed");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("success getting specs: ", data);
        
        setSpecialitytypes(data.data);
        setSpecsLoaded(true);

        const totalItems = data.meta.total;
        const totalPages = Math.ceil(totalItems / (perPage || 6));
        setPagination((prev) => ({
          ...prev,
          totalItems: totalItems,
          totalPages: totalPages,
        }));
      })
      .catch((error) => {
        setError(error.message || 'failed to get specs');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
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

  useEffect(() => {
    fetchSpecializations(1, pagination.itemsPerPage);
  }, []);

  useEffect(() => {
    fetchSpecializations(pagination.currentPage, pagination.itemsPerPage);
  }, [pagination.currentPage, pagination.itemsPerPage]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!selected) {
  //     setError("Please select a speciality before proceeding.");
  //     return;
  //   }
  //   setError(null);
  //   setSuccessMsg(null);
  //   setIsLoading(true);
  //   try {
  //     const response = await fetch("https://example.com/api/fake-endpoint", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ speciality: selected }),
  //     });

  //     if (!response.ok) throw new Error("Can't continue. Please try again.");

  //     await response.json();
  //     setSuccessMsg("Speciality type selected successfully!");
  //   } catch (err) {
        
  //       if (err.message === "Failed to fetch") {
  //         setError("Failed please try again");
  //       } else {
  //         setError(err.message);
  //       }
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  

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
          <Link
           className={`md:order-2 order-1 ${styles.nextButton} md:m-0 mt-[2rem] mb-[1rem] self-end`} 
           to={`doctor-specialization/${selected}`}
           >
             Next
         </Link>
          {isLoading && <p>Loading specialities...</p>}
     {/*      {!isLoading && specsLoaded && currentSpecs.length === 0 && <p>No specialities found.</p>} */}
          {error && <div className={styles.errorMsg}>{error}</div>}
          {successMsg && <div className={styles.successMsg}>{successMsg}</div>}
        </div>

        <div className={styles.ConsultationForm}>
          {Specialitytypes.map((type,index) => (
            <button
              key={type.id}
              type="button"
              className={`${styles.SpecialityButton} ${
                selected === type.id ? styles.selected : ""
              }`}
              onClick={() => {
                console.log('selected: ',type.id)
                setSelected(type.id)
              }}
            >
              <h3>{type.name}</h3>
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
              {pagination.currentPage} of {pagination.totalPages}
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
