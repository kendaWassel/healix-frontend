import { useState, useEffect } from "react";
import {
  Search,
  ChevronDown,
  Star,
  Clock,
  MapPin,
  Hospital,
  Phone,
} from "lucide-react";
import Modal from "./Modal";

const SendToPharmacy = ({ open, onClose, onDone, prescription_id }) => {
  const [pharmacies, setPharmacies] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [loadingSend, setLoadingSend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    total: 0,
  });

  const CITY = "Damascus";
  const ITEMS_PER_PAGE = 10;

  /* ================= Fetch Pharmacies ================= */
  useEffect(() => {
    if (!open) return;

    const fetchPharmacies = async (page = 1) => {
      const token = localStorage.getItem('token')
      try {
        setLoading(true);

        const response = await fetch(
          `https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/pharmacist/pharmacies`,
          {
            headers: {
              Accept: "application/json",
              "ngrok-skip-browser-warning": "true",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (data.status === "success" && Array.isArray(data.data)) {
          setPharmacies(data.data);
          if (data.meta) {
            setPagination({
              currentPage: data.meta.current_page,
              lastPage: data.meta.last_page,
              total: data.meta.total,
            });
          }
        } else {
          setPharmacies([]);
        }
      } catch (error) {
        console.error("Error fetching pharmacies:", error);
        setPharmacies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPharmacies(pagination.currentPage);
  }, [open, pagination.currentPage]);

  /* ================= Search ================= */
  const filtered = pharmacies.filter(
    (p) =>
      (p.name?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (p.address?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (p.city?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (p.area?.toLowerCase() || "").includes(search.toLowerCase())
  );

  /* ================= Send Prescription ================= */
  const handleSend = async () => {
    if (!selectedPharmacy || !prescription_id) return;
  
    setLoadingSend(true);
  
    try {
      const response = await fetch(
        `https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/patient/prescriptions/${prescription_id}/send`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            pharmacy_id: selectedPharmacy,
          }),
        }
      );
  
      const data = await response.json();
      if (data.status === "success") {
        alert(data.message);
        onClose();
        onDone();
      } else {
        alert("Failed to send prescription!");
      }
    } catch (error) {
      alert("Something went wrong!");
      console.error(error);
    } finally {
      setLoadingSend(false);
    }
  };
  
  /* ================= Pagination Controls ================= */
  const handlePrevPage = () => {
    if (pagination.currentPage > 1) {
      setPagination((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }));
    }
  };

  const handleNextPage = () => {
    if (pagination.currentPage < pagination.lastPage) {
      setPagination((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }));
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h1 className="text-xl font-semibold text-[#0A2A4A] mb-4">
        Send to pharmacy
      </h1>

      {/* ================= Search Bar ================= */}
      <div className="flex items-center gap-3 w-full mb-4">
        <div className="border rounded-xl px-3 py-2 flex items-center gap-2 flex-1">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search pharmacy..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none"
          />
        </div>

        <button className="border rounded-xl px-4 py-2 flex items-center gap-2 text-[#0A2A4A]">
          {CITY} <ChevronDown size={18} />
        </button>
      </div>

      {/* ================= Pharmacies List ================= */}
      <div className="overflow-y-auto max-h-[55vh] pr-2 space-y-4">
        {loading && (
          <p className="text-center text-gray-500">Loading pharmacies...</p>
        )}

        {!loading && filtered.length === 0 && (
          <p className="text-center text-gray-500">No pharmacies found</p>
        )}

        {filtered.map((p) => (
          <div
            key={p.id}
            onClick={() => setSelectedPharmacy(p.id)}
            className={`border p-4 rounded-lg cursor-pointer transition
              ${
                selectedPharmacy === p.id
                  ? "border-[#39CCCC] text-[#39CCCC]"
                  : "border-gray-300"
              }
              hover:border-[#39CCCC] hover:text-[#39CCCC]
            `}
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-semibold text-[#0A2A4A] flex items-center gap-2">
                  <div className="bg-[#39CCCC] w-8 h-8 rounded-xl flex items-center justify-center">
                    <Hospital size={20} className="text-white" />
                  </div>



                  {p.name || "N/A"}
                </h2>
                <p className="text-gray-600 text-sm">
                  {p.address || "N/A"}, {p.area || "N/A"}
                </p>
                <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                  <Phone size={14} /> {p.phone || "N/A"}
                </div>
              </div>

              <div className="flex items-center gap-1 text-[#0A2A4A] font-semibold text-sm">
                <Star size={16} /> {p.rating ?? "N/A"}
              </div>
            </div>

            <div className="flex gap-6 mt-4 text-gray-600 text-sm">
              <div className="flex items-center gap-1">
                <Clock size={16} /> {p.from || "N/A"} - {p.to || "N/A"}
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={16} /> {p.city || "N/A"}
              </div>
              {p.open_now !== undefined && (
                <div
                  className={`ml-auto font-semibold ${
                    p.open_now ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {p.open_now ? "Open" : "Closed"}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ================= Pagination Buttons ================= */}
      <div className="flex justify-between mt-4 items-center">
        <button
          onClick={handlePrevPage}
          disabled={pagination.currentPage === 1}
          className="border border-[#0A2A4A] text-[#0A2A4A] px-4 py-2 rounded-xl hover:bg-gray-100 disabled:opacity-50"
        >
          Prev
        </button>

        <span>
          Page {pagination.currentPage} of {pagination.lastPage}
        </span>

        <button
          onClick={handleNextPage}
          disabled={pagination.currentPage === pagination.lastPage}
          className="border border-[#0A2A4A] text-[#0A2A4A] px-4 py-2 rounded-xl hover:bg-gray-100 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* ================= Action Buttons ================= */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => {
            setSelectedPharmacy(null);
            onClose();
          }}
          className="border border-[#0A2A4A] text-[#0A2A4A] px-6 py-2 rounded-xl hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          onClick={handleSend}
          disabled={!selectedPharmacy || loadingSend}
          className="bg-[#0A2A4A] text-white px-10 py-2 rounded-xl hover:bg-[#082a3d] disabled:opacity-50"
        >
          {loadingSend ? "Sending..." : "Send"}
        </button>
      </div>
    </Modal>
  );
};

export default SendToPharmacy;
