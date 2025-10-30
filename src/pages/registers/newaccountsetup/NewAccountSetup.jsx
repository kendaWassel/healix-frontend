import styles from "./NewAccountSetup.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogoImage from "../../../components/logoImage/LogoImage";
import { Link } from "react-router-dom";
import {
  faArrowLeft,
  faPills,
  faUserDoctor,
  faUser,
  faTruckMedical,
  faUserNurse,
  faPersonWalking,
} from "@fortawesome/free-solid-svg-icons";


const accountTypes = [
  {
    key: "pharmacist",
    title: "For Pharmacists",
    desc: "Receive and process medications orders",
    icon: faPills,
    dest:"/pharmacist-register"
  
  },
  {
    key: "doctor",
    title: "For Doctors",
    desc: "Provide online consultations",
    icon: faUserDoctor,
    dest: "/doctor-register"
  },
  {
    key: "patient",
    title: "For Patients",
    desc: "Access a network of trusted healthcare professionals",
    icon: faUser,
    dest:"/patient-register"

  },
  {
    key: "delivery",
    title: "For Delivery Agents",
    desc: "Get assigned to deliver medications or transport care providers safely to patients",
    icon: faTruckMedical,
    dest: "/delivery-register"
  },
  {
    key: "nurse",
    title: "For Nurses",
    desc: "Provide at-home medical care",
    icon: faUserNurse,
    dest: "/care-provider-register"
  },
  {
    key: "physiotherapist",
    title: "For Physiotherapists",
    desc: "Provide at-home physical care",
    icon: faPersonWalking,
    dest:"/care-provider-register"
  },
];

export default function NewAccountSetup() {
  const [selected, setSelected] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  useEffect(() => {
    document.title = "New Account Setup";
  }, []);

  const navigate=useNavigate();

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
    if (selected) navigate(accountTypes.find(a => a.key === selected).dest);
  };

  return (
    <div className={styles.formContainer}>
   
      <header className={styles.formHeader}>
        <span className={styles.backArrow}>
        <Link to='/'>
          <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
        </span>
        <h1>New Account Setup</h1>
        <p>Choose your account type</p>

        {error && <div className={styles.errorMsg}>{error}</div>}
          {successMsg && <div className={styles.successMsg}>{successMsg}</div>}
      </header>

      <form className={styles.setupForm} onSubmit={handleSubmit}>
        {accountTypes.map((type) => (
          <button
            key={type.key}
            type="button"
          
            className={`${styles.accountButton} ${
              selected === type.key ? styles.selected : ""
            }`}
            onClick={() => {    
              
              setSelected(type.key)
          
            }}
          >
            <FontAwesomeIcon icon={type.icon} className={styles.icon} />
            <h3>{type.title}</h3>
            <p>{type.desc}</p>
         
          </button>
        ))}

        <button
          type="button"
          onClick={ ()=> {
            if(!selected) return ;
            const dest = accountTypes.find((e)=>e.key===selected)?.dest;
            if (dest) navigate(dest)
          }
          }
  
          className={styles.continueButton}
          disabled={isLoading || !selected}
        >
          {isLoading ? "Loading..." : "Continue"}
        </button>
      </form>
      <LogoImage/>
    </div>
  );
}
