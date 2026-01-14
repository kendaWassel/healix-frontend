import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye,faArrowLeft,  faEnvelope,
  faLock, } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoImage from "../../../components/logoImage/LogoImage";
import styles from "./AdminLogin.module.css";
const AdminLogin = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [successMsg, setSuccessMsg] = useState();
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
  });
  const inputRef = useRef(null);
  const navigate = useNavigate()
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
        localStorage.setItem("token",data.token)
        navigate('/admin-dashboard')
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


  

  return (
    <div className="relative flex h-screen">
      <div className={`contentCol h-[100%]`}>
        <div className="flex items-start md:py-[2rem] py-[1rem] sm:px-[2rem] ps-[0.5rem] h-[100%]">
        <Link to='/'>
          <FontAwesomeIcon icon={faArrowLeft} className="sm:text-[30px] text-[20px]"/>
          </Link>
          {/* form  */}
          <div className="flex-grow-1 flex flex-col items-center self-center">
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
              className={`${styles.form} flex flex-col gap-[1.5rem] lg:w-[80%] w-[90%]`}
              onSubmit={handleSubmit}
            >
              {/* email  */}
              <div className="md:px-[2rem] px-[1rem] md:py-[1rem] py-[0.5rem] flex items-center gap-[0.5rem] basis-0 grow border-1 border-[var(--card-border)] rounded-[8px]">
                <label htmlFor="email">
                <FontAwesomeIcon icon={faEnvelope} className="sm:text-[30px] text-[20px] text-[var(--cyan)]"/>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Type email"
                  className="flex-grow-1"
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
                <div className="flex items-center gap-[0.5rem] basis-0 grow">
                  <label htmlFor="pass">
                  <FontAwesomeIcon icon={faLock} className="sm:text-[30px] text-[20px] text-[var(--cyan)]" />
                  </label>
                  <input
                    name="pass"
                    id="pass"
                    type={passwordShown ? "text" : "password"}
                    placeholder="Type Password..."
                    className="flex-grow-1"
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

              {/* login button  */}
              <button
                type="submit"
                className="rounded-[8px] sm:p-[1.5rem] p-[1rem] bg-[var(--dark-blue)] text-white font-medium disabled:bg-gray-400 disabled:cursor-not-allowed shadow-[0px_3px_8px_#2d2d2de3] duration-200 hover:bg-[#0a3460]"
                disabled={
                  // newUser.email.length < 10 ||
                  // newUser.password.length < 6 ||
                  isLoading
                }
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
      <LogoImage />
    </div>
  );
};

export default AdminLogin;
