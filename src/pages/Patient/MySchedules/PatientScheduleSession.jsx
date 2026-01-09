import { useEffect, useState } from "react";

export default function PatientScheduleSession({
  isOpen,
  onClose,
  cpId,
  sessionId,
  onConfirm,
}) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState('00:00:00');

  useEffect(() => {
    if (!isOpen) {
      setSelectedDate(new Date().toISOString().split('T')[0]);
      setSelectedTime('00:00:00');
    }
  }, [isOpen]);

  const handleBookSession = async () => {
    if (!selectedDate) {
      return;
    }
    const token = localStorage.getItem("token");

    const formattedDateTime = `${selectedDate} ${selectedTime}`;
    console.log('formated date: ', formattedDateTime);
    try {
      const response = await fetch(
        `https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/patient/home-visits/${sessionId}/request-new-care-provider`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
            "Authorization": `bearer ${token}`,
          },
          body: JSON.stringify({
            scheduled_at: formattedDateTime,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (onConfirm) {
          onConfirm({ date: formattedDateTime });
        }
      } else {
        const serverError = await response.json().catch(() => ({}));
        throw new Error(serverError.message || "Failed to book session");
      }
    } finally {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#05244380] z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-[95%] max-w-xl">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
          Schedule for later
        </h2>

        <div className="mb-4">
          <label
            htmlFor="schedule-date"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Pick a date and time
          </label>
          <div className="flex items-center">
            <input
              id="schedule-date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-1/2 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-700 mr-2"
            />
            <input
              id="schedule-time"
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              step="1"
              className="w-1/2 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-700"
            />
          </div>
        </div>

        <button
          onClick={handleBookSession}
          className="bg-cyan-700 hover:bg-cyan-900 text-white font-semibold py-2 px-4 rounded-md"
        >
          Book Session
        </button>
        <button
          onClick={onClose}
          className="border border-cyan-700 text-cyan-700 font-semibold py-2 px-4 rounded-md ms-2"
        >
          Close
        </button>
      </div>
    </div>
  )
}
