import React, { useEffect, useState } from "react";
import { Clock, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "./components/footer/Footer";
import PatientHeader from "../../../components/headers/PatientHeader";

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(2);
    const navigate = useNavigate();


    const mockData = {
        1: [
            {
                id: 1,
                name: "Hassan Al-Rifai",
                desc: "High blood pressure follow-up",
                time: "9:00 AM",
                address: "Al-Mazzeh Street, Building 12, Apartment 4",
            },
            {
                id: 2,
                name: "Mariam Saleh",
                desc: "Cold and sore throat check",
                time: "9:45 AM",
                address: "Al-Tejarah District, House 27 near City Park",
            },
            {
                id: 3,
                name: "Omar Nasser",
                desc: "Follow-up after hand fracture",
                time: "10:30 AM",
                address: "Tishreen Street, Building 8, Floor 2",
            },
            {
                id: 4,
                name: "Lina Khalil",
                desc: "Diabetes control review",
                time: "11:15 AM",
                address: "Al-Amal Neighborhood, House 15 next to bakery",
            },
            {
                id: 5,
                name: "Ahmad Barakat",
                desc: "Post-surgery check for appendix removal",
                time: "12:00 PM",
                address: "Baghdad Street, near Green Pharmacy",
            },
            {
                id: 6,
                name: "Rania Issa",
                desc: "Migraine and headache evaluation",
                time: "1:00 PM",
                address: "Al-Jalaa' City, Building 5B, 3rd Floor",
            },
        ],
        2: [
            {
                id: 7,
                name: "Tarek Mansour",
                desc: "Back pain physical therapy session",
                time: "2:00 PM",
                address: " Old Damascus District, House 21 behind old mosque",
            },
            {
                id: 8,
                name: "Sara Hamdan",
                desc: "Routine pregnancy checkup",
                time: "2:45 PM",
                address: "Al-Salam Street, Building 2, Apt. 6",
            },
            {
                id: 9,
                name: "Khaled Jaber",
                desc: "Post-COVID breathing follow-up",
                time: "3:30 PM",
                address: "Al-Fayhaa Neighborhood, House 10",
            },
            {
                id: 10,
                name: "Nour Fares",
                desc: "Allergy and skin rash evaluation",
                time: "4:15 PM",
                address: "Al-Tawfiq Street, next to grocery shop",
            },
            {
                id: 11,
                name: "Mahmoud Darwish",
                desc: "Stomach pain diagnosis appointment",
                time: "5:00 PM",
                address: "New Horizon District, House 33",
            },
            {
                id: 12,
                name: "Reem Al-Hassan",
                desc: "Postpartum recovery consultation",
                time: "6:00 PM",
                address: "Al-Nour Street, Building 7, Apartment 2",
            },
        ],
    };

     const fetchAppointments = async (pageNumber = 1) => {
        try {
             
            /*
            const response = await fetch(`https://your-api.com/api/Appointments?page=${pageNumber}`);
            const data = await response.json();
            setAppointments(data.Appointments || []);
            setTotalPages(data.total_pages || 1);
            */

            setAppointments(mockData[pageNumber] || []);
            setPage(pageNumber);
        } catch (error) {
            console.error("Error fetching Appointments:", error);
        }
    };
    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleNext = () => {
        if (page < totalPages) fetchAppointments(page + 1);
    };

    const handlePrevious = () => {
        if (page > 1) fetchAppointments(page - 1);
    };

    const handleViewDetails = (id) => {
        navigate(`/patient-details/${id}`);
    };

    return (
       <>
            <PatientHeader />
            <div className="p-10 bg-gray-50 min-h-screen">
                <div className="mb-10 text-left">
                    <h1 className="text-[#0a3460] text-3xl font-bold">My Appointments</h1>
                    <p className="text-gray-600 text-lg mt-2">View your patient visits</p>
                </div>
                

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                    {appointments.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white shadow-md rounded-[10px] p-5 hover:shadow-xl transition-all duration-300 border border-gray-200"
                        >
                            <div className="pb-4 mb-4 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                                <p className="text-sm text-gray-500">{item.desc}</p>
                            </div>
                            

                            <div className="flex flex-col gap-3 text-gray-700">
                                <div className="flex items-center gap-2">
                                    <Clock size={18} className="text-[#39CCCC]" />
                                    <span className="text-sm font-medium">{item.time}</span>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    <MapPin size={18} className="text-[#39CCCC]" />
                                    <span className="text-sm font-medium">{item.address}</span>
                                </div>
                            </div>

                            <div className="mt-4 flex justify-end">
                                <button
                                    onClick={() => handleViewDetails(item.id)}
                                    className="text-[#0a3460] text-sm font-semibold hover:text-[#39CCCC] transition"
                                >
                                    View details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center items-center gap-4">
                    <button
                        onClick={handlePrevious}
                        disabled={page === 1}
                        className={`px-5 py-2 rounded-lg border text-sm font-medium ${
                            page === 1
                             ? "text-gray-400 border-gray-300 cursor-pointer"
                                : "text-[#39CCCC] border-[#39CCCC] hover:bg-[#39cccc97]"
                        }`}
                    >
                        Previous
                    </button>

                    <span className="text-gray-700 font-semibold">
                        {page} of {totalPages}
                    </span>

                    <button
                        onClick={handleNext}
                        disabled={page === totalPages}
                        className={`px-5 py-2 rounded-lg border text-sm font-medium ${
                            page === totalPages
                                ? "text-gray-400 border-gray-300 cursor-pointer"
                                : "text-[#39CCCC] border-[#39CCCC] hover:bg-[#39cccc97]"
                        }`}
                    >
                        Next
                    </button>
                </div>
          </div>
      <Footer />
        </>
    );
};

export default Appointments;