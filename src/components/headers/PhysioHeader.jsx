import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
const PhysioHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const activeStyle = "text-[var(--cyan)] font-semibold";
  const normalStyle = "text-[var(--text-color)] hover:text-[var(--cyan)] font-medium duration-300";


  return (
    <nav className="md:px-[3rem] px-[2rem] md:py-[1.5rem] py-[1rem] flex items-center justify-between border-b-[1px] border-[var(--card-border)] relative">
      {/* Logo */}
      <NavLink to="/physio" className="logo w-[125px]">
        <img src="../Logo-dark.png" alt="logo" />
      </NavLink>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-[3rem]">
        <NavLink
          to="/physio"
          end
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          Home
        </NavLink>

        <NavLink
          to="/physio/new-orders"
          end
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          New Orders
        </NavLink>
        <NavLink
          to="/physio/my-schedules"
          end
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
            My Schedules 
        </NavLink>
        <div className="flex items-center gap-1">
        <svg width="40" height="44" viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_1_20486)">
<path d="M12.5 6.5C12.5 4.56875 14.0688 3 16 3C17.9312 3 19.5 4.56875 19.5 6.5C19.5 8.43125 17.9312 10 16 10C14.0688 10 12.5 8.43125 12.5 6.5ZM11.3687 16.35L12.1562 20.2875C9.74375 21.0625 8 23.3312 8 26C8 29.3125 10.6875 32 14 32C16.225 32 18.1687 30.7875 19.2062 28.9875C19.35 28.9937 19.4937 29 19.6437 29H19.9C19.9625 29 20.0312 29 20.0938 29H23.5438C22.2688 33.0562 18.4812 36 14 36C8.475 36 4 31.525 4 26C4 21.3875 7.125 17.5063 11.3687 16.35ZM20.6562 14.5938L22.1375 22H25.9188C28 22 29.8687 23.2937 30.6 25.2437L32.1937 29.4937L33.3625 29.1063C34.4125 28.7563 35.5437 29.325 35.8937 30.3687C36.2437 31.4125 35.675 32.55 34.6312 32.9L31.6313 33.9C30.6125 34.2375 29.5063 33.7125 29.125 32.7062L26.8563 26.65C26.7125 26.2625 26.3375 26 25.9188 26H20.5375C20.5125 26 20.4875 26 20.4562 26H19.6375C17.7313 26 16.0875 24.6562 15.7125 22.7875L14.3313 15.8562C13.9313 13.8625 15.4562 12 17.4937 12C19.0312 12 20.3563 13.0875 20.6562 14.5938Z" fill="#39CCCC"/>
</g>
<defs>
<filter id="filter0_d_1_20486" x="-4" y="0" width="48" height="48" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_20486"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_20486" result="shape"/>
</filter>
</defs>
</svg>
        <h1 className="font-medium text-[var(--dark-blue)]">Physiotherapist</h1>
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
            to="/physio"
            end
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          Home
          </NavLink>
          <NavLink
            onClick={() => setIsMenuOpen(false)}
            to="/physio/new-orders"
            end
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          New Orders
          </NavLink>
          <NavLink
            onClick={() => setIsMenuOpen(false)}
            to="/physio/my-schedules"
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

export default PhysioHeader;
