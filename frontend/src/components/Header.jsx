import { useEffect, useState, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logout, reset, getUserProfile } from "../features/auth/authSlice";
import Loader from "./Loader";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, profile, isLoading } = useSelector((state) => state.auth);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [createDropdownOpen, setCreateDropdownOpen] = useState(false);

  const profileMenuRef = useRef(null);
  const createMenuRef = useRef(null);

  useEffect(() => {
    if (user) {
      dispatch(getUserProfile());
    }
  }, [dispatch, user]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
      if (createMenuRef.current && !createMenuRef.current.contains(event.target)) {
        setCreateDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const onLogout = () => {
    toast.success("Logged out successfully", {
      position: "top-right",
      autoClose: 3000,
      theme: "light",
    });
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const navLinkClass = ({ isActive }) =>
    `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
      isActive
        ? "bg-blue-50 text-blue-600 font-semibold"
        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-lg text-base font-medium ${
      isActive
        ? "bg-blue-50 text-blue-600 font-semibold"
        : "text-slate-700 hover:bg-slate-100"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Brand Logo & Navigation */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-sm shadow-blue-500/30">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-slate-900 tracking-tight">
                ProjectHub
              </span>
            </Link>

            {user && (
              <nav className="hidden md:flex items-center space-x-1">
                <NavLink to="/" className={navLinkClass}>
                  Home
                </NavLink>
                <NavLink to="/projects" className={navLinkClass}>
                  All Projects
                </NavLink>
                <NavLink to="/scheduler" className={navLinkClass}>
                  Scheduler
                </NavLink>
                <NavLink to="/kanban" className={navLinkClass}>
                  Kanban
                </NavLink>
                {profile?.role === "admin" && (
                  <NavLink to="/admin/tasks" className={navLinkClass}>
                    <span className="flex items-center gap-1.5">
                      Admin
                      <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-purple-100 text-purple-700 rounded-md">
                        PRO
                      </span>
                    </span>
                  </NavLink>
                )}
              </nav>
            )}
          </div>

          {/* Right Action Bar */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                {/* Quick Action 'Create' Dropdown */}
                <div className="relative" ref={createMenuRef}>
                  <button
                    onClick={() => setCreateDropdownOpen(!createDropdownOpen)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-600/20 transition-all active:scale-[0.98]"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                    Create
                  </button>

                  {createDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-44 rounded-xl bg-white p-1 shadow-lg border border-slate-100 z-50 animate-in fade-in zoom-in-95 duration-100">
                      <Link
                        to="/task"
                        onClick={() => setCreateDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                      >
                        <span className="text-blue-500 font-bold">+</span> New Task
                      </Link>
                      <Link
                        to="/project"
                        onClick={() => setCreateDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                      >
                        <span className="text-indigo-500 font-bold">+</span> New Project
                      </Link>
                    </div>
                  )}
                </div>

                <div className="h-5 w-px bg-slate-200 mx-1" />

                {/* User Profile Avatar Dropdown */}
                <div className="relative" ref={profileMenuRef}>
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100/80 transition-colors focus:outline-none"
                  >
                    <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-semibold text-xs ring-2 ring-slate-100">
                      {profile?.name ? profile.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div className="text-left hidden lg:block">
                      <p className="text-xs font-semibold text-slate-800 leading-tight">
                        {profile?.name || "User"}
                      </p>
                      <p className="text-[11px] text-slate-500 leading-tight capitalize">
                        {profile?.role || "Member"}
                      </p>
                    </div>
                    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 rounded-xl bg-white p-1.5 shadow-xl border border-slate-100 z-50">
                      <div className="px-3 py-2 border-b border-slate-100 mb-1">
                        <p className="text-xs font-semibold text-slate-800 truncate">{profile?.email || user.email}</p>
                        <p className="text-[11px] text-slate-400 capitalize">{profile?.role || "Standard User"}</p>
                      </div>
                      <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-lg transition-colors text-left"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 rounded-lg transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-600/20 transition-all active:scale-[0.98]"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-2">
          {user ? (
            <>
              <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkClass}>
                Home
              </NavLink>
              <NavLink to="/projects" onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkClass}>
                All Projects
              </NavLink>
              <NavLink to="/scheduler" onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkClass}>
                Scheduler
              </NavLink>
              <NavLink to="/kanban" onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkClass}>
                Kanban
              </NavLink>
              {profile?.role === "admin" && (
                <NavLink to="/admin/tasks" onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkClass}>
                  Admin Panel
                </NavLink>
              )}
              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                <Link
                  to="/task"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2 text-sm font-medium bg-blue-50 text-blue-600 rounded-lg"
                >
                  + Add Task
                </Link>
                <Link
                  to="/project"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2 text-sm font-medium bg-blue-50 text-blue-600 rounded-lg"
                >
                  + Add Project
                </Link>
                <button
                  onClick={onLogout}
                  className="w-full text-center px-4 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-lg"
                >
                  Log Out
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-2 pt-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;