import { CheckCircle2 } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Phone} from "lucide-react";


export default function CallNowModal({ isOpen, onClose, onHome }) {
  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#05244380] backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-[90%] max-w-md text-center animate-fadeIn border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          You can call the doctor Now
        </h2>

        <button
                                onClick={() => window.open(`tel:0943779128`, "_self")}
                                className="mb-[0.5rem] text-[20px] w-[80%] mx-auto flex items-center justify-center gap-2 bg-[var(--dark-blue)] px-6 py-2 rounded-md hover:bg-[#052443db] transition"
                            >
<Phone size={18} className="text-[var(--white)]" />
                                <span className="text-[var(--white)]">Call</span>
                            </button>
        <button
            onClick={onClose}
            className="bg-[#e71313] font-medium text-white text-[20px] w-[80%] px-6 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-[#e71313ad] transition"
          >
            Cancel
        </button>
         {/* <BookingDone isOpen={open} onClose={() => setOpen(false)} /> */}
      </div>
    </div>
  );
}

