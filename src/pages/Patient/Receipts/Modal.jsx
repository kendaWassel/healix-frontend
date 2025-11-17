const Modal = ({ open, onClose, children }) => {
    if (!open) return null;
  
    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-6 relative max-h-[90vh] overflow-hidden">
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
  
          {children}
        </div>
      </div>
    );
  };
  
  export default Modal;