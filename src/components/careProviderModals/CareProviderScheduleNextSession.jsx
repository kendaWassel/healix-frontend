import { useEffect, useState } from "react";

export default function CareProviderScheduleNextSession({
  isOpen,
  onClose,
  sessionId,
  onConfirm,
}) {
  const [wantsToSchedule, setWantsToSchedule] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState('00:00:00');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      setWantsToSchedule(null);
      setSelectedDate(new Date().toISOString().split('T')[0]);
      setSelectedTime('00:00:00');
      setError(null);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleConfirm = async () => {
    if (wantsToSchedule === null) {
      setError("Please select Yes or No");
      return;
    }

    if (wantsToSchedule && (!selectedDate || !selectedTime)) {
      setError("Please select both date and time");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      if (wantsToSchedule) {
        const formattedDateTime = `${selectedDate} ${selectedTime}`;
    const token = localStorage.getItem("token");

        const response = await fetch(
          `https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/home-visits/${sessionId}/follow-up`,
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
        console.log('Scheduling next session:', {
          sessionId,
          scheduled_at: formattedDateTime
        });
      }
        if (onConfirm) {
          onConfirm({ scheduled: true, date: formattedDateTime });
        }
      } else {
        if (onConfirm) {
          onConfirm({ scheduled: false });
        }
      }
    } catch (err) {
      setError(err.message || "Failed to schedule next session");
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#05244380] backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-[95%] max-w-xl">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
          Schedule Next Session?
        </h2>

        <p className="text-gray-700 mb-4 text-center">
          Do you want to schedule a next session for this patient?
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <div className="mb-4 flex gap-3 justify-center">
          <button
            onClick={() => {
              setWantsToSchedule(true);
              setError(null);
            }}
            className={`px-6 py-2 rounded-md font-medium transition ${
              wantsToSchedule === true
                ? "bg-[var(--dark-blue)] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Yes
          </button>
          <button
            onClick={() => {
              setWantsToSchedule(false);
              setError(null);
            }}
            className={`px-6 py-2 rounded-md font-medium transition ${
              wantsToSchedule === false
                ? "bg-[var(--dark-blue)] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            No
          </button>
        </div>

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
                disabled={!wantsToSchedule}
                className="w-1/2 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-700 mr-2"
              />
              <input
                id="schedule-time"
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                disabled={!wantsToSchedule}
                step="1"
                className="w-1/2 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-700"
              />
            </div>
          </div>

        <div className="flex gap-3">
          <button
            onClick={handleConfirm}
            disabled={isSubmitting || wantsToSchedule === null}
            className="flex-1 bg-cyan-700 hover:bg-cyan-900 text-white font-semibold py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isSubmitting ? "Processing..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}

