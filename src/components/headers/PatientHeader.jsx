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
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          Home
        </NavLink>

        <NavLink
          to="/patient/my-schedules"
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          My Schedules
        </NavLink>

        <NavLink
          to="/patient/Receipts"
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          My Receipts
        </NavLink>

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
            to='/' 
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          Home
          </NavLink>
          <NavLink
            onClick={() => setIsMenuOpen(false)}
            to="/patient/my-schedules"
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          My Schedules 
          </NavLink>
          <NavLink
            onClick={() => setIsMenuOpen(false)}
            to="/patient/receipts" 
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
