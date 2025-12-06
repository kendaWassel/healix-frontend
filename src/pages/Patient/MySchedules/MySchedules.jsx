import React, { useEffect, useState } from "react";
import { Phone, Clock, DollarSign } from "lucide-react";
import Footer from "../../../components/footer/Footer";
import PatientHeader from "../../../components/headers/PatientHeader";
import PatientScheduleCall from "./PatientScheduleCall";

const MySchedules = () => {
    const [schedules, setSchedules] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showCallModal, setShowCallModal] = useState(false);
    const [selectedConsultationId, setSelectedConsultationId] = useState(null);
    const [selectedDoctorId, setSelectedDoctorId] = useState(null);
    const [selectedDoctorPhone, setSelectedDoctorPhone] = useState(null);
    const token = localStorage.getItem("token");

    const [pagination, setPagination] = useState({
        currentPage: 1,
        itemsPerPage: 3,
        totalItems: 0,
        totalPages: 1,
    });

    const fetchSchedules = (page, perPage) => {
        setIsLoading(true);
        setError(null);

        fetch(
            `https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/patient/my-schedules?page=${page}&per_page=${perPage}`,
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

                // Update pagination from API response
                const totalItems = data.meta?.total || data.total || schedules.length;
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

    const formatDateTime = (dateString) => {
        if (!dateString) {
            return "Unknown date";
        }
        
        // Handle different date formats from API
        let date;
        
        // If it's a number (timestamp), use it directly
        if (typeof dateString === 'number') {
            date = new Date(dateString);
        } else if (typeof dateString === 'string') {
            // Check if it already has timezone info (ends with Z or has +/- after the time)
            const hasTimezone = dateString.endsWith('Z') || 
                              /[+-]\d{2}:\d{2}$/.test(dateString) ||
                              /[+-]\d{4}$/.test(dateString);
            
            if (hasTimezone) {
                date = new Date(dateString);
            } else if (dateString.includes('T')) {
                // ISO format without timezone - treat as UTC by appending Z
                date = new Date(dateString + 'Z');
            } else {
                // Try parsing as-is
                date = new Date(dateString);
            }
        } else {
            date = new Date(dateString);
        }
        
        // Check if date is valid
        if (isNaN(date.getTime())) {
            return "Invalid date";
        }
    
        const formattedDate = date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            timeZone: "UTC"
        });
    
        const formattedTime = date.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "UTC"
        });
    
        return `${formattedDate} at ${formattedTime}`;
    };
    const fixImageUrl = (url) => {
        if (!url) return '/no-photo.png';
        return url.replace("http://", "https://");
    };
    

    useEffect(() => {
        fetchSchedules(pagination.currentPage, pagination.itemsPerPage);
    }, [pagination.currentPage, pagination.itemsPerPage]);

    return (
         <>
         <PatientHeader />
        <div className="p-10 bg-gray-50 min-h-screen">
            <div className="mb-10 text-left">
                <h1 className="text-[#0a3460] text-3xl font-bold">My Schedules</h1>
                <p className="text-gray-600 text-lg mt-2">Check your Schedules here</p>
            </div>
            {error && <p className="text-center text-red-600 mb-4">{error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                {schedules && schedules.length > 0 ? schedules.map((schedule) => (
                    <div
                        key={schedule.id}
                        className="bg-white shadow-md rounded-[10px] p-5 hover:shadow-xl transition-all duration-300 border-[1px] border-[var(--card-border)]"
                    >
                        <div className="flex items-center justify-between pb-[1rem] mb-[1rem] border-b-[2px] border-[var(--card-border)]">
                            <div className="flex items-start gap-4">
                            <img
    src={fixImageUrl(schedule.doctor_image)}
    alt="doctor's photo"
    className="w-[40px] h-[40px] rounded-full object-cover border border-blue-400"
/>

                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800">{schedule.doctor_name}</h2>
                                    <p className="text-sm text-gray-500 font-medium">{schedule.specialization}</p>
                                </div>
                            </div>

                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedConsultationId(schedule.consultation_id || schedule.id);
                                    setSelectedDoctorId(schedule.doctor_id);
                                    setSelectedDoctorPhone(schedule.doctor_phone);
                                    setShowCallModal(true);
                                }}
                                className="flex items-center gap-2 bg-[#ecf8f6] text-[#0a3460] px-3 py-2 rounded-xl hover:bg-[#39cccc97] transition"
                            >
                                <Phone size={18} className="text-[#39CCCC]" />
                                <span>Call</span>
                            </button>
                        </div>

                        <div className="flex items-center gap-4 text-gray-700 mb-[1rem]">
                            <div className="flex items-center gap-2">
                                <Clock size={18} className="text-[#39CCCC]" />
                                <span className="text-sm font-medium">
    {formatDateTime(schedule.scheduled_at)}
</span>

                            </div>
                            <div className="flex items-end">
                                <DollarSign size={18} className="text-[#39CCCC]" />
                                <span className="text-sm font-medium">{schedule.fee}</span>
                            </div>
                        </div>

                    </div>
                )) : isLoading ? <p className="col-span-full text-center text-gray-600">Loading schedules...</p> : <p className="col-span-full text-center text-gray-600">No schedules found.</p>}
            </div>

            {schedules.length > 0 && (
                <div className="flex justify-center items-center gap-4">
                    <button
                        onClick={handlePrevPage}
                        disabled={pagination.currentPage === 1}
                        className={`px-5 py-2 rounded-lg border text-sm font-medium ${pagination.currentPage === 1
                            ? "text-gray-400 border-gray-300 cursor-not-allowed"
                            : "text-[#39CCCC] border-[#39CCCC] hover:bg-[#39cccc97]"
                            }`}
                    >
                        Previous
                    </button>

                    <span className="text-gray-700 font-semibold">
                        {pagination.currentPage} / {pagination.totalPages}
                    </span>

                    <button
                        onClick={handleNextPage}
                        disabled={pagination.currentPage === pagination.totalPages}
                        className={`px-5 py-2 rounded-lg border text-sm font-medium ${pagination.currentPage === pagination.totalPages
                            ? "text-gray-400 border-gray-300 cursor-not-allowed"
                            : "text-[#39CCCC] border-[#39CCCC] hover:bg-[#39cccc97]"
                            }`}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
        <Footer/>

        <PatientScheduleCall
          isOpen={showCallModal}
          onClose={() => {
            setShowCallModal(false);
            setSelectedConsultationId(null);
            setSelectedDoctorId(null);
            setSelectedDoctorPhone(null);
          }}
          consultationId={selectedConsultationId}
          doctorId={selectedDoctorId}
          doctorPhone={selectedDoctorPhone}
        />
       </>
    );
};

export default MySchedules;
