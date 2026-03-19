import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Badge({ label, color = "gray" }) {
  const styles = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-emerald-50 text-emerald-700",
    orange: "bg-amber-50 text-amber-700",
    purple: "bg-purple-50 text-purple-700",
    gray: "bg-slate-100 text-slate-600",
  };

  return (
    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${styles[color]}`}>
      {label}
    </span>
  );
}

export default function DoctorProfile() {
  const { user, setPage } = useAuth();

  const [editing, setEditing] = useState(false);
  const [info, setInfo] = useState({
    name: user?.name || "Dr. Priya Basnet",
    specialty: "Cardiology",
    nmcNo: "NMC-12453",
    experience: "14 years",
    hospital: "Norvic International Hospital",
    phone: "+977-9851234567",
    email: user?.email || "priya.basnet@norvic.com.np",
    address: "Thapathali, Kathmandu",
    bio: "Senior cardiologist with 14 years of experience in interventional cardiology and cardiac rehabilitation. Specialized in echocardiography and cardiac catheterization.",
    education: "MBBS — TUTH, 2008 · MD Cardiology — IOM, 2013",
    languages: "Nepali, English, Hindi",
  });

  if (!user || user.role !== "doctor") {
    return (
      <div className="min-h-screen pt-[60px] flex items-center justify-center">
        <button
          onClick={() => setPage("login")}
          className="px-6 py-2.5 text-white rounded-xl text-sm font-semibold"
          style={{ background: "#1a3f6f" }}
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-[60px]" style={{ background: "#f7f9fc" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-5 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-3xl font-black flex-shrink-0"
                style={{ background: "linear-gradient(135deg,#1a3f6f,#1a6e3c)" }}
              >
                {info.name[0]}
              </div>
            </div>

            <div className="flex-1">
              {editing ? (
                <input
                  value={info.name}
                  onChange={(e) => setInfo({ ...info, name: e.target.value })}
                  className="text-2xl font-bold text-slate-800 bg-transparent outline-none border-b border-slate-200"
                />
              ) : (
                <h1 className="text-2xl font-bold text-slate-800">{info.name}</h1>
              )}

              <div className="flex flex-wrap items-center gap-2 mt-2">
                <Badge label={info.specialty} color="blue" />
                <Badge label={info.experience} color="green" />
                <Badge label={info.nmcNo} color="purple" />
              </div>

              <p className="text-sm text-slate-400 mt-3">{info.hospital}</p>
            </div>

            <button
              onClick={() => setEditing((s) => !s)}
              className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-100 text-sm font-medium text-slate-600 hover:bg-slate-100 transition-all"
            >
              {editing ? "Done" : "Edit"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-5">
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
              <h2 className="font-bold text-slate-800 mb-4">Contact Information</h2>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-slate-400 mb-1">Phone</p>
                  {editing ? (
                    <input
                      value={info.phone}
                      onChange={(e) => setInfo({ ...info, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200"
                    />
                  ) : (
                    <p className="text-slate-700 font-medium">{info.phone}</p>
                  )}
                </div>
                <div>
                  <p className="text-slate-400 mb-1">Email</p>
                  {editing ? (
                    <input
                      value={info.email}
                      onChange={(e) => setInfo({ ...info, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200"
                    />
                  ) : (
                    <p className="text-slate-700 font-medium">{info.email}</p>
                  )}
                </div>
                <div>
                  <p className="text-slate-400 mb-1">Address</p>
                  {editing ? (
                    <input
                      value={info.address}
                      onChange={(e) => setInfo({ ...info, address: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200"
                    />
                  ) : (
                    <p className="text-slate-700 font-medium">{info.address}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
              <h2 className="font-bold text-slate-800 mb-4">Professional Background</h2>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-slate-400 mb-1">Education</p>
                  {editing ? (
                    <textarea
                      value={info.education}
                      onChange={(e) => setInfo({ ...info, education: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200"
                      rows="3"
                    />
                  ) : (
                    <p className="text-slate-700 font-medium leading-relaxed">{info.education}</p>
                  )}
                </div>

                <div>
                  <p className="text-slate-400 mb-1">Languages</p>
                  {editing ? (
                    <input
                      value={info.languages}
                      onChange={(e) => setInfo({ ...info, languages: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200"
                    />
                  ) : (
                    <p className="text-slate-700 font-medium">{info.languages}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
              <h2 className="font-bold text-slate-800 mb-4">Bio</h2>
              {editing ? (
                <textarea
                  value={info.bio}
                  onChange={(e) => setInfo({ ...info, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  rows="7"
                />
              ) : (
                <p className="text-sm text-slate-600 leading-relaxed">{info.bio}</p>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">🤖</span>
                <h2 className="font-bold text-slate-800 text-sm">Pre-Consultation AI Summaries</h2>
                <Badge label="1 new" color="blue" />
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-blue-800 text-sm">Anish Shrestha · Token A-017</p>
                  <Badge label="Waiting" color="orange" />
                </div>
                <p className="text-xs text-blue-600 mb-2">Submitted by MEDIWO Health Assistant · Today</p>
                <div className="text-xs text-blue-800 leading-relaxed bg-white/60 rounded-lg p-3 font-mono whitespace-pre-wrap">
{`• Chief Complaint: Chest discomfort and shortness of breath
• Duration: ~3 days
• Severity: Moderate (6/10)
• Medications: None currently
• Allergies: None reported
• History: No prior cardiac events
• Additional Notes: First time experiencing these symptoms`}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={() => setPage("doctor-dashboard")}
            className="px-5 py-2.5 rounded-xl bg-white border border-slate-100 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}