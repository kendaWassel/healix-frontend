import styles from "./NewAccountSetup.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faPills,
  faUserDoctor,
  faUser,
  faTruckMedical,
  faUserNurse,
  faPersonWalking,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const accountTypes = [
  {
    key: "pharmacist",
    title: "For Pharmacists",
    desc: "Receive and process medications orders",
    icon: faPills,
  },
  {
    key: "doctor",
    title: "For Doctors",
    desc: "Provide online consultations",
    icon: faUserDoctor,
  },
  {
    key: "patient",
    title: "For Patients",
    desc: "Access a network of trusted healthcare professionals",
    icon: faUser,
  },
  {
    key: "delivery",
    title: "For Delivery Agents",
    desc: "Get assigned to deliver medications or transport care providers safely to patients",
    icon: faTruckMedical,
  },
  {
    key: "nurse",
    title: "For Nurses",
    desc: "Provide at-home medical care",
    icon: faUserNurse,
  },
  {
    key: "physiotherapist",
    title: "For Physiotherapists",
    desc: "Provide at-home physical care",
    icon: faPersonWalking,
  },
];

export default function NewAccountSetup() {
  const [selected, setSelected] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setIsLoading(true);



    try{  
      const response = await fetch("https://example.com/api/fake-endpoint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountType: selected }),
      });

      if (!response.ok) throw new Error("Can't continue. Please try again.");

      const data = await response.json();
      setSuccessMsg("Account type selected successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <header className={styles.formHeader}>
        <span className={styles.backArrow}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </span>
        <h1>New Account Setup</h1>
        <p>Choose your account type</p>

        {error && <div className="alert alert-danger">{error}</div>}
        {successMsg && <div className="alert alert-success">{successMsg}</div>}
      </header>

      <form className={styles.setupForm} onSubmit={handleSubmit}>
        {accountTypes.map((type) => (
          <button
            key={type.key}
            type="button"
            className={`${styles.accountButton} ${
              selected === type.key ? styles.selected : ""
            }`}
            onClick={() => setSelected(type.key)}
          >
            <FontAwesomeIcon icon={type.icon} className={styles.icon} />
            <h3>{type.title}</h3>
            <p>{type.desc}</p>
          </button>
        ))}

        <button
          type="submit"
          className={styles.continueButton}
          disabled={isLoading || !selected}
        >
          {isLoading ? "Loading..." : "Continue"}
        </button>
      </form>
    </div>
  );
}
