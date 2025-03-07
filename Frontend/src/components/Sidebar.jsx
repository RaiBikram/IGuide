import React from "react";
import { NavLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi"; // Import logout icon from react-icons
import toast from "react-hot-toast";
import { FaUserClock, FaUsers } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { MdVerified } from "react-icons/md";

// Logout function
export const Logout = () => {
  if (window.confirm("Do you really want to logout?")) {
    localStorage.removeItem("isLoggedIn");
    toast.success("Logged out!");
    window.location.href = "/login"; // Redirect to login page after logout
  }
};

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold tracking-wide text-center mb-6">
          iGuid
        </h1>
      </div>
      <nav>
        <ul className="space-y-4 px-4">
          {/* Guide Verification Request */}
          <li className="flex  items-center ">
            <FaUserClock className="h-6 w-auto" />
            <NavLink
              to="/guide-verification-request"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-700 text-green-400 font-semibold block py-2 px-3 rounded"
                  : "hover:bg-gray-700 block py-2 px-3 rounded"
              }
            >
              Guide Verification Request
            </NavLink>
          </li>

          {/* Verified Guides */}
          <li className="flex  items-center ">
            <MdVerified className="h-6 w-auto" />
            <NavLink
              to="/verified-guides"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-700 text-green-400 font-semibold block py-2 px-3 rounded"
                  : "hover:bg-gray-700 block py-2 px-3 rounded"
              }
            >
              Verified Guides
            </NavLink>
          </li>

          {/* Users */}
          <li className="flex  items-center ">
            <FaUsers className="h-6 w-auto" />
            <NavLink
              to="/users"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-700 text-green-400 font-semibold block py-2 px-3 rounded"
                  : "hover:bg-gray-700 block py-2 px-3 rounded"
              }
            >
              Users
            </NavLink>
          </li>

          {/* Assigned Admins */}
          <li className="flex  items-center ">
            <RiAdminFill className="h-6 w-auto" />
            <NavLink
              to="/admins"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-700 text-green-400 font-semibold block py-2 px-3 rounded"
                  : "hover:bg-gray-700 block py-2 px-3 rounded"
              }
            >
              Assigned Admins
            </NavLink>
          </li>

          {/* Logout Button (At the bottom) */}
          <li>
            <button
              onClick={Logout} // Call Logout function on click
              className="flex items-center justify-start hover:bg-gray-700  py-2 px-3 rounded text-white w-full mt-6"
            >
              <FiLogOut className="h-6 w-auto mr-5" /> {/* Log Out Icon */}
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
