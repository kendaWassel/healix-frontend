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
        <img src="./Logo-dark.png" alt="logo" />
      </NavLink>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-[3rem]">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          Home
        </NavLink>
        <NavLink
          to="/new-orders"
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          New Orders
        </NavLink>
        <NavLink
          to="/past-orders"
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          Past Orders
        </NavLink>

        <NavLink
          to="/current-orders"
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          Current orders
        </NavLink>
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
            to='/' 
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          Home
          </NavLink>
          <NavLink
            onClick={() => setIsMenuOpen(false)}
            to='/' 
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
          New Orders
          </NavLink>
          <NavLink
            onClick={() => setIsMenuOpen(false)}
            to='/' 
          className={({ isActive }) => (isActive ? activeStyle : normalStyle)}
        >
            Past Orders
          </NavLink>
          <NavLink
            onClick={() => setIsMenuOpen(false)}
            to='/' 
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
