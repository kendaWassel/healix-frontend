import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
const DeliveryHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const activeStyle = "text-[var(--cyan)] font-semibold";
  const normalStyle = "text-[var(--text-color)] hover:text-[var(--cyan)] font-medium duration-300";


  return (
    <nav className="md:px-[3rem] px-[2rem] md:py-[1.5rem] py-[1rem] flex items-center justify-between border-b-[1px] border-[var(--card-border)] relative">
      {/* Logo */}
      <NavLink to="/" className="logo w-[125px]">
        <img src="../Logo-dark.png" alt="logo" />
      </NavLink>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-[3rem]">
        <NavLink
          to="/delivery"
          end
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          Home
        </NavLink>
        <NavLink
          to="/delivery/new-orders"
          end
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          New Orders
        </NavLink>
        <NavLink
          to="/delivery/past-orders"
          end
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          Past Orders
        </NavLink>

        <NavLink
          to="/delivery/my-tasks"
          end
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          Current orders
        </NavLink>
        <div className="flex items-center gap-1">
        <svg width="45" height="44" viewBox="0 0 45 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_1_20492)">
<path d="M4.66699 10C4.66699 7.79375 6.46074 6 8.66699 6H26.667C28.8732 6 30.667 7.79375 30.667 10V12H33.8357C34.8982 12 35.917 12.4187 36.667 13.1687L39.4982 16C40.2482 16.75 40.667 17.7687 40.667 18.8312V28C40.667 30.2062 38.8732 32 36.667 32H36.4607C35.8107 34.3062 33.6857 36 31.167 36C28.6482 36 26.5295 34.3062 25.8732 32H19.4607C18.8107 34.3062 16.6857 36 14.167 36C11.6482 36 9.52949 34.3062 8.87324 32H8.66699C6.46074 32 4.66699 30.2062 4.66699 28V10ZM36.667 22V18.8312L33.8357 16H30.667V22H36.667ZM16.667 30.5C16.667 29.1187 15.5482 28 14.167 28C12.7857 28 11.667 29.1187 11.667 30.5C11.667 31.8813 12.7857 33 14.167 33C15.5482 33 16.667 31.8813 16.667 30.5ZM31.167 33C32.5482 33 33.667 31.8813 33.667 30.5C33.667 29.1187 32.5482 28 31.167 28C29.7857 28 28.667 29.1187 28.667 30.5C28.667 31.8813 29.7857 33 31.167 33Z" fill="#39CCCC"/>
</g>
<defs>
<filter id="filter0_d_1_20492" x="-1.33301" y="0" width="48" height="48" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_20492"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_20492" result="shape"/>
</filter>
</defs>
</svg>
        <h1 className="font-medium text-[var(--dark-blue)] ">Delivery</h1>
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
            to="/delivery"
            end
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          Home
          </NavLink>
          <NavLink
            onClick={() => setIsMenuOpen(false)}
            to="/delivery/new-orders"
            end
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          New Orders
          </NavLink>
          <NavLink
            onClick={() => setIsMenuOpen(false)}
            to="/delivery/past-orders"
            end
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
            Past Orders
          </NavLink>
          <NavLink
            onClick={() => setIsMenuOpen(false)}
            to="/delivery/current-orders"
            end
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          Current orders
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default DeliveryHeader;
