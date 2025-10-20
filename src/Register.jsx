import { useState } from "react";
import axios from "axios";

export default function Register_P() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [gender, setGender] = useState("");
  const [accept, setAccept] = useState(false);
  const [EmailError, setEmailError] = useState("");

  async function Submit(e) {
    e.preventDefault();
    setAccept(true);
    let flag = true;

    if (name === "" || password.length < 8) {
      flag = false;
    }

    try {
      if (flag) {
        let res = await axios.post("http://127.0.0.1:8000/api/auth/register", {
        
          full_name: name,
          email: email,
          phone: phone,
          password: password,
          gender: gender,
          address: location,
        });

        if (res.status === 200) {
          window.localStorage.setItem("email", email);
          window.location.pathname = "/";
        }
      }
    } catch (err) {
      setEmailError(err.response.status);
    }
  }

  return (
    <div className="form-container">
      <header className="form-header">
        <span className="back-arrow"><i className="fa-solid fa-arrow-left"></i></span>
        <h1>Patients Account Setup</h1>
        <p className="subtitle">Fill your information to register</p>
      </header>

      <form className="patient-form" onSubmit={Submit}>
        <div className="input-row">
          <div className="input-group">
          <i className="fa-solid fa-circle-user"></i>
            <input
              id="name"
              type="text"
              placeholder="Type username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            
            />
            {name === "" && accept && <p className="Error">UserName is Required</p>}
          </div>

          <div className="input-group">
            <i className="fas fa-phone"></i>
            <input
              id="phone"
              type="tel"
              placeholder="Type phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <div className="input-group full-width">
        <i className="fa-solid fa-cake-candles" ></i>
          <input
            id="birth"
            type="date"
            placeholder="Birth date"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
          />
        </div>

        <div className="input-group full-width">
          <i className="fas fa-envelope"></i>
          <input
            id="email"
            type="email"
            placeholder="Type email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
       {accept && EmailError===422 &&<p className="Error">Email is already taken</p>}
        </div>

        <div className="input-group full-width password-input-group">
          <i className="fas fa-lock"></i>
          <input
            id="password"
            type="password"
            placeholder="Type Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {password.length<8 && accept && <p className="Error">password must be more than 8 characters</p>}
        </div>

        <div className="input-group full-width select-group">
        <i className="fa-solid fa-mars-and-venus"></i>

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="" disabled>
              Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <i className="fas fa-chevron-down select-arrow" style={{color: '#39CCCC'}}></i>
        </div>

        <div className="input-row">
          <div className="input-group">
            <i className="fas fa-map-marker-alt"></i>
            <input
              id="location"
              type="text"
              placeholder="Type location.."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <button className="location-map-button">
            <i className="fas fa-map"></i>Location In map
          </button>
        </div>

        <div className="input-group full-width upload-group">
      
          <label htmlFor="file-upload" className="upload-label">
          <i className="fa-solid fa-arrow-up-from-bracket"></i>
            Upload Patient File (Optional):
          </label>
          <input
            id="file-upload"
            type="file"
            className="file-input"
            accept=".pdf,.jpg,.jpeg,.png"
          />
        </div>

        <button type="submit" className="register-button">
          Register
        </button>
      </form>
    </div>
  );
}
