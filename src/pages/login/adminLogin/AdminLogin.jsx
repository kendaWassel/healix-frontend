import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import styles from "./AdminLogin.module.css"; 



const AdminLogin = () => {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email");
      console.log("hh");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address");
    console.log("hh")
      return;
    }

    if (!password) {
      alert("Please enter your password");
     console.log("hh")
      return;
    }

    alert("Login successful!");
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className={`${styles.loginContainer}`}>
      <h2>Log <span className={`${styles.highlight}`}>in</span>
      </h2>
      <p>Enter your credential to login</p>

      <form onSubmit={handleSubmit}>
        <div className={`${styles.inputGroup}`}>
           <FontAwesomeIcon icon={faEnvelope} className={`${styles.icon}`} />
          <input
            type="email"
            placeholder="Type email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required
            disabled={isLoading}
            />
            {/* {accept && EmailError===422 &&<p className="Error">Email is already taken</p>} */}
        </div>

        <div className={`${styles.inputGroup}`}>
          <FontAwesomeIcon icon={faLock} className={`${styles.icon}`} />
          <input
            type="password"
            placeholder="Type Password.."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
           {/* {password.length<8 && accept && <p className="Error">password must be more than 8 characters</p>} */}
           <FontAwesomeIcon icon={faEye-faEyeSlash} className={`${styles.icon}`} />
        </div>

        <button type="submit" className={`${styles.btn}`}>
          Sign in
        </button>
      </form>

      <p className={`${styles.registerText}`}>
        Don’t have an account yet? <a href="#">Register</a>
      </p>
    </div>
  )
}

export default AdminLogin
