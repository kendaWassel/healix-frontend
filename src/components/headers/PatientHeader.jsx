import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
const PatientHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="md:px-[3rem] px-[2rem] md:py-[1.5rem] py-[1rem] flex items-center justify-between border-b-[1px] border-[var(--card-border)] relative">
      {/* Logo */}
      <Link to='/' className="logo w-[125px]">
        <img src="./Logo-dark.png" alt="logo" />
      </Link> 
      {/* desktop nav */}
      <div className="hidden md:flex items-center gap-[3rem]">
        <Link 
          to='/consultation' 
          className="text-white bg-[var(--dark-blue)] border-[2px] border-[var(--dark-blue)] hover:border-[var(--card-border)] hover:bg-[var(--card-border)] hover:text-[var(--dark-blue)] duration-400 rounded-[10px] px-[0.8rem] py-[0.5rem] font-medium"
        >
          Doctor Consultation
        </Link>
        <Link 
          to='/' 
          className="text-[var(--text-color)] hover:text-[var(--cyan)] duration-400 font-medium"
        >
          Home
        </Link>
        <Link 
          to='/' 
          className="text-[var(--text-color)] hover:text-[var(--cyan)] duration-400 font-medium"
        >
            My Schedules 
        </Link>
        <Link 
          to='/' 
          className="text-[var(--text-color)] hover:text-[var(--cyan)] duration-400 font-medium"
        >
          My receipts
        </Link>
      </div>

      {/* mobile menu */}
      <button
        onClick={toggleMenu}
        className="md:hidden focus:outline-none"
        aria-label="Toggle menu"
      >
<FontAwesomeIcon icon={faBars} size="xl" />
      </button>
      <div
        className={`absolute top-full left-0 right-0 bg-white border-b-[1px] border-[var(--card-border)] shadow-lg md:hidden duration-300 ${
          isMenuOpen
            ? 'opacity-100 max-h-100'
            : 'opacity-0 max-h-0 overflow-hidden'
        }`}
      >
        <div className="flex flex-col p-4 gap-3">
          <Link
            onClick={() => setIsMenuOpen(false)}
            to='/consultation' 
            className="w-[fit-content] text-white bg-[var(--dark-blue)] border-[2px] border-[var(--dark-blue)] hover:border-[var(--card-border)] hover:bg-[var(--card-border)] hover:text-[var(--dark-blue)] duration-400 rounded-[10px] px-[0.8rem] py-[0.5rem] font-medium"
          >
            Doctor Consultation
          </Link>
          <Link
            onClick={() => setIsMenuOpen(false)}
            to='/' 
          className="text-[var(--text-color)] hover:text-[var(--cyan)] duration-400 font-medium"
        >
          Home
          </Link>
          <Link
            onClick={() => setIsMenuOpen(false)}
            to='/' 
          className="text-[var(--text-color)] hover:text-[var(--cyan)] duration-400 font-medium"
        >
          My Schedules 
          </Link>
          <Link
            onClick={() => setIsMenuOpen(false)}
            to='/' 
          className="text-[var(--text-color)] hover:text-[var(--cyan)] duration-400 font-medium"
        >
          My receipts
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default PatientHeader;
