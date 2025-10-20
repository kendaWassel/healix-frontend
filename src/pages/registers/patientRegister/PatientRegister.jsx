import { useState, useRef, useEffect } from "react";
import styles from "./PatientRegister.module.css";
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

export default function PatientRegister() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const inputRef = useRef(null);

  const [newUser, setNewUser] = useState({
    role: "patient",
    full_name: "",
    email: "",
    phone: "",
    password: "",
    birth_date:"",
    gender: "",
    address: "",
    latitude: null, 
    longitude: null ,
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setIsLoading(true);


    if (newUser.password !== newUser.password_confirmation) {
      setError("Passwords do not match");
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
          role: "patient",
          full_name: "",
          email: "",
          phone: "",
          password: "",
          birth_date:"",
          gender: "",
          address: "",
          latitude: null, 
          longitude: null ,
        });
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className={styles.formContainer}>
      <header className={styles.formHeader}>
        <span className={styles.backArrow}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </span>
        <h1>Patients Account Setup</h1>
        <p>Fill your information to register</p>
        {error && <div className="alert alert-danger">{error}</div>}
        {successMsg && <div className="alert alert-success">{successMsg}</div>}
      </header>

      <form className={styles.patientForm} onSubmit={handleSubmit}>
        <div className={styles.inputRow}>
          <div className={styles.inputGroup}>
            <FontAwesomeIcon icon={faCircleUser} className={styles.icon} />
            <input
              id="name"
              type="text"
              ref={inputRef}
              placeholder="Type username"
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

        <div className={styles.inputRow}>
          <div className={styles.inputGroup}>
            <FontAwesomeIcon icon={faLocationDot} className={styles.icon} />
            <input
              id="address"
              type="text"
              placeholder="Type location..."
              value={newUser.address}
              onChange={(e) =>
                setNewUser({ ...newUser, address: e.target.value })
              }
              required
              disabled={isLoading}
            />
          </div>
          <button type="button" className={styles.locationMapButton}>
            <FontAwesomeIcon icon={faMap} className={styles.icon} /> Location in
            map
          </button>
        </div>

        <div
          className={`${styles.inputGroup} ${styles.fullWidth} ${styles.uploadGroup}`}
        >
          <label htmlFor="file-upload" className={styles.uploadLabel}>
            <FontAwesomeIcon
              icon={faArrowUpFromBracket}
              className={styles.icon}
            />
            Upload Patient File (Optional)
          </label>
          <input
            id="file-upload"
            type="file"
            className={styles.fileInput}
            accept=".pdf,.jpg,.jpeg,.png"
          />
        </div>

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
