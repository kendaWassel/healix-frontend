import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
const DoctorHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const activeStyle = "text-[var(--cyan)] font-semibold";
  const normalStyle = "text-[var(--text-color)] hover:text-[var(--cyan)] font-medium duration-300";


  return (
    <nav className="md:px-[3rem] px-[2rem] md:py-[1.5rem] py-[1rem] flex items-center justify-between border-b-[1px] border-[var(--card-border)] relative">
      {/* Logo */}
      <NavLink to="/doctor" className="logo w-[125px]">
        <img src="/Logo-dark.png" alt="logo" />
      </NavLink>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-[3rem]">
        <NavLink
          to="/doctor"
          end
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          Home
        </NavLink>

        <NavLink
          to="/doctor/doctor-schedules"
          end
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          My Schedules
        </NavLink>
        <div className="flex items-center gap-1">
        <svg width="40" height="44" viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_1_20468)">
<path d="M20 4.5C15.8562 4.5 12.5 7.85625 12.5 12C12.5 16.1438 15.8562 19.5 20 19.5C24.1437 19.5 27.5 16.1438 27.5 12C27.5 7.85625 24.1437 4.5 20 4.5ZM23.75 24.05C23.4125 24.0187 23.0625 24 22.7125 24H17.2812C16.9312 24 16.5875 24.0187 16.2437 24.05V28.2687C17.275 28.7437 17.9937 29.7875 17.9937 30.9937C17.9937 32.65 16.65 33.9938 14.9937 33.9938C13.3375 33.9938 11.9937 32.65 11.9937 30.9937C11.9937 29.7812 12.7125 28.7375 13.7437 28.2687V24.6187C9.8125 26.0625 7 29.85 7 34.2875C7 35.2312 7.76875 36 8.7125 36H31.2812C32.225 36 32.9938 35.2312 32.9938 34.2875C32.9938 29.85 30.1812 26.0688 26.2437 24.625V26.9625C27.7 27.475 28.7437 28.8687 28.7437 30.5V32.5C28.7437 33.1875 28.1812 33.75 27.4937 33.75C26.8062 33.75 26.2437 33.1875 26.2437 32.5V30.5C26.2437 29.8125 25.6812 29.25 24.9937 29.25C24.3062 29.25 23.7437 29.8125 23.7437 30.5V32.5C23.7437 33.1875 23.1812 33.75 22.4937 33.75C21.8062 33.75 21.2437 33.1875 21.2437 32.5V30.5C21.2437 28.8687 22.2875 27.4812 23.7437 26.9625V24.05H23.75Z" fill="#39CCCC"/>
</g>
<defs>
<filter id="filter0_d_1_20468" x="-4" y="0" width="48" height="48" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_20468"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_20468" result="shape"/>
</filter>
</defs>
</svg>
        <h1 className="font-medium text-[var(--dark-blue)]">Doctor</h1>
        </div>
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
          <NavLink
            onClick={() => setIsMenuOpen(false)}
            to="/doctor"
            end
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          Home
          </NavLink>
          <NavLink
            onClick={() => setIsMenuOpen(false)}
            to="/doctor/doctor-schedules"
            end
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          My Schedules 
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default DoctorHeader;
