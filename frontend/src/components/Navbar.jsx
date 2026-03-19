
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { I } from "../icons/icons";

export default function Navbar() {
  const { page, setPage, user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const patientLinks = [
    { id: "home", label: "Home", icon: I.Home },
    { id: "hospitals", label: "Hospitals", icon: I.Hospital },
    { id: "profile", label: "My Profile", icon: I.User },
  ];

  const doctorLinks = [
    { id: "doctor-dashboard", label: "Dashboard", icon: I.Stethoscope },
    { id: "patients", label: "Patients", icon: I.Patients },
    { id: "doctor-profile", label: "My Profile", icon: I.User },
  ];

  const links = user?.role === "doctor" ? doctorLinks : patientLinks;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-15" style={{ height: 60 }}>
        <button onClick={() => setPage(user?.role === "doctor" ? "doctor-dashboard" : "home")} className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-black text-sm"
            style={{ background: "linear-gradient(135deg,#1a3f6f,#1a6e3c)" }}
          >
            M
          </div>
          <span className="font-black text-base tracking-tight" style={{ color: "#1a3f6f", letterSpacing: "-0.03em" }}>
            MEDIWO
          </span>
        </button>

        <div className="hidden md:flex items-center gap-0.5">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => setPage(l.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                page === l.id ? "bg-blue-50 text-blue-700" : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
            >
              <l.icon />
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <button className="relative p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50">
                <I.Bell />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              </button>

              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ background: "linear-gradient(135deg,#1a3f6f,#2874A6)" }}
                >
                  {user.name[0]}
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-semibold text-slate-800 leading-none">{user.name}</div>
                  <div className="text-xs text-slate-400 capitalize leading-none mt-0.5">{user.role}</div>
                </div>
              </div>

              <button onClick={logout} className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors">
                <I.Logout />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage("login")}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => setPage("register")}
                className="px-4 py-2 text-sm font-semibold text-white rounded-lg hover:opacity-90 transition-all"
                style={{ background: "linear-gradient(135deg,#1a3f6f,#2874A6)" }}
              >
                Register
              </button>
            </div>
          )}

          <button className="md:hidden p-2 text-slate-500" onClick={() => setOpen(!open)}>
            {open ? <I.X /> : <I.Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-3 space-y-1">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => {
                setPage(l.id);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                page === l.id ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <l.icon />
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}