import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contextAPi/AuthContext.jsx";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { auth, setAuth, user,setToken,setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setAuth(null);
    setToken(null);
    setUser(null);
    navigate("/");
  };

  return (
    <>
      {/* Fixed Navbar */}
      <nav className="w-full py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            <NavLink to="/">
              <Button variant="ghost">Home</Button>
            </NavLink>

            <NavLink to="/about">
              <Button variant="ghost">About</Button>
            </NavLink>

            <NavLink to="/contact">
              <Button variant="ghost">Contact</Button>
            </NavLink>
            <NavLink to="/guide-list">
              <Button variant="ghost">Guide lilst</Button>
            </NavLink>
            {user?.role === "admin" && (
              <NavLink to="/protected/approval-for-guide">
                <Button variant="ghost">Admin</Button>
              </NavLink>
            )}

            {/* Show User Name (Desktop) */}
            {auth?.name && (
              <NavLink to="/user-details">
                <Button variant="ghost" className="flex items-center gap-2">
                  <User size={18} />
                  {auth?.name}
                </Button>
              </NavLink>
            )}

            {/* Auth Buttons */}
            {auth?.name ? (
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

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full shadow-lg bg-slate-50 transition-all duration-300 opacity-100 visible">
            <div className="flex flex-col space-y-2 py-4 px-6">
              <NavLink
                to="/"
                className="text-white hover:text-orange-400 transition"
              >
                <Button variant="ghost" className="w-full">
                  Home
                </Button>
              </NavLink>

              <NavLink
                to="/about"
                className="text-white hover:text-orange-400 transition"
              >
                <Button variant="ghost" className="w-full">
                  About
                </Button>
              </NavLink>

              <NavLink
                to="/contact"
                className="text-black hover:text-orange-400 transition"
              >
                <Button variant="ghost" className="w-full">
                  Contact
                </Button>
              </NavLink>

              {/* Show User Name (Mobile) */}
              {auth?.name && (
                <NavLink to="/user-details" className="w-full">
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 w-full justify-starttext-black"
                  >
                    <User size={18} />
                    {auth?.name}
                  </Button>
                </NavLink>
              )}

              {auth?.name ? (
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="text-black hover:bg-red-500 hover:text-white w-full"
                >
                  Logout
                </Button>
              ) : (
                <Link to="/login">
                  <Button
                    // variant="outline"
                    className="w-full text-white border-gray-400"
                  >
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Add Space Below Navbar */}
      <div className="pt-20"></div>
    </>
  );
}

export default Navbar;
