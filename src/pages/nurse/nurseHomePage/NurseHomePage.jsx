import Footer from '../../../components/footer/Footer';
import NurseHeader from '../../../components/headers/NurseHeader';
import { useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import styles from '../../registers/doctorRegister/DoctorRegister.module.css'

const NurseHomePage = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [nurseData, setNurseData] = useState({
    full_name: "kenda wassel",
    email: "kendawassel14@gmail.com",
    phone: "0943779128",
    password: "123456",
    available_time: "",
    session_fee: "100",
    type: "nurse",
    gender: "female",
    license_file: null,
  });
  const [licenseFile, setLicenseFile] = useState(null);
  const [licenseFileName, setLicenseFileName] = useState("");
  const [licenseFilePreview, setLicenseFilePreview] = useState(null);
  const token = localStorage.getItem("token");

  // useEffect(() => {
  //   fetchNurseProfile();
  // }, []);

  const fetchNurseProfile = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/provider/nurse/profile",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const serverError = await response.json().catch(() => ({}));
        throw new Error(serverError.message || "Failed to fetch profile");
      }

      const data = await response.json();
      if (data.status === "success" && data.data) {
        const profile = data.data;
        setNurseData({
          full_name: profile.full_name || "",
          email: profile.email || "",
          phone: profile.phone || "",
          password: "",
          available_time: profile.available_time || "",
          session_fee: profile.session_fee || "",
          type: profile.type || "",
          license_file: null,
        });
        if (profile.license_file_url) {
          setLicenseFilePreview(profile.license_file_url);
          setLicenseFileName(profile.license_file_name || "Current License");
        }
      }
    } catch (err) {
      console.error("Failed to fetch profile:", err);
      setError(err.message || "Failed to load profile information.");
    } finally {
      setIsLoading(false);
    }
  };

  const uploadFile = async (file) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', 'certificate');

    const response = await fetch("https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/uploads", {
      method: "POST",
      headers: {
        "ngrok-skip-browser-warning": "true",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.message || "File upload failed");
    }
    const data = await response.json();
    return data.file_id;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setError(null);
    setSuccessMsg(null);

    try {
      let licenseFileId = null;
      if (licenseFile) {
        licenseFileId = await uploadFile(licenseFile);
      }

      const updateData = {
        full_name: nurseData.full_name,
        email: nurseData.email,
        phone: nurseData.phone,
        available_time: nurseData.available_time,
        session_fee: parseInt(nurseData.session_fee) || 0,
        type: nurseData.type,
      };

      if (nurseData.password) {
        updateData.password = nurseData.password;
      }

      if (licenseFileId) {
        updateData.license_file_id = licenseFileId;
      }

      const response = await fetch(
        "https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/provider/nurse/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateData),
        }
      );

      if (!response.ok) {
        const serverError = await response.json().catch(() => ({}));
        throw new Error(serverError.message || "Update failed");
      }

      const data = await response.json();
      if (data.status === "success") {
        setSuccessMsg("Profile updated successfully!");
        setNurseData({ ...nurseData, password: "" });
        if (licenseFile) {
          setLicenseFile(null);
        }
        setTimeout(() => {
          setSuccessMsg(null);
          fetchNurseProfile();
        }, 2000);
      }
    } catch (err) {
      console.error("Update error:", err);
      setError(err.message || "Failed to update profile. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <NurseHeader />
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#0a3460]">
                Account Information
              </h1>
              <p className="text-[var(--text-color)] font-medium mt-3 text-lg">View or update your information</p>
              </div>
              
              <button
                onClick={handleSubmit}
                disabled={isUpdating || isLoading}
                className="px-6 py-2 bg-[#0a3460] text-white rounded-lg font-semibold hover:bg-[#0a3460dd] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUpdating ? "Updating..." : "Update"}
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}
            {successMsg && (
              <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                {successMsg}
              </div>
            )}

            {isLoading ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Loading profile information...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
              {/* photo */}
              <div
                className={`${styles.hiddenFileInput}  flex flex-col justify-center md:w-[100px] md:h-[100px] w-[80px] h-[80px] border-1 border-[var(--card-border)] rounded-[50%] overflow-hidden`}
              >
                <label
                  htmlFor="photo"
                  className="flex flex-col items-center cursor-pointer w-full h-full justify-center"
                >
                  {/* {photoPreview ? ( */}
                    <img
                      src='./gallery-7.png'
                      alt="Care Provider photo preview"
                      className="w-full h-full object-cover rounded-[50%]"
                    />
                  {/* ) : (
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
                  )} */}
                </label>
                <input
                  type="file"
                  name="photo"
                  id="photo"
                  accept="image/*"
                  // onChange={(e) => {
                  //   const file = e.target.files[0];
                  //   if (file) {
                  //     const reader = new FileReader();
                  //     reader.onload = (e) => {
                  //       setPhotoPreview(e.target.result);
                  //     };
                  //     reader.readAsDataURL(file);
                  //   }
                  //   setPhotoFile(file);
                  // }}
                  disabled
                />
              </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="flex items-center w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#39CCCC] focus:border-transparent">
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
                    <input
                      type="text"
                      value={nurseData.full_name}
                      onChange={(e) =>
                        setNurseData({ ...nurseData, full_name: e.target.value })
                      }
                      className="ms-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled
                    />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="flex items-center w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#39CCCC] focus:border-transparent">
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
                    <input
                      type="email"
                      value={nurseData.email}
                      onChange={(e) =>
                        setNurseData({ ...nurseData, email: e.target.value })
                      }
                      className="w-full ms-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled
                    />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="flex items-center w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#39CCCC] focus:border-transparent">
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
                    <input
                      type="tel"
                      value={nurseData.phone}
                      onChange={(e) =>
                        setNurseData({ ...nurseData, phone: e.target.value })
                      }
                      className="ms-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled
                    />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="flex items-center w-full px-5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#39CCCC] focus:border-transparent">
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
                    <div className="relative ms-2 w-full">
                      <input
                        type={passwordShown ? "text" : "password"}
                        value={nurseData.password}
                        onChange={(e) =>
                          setNurseData({ ...nurseData, password: e.target.value })
                        }
                        placeholder="Leave empty to keep current password"
                        className=" pr-10 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled
                      />
                      <button
                        type="button"
                        onClick={() => setPasswordShown(!passwordShown)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        <FontAwesomeIcon icon={passwordShown ? faEyeSlash : faEye} />
                      </button>
                    </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender
                    </label>
                    <div className="flex items-center w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#39CCCC] focus:border-transparent">
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
                    <select
                    name="gender"
                    id="gender"
                    value={nurseData.gender}
                    onChange={(e) =>
                      setNurseData({
                        ...nurseData,
                        gender: e.target.value,
                      })
                    }
                    required
                    disabled
                    className="text-[var(--text-color)] disabled:cursor-not-allowed"
                  >
                    <option value="">Gender</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Session Fee
                    </label>
                    <div className="flex items-center w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#39CCCC] focus:border-transparent">
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
                    <input
                      type="number"
                      value={nurseData.session_fee}
                      onChange={(e) =>
                        setNurseData({ ...nurseData, session_fee: e.target.value })
                      }
                      className="ms-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      min="0"
                      disabled
                    />
                    <span class="text-[var(--text-color)]">$</span>
                    </div>
                  </div>

                  <div className="">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      License File
                    </label>
                    <div className="flex items-center gap-4">
                      <label className="flex-1 flex justify-center items-center px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 text-center">
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
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              setLicenseFile(file);
                              setLicenseFileName(file.name);
                              setLicenseFilePreview(null);
                            }
                          }}
                          disabled
                          className="hidden disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                        <span className="text-sm text-gray-600 ms-2">
                          {licenseFileName || "View File"}
                        </span>
                      </label>
                      {licenseFilePreview && !licenseFile && (
                        <a
                          href={licenseFilePreview}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[#39CCCC] hover:underline"
                        >
                          View Current
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
      <Footer />
    </>
  );
};

export default NurseHomePage;
