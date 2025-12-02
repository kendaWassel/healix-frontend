import { useState } from "react";
import { Star } from "lucide-react";

export default function RatingModal({ isOpen, onClose, consultationId, doctor_id,onRatingSuccess}) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleStarHover = (value) => {
    setHoveredRating(value);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/patient/ratings/doctors/${doctor_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({
            stars: rating,
            consultation_id: consultationId
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || data.status !== "success") {
        throw new Error(data.message || "Failed to submit rating, Try again!");
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setRating(0);
        setSuccess(false);
        if (onRatingSuccess) {
          onRatingSuccess();
        }
      }, 1500);
    } catch (err) {
      setError(err.message || "Failed to submit rating. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#05244380] backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md text-center animate-fadeIn border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Consultation Ended Successfully</h2>
        <p className="text-gray-700 mb-4">Rate the service</p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-800 text-sm">Rating submitted successfully!</p>
          </div>
        )}

        {/* Star Rating */}
        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((star) => {
            const isFilled = star <= (hoveredRating || rating);
            return (
              <button
                key={star}
                type="button"
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => handleStarHover(star)}
                onMouseLeave={handleStarLeave}
                className="focus:outline-none transition-transform hover:scale-110"
                disabled={isSubmitting}
              >
                <Star
                  size={40}
                  className={`${
                    isFilled
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  } transition-colors`}
                />
              </button>
            );
          })}
        </div>

        {rating > 0 && (
          <p className="text-sm text-gray-600 mb-4">You rated: {rating} {rating === 1 ? "star" : "stars"}</p>
        )}

        <div className="flex flex-col gap-3">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || rating === 0}
            className="px-6 py-2 rounded-md bg-[var(--dark-blue)] text-white hover:bg-[#052443db] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Submit Rating"}
          </button>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition disabled:opacity-50"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}

