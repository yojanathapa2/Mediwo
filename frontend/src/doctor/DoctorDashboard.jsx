import React from "react";
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

export default function DoctorDashboard() {
  const { user, setPage, setSelPatient } = useAuth();

  const stats = [
    { label: "Today's Patients", value: "12", color: "blue" },
    { label: "Queue Now", value: "6", color: "orange" },
    { label: "Completed", value: "9", color: "green" },
    { label: "Avg Consult", value: "18m", color: "purple" },
  ];

  const statBg = {
    blue: "bg-blue-50 text-blue-600",
    orange: "bg-orange-50 text-orange-600",
    green: "bg-emerald-50 text-emerald-600",
    purple: "bg-purple-50 text-purple-600",
  };

  const queue = [
    { id: 1, name: "Ram Prasad Khanal", token: "A-012", issue: "Chest discomfort", priority: "Medium" },
    { id: 2, name: "Sunita Devi Shrestha", token: "A-013", issue: "Persistent headache", priority: "Low" },
    { id: 3, name: "Anish Shrestha", token: "A-017", issue: "Shortness of breath", priority: "Medium" },
  ];

  if (!user || user.role !== "doctor") {
    return (
      <div className="min-h-screen pt-[60px] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 text-center max-w-md">
          <h1 className="text-xl font-bold text-slate-800 mb-2">Doctor access only</h1>
          <button
            onClick={() => setPage("login")}
            className="px-6 py-2.5 text-white rounded-xl text-sm font-semibold"
            style={{ background: "#1a3f6f" }}
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-[60px]" style={{ background: "#f7f9fc" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-7">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Good morning, {user?.name || "Doctor"} 👋</h1>
            <p className="text-slate-400 text-sm mt-0.5">Thursday, March 19, 2025 · Norvic International Hospital</p>
          </div>
          <div className="flex gap-2">
            <Badge label="On Duty" color="green" />
            <Badge label="Cardiology" color="blue" />
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
              <div className={`w-9 h-9 rounded-xl ${statBg[s.color]} flex items-center justify-center mb-3 text-sm font-bold`}>
                {s.value}
              </div>
              <div className="text-xl font-bold text-slate-800">{s.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-5 flex items-center gap-3">
          <span className="text-2xl">🤖</span>
          <div className="flex-1">
            <p className="font-semibold text-blue-800 text-sm">1 new pre-consultation AI summary received</p>
            <p className="text-xs text-blue-600">Anish Shrestha (Token A-017) submitted a health chat summary</p>
          </div>
          <button
            onClick={() => setPage("doctor-profile")}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-blue-700 border border-blue-200"
          >
            Review
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-800">Current Queue</h2>
              <button
                onClick={() => setPage("patients")}
                className="text-sm text-blue-700 font-medium hover:underline"
              >
                View all
              </button>
            </div>

            <div className="space-y-3">
              {queue.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelPatient({
                      ...p,
                      age: p.id === 1 ? 51 : p.id === 2 ? 36 : 24,
                      gender: p.id === 2 ? "Female" : "Male",
                      lastVisit: "2025-03-03",
                    });
                    setPage("patient-detail");
                  }}
                  className="w-full text-left p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100 transition-all"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-sm font-bold text-blue-700">{p.token}</span>
                        <p className="text-sm font-semibold text-slate-800">{p.name}</p>
                      </div>
                      <p className="text-xs text-slate-500">{p.issue}</p>
                    </div>
                    <Badge label={p.priority} color={p.priority === "Medium" ? "orange" : "green"} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
              <h2 className="font-bold text-slate-800 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={() => setPage("patients")}
                  className="w-full text-left p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-all"
                >
                  <p className="text-sm font-semibold text-slate-700">Patients</p>
                  <p className="text-xs text-slate-400 mt-1">Open patient list and queue</p>
                </button>

                <button
                  onClick={() => setPage("doctor-profile")}
                  className="w-full text-left p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-all"
                >
                  <p className="text-sm font-semibold text-slate-700">Doctor Profile</p>
                  <p className="text-xs text-slate-400 mt-1">View your details and AI summaries</p>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
              <h2 className="font-bold text-slate-800 text-sm mb-4">Pre-Consultation AI Summaries</h2>
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
      </div>
    </div>
  );
}