import styles from "./DeliveryRegister.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import LogoImage from "../../../components/logoImage/LogoImage";
import {
  faArrowLeft,
  faCircleUser,
  faPhone,
  faEnvelope,
  faLock,
  faCar,
  faHashtag,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";


export default function DeliveryRegister() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [successMsg, setSuccessMsg] = useState();
  const [newUser, setNewUser] = useState({
    role: "delivery",
    full_name: "",
    email: "",
    phone: "",
    delivery_image_id:null,
    password: "",
    vehicle_type: "",
    plate_number: null,
    driving_license_id:null,
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [licenseFile, setLicenseFile] = useState(null);
  const [LicenseFileName, setLicenseFileName] = useState("");
  const [photoPreview, setPhotoPreview] = useState(null);
  const inputRef = useRef(null);


  const uploadImage = async (photoFile) => {
    console.log("uploading image: ", photoFile);

    const formData = new FormData();
    formData.append('image', photoFile);
    formData.append('category', 'profile');

    const response = await fetch("https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/uploads/image", {
      method: "POST",
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
      body: formData,
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.message || "Image upload failed");
    }
    const data = await response.json();
    console.log("image uploaded: ", data);
    return data.image_id;
  };
  const uploadFile = async (licenseFile) => {
    console.log("uploading file: ", licenseFile);

    const formData = new FormData();
    formData.append('file', licenseFile);
    formData.append('category', 'certificate');

    const response = await fetch("https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/uploads", {
      method: "POST",
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
      body: formData,
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.message || "File upload failed");
    }
    const data = await response.json();
    console.log("file uploaded: ", data);
    return data.file_id;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);


    const imageId = await uploadImage(photoFile);
    const fileId = await uploadFile(licenseFile);
    const user = {
      role: newUser.role,
      full_name: newUser.full_name,
      email: newUser.email,
      delivery_image_id: imageId,
      phone: newUser.phone,
      password: newUser.password,
      vehicle_type: newUser.vehicle_type,
      plate_number: newUser.plate_number,
      driving_license_id: fileId,
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
          role: "delivery",
          full_name: "",
          email: "",
          phone: "",
          delivery_image_id:null,
          password: "",
          vehicle_type: "",
          plate_number: null,
          driving_license_id:null,
        });
      })
      .catch((error) => {
        console.error("Registration error:", error);
        setError(error.message || "Failed to create user. Please try again.");
      })
      .finally(() => {
        // setIsLoading(false);
      });
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  //     useEffect(()=>{
  //     inputRef.current.focus();
  //     if(userData.isAuthorized) {
  //       navigate('/logged');
  //     }
  //   },[navigate]);

  return (
    <div className={styles.formContainer}>
         <title>Delivery Account Setup</title>
      <header className={styles.formHeader}>
        <span className={styles.backArrow}>
        <Link to="/register">
          <FontAwesomeIcon icon={faArrowLeft}  />
          </Link>
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
                      {/* photo */}
                      <div
                className={`${styles.hiddenFileInput} flex flex-col justify-center md:w-[100px] md:h-[100px] w-[80px] h-[80px] border-1 border-[var(--card-border)] rounded-[50%] mx-[auto] overflow-hidden`}
              >
                <label
                  htmlFor="photo"
                  className="flex flex-col items-center cursor-pointer w-full h-full justify-center"
                >
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Care Provider photo preview"
                      className="w-full h-full object-cover rounded-[50%]"
                    />
                  ) : (
                    <>
                      <svg
                        width="47"
                        height="42"
                        viewBox="0 0 47 42"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M39.5413 12.0416V7.45825H34.958V5.16659H39.5413V0.583252H41.833V5.16659H46.4163V7.45825H41.833V12.0416H39.5413ZM21.208 34.3395C23.602 34.3395 25.6256 33.5137 27.2786 31.8622C28.9317 30.2107 29.7582 28.1871 29.7582 25.7916C29.7582 23.396 28.9317 21.3725 27.2786 19.721C25.6256 18.0694 23.602 17.2429 21.208 17.2414C18.814 17.2398 16.7904 18.0664 15.1374 19.721C13.4843 21.3755 12.6578 23.3991 12.6578 25.7916C12.6578 28.1841 13.4843 30.2076 15.1374 31.8622C16.7904 33.5168 18.814 34.3433 21.208 34.3418M21.208 32.0501C19.4282 32.0501 17.9401 31.452 16.7438 30.2558C15.5476 29.0595 14.9495 27.5714 14.9495 25.7916C14.9495 24.0117 15.5476 22.5237 16.7438 21.3274C17.9401 20.1312 19.4282 19.533 21.208 19.533C22.9879 19.533 24.4759 20.1312 25.6722 21.3274C26.8684 22.5237 27.4666 24.0117 27.4666 25.7916C27.4666 27.5714 26.8684 29.0595 25.6722 30.2558C24.4759 31.452 22.9879 32.0501 21.208 32.0501ZM4.28634 41.8333C3.23065 41.8333 2.34988 41.4803 1.64405 40.7745C0.938216 40.0687 0.584536 39.1871 0.583008 38.1299V13.4533C0.583008 12.3976 0.936689 11.5168 1.64405 10.811C2.35141 10.1051 3.23217 9.75145 4.28634 9.74992H11.0628L15.3024 5.16659H29.4947V12.9239H34.078V17.5072H41.833V38.1322C41.833 39.1864 41.4801 40.0671 40.7743 40.7745C40.0684 41.4819 39.1869 41.8348 38.1297 41.8333H4.28634Z"
                          fill="#39CCCC"
                        />
                      </svg>
                      <h3 className="text-[var(--text-color)] text-xs">
                        Add Photo
                      </h3>
                    </>
                  )}
                </label>
                <input
                  type="file"
                  name="photo"
                  id="photo"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        setPhotoPreview(e.target.result);
                      };
                      reader.readAsDataURL(file);
                    }
                    setPhotoFile(file);
                  }}
                  disabled={isLoading}
                />
              </div>
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
                  className={`${styles.customFileInput} md:px-[2rem] px-[1rem] md:py-[1rem] py-[0.5rem] flex items-center gap-[0.5rem] basis-1/2 grow-0 border-1 border-[var(--card-border)] rounded-[8px] cursor-pointer`}
                  onClick={() => document.getElementById("certificate").click()}
                >
                  <label htmlFor="certificate">
                    <svg
                      width="36"
                      height="37"
                      viewBox="0 0 36 37"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.5"
                        d="M33 24.5V23C33 18.7565 33 16.637 31.6815 15.3185C30.363 14 28.242 14 24 14H12C7.755 14 5.6355 14 4.317 15.32C3 16.6355 3 18.755 3 22.997V24.5C3 28.742 3 30.863 4.3185 32.1815C5.6355 33.5 7.758 33.5 12 33.5H24C28.242 33.5 30.3645 33.5 31.6815 32.1815C32.9985 30.863 33 28.742 33 24.5Z"
                        fill="#39CCCC"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M17.9996 24.1251C18.2979 24.1251 18.5841 24.0066 18.7951 23.7956C19.006 23.5846 19.1246 23.2985 19.1246 23.0001V6.5406L21.6446 9.4821C21.8387 9.70886 22.115 9.84922 22.4126 9.87228C22.7102 9.89535 23.0048 9.79924 23.2316 9.6051C23.4583 9.41097 23.5987 9.1347 23.6217 8.83708C23.6448 8.53946 23.5487 8.24486 23.3546 8.0181L18.8546 2.7681C18.749 2.6446 18.6178 2.54545 18.4702 2.47746C18.3226 2.40947 18.1621 2.37427 17.9996 2.37427C17.8371 2.37427 17.6765 2.40947 17.5289 2.47746C17.3813 2.54545 17.2502 2.6446 17.1446 2.7681L12.6446 8.0181C12.5484 8.13038 12.4754 8.2605 12.4295 8.40102C12.3837 8.54154 12.366 8.68971 12.3774 8.83708C12.3888 8.98444 12.4291 9.12812 12.4961 9.2599C12.563 9.39168 12.6553 9.50898 12.7676 9.6051C12.8798 9.70123 13.01 9.7743 13.1505 9.82015C13.291 9.86599 13.4392 9.8837 13.5865 9.87228C13.7339 9.86086 13.8776 9.82053 14.0094 9.75358C14.1411 9.68663 14.2584 9.59438 14.3546 9.4821L16.8746 6.5421V23.0001C16.8746 23.6211 17.3786 24.1251 17.9996 24.1251Z"
                        fill="#39CCCC"
                      />
                    </svg>
                  </label>
                  <div className={styles.fileDisplay}>
                    {LicenseFileName || "Upload Lisence File"}
                  </div>
                  <input
                    type="file"
                    name="certificate"
                    id="certificate"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setLicenseFileName(file ? file.name : "");
                      setLicenseFile(file);
                    }}
                    required
                    disabled={isLoading}
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
      <LogoImage/>
    </div>
  );
}
