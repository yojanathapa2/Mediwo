
import React from "react";
import { useAuth } from "../context/AuthContext";
import { I } from "../icons/icons";
import { MOCK_QUEUE } from "../data/mockData";

const PATIENTS = [
  {
    id: 1,
    name: "Ram Prasad Khanal",
    age: 51,
    gender: "Male",
    token: "A-012",
    issue: "Chest discomfort and fatigue",
    priority: "Medium",
    lastVisit: "2025-03-03",
  },
  {
    id: 2,
    name: "Sunita Devi Shrestha",
    age: 36,
    gender: "Female",
    token: "A-013",
    issue: "Persistent headache",
    priority: "Low",
    lastVisit: "2025-02-15",
  },
  {
    id: 3,
    name: "Mohan Bahadur Thapa",
    age: 63,
    gender: "Male",
    token: "A-014",
    issue: "Knee pain and swelling",
    priority: "Low",
    lastVisit: "2025-01-29",
  },
  {
    id: 4,
    name: "Gita Kumari Rai",
    age: 28,
    gender: "Female",
    token: "A-015",
    issue: "Fever and sore throat",
    priority: "Medium",
    lastVisit: "2025-03-10",
  },
];

export default function Patients() {
  const { user, setPage, setSelPatient } = useAuth();

  if (!user || user.role !== "doctor") {
    return (
      <div className="min-h-screen pt-[60px] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 text-center max-w-md">
          <div className="text-4xl mb-4">🩺</div>
          <h1 className="text-xl font-bold text-slate-800 mb-2">Doctor access only</h1>
          <p className="text-sm text-slate-400 mb-5">
            Sign in as a doctor to view the patient list.
          </p>
          <button
            onClick={() => setPage("login")}
            className="px-6 py-2.5 text-white rounded-xl text-sm font-semibold"
            style={{ background: "linear-gradient(135deg,#1a3f6f,#2874A6)" }}
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-[60px]" style={{ background: "#f7f9fc" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-7 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 mb-1">Patients</h1>
            <p className="text-slate-400 text-sm">
              Review queue, open details, and continue consultations
            </p>
          </div>
          <button
            onClick={() => setPage("doctor-dashboard")}
            className="px-4 py-2.5 rounded-xl bg-white border border-slate-100 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-bold text-slate-800">Today’s Patient List</h2>
              <span className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold">
                {PATIENTS.length} patients
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {PATIENTS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelPatient(p);
                    setPage("patient-detail");
                  }}
                  className="w-full text-left px-6 py-4 hover:bg-slate-50 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className="text-sm font-bold text-blue-700">{p.token}</span>
                        <h3 className="text-sm font-semibold text-slate-800 truncate">
                          {p.name}
                        </h3>
                        <span
                          className={`text-[11px] px-2 py-1 rounded-full font-semibold ${
                            p.priority === "Medium"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-emerald-50 text-emerald-700"
                          }`}
                        >
                          {p.priority}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mb-1">
                        {p.age} yrs · {p.gender}
                      </p>
                      <p className="text-sm text-slate-600">{p.issue}</p>
                    </div>

                    <div className="shrink-0 flex items-center gap-2 text-slate-300">
                      <span className="text-xs text-slate-400 hidden sm:inline">
                        Open
                      </span>
                      <I.ChevR />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="text-emerald-600">
                  <I.Queue />
                </div>
                <h3 className="font-bold text-slate-800">Queue Snapshot</h3>
              </div>

              <div className="space-y-2">
                {MOCK_QUEUE.slice(0, 5).map((q) => (
                  <div
                    key={q.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-700">{q.token}</p>
                      <p className="text-xs text-slate-400">{q.patient}</p>
                    </div>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                        q.status === "In Progress"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {q.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h3 className="font-bold text-slate-800 mb-3">Doctor Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setPage("doctor-profile")}
                  className="w-full text-left p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-all"
                >
                  <p className="text-sm font-semibold text-slate-700">Open Doctor Profile</p>
                  <p className="text-xs text-slate-400 mt-1">View your account details</p>
                </button>

                <button
                  onClick={() => setPage("doctor-dashboard")}
                  className="w-full text-left p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-all"
                >
                  <p className="text-sm font-semibold text-slate-700">Return to Dashboard</p>
                  <p className="text-xs text-slate-400 mt-1">Back to overview and queue</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}