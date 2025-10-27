import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
const LandingHeader = () => {
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
      <div className="hidden md:flex items-center gap-[1rem]">
        <Link 
          to='/login' 
          className="text-white bg-[var(--dark-blue)] border-[2px] border-[var(--dark-blue)] hover:border-[var(--card-border)] hover:bg-[var(--card-border)] hover:text-[var(--dark-blue)] duration-400 rounded-[25px] px-[0.8rem] py-[0.5rem] font-medium"
        >
          Sign in
        </Link>
        <Link 
          to='/register' 
          className="text-[var(--dark-blue)] border-[2px] border-[var(--dark-blue)] hover:border-[var(--card-border)] hover:bg-[var(--card-border)] duration-400 rounded-[25px] px-[0.8rem] py-[0.5rem] font-medium"
        >
          Sign up
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
            to='/login'
            onClick={() => setIsMenuOpen(false)}
            className="text-white bg-[var(--dark-blue)] border-[2px] border-[var(--dark-blue)] hover:border-[var(--card-border)] hover:bg-[var(--card-border)] hover:text-[var(--dark-blue)] duration-400 rounded-[25px] px-[0.8rem] py-[0.5rem] font-medium text-center"
          >
            Sign in
          </Link>
          <Link
            to='/register'
            onClick={() => setIsMenuOpen(false)}
            className="text-[var(--dark-blue)] border-[2px] border-[var(--dark-blue)] hover:border-[var(--card-border)] hover:bg-[var(--card-border)] duration-400 rounded-[25px] px-[0.8rem] py-[0.5rem] font-medium text-center"
          >
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default LandingHeader;
