import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
const NurseHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const activeStyle = "text-[var(--cyan)] font-semibold";
  const normalStyle = "text-[var(--text-color)] hover:text-[var(--cyan)] font-medium duration-300";


  return (
    <nav className="md:px-[3rem] px-[2rem] md:py-[1.5rem] py-[1rem] flex items-center justify-between border-b-[1px] border-[var(--card-border)] relative">
      {/* Logo */}
      <NavLink to="/nurse" className="logo w-[125px]">
        <img src="../Logo-dark.png" alt="logo" />
      </NavLink>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-[3rem]">
        <NavLink
          to="/nurse"
          end
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          Home
        </NavLink>

        <NavLink
          to="/nurse/new-orders"
          end
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          New Orders
        </NavLink>
        <NavLink 
          to="/nurse/my-schedules"
          end
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
            My Schedules
        </NavLink>
        <div className="flex items-center gap-1">
        <svg width="41" height="44" viewBox="0 0 41 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_1_20480)">
<path d="M12.3334 6.80615C12.3334 6.0124 12.8021 5.29365 13.5334 4.9749L19.5334 2.3499C20.0459 2.1249 20.6271 2.1249 21.1396 2.3499L27.1396 4.9749C27.8646 5.29365 28.3334 6.0124 28.3334 6.80615V12.9999C28.3334 17.4187 24.7521 20.9999 20.3334 20.9999C15.9146 20.9999 12.3334 17.4187 12.3334 12.9999V6.80615ZM25.3334 11.9999H18.3584H18.3334H15.3334V12.9999C15.3334 15.7624 17.5709 17.9999 20.3334 17.9999C23.0959 17.9999 25.3334 15.7624 25.3334 12.9999V11.9999ZM19.3334 4.9999V5.9999H18.3334C18.0584 5.9999 17.8334 6.2249 17.8334 6.4999V7.4999C17.8334 7.7749 18.0584 7.9999 18.3334 7.9999H19.3334V8.9999C19.3334 9.2749 19.5584 9.4999 19.8334 9.4999H20.8334C21.1084 9.4999 21.3334 9.2749 21.3334 8.9999V7.9999H22.3334C22.6084 7.9999 22.8334 7.7749 22.8334 7.4999V6.4999C22.8334 6.2249 22.6084 5.9999 22.3334 5.9999H21.3334V4.9999C21.3334 4.7249 21.1084 4.4999 20.8334 4.4999H19.8334C19.5584 4.4999 19.3334 4.7249 19.3334 4.9999ZM15.2459 24.1874C14.8396 23.8812 14.2959 23.7999 13.8334 24.0124C9.9959 25.7749 7.32715 29.6499 7.32715 34.1437C7.32715 35.1687 8.1584 35.9999 9.1834 35.9999H31.4709C32.4959 35.9999 33.3272 35.1687 33.3272 34.1437C33.3272 29.6437 30.6584 25.7687 26.8209 24.0124C26.3584 23.7999 25.8146 23.8812 25.4084 24.1874L21.2209 27.3249C20.6896 27.7249 19.9521 27.7249 19.4209 27.3249L15.2334 24.1874H15.2459Z" fill="#39CCCC"/>
</g>
<defs>
<filter id="filter0_d_1_20480" x="-3.6665" y="0" width="48" height="48" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_20480"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_20480" result="shape"/>
</filter>
</defs>
</svg>
        <h1 className="font-medium text-[var(--dark-blue)]">Nurse</h1>
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
            to="/nurse"
            end
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          Home
          </NavLink>
          <NavLink
            onClick={() => setIsMenuOpen(false)}
            to="/nurse/new-orders"
            end
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          New Orders
          </NavLink>
          <NavLink
            onClick={() => setIsMenuOpen(false)}
            to="/nurse/my-schedules"
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

export default NurseHeader;
