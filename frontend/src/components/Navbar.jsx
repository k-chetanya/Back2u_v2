import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../api/axios";
import { toast } from "sonner";
import { setUser } from "../redux/authSlice";
import {
  FaBars,
  FaTimes,
  FaSearch,
  FaMapMarkerAlt,
  FaSignOutAlt,
  FaUser,
  FaTachometerAlt,
  FaHome,
  FaPlusCircle,
  FaBinoculars,
  FaCheckCircle
} from "react-icons/fa";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dropdownRef = useRef(null);

  /* ---------------- Scroll Effect ---------------- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* -------- Close desktop dropdown on outside click -------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDesktopDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------------- Logout ---------------- */
  const logoutHandler = async () => {
  try {
    const res = await api.get("/user/logout");
    if (res.data.success) {
      dispatch(setUser(null));
      toast.success(res.data.message);
      navigate("/");
      setDesktopDropdown(false);
      setMobileMenuOpen(false);
    }
  } catch {
    toast.error("Logout failed");
  }
};

  const initials = `${user?.firstName?.[0] || ""}${user?.lastName?.[0] || ""}`;

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b border-zinc-800 transition-all duration-300 ${
        scrolled ? "bg-black/95 backdrop-blur-lg shadow-xl" : "bg-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between text-white">
        {/* ---------------- Logo ---------------- */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <div className="relative p-2 rounded-xl bg-gradient-to-br from-gray-900 to-black border border-zinc-700 group hover:border-zinc-600 transition-colors">
            <div className="relative">
              <FaSearch className="text-white text-lg group-hover:scale-105 transition-transform" />
              <FaMapMarkerAlt className="absolute -bottom-1 -right-1 text-cyan-400 text-xs" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-extrabold tracking-tight">
              <span className="text-white">Back</span>
              <span className="bg-gradient-to-r from-cyan-400 to-amber-300 bg-clip-text text-transparent">
                2U
              </span>
            </span>
            <span className="text-[10px] text-zinc-400 tracking-widest font-medium">
              LOST & FOUND
            </span>
          </div>
        </Link>

        {/* ---------------- Desktop Nav ---------------- */}
        <div className="hidden lg:flex items-center gap-6">
          {!user ? (
            <>
              <NavLink
                to="/login"
                className="px-4 py-2 rounded-lg text-cyan-300 hover:text-cyan-200 hover:bg-cyan-900/20 transition-all duration-200 font-medium"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
              >
                Register
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "text-cyan-300 bg-cyan-900/20 border border-cyan-800/50"
                      : "text-gray-300 hover:text-white hover:bg-zinc-800/30 hover:border hover:border-zinc-700/50"
                  }`
                }
              >
                <FaHome className="text-sm" />
                Home
              </NavLink>
              <NavLink
                to="/report"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "text-amber-300 bg-amber-900/20 border border-amber-800/50"
                      : "text-gray-300 hover:text-white hover:bg-zinc-800/30 hover:border hover:border-zinc-700/50"
                  }`
                }
              >
                <FaPlusCircle className="text-sm" />
                Report
              </NavLink>
              <NavLink
                to="/lost"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "text-red-300 bg-red-900/20 border border-red-800/50"
                      : "text-gray-300 hover:text-white hover:bg-zinc-800/30 hover:border hover:border-zinc-700/50"
                  }`
                }
              >
                <FaBinoculars className="text-sm" />
                Lost
              </NavLink>
              <NavLink
                to="/found"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "text-emerald-300 bg-emerald-900/20 border border-emerald-800/50"
                      : "text-gray-300 hover:text-white hover:bg-zinc-800/30 hover:border hover:border-zinc-700/50"
                  }`
                }
              >
                <FaCheckCircle className="text-sm" />
                Found
              </NavLink>

              {/* -------- Desktop Profile Dropdown -------- */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDesktopDropdown((p) => !p)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800/50 hover:border hover:border-zinc-700/50 transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-400 flex items-center justify-center overflow-hidden group-hover:border-cyan-300 transition-colors">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt="avatar"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    ) : (
                      <span className="text-cyan-300 font-bold group-hover:text-cyan-200 transition-colors">
                        {initials}
                      </span>
                    )}
                  </div>
                </button>

                {desktopDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-gradient-to-b from-gray-900 to-black border border-zinc-800 rounded-xl shadow-2xl overflow-hidden z-50">
                    <div className="p-4 border-b border-zinc-800 bg-gradient-to-r from-cyan-900/20 to-amber-900/10">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-amber-400 flex items-center justify-center hover:scale-105 transition-transform duration-200">
                          {user.avatar ? (
                            <img
                              src={user.avatar}
                              alt="avatar"
                              className="w-10 h-10 rounded-full object-cover border-2 border-white hover:border-cyan-300 transition-colors"
                            />
                          ) : (
                            <span className="text-white font-bold text-lg">
                              {initials}
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-white">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-sm text-zinc-300 truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
                      <Link
                        to="/dashboard"
                        onClick={() => setDesktopDropdown(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-800/50 transition-all duration-200 text-gray-200 rounded-lg mx-2 my-1 hover:translate-x-1"
                      >
                        <FaTachometerAlt className="text-cyan-400" />
                        Dashboard
                      </Link>
                      <Link
                        to="/profile"
                        onClick={() => setDesktopDropdown(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-800/50 transition-all duration-200 text-gray-200 rounded-lg mx-2 my-1 hover:translate-x-1"
                      >
                        <FaUser className="text-amber-400" />
                        Profile
                      </Link>
                    </div>
                    <div className="border-t border-zinc-800 p-2">
                      <button
                        onClick={logoutHandler}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-all duration-200 rounded-lg mx-2 hover:translate-x-1"
                      >
                        <FaSignOutAlt />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* ---------------- Mobile Hamburger ---------------- */}
        <div className="flex items-center gap-4 lg:hidden">
          {user && (
            <div className="relative">
              <button
                onClick={() => setDesktopDropdown((p) => !p)}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-400 flex items-center justify-center hover:border-cyan-300 transition-colors"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover hover:scale-105 transition-transform"
                  />
                ) : (
                  <span className="text-cyan-300 text-sm font-bold">
                    {initials}
                  </span>
                )}
              </button>
            </div>
          )}
          
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="w-10 h-10 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-all duration-200 hover:scale-105"
          >
            <FaBars className="text-xl" />
          </button>
        </div>
      </div>

      {/* ---------------- Mobile Menu ---------------- */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            onClick={closeMobileMenu}
          />

          <div className="fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-black via-gray-900 to-zinc-900 z-50 border-l border-zinc-800 shadow-2xl">
            <div className="p-6 h-full flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-gray-900 to-black border border-zinc-700">
                    <FaSearch className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Menu</h2>
                    <p className="text-xs text-zinc-400">Back2U Lost&Found</p>
                  </div>
                </div>
                <button
                  onClick={closeMobileMenu}
                  className="w-10 h-10 rounded-lg hover:bg-zinc-800 flex items-center justify-center transition-all hover:scale-105"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              {/* Main Content */}
              <div className="flex-1 space-y-8 overflow-y-auto">
                <div>
                  <p className="text-xs uppercase tracking-widest text-zinc-400 mb-4 font-medium">
                    Navigation
                  </p>
                  <div className="space-y-2">
                    <Link
                      to="/"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-200 hover:bg-cyan-900/20 hover:text-cyan-300 transition-all duration-200 border border-transparent hover:border-cyan-800/30"
                    >
                      <FaHome className="text-cyan-400" />
                      Home
                    </Link>
                    <Link
                      to="/report"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-200 hover:bg-amber-900/20 hover:text-amber-300 transition-all duration-200 border border-transparent hover:border-amber-800/30"
                    >
                      <FaPlusCircle className="text-amber-400" />
                      Report
                    </Link>
                    <Link
                      to="/lost"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-200 hover:bg-red-900/20 hover:text-red-300 transition-all duration-200 border border-transparent hover:border-red-800/30"
                    >
                      <FaBinoculars className="text-red-400" />
                      Lost
                    </Link>
                    <Link
                      to="/found"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-200 hover:bg-emerald-900/20 hover:text-emerald-300 transition-all duration-200 border border-transparent hover:border-emerald-800/30"
                    >
                      <FaCheckCircle className="text-emerald-400" />
                      Found
                    </Link>
                  </div>
                </div>

                {user && (
                  <div>
                    <p className="text-xs uppercase tracking-widest text-zinc-400 mb-4 font-medium">
                      Account
                    </p>
                    <div className="space-y-2">
                      <Link
                        to="/dashboard"
                        onClick={closeMobileMenu}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-200 hover:bg-zinc-800/50 hover:text-white transition-all duration-200 hover:translate-x-1"
                      >
                        <FaTachometerAlt className="text-cyan-400" />
                        Dashboard
                      </Link>
                      <Link
                        to="/profile"
                        onClick={closeMobileMenu}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-200 hover:bg-zinc-800/50 hover:text-white transition-all duration-200 hover:translate-x-1"
                      >
                        <FaUser className="text-amber-400" />
                        Profile
                      </Link>
                    </div>
                  </div>
                )}

                {!user && (
                  <div>
                    <p className="text-xs uppercase tracking-widest text-zinc-400 mb-4 font-medium">
                      Account
                    </p>
                    <div className="space-y-2">
                      <Link
                        to="/login"
                        onClick={closeMobileMenu}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-cyan-300 hover:bg-cyan-900/20 hover:text-cyan-200 transition-all duration-200 border border-cyan-800/30 hover:border-cyan-700"
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        onClick={closeMobileMenu}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 transition-all duration-200 hover:scale-[1.02] shadow hover:shadow-lg"
                      >
                        Register
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer / Logout */}
              {user && (
                <div className="pt-6 border-t border-zinc-800">
                  <button
                    onClick={logoutHandler}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-all duration-200 border border-red-900/30 hover:border-red-800 hover:scale-[1.02]"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;