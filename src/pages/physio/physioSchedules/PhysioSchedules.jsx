import { useEffect, useState } from "react";
import { Clock, MapPin, ChevronDown } from "lucide-react";
import Footer from "../../../components/footer/Footer";
import PhysioHeader from "../../../components/headers/PhysioHeader";
import PatientDetailsModal from "../../doctor/doctorSchedules/PatientDetailsModal";
import CareProviderStartSession from "../../../components/careProviderModals/CareProviderStartSession";

const PhysioSchedules = () => {
    const [schedules, setSchedules] = useState([]);
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("All");
  const [viewDetails, setViewDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        itemsPerPage: 6,
        totalItems: 0,
        totalPages: 1,
    });
    const [showSessionModal, setShowSessionModal] = useState(false);
    const [selectedPatientId, setSelectedPatientId] = useState(null);
    const [selectedSessionId, setSelectedSessionId] = useState(null);
    const [details, setDetails] = useState(null);
    const [isLoadingDetails, setIsLoadingDetails] = useState(false);
    const [detailsError, setDetailsError] = useState(null);
    const token = localStorage.getItem("token");

    // const mockData = {
    //     1: [
    //         {
    //             id: 1,
    //             name: "Hassan Al-Rifai",
    //             desc: "High blood pressure follow-up",
    //             time: "9:00 AM",
    //             address: "Al-Mazzeh Street, Building 12, Apartment 4",
    //         },
    //         {
    //             id: 2,
    //             name: "Mariam Saleh",
    //             desc: "Cold and sore throat check",
    //             time: "9:45 AM",
    //             address: "Al-Tejarah District, House 27 near City Park",
    //         },
    //         {
    //             id: 3,
    //             name: "Omar Nasser",
    //             desc: "Follow-up after hand fracture",
    //             time: "10:30 AM",
    //             address: "Tishreen Street, Building 8, Floor 2",
    //         },
    //         {
    //             id: 4,
    //             name: "Lina Khalil",
    //             desc: "Diabetes control review",
    //             time: "11:15 AM",
    //             address: "Al-Amal Neighborhood, House 15 next to bakery",
    //         },
    //         {
    //             id: 5,
    //             name: "Ahmad Barakat",
    //             desc: "Post-surgery check for appendix removal",
    //             time: "12:00 PM",
    //             address: "Baghdad Street, near Green Pharmacy",
    //         },
    //         {
    //             id: 6,
    //             name: "Rania Issa",
    //             desc: "Migraine and headache evaluation",
    //             time: "1:00 PM",
    //             address: "Al-Jalaa' City, Building 5B, 3rd Floor",
    //         },
    //     ],
    //     2: [
    //         {
    //             id: 7,
    //             name: "Tarek Mansour",
    //             desc: "Back pain physical therapy session",
    //             time: "2:00 PM",
    //             address: " Old Damascus District, House 21 behind old mosque",
    //         },
    //         {
    //             id: 8,
    //             name: "Sara Hamdan",
    //             desc: "Routine pregnancy checkup",
    //             time: "2:45 PM",
    //             address: "Al-Salam Street, Building 2, Apt. 6",
    //         },
    //         {
    //             id: 9,
    //             name: "Khaled Jaber",
    //             desc: "Post-COVID breathing follow-up",
    //             time: "3:30 PM",
    //             address: "Al-Fayhaa Neighborhood, House 10",
    //         },
    //         {
    //             id: 10,
    //             name: "Nour Fares",
    //             desc: "Allergy and skin rash evaluation",
    //             time: "4:15 PM",
    //             address: "Al-Tawfiq Street, next to grocery shop",
    //         },
    //         {
    //             id: 11,
    //             name: "Mahmoud Darwish",
    //             desc: "Stomach pain diagnosis appointment",
    //             time: "5:00 PM",
    //             address: "New Horizon District, House 33",
    //         },
    //         {
    //             id: 12,
    //             name: "Reem Al-Hassan",
    //             desc: "Postpartum recovery consultation",
    //             time: "6:00 PM",
    //             address: "Al-Nour Street, Building 7, Apartment 2",
    //         },
    //     ],
    // };

    const fetchSchedules = (page=1, perPage=6) => {
        setIsLoading(true);
        setError(null);

      let url = `https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/provider/physiotherapist/schedules?page=${page}&per_page=${perPage}`;
      if (selectedFilter !== "All") {
        url += `&status=${selectedFilter}`;
      }
        fetch(url,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "true",
                    "Authorization": `Bearer ${token}`,
                },
            }
        )
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((serverError) => {
                        throw new Error(serverError.message || "Request failed");
                    });
                }
                return response.json();
            })
            .then((data) => {
                setSchedules(data.data);
console.log('schedules: ',data);
                const totalItems = data.meta?.total ;
                const totalPages = Math.ceil(totalItems / (perPage || 3));
                setPagination((prev) => ({
                    ...prev,
                    totalItems: totalItems,
                    totalPages: totalPages,
                }));
            })
            .catch((error) => {
                setError(error.message || "Failed to load schedules.");
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
    const handleViewDetails = async (e, patientId) => {
        e.preventDefault();
        setViewDetails(patientId);
        setDetailsError(null);
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
            setDetails(data.data || data);
        } catch (err) {
            setDetailsError(err.message || "Failed to load Details");
        } finally {
            setViewDetails(null);
        }
    };
    
    const handleFilterClick = () => setFilterOpen(!filterOpen);
    
    const handleSelectFilter = (filter) => {
        setSelectedFilter(filter);
        setFilterOpen(false);
        setPagination((prev) => ({ ...prev, currentPage: 1 }));
    };
    
    useEffect(() => {
        fetchSchedules(pagination.currentPage, pagination.itemsPerPage);
    }, [pagination.currentPage,showSessionModal,selectedFilter]);

    return (
       <>
            <PhysioHeader />
            <div className="p-10 bg-gray-50 min-h-[60vh]">
                <div className="mb-10">
                    <div className="flex items-center justify-between mb-2">
                        <h1 className="text-[#0a3460] text-3xl font-bold">My Schedules</h1>
                        <div className="relative">
                            <button
                                onClick={handleFilterClick}
                                className="bg-[#ebfafa] border-none px-5 py-3 rounded-lg text-[#009999] font-semibold cursor-pointer text-base flex items-center gap-2 transition-all duration-300 hover:bg-[#d6f3f3] hover:transform hover:-translate-y-0.5"
                            >
                                Filter: {selectedFilter === "All" ? "All" : selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)}
                                <ChevronDown size={18} className={`transition-transform duration-300 ${filterOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {filterOpen && (
                                <div className="absolute top-full right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg py-2 w-40 z-10">
                                    <p
                                        onClick={() => handleSelectFilter("All")}
                                        className={`px-4 py-2 cursor-pointer transition-colors hover:bg-[#f3fafa] ${selectedFilter === "All" ? "bg-[#ebfafa] font-semibold" : ""}`}
                                    >
                                        All
                                    </p>
                                    <p
                                        onClick={() => handleSelectFilter("accepted")}
                                        className={`px-4 py-2 cursor-pointer transition-colors hover:bg-[#f3fafa] ${selectedFilter === "accepted" ? "bg-[#ebfafa] font-semibold" : ""}`}
                                    >
                                        Accepted
                                    </p>
                                    <p
                                        onClick={() => handleSelectFilter("completed")}
                                        className={`px-4 py-2 cursor-pointer transition-colors hover:bg-[#f3fafa] ${selectedFilter === "completed" ? "bg-[#ebfafa] font-semibold" : ""}`}
                                    >
                                        Completed
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                    <p className="text-gray-600 text-lg mt-2">View your patient visits</p>
                </div>
                
                {isLoading ? 
                <p className="text-center text-gray-500 text-lg font-medium animate-pulse my-4">
                Loading orders...
              </p>
              :
                 schedules.length > 0 ?
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                    {schedules.map((schedule) => (
                        <div
                            key={schedule.patient_id}
                            className="bg-white shadow-md rounded-[10px] p-5 hover:shadow-xl transition-all duration-300 border border-gray-200"
                        >
                            <div className="pb-4 mb-4 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-800">{schedule.patient_name}</h2>
                                <p className="text-md text-[var(--text-color)] font-medium"><span className="text-[var(--cyan)] font-medium">Service:</span> {schedule.service}</p>
                            </div>
                            

                            <div className="flex flex-col gap-3 text-gray-700">
                                <div className="flex items-center gap-2">
                                    <Clock size={18} className="text-[var(--cyan)]" />
                                    <span className="text-sm font-medium">At: {new Date(schedule.scheduled_at).toLocaleString()}</span>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    <MapPin size={18} className="text-[var(--cyan)]" />
                                    <span className="text-sm font-medium">{schedule.address}</span>
                                </div>
                                <span className="my-3">Status: <span className={`font-medium ${schedule.status === "accepted" ? "text-green-500" : "text-[var(--text-color)]"}`} >{schedule.status}</span></span>
                            </div>

                            <div className="mt-4 flex justify-between items-center gap-2">
                                <button
                                    onClick={(e) => handleViewDetails(e, schedule.patient_id)}
                                    className="text-[#0a3460] text-sm font-semibold hover:text-[#39CCCC] transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={viewDetails === schedule.patient_id}
                                >
                                    {viewDetails === schedule.patient_id ? "Loading..." : "View details"}
                                </button>
                                {schedule.status !== "completed" ?
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setSelectedPatientId(schedule.patient_id);
                                        setSelectedSessionId(schedule.session_id);
                                        setShowSessionModal(true);
                                    }}
                                    className="bg-[var(--dark-blue)] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[var(--card-border)] hover:text-[var(--dark-blue)] transition "
                                >
                                    Start Session
                                </button>
                                :
                                ""
                            }
                            </div>
                        </div>
                    ))
                }
                </div>
                :
                error ?
                <p className="text-center text-red-500 text-lg font-semibold my-4">
                {error}
              </p>
              :
              <p className="text-center text-lg my-5">No Schedules Found</p>

            }

                <div className="flex justify-center items-center gap-4">
                    <button
                        onClick={handlePrevPage}
                        disabled={pagination.currentPage === 1}
                        className={`px-5 py-2 rounded-lg border text-sm font-medium ${
                            pagination.currentPage === 1
                             ? "text-gray-400 border-gray-300 cursor-not-allowed"
                                : "text-[#39CCCC] border-[#39CCCC] hover:bg-[#39cccc97] transition-all duration-300"
                        }`}
                    >
                        Previous
                    </button>

                    <span className="text-gray-700 font-semibold">
                        {pagination.currentPage} of {pagination.totalPages}
                    </span>

                    <button
                        onClick={handleNextPage}
                        disabled={pagination.currentPage === pagination.totalPages}
                        className={`px-5 py-2 rounded-lg border text-sm font-medium ${
                            pagination.currentPage === pagination.totalPages
                                ? "text-gray-400 border-gray-300 cursor-pointer"
                                : "text-[#39CCCC] border-[#39CCCC] hover:bg-[#39cccc97] transition-all duration-300"
                        }`}
                    >
                        Next
                    </button>
                </div>
          </div>
      
      <CareProviderStartSession
        isOpen={showSessionModal}
        onClose={() => {
          setShowSessionModal(false);
          setSelectedPatientId(null);
          setSelectedSessionId(null);
          fetchSchedules();
        }}
        patientId={selectedPatientId}
        sessionId={selectedSessionId}
        providerType="physiotherapist"
      />

      {details && (
        <PatientDetailsModal
          details={details}
          onClose={() => {
            setDetails(null);
            setDetailsError(null);
          }}
        />
      )}

      <Footer />
        </>
    );
};

export default PhysioSchedules;