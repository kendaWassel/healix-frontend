import React, { useState } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";



function Login() {
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


  /*const handleSubmit = (e) => {
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
          role: "Login",
          email: "",
          password: "",
        });
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setIsLoading(false));
  };*/


  return (
    <div className="login-container">
      <h2>Log <span className="highlight">in</span>
      </h2>
      <p>Enter your credential to login</p>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
           <FontAwesomeIcon icon={faEnvelope} className="icon" />
          <input
            type="email"
            placeholder="Type email"
            value={email}
            disabled={isLoading}
            onChange={(e) => setEmail(e.target.value)} 
            required/>
            {/* {accept && EmailError===422 &&<p className="Error">Email is already taken</p>} */}
        </div>

        <div className="input-group">
          <FontAwesomeIcon icon={faLock} className="icon" />
          <input
            type="password"
            placeholder="Type Password.."
            value={password}
            disabled={isLoading}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
           {/* {password.length<8 && accept && <p className="Error">password must be more than 8 characters</p>} */}
           <FontAwesomeIcon icon={faEye-faEyeSlash} className="icon" />
        </div>

        <button type="submit" className="btn">
          Sign in
        </button>
      </form>

      <p className="register-text">
        Don’t have an account yet? <a href="#">Register</a>
      </p>
    </div>
  );
}
export default Login;





