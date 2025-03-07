import * as React from "react"
import { useContext, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Menu, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import { AuthContext } from "@/contextAPi/AuthContext";
import Translate from "@/components/Translate";

const Navbar = () => {
  const { auth, user, setAuth, setUser, setToken, token } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [position, setPosition] = useState("ENG")
  
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    setAuth(null);
    setToken(null);
    setUser(null);
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  // console.log("auth", auth.role)
  return (
    <nav className="sticky top-0 z-50 h-20 w-full bg-white/80 backdrop-blur-md border-b shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 h-full flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/">
        <div className="text-2xl font-bold">
        <img
              src="/IG.png"
              alt="Logo"
              className="rounded-2xl h-20"
            />
        </div>
        </NavLink>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-x-8">
          {/* <div className="group">
            <NavLink
              to="/"
              className="text-gray-600 py-2 px-4 group-hover:text-blue-600 transition-colors"
            >
              <Button variant="ghost">Home</Button>
            </NavLink>
          </div> */}
          <div className="group">
            <NavLink
              to="/about"
              className="text-gray-600 py-2 px-4 group-hover:text-blue-600 transition-colors"
            >
              <Button variant="ghost" className="text-lg font-bold">About</Button>
            </NavLink>
          </div>
          <div className="group">
            <NavLink
              to="/contact"
              className="text-gray-600 py-2 px-4 group-hover:text-blue-600 transition-colors"
            >
              <Button variant="ghost" className="text-lg font-bold">Contact</Button>
            </NavLink>
          </div>
          <div className="group">
            <NavLink
              to="/guides"
              className="text-gray-600 py-2 px-4 group-hover:text-blue-600 transition-colors"
            >
              <Button variant="ghost" className="text-lg font-bold">Guides</Button>
            </NavLink>
          </div>
          <div className="group">
            <NavLink
              to="/top-destinations"
              className="text-gray-600 py-2 px-4 group-hover:text-blue-600 transition-colors"
            >
              <Button variant="ghost" className="text-lg font-bold"> Top Destinations</Button>
            </NavLink>
          </div>

          {/* dropdown menu */}
          <div className="group">
          <Translate/>
            </div>

          {auth?.role === "admin" && (
            <div className="group">
              <NavLink
                to="/protected/Admin"
                className="text-gray-600 py-2 px-4 group-hover:text-blue-600 transition-colors"
              >
                <Button variant="ghost" className="text-lg font-bold">Admin</Button>
              </NavLink>
            </div>
          )}
          {auth && (
            <div className="group">
              <NavLink
                to="/user-details"
                className="text-gray-600 py-2 px-4 group-hover:text-blue-600 transition-colors"
              >
                <Button variant="ghost" className="flex items-center gap-2">
                  <User size={18} />
                  <p className="text-lg font-bold">{auth.name}</p>
                </Button>
              </NavLink>
            </div>
          )}

          {auth ? (
            <div className="group">
              {" "}
              <Button
                variant="outline"
                onClick={handleLogout}
                className="text-black hover:bg-red-500 hover:text-white w-full text-lg font-bold"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="group">
              <Link to="/login">
                <Button className="w-full text-white border-gray-400 text-lg font-bold">
                  Login
                </Button>
              </Link>
            </div>
          )}
          {/* <div className="flex gap-x-3"> */}
          {/* Show User Name (Mobile)
          {auth?.name && (
            <NavLink to="/user-details" className="w-full">
              <Button
                variant="ghost"
                className="flex items-center gap-2 w-full justify-start text-black"
              >
                <User size={18} />
                {auth?.name}
              </Button>
            </NavLink>
          )} */}

          {/* </div> */}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-x-0 bg-white border-b shadow-lg transition-all duration-300 ease-in-out ${isMenuOpen ? "top-20 opacity-100" : "-top-96 opacity-0"
          }`}
      >
        <div className="px-4 py-6 space-y-6">
          <div className="group">
            <NavLink
              to="/"
              className="text-gray-600 py-2 px-4 group-hover:text-blue-600 transition-colors text-lg"
              onClick={closeMenu}
            >
              <Button variant="ghost">Home</Button>
            </NavLink>
          </div>
          <div className="group">
            <NavLink
              to="/about"
              className="text-gray-600 py-2 px-4 group-hover:text-blue-600 transition-colors text-lg"
              onClick={closeMenu}
            >
              <Button variant="ghost">About</Button>
            </NavLink>
          </div>
          <div className="group">
            <NavLink
              to="/contact"
              className="text-gray-600 py-2 px-4 group-hover:text-blue-600 transition-colors text-lg"
              onClick={closeMenu}
            >
              <Button variant="ghost">Contact</Button>
            </NavLink>
          </div>
          <div className="group">
            <NavLink
              to="/guide-list"
              className="text-gray-600 py-2 px-4 group-hover:text-blue-600 transition-colors text-lg"
              onClick={closeMenu}
            >
              <Button variant="ghost">Guide List</Button>
            </NavLink>
          </div>
          {auth?.role === "admin" && (
            <div className="group">
              <NavLink
                to="/protected/approval-for-guide"
                className="text-gray-600 py-2 px-4 group-hover:text-blue-600 transition-colors text-lg"
                onClick={closeMenu}
              >
                <Button variant="ghost">Approval Confirm Guide</Button>
              </NavLink>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 pt-4 border-t">
          {/* Auth Buttons */}
          {token ? (
            <Button
              variant="outline"
              onClick={handleLogout}
              className="border border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
            >
              Logout
            </Button>
          ) : (
            <NavLink to="/login">
              <Button className="bg-blue-600 hover:bg-blue-700">Login</Button>
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
