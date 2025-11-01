import DoctorCard from "../../../../components/doctorCard/DoctorCard";
import Footer from "../../../../components/footer/Footer";
import { useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const PickDoctor = () => {
    const doctors = [
        { url:'../hero.jpg',
         specialization:'specializes in diagnosing and treating heart and blood vessel diseases',
         rating: '4.0',
         from: '8 Am',
         to: '9 Pm',
         consultation_fee: '12',
        name: "mohammad"
     },
        { url:'../no-photo.png',
         specialization:'specializes in diagnosing and treating heart and blood vessel diseases',
         rating: '4.0',
         from: '8 Am',
         to: '9 Pm',
         consultation_fee: '12',
        name: "mohammad"
     },
        { url:'../no-photo.png',
         specialization:'specializes in diagnosing and treating heart and blood vessel diseases',
         rating: '4.0',
         from: '8 Am',
         to: '9 Pm',
         consultation_fee: '12',
        name: "mohammad"
     },
        { url:'../no-photo.png',
         specialization:'specializes in diagnosing and treating heart and blood vessel diseases',
         rating: '4.0',
         from: '8 Am',
         to: '9 Pm',
         consultation_fee: '12',
        name: "mohammad"
     },
        { url:'../no-photo.png',
         specialization:'specializes in diagnosing and treating heart and blood vessel diseases',
         rating: '4.0',
         from: '8 Am',
         to: '9 Pm',
         consultation_fee: '12',
        name: "mohammad"
     },
        { url:'../no-photo.png',
         specialization:'specializes in diagnosing and treating heart and blood vessel diseases',
         rating: '4.0',
         from: '8 Am',
         to: '9 Pm',
         consultation_fee: '12',
        name: "mohammad"
     },
        { url:'../no-photo.png',
         specialization:'specializes in diagnosing and treating heart and blood vessel diseases',
         rating: '4.0',
         from: '8 Am',
         to: '9 Pm',
         consultation_fee: '12',
        name: "mohammad"
    },
        { url:'../no-photo.png',
         specialization:'specializes in diagnosing and treating heart and blood vessel diseases',
         rating: '4.0',
         from: '8 Am',
         to: '9 Pm',
         consultation_fee: '12',
        name: "mohammad"
     },
        { url:'../no-photo.png',
         specialization:'specializes in diagnosing and treating heart and blood vessel diseases',
         rating: '4.0',
         from: '8 Am',
         to: '9 Pm',
         consultation_fee: '12',
        name: "mohammad"
     },
        { url:'../no-photo.png',
         specialization:'specializes in diagnosing and treating heart and blood vessel diseases',
         rating: '4.0',
         from: '8 Am',
         to: '9 Pm',
         consultation_fee: '12',
        name: "mohammad"
    },
      ];
      const [selected, setSelected] = useState("");
      const [isLoading, setIsLoading] = useState(false);
      const [error, setError] = useState(null);
      const [successMsg, setSuccessMsg] = useState(null);
    //   const [doctors, setDoctors] = useState(null);
      const [pagination, setPagination] = useState({
        currentPage: 1,
        itemsPerPage: 6,
        totalItems:  doctors.length,
        totalPages: Math.ceil( doctors.length / 6),
      });
    
      const indexOfLastDoctor = pagination.currentPage * pagination.itemsPerPage;
      const indexOfFirstDoctor = indexOfLastDoctor - pagination.itemsPerPage;
      const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);
      
      const handleNextPage = () => {
          if (pagination.currentPage < pagination.totalPages) {
              setPagination((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }));
              setSelected("");
            }
        };
        
        const handlePrevPage = () => {
            if (pagination.currentPage > 1) {
                setPagination((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }));
                setSelected("");
            }
        };
        
        //   useEffect(() => {
        //     fetchDoctors();
        //   }, [pagination.currentPage, pagination.itemsPerPage]);
    
  return (
    <div>
        <div className="md:px-[4rem] px-[2rem] py-[2rem]">
        <Link to="/patient/consultation" className="text-[30px]">
        <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <div className="flex justify-between items-center py-[2rem]">
            <div className="px-[1rem]">
                <h1 className="text-[var(--dark-blue)] md:text-[30px] font-medium">Pick A Doctor For Consultation</h1>
                <p className="text-[var(--text-color)] mt-[1rem]">Click one of the Doctors to choose and then click next</p>
            </div>
            <button 
            className="text-white bg-[var(--dark-blue)] border-[2px] border-[var(--dark-blue)] hover:border-[var(--card-border)] hover:bg-[var(--card-border)] hover:text-[var(--dark-blue)] duration-400 rounded-[10px] px-[2rem] py-[0.8rem] font-medium"
            onClick={(e) => handleSubmit(e)}
            >
                Next
            </button>
        </div>
        </div>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-[2rem] md:px-[5rem] px-[3rem]">
            {currentDoctors.map((doctor,index) => {
                const isActive = selected === index;
                const isDimmed = selected !== "" && selected !== index;
                return (
                  <DoctorCard
                    key={index}
                    {...doctor}
                    isActive={isActive}
                    isDimmed={isDimmed}
                    onSelect={() => setSelected(index)}
                  />
                );
            })}
        </div>
        {/* Pagination Controls */}
        {doctors.length > 0 && (
        <div className="flex justify-center items-center gap-3 my-[2rem]">
          <button
            className={`border-[2px] p-[0.5rem_1.5rem] rounded-[10px] ${pagination.currentPage === 1 ? "border-[var(--card-border)] text-[var(--text-color)] opacity-50" : "border-[var(--cyan)] text-[var(--cyan)]"}`}
            onClick={handlePrevPage}
            disabled={pagination.currentPage === 1}
          >
            <FontAwesomeIcon className={`${pagination.currentPage === 1 ? "text-[var(--text-color)]" : "text-[var(--cyan)]"}`} icon={faChevronLeft} /> Prev
          </button>

          <div>
            {pagination.currentPage} of {pagination.totalPages}
          </div>

          <button
            className={`border-[2px] p-[0.5rem_1.5rem] rounded-[10px] ${pagination.currentPage === pagination.totalPages || pagination.totalPages === 0 ? "border-[var(--card-border)] text-[var(--text-color)] opacity-50" : "border-[var(--cyan)] text-[var(--cyan)]"}`}
            onClick={handleNextPage}
            disabled={
              pagination.currentPage === pagination.totalPages ||
              pagination.totalPages === 0
            }
          >
            Next <FontAwesomeIcon className={`${pagination.currentPage === pagination.totalPages || pagination.totalPages === 0  ? "text-[var(--text-color)]" : "text-[var(--cyan)]"}`} icon={faChevronRight} />
          </button>
        </div>
      )}
      <Footer />
    </div>
  )
}

export default PickDoctor
