import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEnvelope, faLock,faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import LogoImage from "../../../components/logoImage/LogoImage";
import { Link } from "react-router-dom";
 import styles from "../adminLogin/AdminLogin.module.css";
 const UserLogin = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [successMsg, setSuccessMsg] = useState();
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
  });
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setIsLoading(true);

    const user = {
      email: newUser.email,
      password: newUser.password,
    };

    console.log("user's data: ", user);

    fetch(`https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/auth/login`, {
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
            throw new Error(serverError.message || "Login failed");
          });
        }
        console.log("success sending user's data ");
        return response.json();
      })
      .then((data) => {
        console.log("message from api: ", data.message);
        setSuccessMsg("Logged in successeully!!");
        setNewUser({
          email: "",
          password: "",
        });
      })
      .catch((error) => {
        setError(error.message || "Failed to login. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
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
    <div className="relative flex min-h-screen items-center">
      <div className={`contentCol h-[100%]`}>
        <div className="flex items-start md:py-[2rem] py-[1rem] md:ps-[2rem] ps-[1rem]">
          {/* form  */}
          <div className="flex-grow-1 flex flex-col items-center">
            <div className={`${styles.formHeading} text-center `}>
              <h1 className="md:text-[25px] sm:text-[20px] text-[18px] text-[var(--dark-blue)] font-bold">
                Log <span className="text-[var(--cyan)]">in</span>
              </h1>
              <p className="font-medium sm:text-[18px] text-[var(--text-color)] my-[1rem]">
                Enter your credential to login
              </p>
            </div>
            {error ? <div className="alert alert-danger">{error}</div> : ""}
            {successMsg ? (
              <div className="alert alert-success">{successMsg}</div>
            ) : (
              ""
            )}
            <form
              className={`${styles.form} flex flex-col gap-[1.5rem] w-[80%]`}
              onSubmit={handleSubmit}
            >
              {/* email  */}
              <div className="md:px-[2rem] px-[1rem] md:py-[1rem] py-[0.5rem] flex items-center gap-[0.5rem] basis-0 grow border-1 border-[var(--card-border)] rounded-[8px]">
               
                <label htmlFor="d-email">
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
                  type="d-email"
                  name="d-email"
                  id="email"
                  placeholder="Type email"
                  value={newUser.email}
                  ref={inputRef}
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
                  <label htmlFor="d-pass">
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
                    name="d-pass"
                    id="d-pass"
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

              {/* Sign In button  */}
              <button
                type="submit"
                className="rounded-[8px] p-[2rem] bg-[var(--dark-blue)] text-white font-medium disabled:bg-gray-400 disabled:cursor-not-allowed shadow-[0px_3px_8px_#2d2d2de3] duration-200 hover:bg-[#0a3460]"
                disabled={
                  newUser.email.length < 10 ||
                  newUser.password.length < 6 ||
                  isLoading
                }
              >
                Sign in
              </button>
            </form>
              <p className="font-medium sm:text-[18px] text-[var(--text-color)] my-[1rem]">
        Don’t have an account yet? <Link to="/register" className="text-[var(--cyan)]">Register</Link>
      </p>
          </div>
        </div>
      </div>
      <LogoImage />
    </div>
  );
};

export default UserLogin;
