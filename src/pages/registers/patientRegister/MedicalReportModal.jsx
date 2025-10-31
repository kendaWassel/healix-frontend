import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faImage, faTimes } from '@fortawesome/free-solid-svg-icons';

// Keep uploadImage/uploadFile as exported helpers (not called on Save)
export const uploadImage = async (photoFile) => {
  console.log("uploading image: ", photoFile);

  const formData = new FormData();
  formData.append('image', photoFile);
  formData.append('category', 'report');

  const response = await fetch("https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/uploads/image", {
    method: "POST",
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
    body: formData,
  });

  if (!response.ok) {
    const errData = await response.json();
    throw new Error(errData.message || "Image upload failed");
  }
  const data = await response.json();
  console.log("image uploaded: ", data);
  return data.image_id;
};
export const uploadFile = async (medicalFile) => {
  console.log("uploading file: ", medicalFile);

  const formData = new FormData();
  formData.append('file', medicalFile);
  formData.append('category', 'report');

  const response = await fetch("https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/uploads", {
    method: "POST",
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
    body: formData,
  });

  if (!response.ok) {
    const errData = await response.json();
    throw new Error(errData.message || "File upload failed");
  }
  const data = await response.json();
  console.log("file uploaded: ", data);
  return data.file_id;
};
export default function MedicalReportModal({ open, onClose, onSubmit, initialValues }) {
  const modalRef = useRef();
  const [fields, setFields] = useState({
    diagnosis: '',
    chronic_diseases: '',
    previous_surgeries: '',
    allergies: '',
    current_medications: '',
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [medicalFile, setMedicalFile] = useState(null);

  // Load initial values if editing
  useEffect(() => {
    if (open && initialValues) {
      setFields({
        diagnosis: initialValues.diagnosis || '',
        chronic_diseases: initialValues.chronic_diseases || '',
        previous_surgeries: initialValues.previous_surgeries || '',
        allergies: initialValues.allergies || '',
        current_medications: initialValues.current_medications || '',
      });
      setPhotoFile(initialValues.photoFile || null);
      setMedicalFile(initialValues.medicalFile || null);
    } else if (open) {
      setFields({
        diagnosis: '', chronic_diseases: '', previous_surgeries: '', allergies: '', current_medications: '',
      });
      setPhotoFile(null); setMedicalFile(null);
    }
  }, [open, initialValues]);

  if (!open) return null;
  const handleOverlayClick = (e) => {
    if (modalRef.current && e.target === modalRef.current) onClose();
  };

  const handleLocalSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...fields,
      photoFile,
      medicalFile
    });
    onClose();
  };

  return (
    <div ref={modalRef} onClick={handleOverlayClick} className="fixed z-50 inset-0 bg-black/30 flex items-center justify-center">
      <div className="w-full max-w-[400px] rounded-lg bg-white p-6 relative mx-2 animate-fadeIn shadow-xl">
        <button type="button" className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl focus:outline-none" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2 className="text-2xl font-semibold text-center mb-4">Medical Report</h2>
        <form className="space-y-3" onSubmit={handleLocalSubmit}>
          <div>
            <label className="block font-medium mb-1 text-gray-800">Diagnosis</label>
            <input
              name="diagnosis"
              type="text"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 outline-blue-400 focus:border-blue-500 placeholder:text-gray-400"
              placeholder="Enter diagnosis..."
              value={fields.diagnosis}
              onChange={e => setFields({ ...fields, diagnosis: e.target.value })}
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-800 flex items-center gap-2">
              <FontAwesomeIcon icon={faImage} /> Medical Photos
            </label>
            <input
              name="photoFile"
              type="file"
              accept=".jpg,.jpeg,.png"
              className="block w-full text-gray-600 text-base file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
              onChange={e => setPhotoFile(e.target.files[0] || null)}
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-800 flex items-center gap-2">
              <FontAwesomeIcon icon={faFileAlt} /> Medical Files
            </label>
            <input
              name="medicalFile"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="block w-full text-gray-600 text-base file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
              onChange={e => setMedicalFile(e.target.files[0] || null)}
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-800">Chronic Diseases</label>
            <input
              name="chronic_diseases"
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 outline-blue-400 focus:border-blue-500 placeholder:text-gray-400"
              placeholder="Enter any chronic diseases..."
              value={fields.chronic_diseases}
              onChange={e => setFields({ ...fields, chronic_diseases: e.target.value })}
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-800">Previous Surgeries</label>
            <input
              name="previous_surgeries"
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 outline-blue-400 focus:border-blue-500 placeholder:text-gray-400"
              placeholder="Previous surgeries..."
              value={fields.previous_surgeries}
              onChange={e => setFields({ ...fields, previous_surgeries: e.target.value })}
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-800">Allergies</label>
            <input
              name="allergies"
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 outline-blue-400 focus:border-blue-500 placeholder:text-gray-400"
              placeholder="Known allergies..."
              value={fields.allergies}
              onChange={e => setFields({ ...fields, allergies: e.target.value })}
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-800">Current Medications</label>
            <input
              name="current_medications"
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 outline-blue-400 focus:border-blue-500 placeholder:text-gray-400"
              placeholder="List current medications..."
              value={fields.current_medications}
              onChange={e => setFields({ ...fields, current_medications: e.target.value })}
            />
          </div>
          <button type="submit" className="w-full mt-2 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold transition-colors">
            Save Report
          </button>
        </form>
      </div>
    </div>
  );
}
