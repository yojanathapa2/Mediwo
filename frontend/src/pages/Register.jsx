
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { setPage, setUser } = useAuth();

  const [form, setForm] = useState({
    role: "patient",
    fullName: "",
    email: "",
    phone: "",
    specialty: "",
    nmcNo: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handle = () => {
    if (!form.fullName || !form.email || !form.phone || !form.password) {
      setErr("Please fill in all required fields.");
      return;
    }
    if (form.role === "doctor" && (!form.specialty || !form.nmcNo)) {
      setErr("Please complete doctor details.");
      return;
    }

    setErr("");
    setLoading(true);

    setTimeout(() => {
      setUser({
        name: form.fullName,
        email: form.email,
        role: form.role,
        phone: form.phone,
        specialty: form.specialty,
        nmcNo: form.nmcNo,
      });
      setPage(form.role === "doctor" ? "doctor-dashboard" : "home");
    }, 800);
  };

  return (
    <div
      className="min-h-screen pt-[60px] flex items-center justify-center px-4 py-8"
      style={{ background: "linear-gradient(160deg,#eaf2fb,#edf8f1)" }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl font-black mx-auto mb-4 shadow-xl"
            style={{ background: "linear-gradient(135deg,#1a3f6f,#1a6e3c)" }}
          >
            M
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Create your account</h1>
          <p className="text-slate-400 text-sm mt-1">Join MEDIWO today</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
          <div className="flex rounded-xl p-1 mb-5" style={{ background: "#f1f5f9" }}>
            {[["patient", "👤 Patient"], ["doctor", "🩺 Doctor"]].map(([role, label]) => (
              <button
                key={role}
                onClick={() => setForm({ ...form, role })}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  form.role === role ? "text-white shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
                style={form.role === role ? { background: "linear-gradient(135deg,#1a3f6f,#2874A6)" } : {}}
              >
                {label}
              </button>
            ))}
          </div>

          {err && (
            <div className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-3 py-2 mb-4">
              {err}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Full Name</label>
              <input
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                placeholder="Enter your full name"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Email</label>
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="name@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Phone</label>
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+977-98XXXXXXXX"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>

            {form.role === "doctor" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">Specialty</label>
                  <select
                    value={form.specialty}
                    onChange={(e) => setForm({ ...form, specialty: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all bg-white"
                  >
                    <option value="">Select specialty</option>
                    {[
                      "Cardiology",
                      "Orthopedics",
                      "General Medicine",
                      "Pediatrics",
                      "Oncology",
                      "ENT",
                      "Neurology",
                      "Gynecology",
                      "Dermatology",
                    ].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">
                    NMC Registration No.
                  </label>
                  <input
                    value={form.nmcNo}
                    onChange={(e) => setForm({ ...form, nmcNo: e.target.value })}
                    placeholder="NMC-XXXXX"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Create a password"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
          </div>

          <button
            onClick={handle}
            disabled={loading}
            className="w-full mt-5 py-3 text-white font-semibold rounded-xl text-sm hover:opacity-90 disabled:opacity-50 shadow-md shadow-blue-100 transition-all"
            style={{ background: "linear-gradient(135deg,#1a3f6f,#2874A6)" }}
          >
            {loading ? "Creating account…" : "Create Account"}
          </button>

          <p className="text-center text-sm text-slate-400 mt-5">
            Already registered?{" "}
            <button onClick={() => setPage("login")} className="font-semibold text-blue-700">
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}