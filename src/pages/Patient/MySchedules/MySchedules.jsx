import React, { useEffect, useState } from "react";
import { Phone, Clock, DollarSign } from "lucide-react";
import Footer from "../../../components/footer/Footer";
import PatientHeader from "../../../components/headers/PatientHeader";
import PatientScheduleCall from "./PatientScheduleCall";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import RatingModal from "../DoctorConsultation/Booking/RatingModal";
import DoneModal from "../DoctorConsultation/Booking/DoneModal";
const MySchedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cpSchedules, setCpSchedules] = useState([]);
  const [showCallModal, setShowCallModal] = useState(false);
  const [selectedConsultationId, setSelectedConsultationId] = useState(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [selectedDoctorPhone, setSelectedDoctorPhone] = useState(null);
  const [cpIsLoading, setCpIsLoading] = useState(false);
  const [cpError, setCpError] = useState(null);
  const [showRateModal, setShowRateModal] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [selectedCpId, setSelectedCpId] = useState(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showBookingDone, setShowBookingDone] = useState(false);
  const token = localStorage.getItem("token");

  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 3,
    totalItems: 0,
    totalPages: 1,
  });
  const [cpPagination, setCpPagination] = useState({
    currentPage: 1,
    itemsPerPage: 3,
    totalItems: 0,
    totalPages: 1,
  });

  const fetchSchedules = () => {
    setIsLoading(true);
    setError(null);

    fetch(
      `https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/patient/my-schedules?page=${pagination.currentPage}&per_page=3`,
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
        console.log("schedules: ", data);
        const totalItems = data.meta?.total || 0;
        const totalPages = Math.ceil(totalItems / pagination.itemsPerPage) || 1;
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
  const fetchCpSchedules = () => {
    setCpIsLoading(true);
    setCpError(null);

    fetch(
      `https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/patient/care-provider-schedules?page=${cpPagination.currentPage}&per_page=3`,
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
        setCpSchedules(data.data);
        console.log("Cp schedules: ", data);
        const totalItems = data.meta?.total || 0;
        const totalPages = Math.ceil(totalItems / cpPagination.itemsPerPage) || 1;
        setCpPagination((prev) => ({
          ...prev,
          totalItems: totalItems,
          totalPages: totalPages,
        }));
      })
      .catch((error) => {
        setCpError(error.message || "Failed to load schedules.");
      })
      .finally(() => {
        setCpIsLoading(false);
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
  const handleCpNextPage = () => {
    if (cpPagination.currentPage < cpPagination.totalPages) {
      setCpPagination((prev) => ({
        ...prev,
        currentPage: prev.currentPage + 1,
      }));
    }
  };

  const handleCpPrevPage = () => {
    if (cpPagination.currentPage > 1) {
      setCpPagination((prev) => ({
        ...prev,
        currentPage: prev.currentPage - 1,
      }));
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) {
      return "Unknown date";
    }
    let date;
    if (typeof dateString === "number") {
      date = new Date(dateString);
    } else if (typeof dateString === "string") {
      const hasTimezone =
        dateString.endsWith("Z") ||
        /[+-]\d{2}:\d{2}$/.test(dateString) ||
        /[+-]\d{4}$/.test(dateString);

      if (hasTimezone) {
        date = new Date(dateString);
      } else if (dateString.includes("T")) {
        date = new Date(dateString + "Z");
      } else {
        date = new Date(dateString);
      }
    } else {
      date = new Date(dateString);
    }

    if (isNaN(date.getTime())) {
      return "Invalid date";
    }

    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "UTC",
    });

    const formattedTime = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    });

    return `${formattedDate} at ${formattedTime}`;
  };
  const fixImageUrl = (url) => {
    if (!url) return "/no-photo.png";
    return url;
  };

  const handleRatingSkip = () => {
    setShowRateModal(false);
    fetchCpSchedules();
  };
  useEffect(() => {
    fetchSchedules();
  }, [pagination.currentPage]);
  useEffect(() => {
    fetchCpSchedules();
  }, [cpPagination.currentPage]);

  return (
    <>
      <PatientHeader />
      <div className="bg-gray-50">
        <div className="doctor-schedules px-10 pt-[2rem] pb-0">
          <div className="mb-10 text-left">
            <h1 className="text-[#0a3460] text-3xl font-bold">
              Doctor Schedules
            </h1>
            <p className="text-gray-600 text-lg mt-2">
              Check your Schedules here
            </p>
          </div>
          {isLoading?
          <p className="col-span-full text-center text-gray-600 my-5">
          Loading schedules...
        </p>
        :
        error?
        <p className="text-center text-red-600 mb-4">{error}</p>
        :
        schedules.length > 0 ?

          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            { schedules.map((schedule) => (
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
                        <h2 className="text-lg font-semibold text-gray-800">
                          {schedule.doctor_name}
                        </h2>
                        <p className="text-sm text-gray-500 font-medium">
                          {schedule.specialization}
                        </p>
                      </div>
                    </div>
                    {schedule.status !== "completed" ? (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedConsultationId(
                            schedule.consultation_id || schedule.id
                          );
                          setSelectedDoctorId(schedule.doctor_id);
                          setSelectedDoctorPhone(schedule.doctor_phone);
                          setShowCallModal(true);
                        }}
                        className="flex items-center gap-2 bg-[#ecf8f6] text-[#0a3460] px-3 py-2 rounded-xl hover:bg-[var(--dark-blue)] hover:text-[white_!important] transition"
                      >
                        <Phone size={18} className="text-[#39CCCC]" />
                        <span>Call</span>
                      </button>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="flex justify-between items-center mb-[1rem]">
                    <div className="flex items-center gap-4 text-gray-700">
                      <div className="flex items-center gap-2">
                        <Clock size={18} className="text-[#39CCCC]" />
                        <span className="text-sm font-medium">
                          {new Date(schedule.scheduled_at).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-end">
                        <DollarSign size={18} className="text-[#39CCCC]" />
                        <span className="text-sm font-medium">
                          {schedule.fee}
                        </span>
                      </div>
                    </div>
                    <span className="text-[var(--text-color)] font-medium">
                      {schedule.status || "Unknown"}
                    </span>
                  </div>
                </div>
              ))}
          </div>
          :
              <p className="col-span-full text-center text-gray-600">
                No schedules found.
              </p>
}

            <div className="flex justify-center items-center gap-4">
              <button
                onClick={handlePrevPage}
                disabled={pagination.currentPage === 1}
                className={`px-5 py-2 rounded-lg border text-sm font-medium ${
                  pagination.currentPage === 1
                    ? "text-gray-400 border-gray-300 cursor-not-allowed"
                    : "text-[#39CCCC] border-[#39CCCC] hover:bg-[#39cccc97]"
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
                    ? "text-gray-400 border-gray-300 cursor-not-allowed"
                    : "text-[#39CCCC] border-[#39CCCC] hover:bg-[#39cccc97]"
                }`}
              >
                Next
              </button>
            </div>
        </div>
        <div className="careprovider-schedules px-10 pb-[2rem] pt-5">
          <div className="mb-10 text-left">
            <h1 className="text-[#0a3460] text-3xl font-bold">
              Care Provider Schedules
            </h1>
            <p className="text-gray-600 text-lg mt-2">
              Check your Schedules here
            </p>
          </div>
        {cpIsLoading?
        <p className="col-span-full text-center text-gray-600 my-5">
        Loading schedules...
      </p>
      :error?
<p className="text-center text-red-600 mb-4">{cpError}</p>
:
cpSchedules.length > 0 ? 

    
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            {cpSchedules.map((schedule) => (
                <div
                  key={schedule.session_id}
                  className="bg-white shadow-md rounded-[10px] p-5 hover:shadow-xl transition-all duration-300 border-[1px] border-[var(--card-border)]"
                >
                  <div className="flex items-center justify-between pb-[1rem] mb-[1rem] border-b-[2px] border-[var(--card-border)]">
                    <div className="flex items-start gap-4">
                      <img
                        src={fixImageUrl(schedule.image)}
                        alt="doctor's photo"
                        className="w-[40px] h-[40px] rounded-full object-cover border border-blue-400"
                      />

                      <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                          {schedule.care_provider_name}
                        </h2>
                        <p className="text-md text-gray-500 font-medium">
                          Type: {schedule.type}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedSessionId(schedule.session_id);
                        setSelectedCpId(schedule.care_provider_id);
                        setShowRateModal(true);
                      }}
                      className="flex items-center gap-2 bg-[#ecf8f6] text-[#0a3460] px-3 py-2 rounded-xl hover:bg-[var(--dark-blue)] hover:text-[white_!important] transition"
                    >
                      <FontAwesomeIcon
                        icon={faStar}
                        className="text-[var(--cyan)]"
                      />
                      <span>Rate</span>
                    </button>
                  </div>
                    <div className="flex items-center gap-4 text-gray-700 mb-[1rem] text-lg">
                      <div className="flex items-center gap-2">
                        <Clock size={18} className="text-[#39CCCC]" />
                        <span className="font-medium">
                          {new Date(schedule.scheduled_at).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign size={18} className="text-[#39CCCC]" />
                        <span className="font-medium">
                          {schedule.session_fee}
                        </span>
                      </div>
                    </div>
                  <div className="mb-3 text-lg">
                    <span className="text-[var(--text-color)] font-medium">
                      <span className="text-[var(--cyan)] font-bold pe-2">
                        Service:
                      </span>
                      {schedule.session_reason || "Unknown"}
                    </span>
                  </div>
                  <div className="mb-2 text-lg">
                    <span className="text-[var(--cyan)] font-bold pe-2">
                      Gender:
                    </span>
                    <span className="text-[var(--text-color)] font-medium">
                      {schedule.gender || "Unknown"}
                    </span>
                  </div>
                  <div>
                  <span className="text-[var(--cyan)] font-bold pe-2">
                     Status:
                    </span>
                  <span className="text-[var(--text-color)] font-medium">
                    {schedule.status || "Unknown"}
                  </span>
                  </div>
                </div>
          )) }
          </div>
          :
              <p className="col-span-full text-center text-gray-600">
                No schedules found.
              </p>
             }
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={handleCpPrevPage}
                disabled={cpPagination.currentPage === 1}
                className={`px-5 py-2 rounded-lg border text-sm font-medium ${
                  cpPagination.currentPage === 1
                    ? "text-gray-400 border-gray-300 cursor-not-allowed"
                    : "text-[#39CCCC] border-[#39CCCC] hover:bg-[#39cccc97]"
                }`}
              >
                Previous
              </button>

              <span className="text-gray-700 font-semibold">
                {cpPagination.currentPage} of {cpPagination.totalPages}
              </span>

              <button
                onClick={handleCpNextPage}
                disabled={cpPagination.currentPage === cpPagination.totalPages}
                className={`px-5 py-2 rounded-lg border text-sm font-medium ${
                  cpPagination.currentPage === cpPagination.totalPages
                    ? "text-gray-400 border-gray-300 cursor-not-allowed"
                    : "text-[#39CCCC] border-[#39CCCC] hover:bg-[#39cccc97]"
                }`}
              >
                Next
              </button>
            </div>
        </div>
      </div>
      <Footer />

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
      <RatingModal
        isOpen={showRateModal}
        onClose={handleRatingSkip}
        url={`session/${selectedSessionId}/rate/${selectedCpId}`}
        onRatingSuccess={() => {
          setShowRatingModal(false);
          setTimeout(() => {
            setShowBookingDone(true);
          }, 300);
        }}
      />
      <DoneModal
        isOpen={showBookingDone}
        onHome={() => {
          setShowBookingDone(false);
          fetchCpSchedules();
        }}
        message="Thank you for your feedback!"
      />
    </>
  );
};

export default MySchedules;
