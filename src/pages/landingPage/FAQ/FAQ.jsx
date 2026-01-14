import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const FAQS = [
  {
    q: "How do I book an appointment?",
    a: "You can book an appointment by choosing a care provider, selecting a suitable time, and confirming your booking from your dashboard."
  },
  {
    q: "Can I cancel or reschedule my appointment?",
    a: "Yes, you can cancel or reschedule your appointment before it starts from the schedules page."
  },
  {
    q: "How do online consultations work?",
    a: "Online consultations are done through secure calls. You will be notified when the doctor is ready to start the session."
  },
  {
    q: "When do I pay for the session?",
    a: "Payment is required after the session is completed. You will then be able to rate your care provider."
  },
  {
    q: "Is my medical data secure?",
    a: "Absolutely. All medical data is encrypted and handled according to strict privacy standards."
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="md:px-[3rem] px-[1.5rem] md:py-[1.5rem] py-[0.5rem] my-16 px-4">
      <h2 className="text-3xl font-bold text-[var(--dark-blue)] mb-8 text-center">
        Frequently Asked Questions
      </h2>

      <div className="flex flex-col gap-4">
        {FAQS.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-[var(--card-border)] rounded-2xl shadow-sm overflow-hidden transition"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center p-5 text-left"
            >
              <span className="text-lg font-medium text-[var(--dark-blue)]">
                {item.q}
              </span>

              <FontAwesomeIcon
                icon={faChevronDown}
                className={`text-[var(--cyan)] transition-transform duration-300 ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`grid transition-all duration-300 ease-in-out ${
                activeIndex === index
                  ? "grid-rows-[1fr] opacity-100 block"
                  : "grid-rows-[0fr] opacity-0 hidden"
              }`}
            >
              <div className="overflow-hidden px-5 pb-5 text-[var(--text-color)] font-medium">
                {item.a}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
