import { useState, useRef, useEffect } from "react";
import FileInput from "./components/FileInput";
import "./FormPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faEye,
  faEyeSlash,
  faLocationDot,
  faMap,
} from "@fortawesome/free-solid-svg-icons";
import MapPicker from "../../../components/map/MapPicker";
import { faCertificate } from "@fortawesome/free-solid-svg-icons";
import LogoImage from "../../../components/logoImage/LogoImage";
const FormPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [successMsg, setSuccessMsg] = useState();
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    pharmacyName: "",
    cr_number: null,
    license_file_id: null,
    from: null,
    to: null,
    address: "",
    location: "",
    mapLocation: "",
  });
  const inputRef = useRef(null);
  
  const handleBack = () => window.history.back();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('users data to sent: ',newUser);
    setIsLoading(true);
    setError(null);
    setSuccessMsg(null);

    const user = {
      role: "pharmacist",
      full_name: newUser.full_name,
      email: newUser.email,
      phone: newUser.phone,
      password: newUser.password,
      pharmacy_name: newUser.pharmacy_name,
      cr_number: newUser.cr_number,
      license_file_id: 100,
      from: newUser.from,
      to: newUser.to,
      address: newUser.address,
      latitude: newUser.latitude,
      longitude: newUser.longitude,
    };

    console.log("user's data: ", user);

    fetch(`https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(user), 
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((serverError) => {
            throw new Error(serverError.message || "Registration failed");
          });
        }
        console.log("success sending user's data");
        return response.json();
      })
      .then((data) => {
        console.log("message from api: ", data.message);
        setSuccessMsg("Check your email for Activation link");
        setNewUser({
          full_name: "",
          email: "",
          phone: "",
          password: "",
          pharmacyName: "",
          cr_number: null,
          license_file_id: null,
          from: null,
          to: null,
          address: "",
          location: "",
          mapLocation: "",
        });
      })
      .catch((error) => {
        console.error("Registration error:", error);
        setError(error.message || "Failed to create user. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  //     useEffect(()=>{
  //     inputRef.current.focus();
  //     if(userData.isAuthorized) {
  //       navigate('/logged');
  //     }
  //   },[navigate]);

  return (
    <div className="form-page relative">
      <div className="contentCol h-[100%]">
        <div className="form-wrapper">
        <div className="form-header">
          <div className="back-arrow" onClick={handleBack}>
            <svg width="34" height="34" viewBox="0 0 24 24" fill="#0d3b66">
              <path
                d="M15 18l-6-6 6-6"
                stroke="#0d3b66"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1>Pharmacists Account Setup</h1>
          <p>Fill Your Information to register</p>
        </div>
        {error && <p className="error-message">{error}</p>}
        {successMsg && <p className="success-message">{successMsg}</p>}

        <form className="form-container" onSubmit={handleSubmit}>
          {/* Row 1: Full Name + Phone */}
          <div className="row">
            <div className="input-field">
              <label htmlFor="full_name">
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 33 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.4"
                    d="M16.1567 33.1567C25.0798 33.1567 32.3135 25.9232 32.3135 17C32.3135 8.07687 25.0798 0.843262 16.1567 0.843262C7.23361 0.843262 0 8.07687 0 17C0 25.9232 7.23361 33.1567 16.1567 33.1567Z"
                    fill="#39CCCC"
                  />
                  <path
                    d="M16.1564 8.80859C12.812 8.80859 10.0977 11.5229 10.0977 14.8673C10.0977 18.1471 12.6666 20.813 16.0756 20.9099C16.1241 20.9099 16.1887 20.9099 16.2211 20.9099C16.2534 20.9099 16.3018 20.9099 16.3342 20.9099C16.3503 20.9099 16.3665 20.9099 16.3665 20.9099C19.6301 20.7968 22.199 18.1471 22.2152 14.8673C22.2152 11.5229 19.5009 8.80859 16.1564 8.80859Z"
                    fill="#39CCCC"
                  />
                  <path
                    d="M27.1126 28.8754C24.2367 31.5251 20.3914 33.1569 16.1584 33.1569C11.9253 33.1569 8.08 31.5251 5.2041 28.8754C5.59186 27.4051 6.64205 26.0641 8.17694 25.0301C12.5877 22.0896 19.7613 22.0896 24.1398 25.0301C25.6908 26.0641 26.7249 27.4051 27.1126 28.8754Z"
                    fill="#39CCCC"
                  />
                </svg>
              </label>
              <input
                type="text"
                name="full_name"
                id="full_name"
                value={newUser.full_name}
                placeholder="Type Full Name"
                onChange={(e) =>
                  setNewUser({ ...newUser, full_name: e.target.value })
                }
              />
            </div>

            <div className="input-field">
              <label htmlFor="phone">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="#39CCCC">
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.48 2.53.74 3.88.74a1 1 0 011 1v3.5a1 1 0 01-1 1C10.5 21 3 13.5 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.26 2.67.74 3.88a1 1 0 01-.21 1.11l-2.2 2.2z" />
                </svg>
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={newUser.phone}
                placeholder="Type Phone Number"
                onChange={(e) =>
                  setNewUser({ ...newUser, phone: e.target.value })
                }
              />
            </div>
          </div>
          {/* Row 2: Email */}
          <div className="input-field">
            <label htmlFor="email">
              <svg
                width="37"
                height="37"
                viewBox="0 0 37 37"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M30.0371 6.5H6.03711C4.38711 6.5 3.05211 7.85 3.05211 9.5L3.03711 27.5C3.03711 29.15 4.38711 30.5 6.03711 30.5H30.0371C31.6871 30.5 33.0371 29.15 33.0371 27.5V9.5C33.0371 7.85 31.6871 6.5 30.0371 6.5ZM30.0371 12.5L18.0371 20L6.03711 12.5V9.5L18.0371 17L30.0371 9.5V12.5Z"
                  fill="#39CCCC"
                />
              </svg>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={newUser.email}
              placeholder="Type Email"
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
          </div>
          {/* Row 3: Password */}
          <div className="input-field" style={{ position: "relative" }}>
            <label htmlFor="password" aria-hidden>
              <svg
                width="34"
                height="34"
                viewBox="0 0 30 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.74961 13.1539V10.0843C4.74961 4.51491 9.13163 0 14.5371 0C19.9426 0 24.3246 4.51491 24.3246 10.0843V13.1539C25.9411 13.2783 26.9936 13.5922 27.763 14.385C29.0371 15.6978 29.0371 17.8106 29.0371 22.0361C29.0371 26.2617 29.0371 28.3745 27.763 29.6872C26.4889 31 24.4383 31 20.3371 31H8.73711C4.63589 31 2.58528 31 1.3112 29.6872C0.0371094 28.3745 0.0371094 26.2617 0.0371094 22.0361C0.0371094 17.8106 0.0371094 15.6978 1.3112 14.385C2.08061 13.5922 3.13322 13.2783 4.74961 13.1539ZM6.92461 10.0843C6.92461 5.75257 10.3328 2.24096 14.5371 2.24096C18.7414 2.24096 22.1496 5.75257 22.1496 10.0843V13.0777H8.73711V10.0843Z"
                  fill="#39CCCC"
                />
              </svg>
            </label>

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={newUser.password}
              placeholder="Type Password"
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              style={{ paddingRight: "45px" }}
            />

            <div
              className="pass-icon"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="cursor-pointer text-[#39CCCC]"
                style={{ fontSize: "34px" }}
              />
            </div>
          </div>
          {/* Row 4: Dates */}
          <div className="row">
            <div className="input-field">
              <label htmlFor="from">
                <svg
                  width="37"
                  height="36"
                  viewBox="0 0 37 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.5 3C26.7845 3 33.5 9.7155 33.5 18C33.5 26.2845 26.7845 33 18.5 33C10.2155 33 3.5 26.2845 3.5 18C3.5 9.7155 10.2155 3 18.5 3ZM18.5 6C15.3174 6 12.2652 7.26428 10.0147 9.51472C7.76428 11.7652 6.5 14.8174 6.5 18C6.5 21.1826 7.76428 24.2348 10.0147 26.4853C12.2652 28.7357 15.3174 30 18.5 30C21.6826 30 24.7348 28.7357 26.9853 26.4853C29.2357 24.2348 30.5 21.1826 30.5 18C30.5 14.8174 29.2357 11.7652 26.9853 9.51472C24.7348 7.26428 21.6826 6 18.5 6ZM18.5 9C18.8674 9.00005 19.222 9.13493 19.4966 9.37907C19.7711 9.62321 19.9465 9.95962 19.9895 10.3245L20 10.5V17.379L24.0605 21.4395C24.3295 21.7094 24.4857 22.0717 24.4973 22.4526C24.509 22.8335 24.3752 23.2046 24.1231 23.4904C23.8711 23.7763 23.5197 23.9555 23.1403 23.9916C22.7609 24.0277 22.382 23.9181 22.0805 23.685L21.9395 23.5605L17.4395 19.0605C17.2064 18.8272 17.0566 18.5235 17.0135 18.1965L17 18V10.5C17 10.1022 17.158 9.72064 17.4393 9.43934C17.7206 9.15804 18.1022 9 18.5 9Z"
                    fill="#39CCCC"
                  />
                </svg>
              </label>
              <input
                type="text"
                name="from"
                id="from"
                value={newUser.fromDate}
                placeholder="From:..."
                onChange={(e) =>
                  setNewUser({ ...newUser, fromDate: e.target.value })
                }
              />
            </div>

            <div className="input-field">
              <label htmlFor="to">
                <svg
                  width="37"
                  height="36"
                  viewBox="0 0 37 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.5 3C26.7845 3 33.5 9.7155 33.5 18C33.5 26.2845 26.7845 33 18.5 33C10.2155 33 3.5 26.2845 3.5 18C3.5 9.7155 10.2155 3 18.5 3ZM18.5 6C15.3174 6 12.2652 7.26428 10.0147 9.51472C7.76428 11.7652 6.5 14.8174 6.5 18C6.5 21.1826 7.76428 24.2348 10.0147 26.4853C12.2652 28.7357 15.3174 30 18.5 30C21.6826 30 24.7348 28.7357 26.9853 26.4853C29.2357 24.2348 30.5 21.1826 30.5 18C30.5 14.8174 29.2357 11.7652 26.9853 9.51472C24.7348 7.26428 21.6826 6 18.5 6ZM18.5 9C18.8674 9.00005 19.222 9.13493 19.4966 9.37907C19.7711 9.62321 19.9465 9.95962 19.9895 10.3245L20 10.5V17.379L24.0605 21.4395C24.3295 21.7094 24.4857 22.0717 24.4973 22.4526C24.509 22.8335 24.3752 23.2046 24.1231 23.4904C23.8711 23.7763 23.5197 23.9555 23.1403 23.9916C22.7609 24.0277 22.382 23.9181 22.0805 23.685L21.9395 23.5605L17.4395 19.0605C17.2064 18.8272 17.0566 18.5235 17.0135 18.1965L17 18V10.5C17 10.1022 17.158 9.72064 17.4393 9.43934C17.7206 9.15804 18.1022 9 18.5 9Z"
                    fill="#39CCCC"
                  />
                </svg>
              </label>
              <input
                type="text"
                name="to"
                id="to"
                value={newUser.toDate}
                placeholder="To:..."
                onChange={(e) =>
                  setNewUser({ ...newUser, toDate: e.target.value })
                }
              />
            </div>
          </div>
          {/* Row 5: Location + Map */}
          <div className="row">
            <div className="input-field">
              <label htmlFor="location">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="#39CCCC">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" fill="#fff" />
                </svg>
              </label>

              <input
                type="text"
                name="address"
                id="location"
                value={newUser.address}
                placeholder="Type Location.."
                onChange={(e) =>
                  setNewUser({ ...newUser, location: e.target.value })
                }
              />
            </div>

            <div className="input-row">
          <button
            type="button"
            className="location-map-button"
            onClick={() => setIsMapOpen(true)}
          >
            <FontAwesomeIcon icon={faMap} className="icon" /> Location in
            map
          </button>
        </div>
          </div>
          {/* Row 6: Upload Certificate */}
          <FileInput
            placeholder="Upload Certificate File"
            icon={faCertificate}
          />{" "}
          {/* Row 7: Pharmacy Name + CR Number */}
          <div className="row">
            <div className="input-field">
              <label htmlFor="pharmacyName">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="34"
                  height="34"
                  fill="#39CCCC"
                  viewBox="0 0 256 201"
                  enable-background="new 0 0 256 201"
                  xml:space="preserve"
                >
                  <path d="M2,70.249c-0.131,50.667,31.053,93.576,75,112v16h94v-16c43.947-18.424,75.132-61.333,75-112  C245.999,70.248,2.002,70.248,2,70.249z M163,138.249h-28v28h-22v-28H85v-22h28v-28h22v28h28V138.249z M254,18.07  c0,4.117-1.576,8.234-4.708,11.365L219.48,60.249h-46l53.082-53.544c6.273-6.273,16.456-6.273,22.73,0  C252.424,9.847,254,13.963,254,18.07z" />
                </svg>
              </label>
              <input
                type="text"
                name="pharmacy_name"
                id="pharmacyName"
                value={newUser.pharmacyName}
                placeholder="Pharmacy Name"
                onChange={(e) =>
                  setNewUser({ ...newUser, pharmacyName: e.target.value })
                }
              />
            </div>

            <div className="input-field">
              <label htmlFor="crNumber">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="34"
                  fill="#39CCCC"
                  viewBox="0 0 48 48"
                >
                  <title>certificate-ssl-solid</title>
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="invisible_box" data-name="invisible box">
                      <rect width="48" height="48" fill="none" />
                      <rect width="48" height="48" fill="none" />
                    </g>
                    <g id="icons_Q2" data-name="icons Q2">
                      <path d="M46,24a12.9,12.9,0,0,0-4-9.4V7a2,2,0,0,0-2-2H4A2,2,0,0,0,2,7V41a2,2,0,0,0,2,2H26v1.6c0,2,2,3.1,3.3,1.8L33,43l3.7,3.4c1.3,1.3,3.3.2,3.3-1.8V34.9A12.9,12.9,0,0,0,46,24ZM33,15a9,9,0,1,1-9,9A9,9,0,0,1,33,15ZM12,14H24.7L23,15.7A11.4,11.4,0,0,0,21.5,18H12a2,2,0,0,1,0-4Zm0,8h8.2a6.5,6.5,0,0,0-.2,2,6.8,6.8,0,0,0,.2,2H12a2,2,0,0,1,0-4Zm0,12a2,2,0,0,1,0-4h9.5A11.4,11.4,0,0,0,23,32.3,13.7,13.7,0,0,0,24.7,34Z" />
                      <circle cx="33" cy="24" r="5" />
                    </g>
                  </g>
                </svg>
              </label>

              <input
                type="text"
                name="cr_number"
                id="crNumber"
                value={newUser.crNumber}
                placeholder="CR Number"
                onChange={(e) =>
                  setNewUser({ ...newUser, crNumber: e.target.value })
                }
              />
            </div>
          </div>
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
        </div>
      </div>
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
      <LogoImage className="!z-0"/>
    </div>
  );
};

export default FormPage;
