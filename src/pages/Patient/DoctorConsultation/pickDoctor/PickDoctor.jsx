import DoctorCard from "../../../../components/doctorCard/DoctorCard";
import Footer from "../../../../components/footer/Footer";
import { useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link,useParams,useNavigate } from "react-router-dom";
import BookingOption from "../Booking/BookingOption";
import DoneModal from "../Booking/DoneModal";
import ScheduleLaterModal from "../Booking/ScheduleLaterModal";
import PatientCallNowModal from "../Booking/PatientCallNowModal";
const PickDoctor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openPickOption, setOpenPickOption] = useState(false);
  const [openModalDone, setOpenModalDone] = useState(false);
      const [openScheduleLater, setOpenScheduleLater] = useState(false);
      const [openCallNow, setOpenCallNow] = useState(false);
      const [selected, setSelected] = useState(null);
      const [isLoading, setIsLoading] = useState(false);
      const [error, setError] = useState(null);
      const [doctors, setDoctors] = useState([]);
   const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 6,
    totalItems: 0,
    totalPages: 1,
  });
//   const doctors = [
//     { url:'../hero.jpg',
//      specialization:'specializes in diagnosing and treating heart and blood vessel diseases',
//      rating: '4.0',
//      from: '8 Am',
//      to: '9 Pm',
//      consultation_fee: '12',
//     name: "mohammad"
//  },
//     { url:'../no-photo.png',
//      specialization:'specializes in diagnosing and treating heart and blood vessel diseases',
//      rating: '4.0',
//      from: '8 Am',
//      to: '9 Pm',
//      consultation_fee: '12',
//     name: "mohammad"
//  },
//     { url:'../no-photo.png',
//      specialization:'specializes in diagnosing and treating heart and blood vessel diseases',
//      rating: '4.0',
//      from: '8 Am',
//      to: '9 Pm',
//      consultation_fee: '12',
//     name: "mohammad"
//  },
//     { url:'../no-photo.png',
//      specialization:'specializes in diagnosing and treating heart and blood vessel diseases',
//      rating: '4.0',
//      from: '8 Am',
//      to: '9 Pm',
//      consultation_fee: '12',
//     name: "mohammad"
//  },
//     { url:'../no-photo.png',
//      specialization:'specializes in diagnosing and treating heart and blood vessel diseases',
//      rating: '4.0',
//      from: '8 Am',
//      to: '9 Pm',
//      consultation_fee: '12',
//     name: "mohammad"
//  },
//     { url:'../no-photo.png',
//      specialization:'specializes in diagnosing and treating heart and blood vessel diseases',
//      rating: '4.0',
//      from: '8 Am',
//      to: '9 Pm',
//      consultation_fee: '12',
//     name: "mohammad"
//  },
//     { url:'../no-photo.png',
//      specialization:'specializes in diagnosing and treating heart and blood vessel diseases',
//      rating: '4.0',
//      from: '8 Am',
//      to: '9 Pm',
//      consultation_fee: '12',
//     name: "mohammad"
// },
//     { url:'../no-photo.png',
//      specialization:'specializes in diagnosing and treating heart and blood vessel diseases',
//      rating: '4.0',
//      from: '8 Am',
//      to: '9 Pm',
//      consultation_fee: '12',
//     name: "mohammad"
//  },
//     { url:'../no-photo.png',
//      specialization:'specializes in diagnosing and treating heart and blood vessel diseases',
//      rating: '4.0',
//      from: '8 Am',
//      to: '9 Pm',
//      consultation_fee: '12',
//     name: "mohammad"
//  },
//     { url:'../no-photo.png',
//      specialization:'specializes in diagnosing and treating heart and blood vessel diseases',
//      rating: '4.0',
//      from: '8 Am',
//      to: '9 Pm',
//      consultation_fee: '12',
//     name: "mohammad"
// },
//   ];
  const fetchDoctors = (page, perPage) => {
    setIsLoading(true);
    setError(null);

    const token = localStorage.getItem("token");
    fetch(`https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/patient/doctors/by-specialization?specialization_id=${id}&page=${page}&per_page=${perPage}`, {
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
            throw new Error(serverError.message || "Doctors request failed");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("success getting doctors: ", data);
        
        setDoctors(data.data);

        const totalItems = data.meta.total;
        const totalPages = Math.ceil(totalItems / (perPage || 6));
        setPagination((prev) => ({
          ...prev,
          totalItems: totalItems,
          totalPages: totalPages,
        }));
      })
      .catch((error) => {
        setError(error.message || 'failed to get doctors');
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
    if (id) {
      setPagination((prev) => ({ ...prev, currentPage: 1 }));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchDoctors(pagination.currentPage, pagination.itemsPerPage);
    }
  }, [id, pagination.currentPage, pagination.itemsPerPage]);

        const handleConfirm = async (option) => {
          console.log("Selected option:", option);
          
          if(option === "Schedule For later"){
            setOpenPickOption(false);
            setTimeout(() => {
              setOpenScheduleLater(true);
            }, 200);
          } 
          else if(option === "Call Now"){
            if (selected === null || !doctors[selected]) {
              setError("Please select a doctor first");
              setOpenPickOption(false);
              return;
            }
            
            setOpenPickOption(false);
            setTimeout(() => {
              setOpenCallNow(true);
            }, 200);
          }
          else {
            setOpenPickOption(false);
            setTimeout(() => {
              setOpenModalDone(true);
            }, 400);
          }
        };
      
        const handleGoHome = () => {
          setOpenModalDone(false);
          navigate("/patient"); 
        };
    
  return (
    <div className="bg-[#fafbfc] min-h-[60vh]">
        <div className="md:px-[4rem] px-[2rem] py-[2rem]">
        <Link to="/patient/consultation" className="text-[30px]">
        <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <div className="flex md:flex-row flex-col md:items-center justify-between pt-[2rem]">
            <div className="md:order-1 order-2 px-[1rem]">
                <h1 className="text-[var(--dark-blue)] md:text-[30px] text-[24px] font-medium">Pick A Doctor For Consultation</h1>
                <p className="text-[var(--text-color)] mt-[1rem] font-medium">Click one of the Doctors to choose and then click next</p>
            </div>
            <button 
            className="md:order-2 order-1 self-end text-white bg-[var(--dark-blue)] border-[2px] border-[var(--dark-blue)] hover:border-[var(--card-border)] hover:bg-[var(--card-border)] hover:text-[var(--dark-blue)] duration-400 rounded-[10px] px-[2rem] py-[0.8rem] font-medium md:m-0 my-[1rem]"
            onClick={(e) => {
              if(selected !== null){
                setError(null);
                setOpenPickOption(true);
              }
              else{
                setError("Please select a doctor first");
              }
            }}
            >
                Book
            </button>
        </div>
        </div>
        {error?
        <div className="w-[fit-content] mx-auto">
          <h3 className="text-[24px] text-[red]">{error}</h3>
        </div> 
        : 
        <></>
        }
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-[2rem] pt-[2rem] md:px-[5rem] px-[2rem]">
            {isLoading ? <p>Loading doctors...</p> :
            doctors && doctors.length > 0 ? doctors.map((doctor,index) => {
                const isActive = selected === index;
                const isDimmed = selected !== index;
                return (
                  <DoctorCard
                    key={index}
                    {...doctor}
                    isActive={isActive}
                    isDimmed={isDimmed}
                    onSelect={() => {
                      console.log('doctor selected: ',doctor.id)
                      setSelected(index)
                    }}
                  />
                );
            }) : <p>No doctors found.</p>}
        </div>
        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-3 my-[2rem]">
          <button
            className={`bg-[var(--white)] border-[2px] p-[0.5rem_1.5rem] rounded-[10px] ${pagination.currentPage === 1 ? "border-[var(--card-border)] text-[var(--text-color)] opacity-50" : "border-[var(--cyan)] text-[var(--cyan)]"}`}
            onClick={handlePrevPage}
            disabled={pagination.currentPage === 1}
          >
            <FontAwesomeIcon className={`${pagination.currentPage === 1 ? "text-[var(--text-color)]" : "text-[var(--cyan)]"}`} icon={faChevronLeft} /> Prev
          </button>

          <div>
            {pagination.currentPage} of {pagination.totalPages}
          </div>

          <button
            className={`bg-[var(--white)] border-[2px] p-[0.5rem_1.5rem] rounded-[10px] ${pagination.currentPage === pagination.totalPages || pagination.totalPages === 0 ? "border-[var(--card-border)] text-[var(--text-color)] opacity-50" : "border-[var(--cyan)] text-[var(--cyan)]"}`}
            onClick={handleNextPage}
            disabled={
              pagination.currentPage === pagination.totalPages
            }
          >
            Next <FontAwesomeIcon className={`${pagination.currentPage === pagination.totalPages || pagination.totalPages === 0  ? "text-[var(--text-color)]" : "text-[var(--cyan)]"}`} icon={faChevronRight} />
          </button>
        </div>

      {/* Modals */}
      <BookingOption
        isOpen={openPickOption}
        onClose={() => setOpenPickOption(false)}
        onConfirm={handleConfirm}
      />
      <ScheduleLaterModal
        isOpen={openScheduleLater}
        onClose={() => setOpenScheduleLater(false)}
        doctorId={selected !== null && doctors[selected] ? doctors[selected].id : null}
        onConfirm={({ date, time }) => {
          console.log("Scheduled later:", { date, time });
          setOpenScheduleLater(false);
          setTimeout(() => setOpenModalDone(true), 300);
        }}
      />
      <DoneModal
        isOpen={openModalDone}
        onHome={handleGoHome}
        message="Booking done"
      />
      <PatientCallNowModal
        onClose={() => setOpenCallNow(false)}
        isOpen={openCallNow}
        doctorId={selected !== null && doctors[selected] ? doctors[selected].id : null}
        onConfirm={() => {
          console.log("Call initiated successfully");
        }}
      />
      <Footer />
    </div>
  )
}

export default PickDoctor
