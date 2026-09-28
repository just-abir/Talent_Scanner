import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FileText, Layers, LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const isActive = (path: string) => location.pathname === path;
  const handleLogout = () => {
    localStorage.removeItem("token");

    setUser(null);

    navigate("/login");
  };
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* BRAND LOGO */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:bg-slate-800 transition">
            TS
          </div>
          <span className="font-bold text-lg text-slate-900 tracking-tight">
            TalentScanner
          </span>
        </Link>

        {/* NAVIGATION LINKS */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            to="/home"
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
              isActive("/home")
                ? "bg-slate-100 text-slate-900 font-semibold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <FileText className="w-4 h-4 text-slate-500" />
            <span>Home</span>
          </Link>

          <Link
            to="/compare"
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
              isActive("/compare")
                ? "bg-slate-100 text-slate-900 font-semibold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Layers className="w-4 h-4 text-slate-500" />
            <span>Compare CVs</span>
          </Link>
        </nav>

        {/* AUTH ACTION BUTTONS */}
        <div className="flex items-center gap-3">
          {user ? (
            /* USER LOGGED IN STATE */
            <div className="flex items-center gap-3">
              {/* User Name Badge */}
              <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200/60">
                <UserIcon className="w-4 h-4 text-slate-600" />
                <span className="text-xs font-semibold text-slate-800">
                  {user.userName}
                </span>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="px-3.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 border border-red-200 rounded-lg transition flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            /* USER LOGGED OUT STATE */
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition rounded-lg hover:bg-slate-100"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition shadow-sm"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
