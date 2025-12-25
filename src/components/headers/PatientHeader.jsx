import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const PatientHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const activeStyle = "text-[var(--cyan)] font-semibold";
  const normalStyle = "text-[var(--text-color)] hover:text-[var(--cyan)] font-medium duration-300";


  return (
    <nav className="md:px-[3rem] px-[2rem] md:py-[1.5rem] py-[1rem] flex items-center justify-between border-b-[1px] border-[var(--card-border)] relative">
      {/* Logo */}
      <NavLink to="/patient" className="logo w-[125px]">
        <img src="../Logo-dark.png" alt="logo" />
      </NavLink>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-[3rem]">
        <NavLink
          to="/patient/consultation"
          className={({ isActive }) =>
            isActive
              ? `${activeStyle} bg-[var(--dark-blue)] border-[2px] border-[var(--dark-blue)] rounded-[10px] px-[0.8rem] py-[0.5rem]`
              : `text-white bg-[var(--dark-blue)] border-[2px] border-[var(--dark-blue)] hover:border-[var(--card-border)] hover:bg-[var(--card-border)] hover:text-[var(--dark-blue)] duration-400 rounded-[10px] px-[0.8rem] py-[0.5rem] font-medium`
          }
        >
          Doctor Consultation
        </NavLink>

        <NavLink
          to="/patient"
          end
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          Home
        </NavLink>

        <NavLink
          to="/patient/my-schedules"
          end
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          My Schedules
        </NavLink>

        <NavLink
          to="/patient/Receipts"
          end
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          My Receipts
        </NavLink>
        <div className="flex items-center gap-1">
        <svg
          width="37"
          height="34"
          viewBox="0 0 37 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M36.6665 4C36.6665 1.79375 34.8728 0 32.6665 0L16.6665 0C14.4603 0 12.6665 1.79375 12.6665 4V11.5813C15.5978 12.7688 17.6665 15.6437 17.6665 19C17.6665 20.7313 17.1165 22.3375 16.179 23.65C19.3978 24.9625 21.6665 28.125 21.6665 31.8187C21.6665 31.8812 21.6665 31.9375 21.6665 32H32.6665C34.8728 32 36.6665 30.2062 36.6665 28V4ZM27.6665 25V29H24.329C23.879 27.1625 22.9978 25.4938 21.804 24.1063C22.1853 22.8875 23.3228 22 24.6665 22C26.3228 22 27.6665 23.3438 27.6665 25ZM25.1665 5.5C25.7165 5.5 26.1665 5.95 26.1665 6.5V8.5H28.1665C28.7165 8.5 29.1665 8.95 29.1665 9.5V10.5C29.1665 11.05 28.7165 11.5 28.1665 11.5H26.1665V13.5C26.1665 14.05 25.7165 14.5 25.1665 14.5H24.1665C23.6165 14.5 23.1665 14.05 23.1665 13.5V11.5H21.1665C20.6165 11.5 20.1665 11.05 20.1665 10.5V9.5C20.1665 8.95 20.6165 8.5 21.1665 8.5H23.1665V6.5C23.1665 5.95 23.6165 5.5 24.1665 5.5H25.1665ZM14.6665 19C14.6665 16.2375 12.429 14 9.6665 14C6.904 14 4.6665 16.2375 4.6665 19C4.6665 21.7625 6.904 24 9.6665 24C12.429 24 14.6665 21.7625 14.6665 19ZM18.6665 32C18.6665 28.6875 15.979 26 12.6665 26H6.6665C3.354 26 0.666504 28.6875 0.666504 32C0.666504 33.1063 1.56025 34 2.6665 34H16.6665C17.7728 34 18.6665 33.1063 18.6665 32Z"
            fill="#39CCCC"
          />
        </svg>
        <h1 className="font-medium text-[var(--dark-blue)]">Paient</h1>
        </div>

      </div>

      {/* Mobile nav - Notifications */}
      <div className="md:hidden flex items-center gap-4">
        <button
          onClick={toggleMenu}
          className="focus:outline-none"
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon icon={faBars} size="xl" />
        </button>
      </div>
      <div
        className={`absolute top-full left-0 right-0 bg-white border-b-[1px] border-[var(--card-border)] shadow-lg md:hidden duration-300 ${
          isMenuOpen
            ? 'opacity-100 max-h-100'
            : 'opacity-0 max-h-0 overflow-hidden'
        }`}
      >
        <div className="flex flex-col p-4 gap-3">
          <NavLink
            onClick={() => setIsMenuOpen(false)}
            to="/patient/consultation" 
            className={({ isActive }) =>
            isActive
              ? `${activeStyle} bg-[var(--dark-blue)] border-[2px] border-[var(--dark-blue)] rounded-[10px] px-[0.8rem] py-[0.5rem]`
              : `text-white bg-[var(--dark-blue)] border-[2px] border-[var(--dark-blue)] hover:border-[var(--card-border)] hover:bg-[var(--card-border)] hover:text-[var(--dark-blue)] duration-400 rounded-[10px] px-[0.8rem] py-[0.5rem] font-medium`
          }
          >
            Doctor Consultation
          </NavLink>
          <NavLink
            onClick={() => setIsMenuOpen(false)}
            to="/patient"
            end
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          Home
          </NavLink>
          <NavLink
            onClick={() => setIsMenuOpen(false)}
            to="/patient/my-schedules"
            end
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          My Schedules 
          </NavLink>
          <NavLink
            onClick={() => setIsMenuOpen(false)}
            to="/patient/receipts"
            end
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          My receipts
          </NavLink>
          
        </div>
      </div>
    </nav>
  );
};

export default PatientHeader;
