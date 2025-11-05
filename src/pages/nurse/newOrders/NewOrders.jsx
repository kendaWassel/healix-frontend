import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import NurseHeader from "../../../components/headers/NurseHeader";
import Footer from "../../../components/footer/Footer";

const NewOrders = () => {
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
        address:"Damascus,AL Mazzeh",
        time: "10:30 AM - 11:00 AM",
      },
      {
        id: 2,
        name: "Dr. Lina H.",
        desc: "Dermatologist - SkinCare Center",
        address:"Homs, AL Khaldieh",
        time: "11:00 AM - 11:30 AM",
      },
      {
        id: 3,
        name: "Dr. Rami S.",
        desc: "Dentist - Smile Dental Clinic",
        address:"Damascus,Kudsaya",
        time: "1:00 PM - 1:30 PM",
      },
      {
        id: 4,
        name: "Dr. Sara Khaled",
        desc: "Neurologist - City Hospital",
        address:"Daraa,Izraa",
        time: "9:00 AM - 9:30 AM",
      },
      {
        id: 5,
        name: "Dr. Omar Ali",
        desc: "Pediatrician - Kids Care Center",
        address:"Tartous,AL Sheikh Bader",
        time: "10:00 AM - 10:30 AM",
      },
      {
        id: 6,
        name: "Dr. Hiba N.",
        desc: "Orthopedic - City Orthopedic Clinic",
        address:"Lattakia,AL Sleiba",
        time: "2:00 PM - 2:30 PM",
      },
    ],
    2: [
      {
        id: 7,
        name: "Dr. Maher K.",
        desc: "ENT Specialist - Al Salam Clinic",
        address:"Hama, AL Ashrafiah",
        time: "3:00 PM - 3:30 PM",
      },
      {
        id: 8,
        name: "Dr. Noor A.",
        desc: "Psychiatrist - MindCare Center",
        address:"Homs,Bab Sabaa",
        time: "12:00 PM - 12:30 PM",
      },
      {
        id: 9,
        name: "Dr. Basel T.",
        desc: "Surgeon - Damascus Hospital",
        address:"Lattakia,AL Sheikh Bader",
        time: "5:00 PM - 5:30 PM",
      },
      {
        id: 10,
        name: "Dr. Dima R.",
        desc: "Oncologist - Hope Clinic",
        address:"Aleppo,New Aleppo",
        time: "4:00 PM - 4:30 PM",
      },
      {
        id: 11,
        name: "Dr. Tarek M.",
        desc: "Gastroenterologist - Stomach Health",
        address:"Idlib,Sarmada",
        time: "6:00 PM - 6:30 PM",
      },
      {
        id: 12,
        name: "Dr. Yara S.",
        desc: "Endocrinologist - City Care",
        address:"Tartous,Arwad",
        time: "7:00 PM - 7:30 PM",
      },
    ],
  };

  const fetchSchedules = async (pageNumber = 1) => {
    try {
      // كود API (مؤقتاً متوقف)
      /*
      const response = await fetch(`https://your-api.com/api/schedules?page=${pageNumber}`);
      const data = await response.json();
      setSchedules(data.schedules || []);
      setTotalPages(data.total_pages || 1);
      */

      // الداتا الافتراضية
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
  const handleAccept = async (id) => {
    try {
      const response = await fetch(`https://your-api.com/api/accept/${id}`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accepted: true }),
      });

      if (response.ok) {
        setSchedules((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, status: "accepted" } : item
          )
        );
      } else {
        console.error(" Failed to accept the schedule");
      }
    } catch (error) {
      console.error(" Error accepting schedule:", error);
    }
  };
  return (
    <>
    <NurseHeader/>
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
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h2>
                <p className="text-sm text-gray-500">{item.desc}</p>
                <p className="text-sm text-gray-500 font-medium mt-[1rem]">{item.address}</p>
              </div>
              <button
                onClick={() => handleAccept(item.id)}
                disabled={item.status === "accepted"}
                className={`font-semibold transition duration-300 ease-in-out ${
                  item.status === "accepted"
                    ? "text-green-600 cursor-default"
                    : "text-[#0a3460] hover:text-[#39CCCC]"
                }`}
              >
                {item.status === "accepted" ? "Accepted" : "Accept"}
              </button>
            </div>

            <hr className="my-4 border-gray-200" />

            <div className="flex items-center gap-4 text-gray-700">
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-[#39CCCC]" />
                <span className="text-sm">{item.time}</span>
              </div>
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
    <Footer/>
    </>
  );
};

export default NewOrders;
