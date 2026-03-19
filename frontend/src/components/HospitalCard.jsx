import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Home, Hospital, User, Users, LogOut } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const patientLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/appointment", label: "Hospitals", icon: Hospital },
    { to: "/profile", label: "My Profile", icon: User }
  ];

  const doctorLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/patients", label: "Patients", icon: Users },
    { to: "/profile", label: "My Profile", icon: User }
  ];

  const links = user?.role === "DOCTOR" ? doctorLinks : patientLinks;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-2xl text-white font-black flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#1a3f6f,#1a6e3c)" }}
          >
            M
          </div>
          <div>
            <p className="font-black text-base text-slate-800">MEDIWO</p>
            <p className="text-[10px] text-slate-400 -mt-1">Medical Workflow Optimization</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          {links.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition"
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-slate-800">{user.name}</p>
                <p className="text-xs text-slate-400">{user.role}</p>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-xl transition"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-4 py-2 text-sm font-semibold text-white rounded-xl transition"
                style={{ background: "linear-gradient(135deg,#1a3f6f,#2874A6)" }}
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;