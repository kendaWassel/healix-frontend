import { useState } from "react";
import { CreditCard, CheckCircle2 } from "lucide-react";

export default function PaymentModal({ 
  isOpen, 
  onClose, 
  onPaymentSuccess,
  paymentType = "service",
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const getPaymentTypeLabel = () => {
    const labels = {
      doctor: "Doctor Consultation",
      pharmacist: "Pharmacy Order",
      delivery: "Delivery Service",
      nurse: "Nurse Service",
      physiotherapist: "Physiotherapy Session",
    };
    
    return labels[paymentType] ;
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);

      setTimeout(() => {
        if (onPaymentSuccess) {
          onPaymentSuccess();
        }
      }, 1500);
    }, 2000);
  };
  const handleClose = () => {
    if (!isProcessing) {
      setIsPaid(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#05244380] backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-[90%] max-w-md text-center animate-fadeIn">
        {!isPaid ? (
          <>
            <div className="mb-6">
              <CreditCard className="mx-auto mb-4 text-[var(--dark-blue)]" size={48} />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Payment Required</h2>
              <p className="text-gray-600 text-sm">{getPaymentTypeLabel()}</p>
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-2 bg-[var(--dark-blue)] text-white text-[18px] px-6 py-3 rounded-md hover:bg-[#052443db] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <CreditCard size={20} />
                    Pay Now
                  </>
                )}
              </button>

              {!isProcessing && (
                <button
                  onClick={handleClose}
                  className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="py-4">
            <CheckCircle2 className="mx-auto mb-4 text-green-500" size={64} />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-4">Your payment has been processed successfully.</p>
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-800">
                Amount paid: <span className="font-semibold">${getDefaultAmount().toFixed(2)}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

