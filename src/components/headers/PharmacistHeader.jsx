import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
const PharmacistHeader = () => {
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
        <img src="/Logo-dark.png" alt="logo" />
      </NavLink>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-[3rem]">
        <NavLink
          to="/pharmacist"
          end
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          Home
        </NavLink>

        <NavLink
          to="/pharmacist/my-orders"
          end
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          My Orders
        </NavLink>

        <NavLink
          to="/pharmacist/NewOrders"
          end
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          New Orders
        </NavLink>
        <NavLink
          to="/pharmacist/receipts"
          end
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          Receipts
        </NavLink>
        <div className="flex items-center gap-1">
        <svg width="43" height="45" viewBox="0 0 43 45" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_1_20474)">
<path d="M8.66699 11C8.66699 9.34375 10.0107 8 11.667 8C13.3232 8 14.667 9.34375 14.667 11V18H8.66699V11ZM4.66699 11V29C4.66699 32.8687 7.79824 36 11.667 36C15.5357 36 18.667 32.8687 18.667 29V22.3875L25.9357 32.9813C28.1545 36.2125 32.517 37 35.6857 34.7375C38.8545 32.475 39.6232 28.0188 37.4045 24.7875L29.3732 13.0813C27.1545 9.85 22.792 9.0625 19.6232 11.325C19.2732 11.575 18.9545 11.85 18.667 12.1438V11C18.667 7.13125 15.5357 4 11.667 4C7.79824 4 4.66699 7.13125 4.66699 11ZM21.2045 19.0125C20.2045 17.5563 20.5795 15.5562 21.9482 14.575C23.2732 13.6312 25.1045 13.9312 26.0732 15.3375L30.2607 21.4375L25.267 24.9312L21.2045 19.0063V19.0125Z" fill="#39CCCC"/>
</g>
<defs>
<filter id="filter0_d_1_20474" x="-3.33301" y="0" width="48" height="48" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_20474"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_20474" result="shape"/>
</filter>
</defs>
</svg>
        <h1 className="font-medium text-[var(--dark-blue)]">Pharmacist</h1>
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
            to="/pharmacist"
            end
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          Home
          </NavLink>
          <NavLink
            onClick={() => setIsMenuOpen(false)}
            to="/pharmacist/my-orders"
            end
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          My Orders
          </NavLink>
          <NavLink
            onClick={() => setIsMenuOpen(false)}
            to="/pharmacist/NewOrders"
            end
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          New Orders
          </NavLink>
          <NavLink
            onClick={() => setIsMenuOpen(false)}
            to="/pharmacist/receipts"
            end
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          Receipts
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default PharmacistHeader;
