import React from "react";
import styles from "./DoctorSchedules.module.css";

export default function PatientDetailsModal({ details, onClose }) {
  if (!details) return null;

  return (
    <div className={styles.detailsModalOverlay}>
      <div className={styles.detailsModal}>
        <div className={styles.detailsHeader}>
          <h3>Patient Details</h3>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className={styles.detailsContent}>
          <div className={styles.detailsRow}>
            <span className={styles.detailsLabel}>Name:</span>
            <span>{details.patient_name || "N/A"}</span>
          </div>
          <div className={styles.detailsRow}>
            <span className={styles.detailsLabel}>Gender:</span>
            <span>{details.gender || "N/A"}</span>
          </div>
          <div className={styles.detailsRow}>
            <span className={styles.detailsLabel}>Birth Date:</span>
            <span>{details.birth_date || "N/A"}</span>
          </div>

          <div className={styles.detailsGroup}>
            <span className={styles.detailsLabel}>Chronic Diseases:</span>
            <ul>
              {(details.medical_record?.chronic_diseases || []).length > 0
                ? details.medical_record.chronic_diseases.map(
                    (disease, index) => <li key={index}>{disease}</li>
                  )
                : <li>None</li>}
            </ul>
          </div>

          <div className={styles.detailsGroup}>
            <span className={styles.detailsLabel}>Previous Surgeries:</span>
            <ul>
              {(details.medical_record?.previous_surgeries || []).length > 0
                ? details.medical_record.previous_surgeries.map(
                    (surgery, index) => <li key={index}>{surgery}</li>
                  )
                : <li>None</li>}
            </ul>
          </div>

          <div className={styles.detailsGroup}>
            <span className={styles.detailsLabel}>Allergies:</span>
            <ul>
              {(details.medical_record?.allergies || []).length > 0
                ? details.medical_record.allergies.map(
                    (allergy, index) => <li key={index}>{allergy}</li>
                  )
                : <li>None</li>}
            </ul>
          </div>

          <div className={styles.detailsGroup}>
            <span className={styles.detailsLabel}>Attachments:</span>
            <ul>
              {(details.attachments || []).length > 0
                ? details.attachments.map((file) => (
                    <li key={file.id}>
                      <a
                        href={file.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {file.file_name || file.file_url}
                      </a>
                    </li>
                  ))
                : <li>No attachments</li>}
            </ul>
          </div>
        </div>

        <div className={styles.detailsFooter}>
          <button
            type="button"
            className={styles.closeFooterButton}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}


