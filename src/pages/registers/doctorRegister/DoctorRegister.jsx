import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faL } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import LogoImage from "../../../components/logoImage/LogoImage";
import styles from "./DoctorRegister.module.css";
const DoctorRegister = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [successMsg, setSuccessMsg] = useState();
  const [newUser, setNewUser] = useState({
    role: "doctor",
    full_name: "",
    email: "",
    doctor_image_id: null,
    phone: "",
    password: "",
    specialization: "",
    gender: "",
    from: "",
    to: "",
    consultation_fee: null,
    certificate_file_id: null,
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [certificateFile, setCertificateFile] = useState(null);
  const [certificateFileName, setCertificateFileName] = useState("");
  const [photoPreview, setPhotoPreview] = useState(null);
  const [specs, setSpecs] = useState([]);
  const [specsLoaded, setSpecsLoaded] = useState(false);
  const inputRef = useRef(null);

  const specsRequest = () => {
    if (specsLoaded) return; // Prevent duplicate requests
    
    setIsLoading(true);
    setError(null);
    return fetch(`https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/specializations`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((serverError) => {
            throw new Error(serverError.message || "Specializations request failed");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log('success getting specs: ', data);
        // Handle the API response structure: {status: 'success', data: [...], message: '...'}
        if (data.status === 'success' && data.data) {
          setSpecs(data.data);
          setSpecsLoaded(true);
        } else {
          throw new Error("Invalid response format");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('failed getting specs:', error);
        setError(error.message || "Failed to get specializations. Please try again.");
        setIsLoading(false);
      });
  };

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
  const uploadFile = async (certificateFile) => {
    console.log("uploading file: ", certificateFile);

    const formData = new FormData();
    formData.append('file', certificateFile);
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
    const fileId = await uploadFile(certificateFile);

    const user = {
      role: newUser.role,
      full_name: newUser.full_name,
      email: newUser.email,
      doctor_image_id: imageId,
      phone: newUser.phone,
      password: newUser.password,
      specialization: newUser.specialization,
      gender: newUser.gender,
      from: newUser.from,
      to: newUser.to,
      consultation_fee: parseInt(newUser.consultation_fee) || 0,
      certificate_file_id: fileId,
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
          role: "doctor",
          full_name: "",
          email: "",
          doctor_image_id: null,
          phone: "",
          password: "",
          specialization: "",
          gender: "",
          from: "",
          to: "",
          consultation_fee: null,
          certificate_file_id: null,
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
    specsRequest();
    inputRef.current.focus();
  }, []);

  //     useEffect(()=>{
  //     inputRef.current.focus();
  //     if(userData.isAuthorized) {
  //       navigate('/logged');
  //     }
  //   },[navigate]);

  return (
    <div className="relative flex">
      <div className={`contentCol h-[100%]`}>
        <div className="flex items-start md:py-[2rem] py-[1rem] md:ps-[2rem] ps-[1rem]">
          <button>
            <svg
              width="44"
              height="36"
              viewBox="0 0 44 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.541 0.631815C15.9039 0.245004 16.4055 0.0181512 16.9356 0.00114842C17.4657 -0.0158543 17.9808 0.178385 18.3677 0.541147L18.3677 15.9998L41.9997 15.9998C42.5301 15.9998 43.0388 16.2105 43.4139 16.5856C43.789 16.9607 43.9997 17.4694 43.9997 17.9998C43.9997 18.5303 43.789 19.039 43.4139 19.414C43.0388 19.7891 42.5301 19.9998 41.9997 19.9998H18.3677V35.4585C17.9808 35.8212 17.4657 36.0155 16.9356 35.9985C16.4055 35.9815 15.9039 35.7546 15.541 35.3678L0.541036 19.3678C0.193444 18.9971 0 18.508 0 17.9998C0 17.4916 0.193444 17.0025 0.541036 16.6318L15.541 0.631815Z"
                fill="black"
              />
            </svg>
          </button>
          {isLoading ? 
          <>
          Loading ...
          </>
          :
          //form
          <div className="flex-grow-1 flex flex-col items-center">
            <div className={`${styles.formHeading} text-center`}>
              <h1 className="md:text-[25px] sm:text-[20px] text-[18px] text-[var(--dark-blue)] font-bold">
                Doctor Account Setup
              </h1>
              <p className="font-medium sm:text-[18px] text-[var(--text-color)] my-[1rem]">
                Fill your information to register
              </p>
            </div>
            {error ? <div className="alert alert-danger">{error}</div> : ""}
            {successMsg ? (
              <div className="alert alert-success">{successMsg}</div>
            ) : (
              ""
            )}
            <form
              className={`${styles.form} flex flex-col gap-[1.5rem]`}
              onSubmit={handleSubmit}
            >
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
                      alt="Doctor photo preview"
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
              {/* name  and phone*/}
              <div className="flex md:flex-row flex-col gap-[2rem] items-center">
                <div className="md:px-[2rem] px-[1rem] md:py-[1rem] py-[0.5rem] flex items-center gap-[0.5rem] basis-1/2 grow-0 border-1 border-[var(--card-border)] rounded-[8px]">
                  <label htmlFor="name">
                    <svg
                      width="33"
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
                    name="name"
                    id="name"
                    ref={inputRef}
                    value={newUser.full_name}
                    placeholder="Type full name"
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        full_name: e.target.value,
                      })
                    }
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="md:px-[2rem] px-[1rem] md:py-[1rem] py-[0.5rem] flex items-center gap-[0.5rem] basis-1/2 grow-0 border-1 border-[var(--card-border)] rounded-[8px]">
                  <label htmlFor="phone">
                    <svg
                      width="34"
                      height="34"
                      viewBox="0 0 34 34"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M27.2423 21.6183L23.644 21.2075C23.2209 21.1578 22.792 21.2046 22.3896 21.3445C21.9872 21.4844 21.6217 21.7136 21.3206 22.015L18.714 24.6217C14.6926 22.5759 11.4239 19.3072 9.37815 15.2858L11.999 12.665C12.6081 12.0558 12.9056 11.2058 12.8065 10.3417L12.3956 6.77166C12.3156 6.08046 11.9841 5.44286 11.4641 4.98042C10.9442 4.51798 10.2723 4.26303 9.57648 4.26416H7.12565C5.52481 4.26416 4.19315 5.59583 4.29231 7.19666C5.04315 19.295 14.719 28.9567 26.8031 29.7075C28.404 29.8067 29.7356 28.475 29.7356 26.8742V24.4233C29.7498 22.9925 28.6731 21.7883 27.2423 21.6183Z"
                        fill="#39CCCC"
                      />
                    </svg>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={newUser.phone}
                    placeholder="Type phone number"
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        phone: e.target.value,
                      })
                    }
                    onKeyDown={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    pattern="[0-9]*"
                    inputMode="numeric"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              {/* spec and gender  */}
              <div className=" flex md:flex-row flex-col gap-[2rem] items-center">
                <div className="md:px-[2rem] px-[1rem] md:py-[1rem] py-[0.5rem] flex items-center gap-[0.5rem] basis-1/2 grow-0 border-1 border-[var(--card-border)] rounded-[8px]">
                  <label htmlFor="specialization">
                    <svg
                      width="32"
                      height="36"
                      viewBox="0 0 32 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.9997 0.5625C14.8741 0.5625 13.7595 0.780742 12.7196 1.20477C11.6796 1.62879 10.7347 2.25029 9.93881 3.03379C9.14287 3.81728 8.51151 4.74742 8.08075 5.77111C7.65 6.79479 7.42829 7.89197 7.42829 9C7.42829 10.108 7.65 11.2052 8.08075 12.2289C8.51151 13.2526 9.14287 14.1827 9.93881 14.9662C10.7347 15.7497 11.6796 16.3712 12.7196 16.7952C13.7595 17.2193 14.8741 17.4375 15.9997 17.4375C17.1253 17.4375 18.2399 17.2193 19.2799 16.7952C20.3198 16.3712 21.2647 15.7497 22.0606 14.9662C22.8566 14.1827 23.4879 13.2526 23.9187 12.2289C24.3494 11.2052 24.5711 10.108 24.5711 9C24.5711 7.89197 24.3494 6.79479 23.9187 5.77111C23.4879 4.74742 22.8566 3.81728 22.0606 3.03379C21.2647 2.25029 20.3198 1.62879 19.2799 1.20477C18.2399 0.780742 17.1253 0.5625 15.9997 0.5625ZM20.2854 22.5562C19.8997 22.5211 19.4997 22.5 19.0997 22.5H12.8926C12.4926 22.5 12.0997 22.5211 11.7069 22.5562V27.3023C12.8854 27.8367 13.7069 29.0109 13.7069 30.368C13.7069 32.2312 12.1711 33.743 10.2783 33.743C8.38543 33.743 6.84972 32.2312 6.84972 30.368C6.84972 29.0039 7.67115 27.8297 8.84972 27.3023V23.1961C4.35686 24.8203 1.14258 29.0813 1.14258 34.0734C1.14258 35.1352 2.02115 36 3.09972 36H28.8926C29.9711 36 30.8497 35.1352 30.8497 34.0734C30.8497 29.0813 27.6354 24.8273 23.1354 23.2031V25.8328C24.7997 26.4094 25.9926 27.9773 25.9926 29.8125V32.0625C25.9926 32.8359 25.3497 33.4688 24.564 33.4688C23.7783 33.4688 23.1354 32.8359 23.1354 32.0625V29.8125C23.1354 29.0391 22.4926 28.4062 21.7069 28.4062C20.9211 28.4062 20.2783 29.0391 20.2783 29.8125V32.0625C20.2783 32.8359 19.6354 33.4688 18.8497 33.4688C18.064 33.4688 17.4211 32.8359 17.4211 32.0625V29.8125C17.4211 27.9773 18.614 26.4164 20.2783 25.8328V22.5562H20.2854Z"
                        fill="#39CCCC"
                      />
                    </svg>
                  </label>
                  <select
                    name="specialization"
                    id="specialization"
                    value={newUser.specialization}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        specialization: e.target.value,
                      })
                    }
                    required
                    disabled={isLoading}
                    className="text-[var(--text-color)]"
                  >
                    <option value="">Specialization</option>
                    {specs.map((spec) => (
                      <option key={spec.id} value={spec.name}>
                        {spec.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:px-[2rem] px-[1rem] md:py-[1rem] py-[0.5rem] flex items-center gap-[0.5rem] basis-1/2 grow-0 border-1 border-[var(--card-border)] rounded-[8px]">
                  <label htmlFor="gender">
                    <svg
                      width="37"
                      height="36"
                      viewBox="0 0 37 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M29 4.5L21.5 12M29 4.5H23M29 4.5V10.5M17 24V33M12.5 28.5H21.5M11 16.5C11 18.0913 11.6321 19.6174 12.7574 20.7426C13.8826 21.8679 15.4087 22.5 17 22.5C18.5913 22.5 20.1174 21.8679 21.2426 20.7426C22.3679 19.6174 23 18.0913 23 16.5C23 14.9087 22.3679 13.3826 21.2426 12.2574C20.1174 11.1321 18.5913 10.5 17 10.5C15.4087 10.5 13.8826 11.1321 12.7574 12.2574C11.6321 13.3826 11 14.9087 11 16.5Z"
                        stroke="#39CCCC"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </label>
                  <select
                    name="gender"
                    id="gender"
                    value={newUser.gender}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        gender: e.target.value,
                      })
                    }
                    required
                    disabled={isLoading}
                    className="text-[var(--text-color)]"
                  >
                    <option value="">Gender</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                </div>
              </div>
              {/* email  */}
              <div className="md:px-[2rem] px-[1rem] md:py-[1rem] py-[0.5rem] flex items-center gap-[0.5rem] basis-0 grow border-1 border-[var(--card-border)] rounded-[8px]">
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
                  placeholder="Type email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  required
                  disabled={isLoading}
                />
              </div>
              {/* password  */}
              <div className="basis-0 grow md:px-[2rem] px-[1rem] md:py-[1rem] py-[0.5rem] flex items-center border-1 border-[var(--card-border)] rounded-[8px]">
                <div className="flex items-center gap-[1rem] basis-0 grow">
                  <label htmlFor="pass">
                    <svg
                      width="30"
                      height="31"
                      viewBox="0 0 30 31"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4.74961 13.1539V10.0843C4.74961 4.51491 9.13163 0 14.5371 0C19.9426 0 24.3246 4.51491 24.3246 10.0843V13.1539C25.9411 13.2783 26.9936 13.5922 27.763 14.385C29.0371 15.6978 29.0371 17.8106 29.0371 22.0361C29.0371 26.2617 29.0371 28.3745 27.763 29.6872C26.4889 31 24.4383 31 20.3371 31H8.73711C4.63589 31 2.58528 31 1.3112 29.6872C0.0371094 28.3745 0.0371094 26.2617 0.0371094 22.0361C0.0371094 17.8106 0.0371094 15.6978 1.3112 14.385C2.08061 13.5922 3.13322 13.2783 4.74961 13.1539ZM6.92461 10.0843C6.92461 5.75257 10.3328 2.24096 14.5371 2.24096C18.7414 2.24096 22.1496 5.75257 22.1496 10.0843V13.0777C21.5943 13.0723 20.9918 13.0723 20.3371 13.0723H8.73711C8.08242 13.0723 7.47997 13.0723 6.92461 13.0777V10.0843Z"
                        fill="#39CCCC"
                      />
                    </svg>
                  </label>
                  <input
                    name="pass"
                    id="pass"
                    type={passwordShown ? "text" : "password"}
                    placeholder="Type Password..."
                    value={newUser.password}
                    autoComplete="off"
                    onInput={(e) =>
                      setNewUser({
                        ...newUser,
                        password: e.target.value,
                      })
                    }
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="pass-icon">
                  <FontAwesomeIcon
                    icon={faEye}
                    className="cursor-pointer text-[var(--text-color)] md:text-[20px] text-[18px]"
                    onClick={() => setPasswordShown(!passwordShown)}
                  />
                </div>
              </div>
              {/* certificate and fee*/}
              <div className=" flex md:flex-row flex-col gap-[2rem] items-center">
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
                    {certificateFileName || "Medical Certificate"}
                  </div>
                  <input
                    type="file"
                    name="certificate"
                    id="certificate"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setCertificateFileName(file ? file.name : "");
                      setCertificateFile(file);
                    }}
                    disabled={isLoading}
                  />
                </div>
                <div className="basis-1/2 grow-0 md:px-[2rem] px-[1rem] md:py-[1rem] py-[0.5rem] flex items-center border-1 border-[var(--card-border)] rounded-[8px]">
                  <div className="w-[100%] flex items-center gap-[0.5rem]">
                    <label htmlFor="fee">
                      <svg
                        width="37"
                        height="36"
                        viewBox="0 0 37 36"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M23.8356 23.0851C24.7131 22.2046 24.8316 20.8996 24.0996 20.1661C23.3676 19.4326 22.0611 19.5526 21.1821 20.4316C20.3046 21.3106 18.9981 21.4291 18.2661 20.6971C17.5341 19.9651 17.6526 18.6586 18.5316 17.7811M18.5316 17.7811L18.0006 17.2501M18.5316 17.7811C19.0281 17.2831 19.6611 17.0311 20.2506 17.0356M24.3651 23.6146L23.8341 23.0836C23.2341 23.6851 22.4316 23.9311 21.7506 23.7901M13.6611 16.3186C14.2545 16.3186 14.8345 16.1427 15.3278 15.813C15.8212 15.4834 16.2057 15.0148 16.4328 14.4667C16.6598 13.9185 16.7192 13.3153 16.6035 12.7333C16.4877 12.1514 16.202 11.6168 15.7825 11.1973C15.3629 10.7777 14.8283 10.492 14.2464 10.3762C13.6645 10.2605 13.0613 10.3199 12.5131 10.547C11.9649 10.774 11.4964 11.1585 11.1667 11.6519C10.8371 12.1452 10.6611 12.7253 10.6611 13.3186"
                          stroke="#39CCCC"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                        <path
                          d="M24.9559 7.09204C22.6369 4.77454 21.4789 3.61504 19.9744 3.18454C18.4699 2.75254 16.8724 3.12154 13.6789 3.85954L11.8369 4.28404C9.14887 4.90354 7.80487 5.21404 6.88387 6.13354C5.96287 7.05304 5.65537 8.40004 5.03437 11.0865L4.60837 12.9285C3.87187 16.1235 3.50287 17.7195 3.93337 19.224C4.36537 20.7285 5.52487 21.8865 7.84237 24.204L10.5874 26.949C14.6224 30.9855 16.6384 33 19.1434 33C21.6499 33 23.6659 30.984 27.6994 26.9505C31.7344 22.9155 33.7504 20.8995 33.7504 18.393C33.7504 16.38 32.4484 14.682 29.8444 12"
                          stroke="#39CCCC"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                      </svg>
                    </label>
                    <input
                      type="number"
                      name="fee"
                      id="fee"
                      value={newUser.consultation_fee}
                      placeholder="Consultation fee..."
                      onChange={(e) =>
                        setNewUser({
                          ...newUser,
                          consultation_fee: e.target.value,
                        })
                      }
                      className="w-[70%]"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <span className="text-[var(--text-color)]">$</span>
                </div>
              </div>
              {/* working hours  */}
              <div className=" flex md:flex-row flex-col gap-[2rem] items-center">
                <div className="md:px-[2rem] px-[1rem] md:py-[1rem] py-[0.5rem] flex items-center gap-[0.5rem] basis-1/2 grow-0 border-1 border-[var(--card-border)] rounded-[8px]">
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
                    type="time"
                    name="from"
                    id="from"
                    value={newUser.from}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        from: e.target.value,
                      })
                    }
                    required
                    disabled={isLoading}
                    className="text-[var(--text-color)]"
                  />
                </div>
                <div className="md:px-[2rem] px-[1rem] md:py-[1rem] py-[0.5rem] flex items-center gap-[0.5rem] basis-1/2 grow-0 border-1 border-[var(--card-border)] rounded-[8px]">
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
                    type="time"
                    name="to"
                    id="to"
                    value={newUser.to}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        to: e.target.value,
                      })
                    }
                    required
                    disabled={isLoading}
                    className="text-[var(--text-color)]"
                  />
                </div>
              </div>
              {/* register button  */}
              <button
                type="submit"
                className="rounded-[8px] p-[2rem] bg-[var(--dark-blue)] text-white font-medium disabled:bg-gray-400 disabled:cursor-not-allowed shadow-[0px_3px_8px_#2d2d2de3] duration-200 hover:bg-[#0a3460]"
                disabled={
                  // newUser.full_name.length < 4 ||
                  // newUser.email.length < 10 ||
                  // newUser.phone.length < 10 ||
                  // newUser.password.length < 6 ||
                  // newUser.specialization === "" ||
                  // newUser.gender === "" ||
                  // newUser.from === "" ||
                  // newUser.to === "" ||
                  // newUser.consultation_fee === null ||
                  // newUser.doctor_image_id=== null||
                  // newUser.certificate_file_id === null ||
                  isLoading
                }
              >
                Register
              </button>
            </form>
          </div>
        }
        </div>
      </div>
      <LogoImage />
    </div>
  );
};

export default DoctorRegister;
