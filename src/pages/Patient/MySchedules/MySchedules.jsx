import React, { useEffect, useState } from "react";
import { Phone, Clock, DollarSign } from "lucide-react";
import doctor1 from "../../../assets/doctoricon.png";
import Footer from "../../../components/footer/Footer";

const MySchedules = () => {
    const [schedules, setSchedules] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(2);

    // بيانات افتراضية 
    const mockData = {
        1: [
            {
                id: 1,
                name: "Dr. Ahmad Youssef",
                desc: "Cardiologist - Al Amin Clinic",
                time: "10:30 AM - 11:00 AM",
                price: "$40",
                image: doctor1,
                phone: "+963999999111",
            },
            {
                id: 2,
                name: "Dr. Lina H.",
                desc: "Dermatologist - SkinCare Center",
                time: "11:00 AM - 11:30 AM",
                price: "$55",
                image: doctor1,
                phone: "+963999999222",
            },
            {
                id: 3,
                name: "Dr. Rami S.",
                desc: "Dentist - Smile Dental Clinic",
                time: "1:00 PM - 1:30 PM",
                price: "$60",
                image: doctor1,
                phone: "+963999999333",
            },
            {
                id: 4,
                name: "Dr. Sara Khaled",
                desc: "Neurologist - City Hospital",
                time: "9:00 AM - 9:30 AM",
                price: "$50",
                image: doctor1,
                phone: "+963999999444",
            },
            {
                id: 5,
                name: "Dr. Omar Ali",
                desc: "Pediatrician - Kids Care Center",
                time: "10:00 AM - 10:30 AM",
                price: "$45",
                image: doctor1,
                phone: "+963999999555",
            },
            {
                id: 6,
                name: "Dr. Hiba N.",
                desc: "Orthopedic - City Orthopedic Clinic",
                time: "2:00 PM - 2:30 PM",
                price: "$70",
                image: doctor1,
                phone: "+963999999666",
            },
        ],
        2: [
            {
                id: 7,
                name: "Dr. Maher K.",
                desc: "ENT Specialist - Al Salam Clinic",
                time: "3:00 PM - 3:30 PM",
                price: "$55",
                image: doctor1,
                phone: "+963999999777",
            },
            {
                id: 8,
                name: "Dr. Noor A.",
                desc: "Psychiatrist - MindCare Center",
                time: "12:00 PM - 12:30 PM",
                price: "$65",
                image: doctor1,
                phone: "+963999999888",
            },
            {
                id: 9,
                name: "Dr. Basel T.",
                desc: "Surgeon - Damascus Hospital",
                time: "5:00 PM - 5:30 PM",
                price: "$90",
                image: doctor1,
                phone: "+963999999999",
            },
            {
                id: 10,
                name: "Dr. Dima R.",
                desc: "Oncologist - Hope Clinic",
                time: "4:00 PM - 4:30 PM",
                price: "$80",
                image: doctor1,
                phone: "+963999999100",
            },
            {
                id: 11,
                name: "Dr. Tarek M.",
                desc: "Gastroenterologist - Stomach Health",
                time: "6:00 PM - 6:30 PM",
                price: "$50",
                image: doctor1,
                phone: "+963999999101",
            },
            {
                id: 12,
                name: "Dr. Yara S.",
                desc: "Endocrinologist - City Care",
                time: "7:00 PM - 7:30 PM",
                price: "$60",
                image: doctor1,
                phone: "+963999999102",
            },
        ],
    };

    const fetchSchedules = async (pageNumber = 1) => {
        try {
            //  كود  API   
            /*
            const response = await fetch(`https://your-api.com/api/schedules?page=${pageNumber}`);
            const data = await response.json();
            setSchedules(data.schedules || []);
            setTotalPages(data.total_pages || 1);
            */

            //  الداتا الافتراضية
            setSchedules(mockData[pageNumber] || []);
            setPage(pageNumber);
        } catch (error) {
            console.error("Error fetching schedules:", error);
        }
    };

    useEffect(() => {
        fetchSchedules();
    }, []);

    const handleNext = () => {
        if (page < totalPages) fetchSchedules(page + 1);
    };

    const handlePrevious = () => {
        if (page > 1) fetchSchedules(page - 1);
    };

    return (
         <>
        <div className="p-10 bg-gray-50 min-h-screen">
            <div className="mb-10 text-left">
                <h1 className="text-[#0a3460] text-3xl font-bold">My Schedules</h1>
                <p className="text-gray-600 text-lg mt-2">Check your Schedules here</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                {schedules.slice(0, 6).map((item) => (
                    <div
                        key={item.id}
                        className="bg-white shadow-md rounded-2xl p-5 hover:shadow-xl transition-all duration-300"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 rounded-full object-cover border border-blue-400"
                                />
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                                    <p className="text-sm text-gray-500">{item.desc}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => window.open(`tel:${item.phone}`, "_self")}
                                className="flex items-center gap-2 bg-[#ecf8f6] text-[#0a3460] px-3 py-2 rounded-xl hover:bg-[#39cccc97] transition"
                            >
<Phone size={18} className="text-[#39CCCC]" />
                                <span>Call</span>
                            </button>
                        </div>

                        <hr className="my-4 border-gray-200" />

                        <div className="flex items-center gap-4 text-gray-700">
                            <div className="flex items-center gap-2">
                                <Clock size={18} className="text-[#39CCCC]" />
                                <span className="text-sm">{item.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <DollarSign size={18} className="text-[#39CCCC]" />
                                <span className="text-sm">{item.price}</span>
                            </div>
                        </div>

                    </div>
                ))}
            </div>

            <div className="flex justify-center items-center gap-4">
                <button
                    onClick={handlePrevious}
                    disabled={page === 1}
                    className={`px-5 py-2 rounded-lg border text-sm font-medium ${page === 1
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
                    className={`px-5 py-2 rounded-lg border text-sm font-medium ${page === totalPages
                        ? "text-gray-400 border-gray-300 cursor-pointer"
                        : "text-[#39CCCC] border-[#39CCCC] hover:bg-[#39cccc97]"
                        }`}
                >
                    Next
                </button>
            </div>
        </div>
        <Footer/>
       </>
    );
};

export default MySchedules;
