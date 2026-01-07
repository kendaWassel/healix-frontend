import { useState, useRef, useEffect } from "react";
import styles from "./PatientRegister.module.css";
import LogoImage from "../../../components/logoImage/LogoImage";
import MapPicker from "../../../components/map/MapPicker";
import { Link,useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faCircleUser,
  faCakeCandles,
  faEnvelope,
  faLock,
  faMarsAndVenus,
  faLocationDot,
  faMap,
  faArrowUpFromBracket,
  faArrowLeft,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import MedicalReportModal from "./MedicalReportModal";
import { uploadImage, uploadFile } from './MedicalReportModal';

export default function PatientRegister() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  useEffect(() => {
    document.title = "Patient Account Setup";
  }, []);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    birth_date:null,
    gender: "",
    address: "",
    latitude: null, 
    longitude: null ,
  });
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [isMedicalModalOpen, setIsMedicalModalOpen] = useState(false);
  const [medicalReport, setMedicalReport] = useState(null);

  const handleSaveMedicalReport = (report) => {
    setMedicalReport(report);
    setIsMedicalModalOpen(false);
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMsg(null);

    if (!medicalReport) {
      setIsLoading(false);
      setError('Please fill the Medical Report section');
      return;
    }

    let photoPromise = Promise.resolve(null);
    let filePromise = Promise.resolve(null);

    if (medicalReport.photoFile) {
      photoPromise = uploadImage(medicalReport.photoFile);
    }
    if (medicalReport.medicalFile) {
      filePromise = uploadFile(medicalReport.medicalFile);
    }

    Promise.all([photoPromise, filePromise])
      .then(([imageId, fileId]) => {
        const user = {
          role: "patient",
          full_name: newUser.full_name || "",
          email: newUser.email || "",
          phone: newUser.phone || "",
          password: newUser.password || "",
          birth_date: newUser.birth_date || null,
          gender: newUser.gender || "",
          address: newUser.address || "",
          latitude: newUser.latitude || null, 
          longitude: newUser.longitude || null ,
          medical_record: {
            diagnosis: medicalReport.diagnosis || "",
            chronic_diseases: medicalReport.chronic_diseases || "",
            previous_surgeries: medicalReport.previous_surgeries || "",
            allergies: medicalReport.allergies || "",
            current_medications: medicalReport.current_medications || "",
            attachments: [imageId, fileId],
          },
        };
        console.log('users data: ',user);
        return fetch(`https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
       
          },
          body: JSON.stringify(user),
        });
      })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((serverError) => {
            throw new Error(serverError.message || "Registration failed");
          });
        }
        return response.json();
      })
      .then((data) => {
        setSuccessMsg("Check your email for Activation link");
        setNewUser({
          full_name: "",
          email: "",
          phone: "",
          password: "",
          birth_date: null,
          gender: "",
          address: "",
          latitude: null,
          longitude: null,
        });
        setMedicalReport(null);
        setIsLoading(false);
        setTimeout(() => {
          navigate('/login');
        }, 300);
      })
      .catch((error) => {
        setError(error.message || "Failed to create user. Please try again.");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return (
    
    <div className={styles.formContainer}>
  
      <div className={styles.formHeader}>
        <span className={styles.backArrow}>
          <Link to="/register">
          <FontAwesomeIcon icon={faArrowLeft}  />
          </Link>
        </span>
        <h1>Patients Account Setup</h1>
        <p>Fill your information to register</p>
        {error && <div className={styles.errorMsg}>{error}</div>}
          {successMsg && <div className={styles.successMsg}>{successMsg}</div>}
      </div>

      <form className={styles.patientForm} onSubmit={handleSubmit}>
        <div className={styles.inputRow}>
          <div className={styles.inputGroup}>
            <FontAwesomeIcon icon={faCircleUser} className={styles.icon} />
            <input
              id="name"
              type="text"
              ref={inputRef}
              placeholder="Type full name"
              value={newUser.full_name}
              onChange={(e) =>
                setNewUser({ ...newUser, full_name: e.target.value })
              }
              required
              disabled={isLoading}
            />
          </div>

          <div className={styles.inputGroup}>
            <FontAwesomeIcon icon={faPhone} className={styles.icon} />
            <input
              id="phone"
              type="tel"
              placeholder="Type phone number"
              value={newUser.phone}
              onChange={(e) =>
                setNewUser({ ...newUser, phone: e.target.value })
              }
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
          <FontAwesomeIcon icon={faCakeCandles} className={styles.icon} />
          <input
            id="birth_date"
            type="date"
            value={newUser.birth_date}
            onChange={(e) => setNewUser({ ...newUser, birth_date: e.target.value })}
            required
            disabled={isLoading}
          />
        </div>

        <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
          <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
          <input
            id="email"
            type="email"
            placeholder="Type email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
            disabled={isLoading}
          />
        </div>

        <div
          className={`${styles.inputGroup} ${styles.fullWidth} ${styles.passwordInputGroup}`}
        >
          <FontAwesomeIcon icon={faLock} className={styles.icon} />
          <input
            id="password"
            type={passwordShown ? "text" : "password"}
            placeholder="Type password..."
            value={newUser.password}
            autoComplete="off"
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            required
            disabled={isLoading}
          />
  
        </div>

        <div
          className={`${styles.inputGroup} ${styles.fullWidth} ${styles.selectGroup}`}
        >
          <FontAwesomeIcon icon={faMarsAndVenus} className={styles.icon} />
          <select
            value={newUser.gender}
            onChange={(e) =>
              setNewUser({ ...newUser, gender: e.target.value })
            }
            required
            disabled={isLoading}
          >
            <option value="" disabled>
              Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
     
          <FontAwesomeIcon icon={faChevronDown} className={`${styles.selectArrow} ${styles.icon}`} />
        </div>
        <div
          className={`${styles.inputGroup} ${styles.fullWidth}`}
        >
<FontAwesomeIcon icon={faLocationDot} className={styles.icon} />
            <input
              id="address"
              type="text"
              placeholder="area-street-building-floor-home no"
              value={newUser.address}
              onChange={(e) =>
                setNewUser({ ...newUser, address: e.target.value })
              }
              required
              disabled={isLoading}
            />
        </div>

        <div className={styles.inputRow}>
          <button
            type="button"
            className={styles.locationMapButton}
            onClick={() => setIsMapOpen(true)}
          >
            <FontAwesomeIcon icon={faMap} className={styles.icon} /> Location in
            map
          </button>
        </div>

        {/* Medical Report Upload (button for modal) */}
        <div className={`${styles.inputGroup} ${styles.fullWidth} ${styles.uploadGroup}`}>
          <button
            type="button"
            className={styles.locationMapButton}
            style={{ width: "100%", margin: "0.5rem 0" }}
            onClick={() => setIsMedicalModalOpen(true)}
          >
            <FontAwesomeIcon icon={faArrowUpFromBracket} className={styles.icon} />
            {medicalReport ? 'Edit Medical Report' : 'Add Medical Report'}
          </button>
        </div>
        <button
          type="submit"
          className={`${styles.registerButton} disabled:opacity-50 disabled:cursor-not-allowed`}
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>
      {/* -- MODAL RENDERED HERE, OUTSIDE FORM! -- */}
      <MedicalReportModal
        open={isMedicalModalOpen}
        onClose={() => setIsMedicalModalOpen(false)}
        onSubmit={handleSaveMedicalReport}
        initialValues={medicalReport}
      />
      {isMapOpen && (
        <MapPicker
          initialPosition={
            newUser.latitude != null && newUser.longitude != null
              ? [newUser.latitude, newUser.longitude]
              : null
          }
          onConfirm={(lat, lng) => {
            console.log("Storing selected location in form state:", {
              latitude: lat,
              longitude: lng,
            });
            setNewUser({ ...newUser, latitude: lat, longitude: lng });
            setIsMapOpen(false);
          }}
          onClose={() => setIsMapOpen(false)}
        />
      )}
        <LogoImage/>
    </div>
 
  
  );
}
