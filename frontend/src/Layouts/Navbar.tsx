import { useState } from "react";
import { logoutUser } from "../Api/user.api";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FileText,
  Layers,
  LogOut,
  User as UserIcon,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  // Mobile Menu state
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.log("Logout error", error);
    } finally {
      setUser(null);
      setIsOpen(false);
      navigate("/login");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* BRAND LOGO */}
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-2 group shrink-0"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-sm">
            TS
          </div>
          <span className="font-bold text-base sm:text-lg text-slate-900 tracking-tight">
            TalentScanner
          </span>
        </Link>

        {/* DESKTOP NAVIGATION LINKS (Mobile-e hidden thakbe) */}
        <nav className="hidden md:flex items-center gap-2">
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

        {/* DESKTOP AUTH BUTTONS (Mobile-e hidden thakbe) */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200/60">
                <UserIcon className="w-4 h-4 text-slate-600" />
                <span className="text-xs font-semibold text-slate-800">
                  {user.userName}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="px-3.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 border border-red-200 rounded-lg transition flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
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

        {/* MOBILE HAMBURGER MENU BUTTON (Keobol Mobile-e dekhabe) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3 shadow-lg">
          <Link
            to="/home"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium ${
              isActive("/home")
                ? "bg-slate-100 text-slate-900 font-semibold"
                : "text-slate-700"
            }`}
          >
            <FileText className="w-4 h-4" /> Home
          </Link>

          <Link
            to="/compare"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium ${
              isActive("/compare")
                ? "bg-slate-100 text-slate-900 font-semibold"
                : "text-slate-700"
            }`}
          >
            <Layers className="w-4 h-4" /> Compare CVs
          </Link>

          <div className="pt-2 border-t border-slate-100">
            {user ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg text-xs font-semibold text-slate-700">
                  <UserIcon className="w-4 h-4 text-slate-500" />
                  {user.userName}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 bg-red-50 rounded-lg border border-red-200"
                >
                  <LogOut className="w-3.5 h-3.5" /> Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-center py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="text-center py-2 text-sm font-medium text-white bg-slate-900 rounded-lg"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
