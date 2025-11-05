import { useEffect, useMemo, useState } from "react";

export default function ScheduleLaterModal({ isOpen, onClose, doctorId, onConfirm }) {
    const [selectedDate, setSelectedDate] = useState("");
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [times, setTimes] = useState([]);
    const [doctor, setDoctor] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const minDate = useMemo(() => {
        const now = new Date();
        const yyyy = now.getFullYear();
        const mm = String(now.getMonth() + 1).padStart(2, "0");
        const dd = String(now.getDate()).padStart(2, "0");
        return `${yyyy}-${mm}-${dd}`;
    }, []);
    const bookTime = (time) => {
        setError(null);
        setLoading(true);

        const token = localStorage.getItem("token");
        const localDateTime = new Date(`${selectedDate}T${time}:00`);
        const formattedDateTime = localDateTime.toISOString();
        console.log('date: ',formattedDateTime);
        const consultation = {
            doctor_id: doctorId || doctor,
            type: "schedule_later",
            scheduled_at: formattedDateTime,
        };

        fetch(`https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/patient/consultations/book`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(consultation),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((serverError) => {
                        throw new Error(serverError.message || "consultation failed");
                    });
                }
                return response.json();
            })
            .then((data) => {
                // Success path – optionally trigger parent confirm
                if (onConfirm) onConfirm({ date: selectedDate, time });
            })
            .catch((error) => {
                setError(error.message || "Failed to create consultation.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        if (!isOpen) {
            setSelectedDate("");
            setSlots([]);
            setSelectedTime(null);
            setError(null);
            setTimes([]);
            setDoctor(null);
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        if (!selectedDate || !doctorId) {
            setSlots([]);
            return;
        }
        const token = localStorage.getItem("token");
        setLoading(true);
        setError(null);
        const url = `https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/patient/doctors/${doctorId}/available-slots?date=${selectedDate}`;
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true",
                "Authorization": `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) return res.json().then((e) => { throw new Error(e.message || "Failed to load slots"); });
                return res.json();
            })
            .then((data) => {
                const list = data.available_slotes || data.available_slots || [];
                const normalized = Array.isArray(list) ? list : [];
                setSlots(normalized);
                const availableTimes = normalized
                    .filter((s) => s && s.is_available && typeof s.time === "string")
                    .map((s) => s.time);
                setTimes(availableTimes);
                setDoctor(data.doctor_id);
            })
            .catch((e) => setError(e.message || "Failed to load slots"))
            .finally(() => setLoading(false));
    }, [isOpen, selectedDate, doctorId]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#05244380] z-50">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-[95%] max-w-xl">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">Schedule for later</h2>

                <div className="mb-4">
                    <label htmlFor="schedule-date" className="block text-sm font-medium text-gray-700 mb-2">Pick a date</label>
                    <input
                        id="schedule-date"
                        type="date"
                        min={minDate}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-700"
                    />
                </div>

                <div className="min-h-[96px]">
                    {loading && <p className="text-gray-600">Loading available times...</p>}
                    {!loading && error && <p className="text-red-600">{error}</p>}
                    {!loading && !error && selectedDate && (
                        times.length > 0 ? (
                            <div>
                                <p className="text-sm text-gray-700 mb-2">Available times</p>
                                <div className="grid grid-cols-3 gap-2">
                                    {times.map((time, idx) => (
                                        <button
                                            key={`${time}-${idx}`}
                                            onClick={() => {
                                                setSelectedTime(time);
                                                bookTime(time);
                                            }}
                                            className={`px-3 py-2 rounded-md border text-sm transition ${
                                                selectedTime === time
                                                    ? "bg-cyan-700 text-white border-cyan-700"
                                                    : "bg-white text-gray-800 border-gray-300 hover:border-cyan-700"
                                            }`}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-600">No available time slots for this date.</p>
                        )
                    )}
                    {!selectedDate && <p className="text-gray-600">Select a date to see available times.</p>}
                </div>

                <div className="flex justify-between mt-6">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            if (selectedDate && selectedTime) {
                                onConfirm({ date: selectedDate, time: selectedTime });
                            }
                        }}
                        disabled={!selectedDate || !selectedTime}
                        className={`px-6 py-2 rounded-md transition ${
                            !selectedDate || !selectedTime
                                ? "bg-gray-300 text-white"
                                : "bg-[#001f3f] hover:bg-[#001634] text-white"
                        }`}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}


