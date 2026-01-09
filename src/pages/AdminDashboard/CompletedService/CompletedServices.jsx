import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronLeft,faChevronRight,faEnvelope,faStar} from "@fortawesome/free-solid-svg-icons";


export default function CompletedServices () {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [service, setService] = useState(null);

const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
    totalPages: 1,
  });


    // MOCK DATA
  const mockData = [
    {
      id: 1,
      patientName: "John Doe",
      patientPhone: "123456789",
      serviceName: "Home Visit",
      providerName: "Dr. Smith",
      providerType: "Doctor",
      rating: 2,
      date: "2026-01-08",
    },
    {
      id: 2,
      patientName: "Jane Roe",
      patientPhone: "987654321",
      serviceName: "Physiotherapy",
      providerName: "Therapist Anna",
      providerType: "Therapist",
      rating: 5,
      date: "2026-01-07",
    },
    {
      id: 3,
      patientName: "Alice Johnson",
      patientPhone: "555123456",
      serviceName: "Home Visit",
      providerName: "Dr. Michael",
      providerType: "Doctor",
      rating: 3,
      date: "2026-01-06",
    },
  ];


  const fetchCompletedServices = async () => {
    setIsLoading(true);
    setError(null);

    try {
     /* const params = new URLSearchParams({
        service_type: "home_visit",
        page: pagination.currentPage,
        per_page: pagination.itemsPerPage,
      });

      const response = await fetch(
        `http://localhost:8080/api/admin/services?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch completed services");
      }

      const result = await response.json();

      const formatted = result.data.map((item) => ({
        id: item.id,
        patientName: item.patient_name,
        patientPhone: item.patient_phone,
        serviceName: item.service_name,
        providerName: item.service_provider,
        providerType: item.provider_type,
        rating: item.rating,
        date: item.date,
      }));

      setServices(formatted);
      setPagination((prev) => ({
        ...prev,
        totalPages: result.meta.last_page,
      })); */


      setServices(mockData);
      setPagination((prev) => ({ ...prev, totalPages: 1 }));
    } 
      catch (err) {
      console.error(err);
      setError("Failed to load completed services");
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchCompletedServices();
  }, [pagination.currentPage]);



  const nextPage = () => {
    if (pagination.currentPage < pagination.totalPages) {
      setPagination((p) => ({ ...p,
         currentPage: p.currentPage + 1 }));
    }
  };

  const prevPage = () => {
    if (pagination.currentPage > 1) {
      setPagination((p) => ({ ...p,
         currentPage: p.currentPage - 1 }));
    }
  };


  if (error) {
    return <p className="text-red-500 text-center mt-8">{error}</p>;
  }

  if (isLoading) {
    return <p className="text-center mt-8">Loading...</p>;
  }



  return (
    <>
    <div className="p-10 bg-gray-100 min-h-screen">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-blue-950">Completed Services</h1>
          <p className="text-lg font-semibold text-gray-500">
            Monitor completed services with low ratings
          </p>
        </div>

        {isLoading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!isLoading && !error && (
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-md p-4 ring-1 ring-blue-100">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-cyan-700">
                <tr className="hover:bg-gray-50 transition" >
                  <th className="p-4 text-left">ID</th>
                  <th className="p-4 text-left">Patient Name</th>
                  <th className="p-4 text-left">Service Name</th>
                  <th className="p-4 text-left">Service Provider</th>
                  <th className="p-4 text-left">Rating</th>
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {services.map((service) => (
                  <tr
                    key={service.id}
                    className="last:border-none hover:bg-gray-100 transition"
                  >
                    <td className="p-4 font-bold text-gray-500">{service.id}</td>
                    <td className="p-4 font-medium text-gray-600">{service.patientName}</td>
                    <td className="p-4 font-medium text-gray-600">{service.serviceName}</td>
                    <td className="p-4 font-medium text-gray-600">{service.providerName}</td>
                    <td className="p-4 ">
                      
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <FontAwesomeIcon
                            key={i}
                            icon={faStar}
                            className={
                              i < service.rating
                          ? service.rating >= 4
                            ? "text-green-500"
                            : service.rating === 3
                            ? "text-orange-400"
                            : "text-red-500"
                            : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                    </td>

                    <td className="p-5 text-blue-900 font-medium">{service.date}</td>

                    <td className="p-4 text-center">
                      <button
                        className="bg-cyan-500 hover:bg-gray-500 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 mx-auto shadow"
                        onClick={() => console.log("Contact:", service)}
                      >
                        <FontAwesomeIcon icon={faEnvelope} />
                        Contact
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200">
              <span className="text-sm font-medium text-gray-500">
                Showing Page {pagination.currentPage} of {pagination.totalPages}
              </span>

              <div className="flex gap-3">
                <button
                  onClick={prevPage}
                  disabled={pagination.currentPage === 1}
                  className="  px-4 py-2 border border-gray-300  text-[#052443] rounded-lg text-sm font-medium
                     transition hover:bg-gray-200 disabled:cursor-not-allowed"
                >
                  <FontAwesomeIcon icon={faChevronLeft} /> Prev
                </button>
           
           <span className="px-4 py-2 bg-[#052443] text-white rounded-lg text-sm font-semibold">
             {pagination.currentPage}
           </span>

                <button
                  onClick={nextPage}
                  disabled={
                    pagination.currentPage === pagination.totalPages
                  }
                  className=" px-4 py-2 border border-gray-300 text-[#052443] rounded-lg text-sm font-medium
                     transition hover:bg-gray-200 disabled:cursor-not-allowed"
                >
                  Next <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </div>
          </div>
          </div>
        )}
      </div>
    </>
  );
}