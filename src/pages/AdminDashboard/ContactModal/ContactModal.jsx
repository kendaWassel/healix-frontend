/*import React from "react";

const ContactModal = ({ show, onClose, service }) => {
  if (!show || !service) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold text-indigo-900 mb-4">
          Contact {service.patient}
        </h2>
        <p className="mb-2">
            <span className="font-semibold">Service:
                </span> {service.service}</p>

        <p className="mb-2">
            <span className="font-semibold">Provider:
                </span> {service.provider}</p>

        <p className="mb-4">
            <span className="font-semibold">Date:
                </span> {service.date}</p>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              console.log(`Contacting ${service.patient} for ${service.service}`);
              onClose();
            }}
            className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;*/
