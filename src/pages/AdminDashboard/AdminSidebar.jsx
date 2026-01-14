import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faChartPie,
  faDatabase,
  faUsers
} from "@fortawesome/free-solid-svg-icons";

export default function AdminSidebar() {
  return (
    <aside className="w-56 min-h-screen bg-[#052443] text-white flex flex-col pt-5">
      
      {/* Logo */}
       <NavLink to="/" className="logo w-[180px] ms-3">
        <img src="../Logo-light.png" alt="logo" />
      </NavLink>

      {/* Navigation */}
      <nav className="flex-1 px-5 py-4 space-y-3">
        <SidebarLink
          to="/admin-dashboard/statistics"
          icon={faChartPie}
          iconColor="text-cyan-500"
          label="Statistics"
        />
        <SidebarLink
          to="/admin-dashboard/completed-services"
          icon={faDatabase}
          iconColor="text-cyan-500"
          label="Services"
        />
        <SidebarLink
          to="/admin-dashboard/management"
          icon={faUsers}
          iconColor="text-cyan-500"
          label="Management"
        />

        
        <button className="flex items-center gap-3 px-5 py-3 rounded-lg text-sm text-red-300 hover:text-red-400 transition w-full">
          <FontAwesomeIcon icon={faSignOutAlt} />
          Sign Out
        </button>
      </nav>
    </aside>
  );
}

function SidebarLink({ to, icon, label, iconColor }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition
        ${isActive ? "bg-white text-[#052443]" : "hover:bg-[#0a355f]"}`
      }
    >
      <FontAwesomeIcon icon={icon} className={iconColor ? iconColor : "text-white"} />
      {label}
    </NavLink>
  );
}
