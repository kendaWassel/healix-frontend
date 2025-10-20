import styles from "./DeliveryRegister.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCircleUser,
  faPhone,
  faEnvelope,
  faLock,
  faArrowUpFromBracket,
  faCamera ,
  faCar,
  faHashtag,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";

export default function DeliveryRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const inputRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [licenseFile, setLicenseFile] = useState(null);

  const [newUser, setNewUser] = useState({
    role: "delivery",
    full_name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    vehicle_type: "",
    plate_number: "",
    bank_account: "",
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setIsLoading(true);
    if (!licenseFile) {
      setError("Please Enter Your Driving License");
      setIsLoading(false);
      return;
    }  


    fetch("https://api.example.com/user/register?_format=json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Registration failed");
        return response.json();
      })
      .then(() => {
        setSuccessMsg("Check your email for Activation link");
        setNewUser({
          role: "delivery",
          full_name: "",
          email: "",
          phone: "",
          password: "",
          vehicle_type: "",
          plate_number: "",
          bank_account: "",
        });
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setIsLoading(false));
  };
  const handleFileChange = (e) => {
    setLicenseFile(e.target.files[0]);
    setError(null)
  };

  return (
    <div className={styles.formContainer}>
      <header className={styles.formHeader}>
        <span className={styles.backArrow}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </span>
        <h1>Delivery Agents Account Setup</h1>
        <p>Fill your information to register</p>
        {error && <div className="alert alert-danger">{error}</div>}
        {successMsg && (
          <div className="alert alert-success">{successMsg}</div>
        )}
      </header>

      <form className={styles.deliveryForm} onSubmit={handleSubmit}>
        <div className={styles.photoContainer}>
        <label htmlFor="photo-upload" className={styles.photoLabel}>
        {photo ? (
          <img src={photo} alt="Profile" className={styles.previewImage} />
        ) : (
          <>
            <FontAwesomeIcon icon={faCamera} className={styles.cameraIcon} />
            <span>Add Photo</span>
          </>
        )}
      </label>
      <input
        id="photo-upload"
        type="file"
        accept="image/*"
        onChange={handlePhotoChange}
        className={styles.hiddenInput}
      />
    </div>
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
          <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
          <input
            id="email"
            type="email"
            placeholder="Type email"
            value={newUser.email}
            onChange={(e) =>
              setNewUser({ ...newUser, email: e.target.value })
            }
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
            type="password"
            placeholder="Type password..."
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            required
            disabled={isLoading}
          />
        </div>

   
        <div className={styles.inputRow}>
          <div className={styles.inputGroup}>
          <FontAwesomeIcon icon={faCar} className={styles.icon}/>
            <input
              id="vehicle"
              type="text"
              placeholder="Vehicle Type"
              value={newUser.vehicle_type}
              onChange={(e) =>
                setNewUser({ ...newUser, vehicle_type: e.target.value })
              }
              required
              disabled={isLoading}
            />
          </div>

          <div className={styles.inputGroup}>
          <FontAwesomeIcon icon={faHashtag} className={styles.icon}/>
            <input
              id="plate"
              type="number"
              placeholder="Plate number"
              value={newUser.plate_number}
              onChange={(e) =>
                setNewUser({ ...newUser, plate_number: e.target.value })
              }
              required
              disabled={isLoading}
            />
          </div>
        </div>

     
        <div
          className={`${styles.inputGroup} ${styles.fullWidth} ${styles.uploadGroup}`}
        >
          <label htmlFor="file-upload" className={styles.uploadLabel}>
            <FontAwesomeIcon
              icon={faArrowUpFromBracket}
              className={styles.icon}
            />
            Driving License 
          </label>
          <input
            id="file-upload"
            name="licence"
            type="file"
            className={styles.fileInput}
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
          />
        </div>

        {error && <p className={styles.errorMsg}>{error}</p>}
        <button
          type="submit"
          className={styles.registerButton}
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
