

import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { I } from "../icons/icons";
import { MOCK_APPOINTMENTS, MOCK_PATIENT_REPORTS, MOCK_QUEUE } from "../data/mockData";

export default function Profile() {
  const { user, setPage } = useAuth();
  const [reports, setReports] = useState(MOCK_PATIENT_REPORTS);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  if (!user) {
    return (
      <div className="min-h-screen pt-[60px] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 text-center max-w-md">
          <div className="text-4xl mb-4">👤</div>
          <h1 className="text-xl font-bold text-slate-800 mb-2">Please sign in</h1>
          <p className="text-sm text-slate-400 mb-5">
            You need to sign in to view your profile.
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

  if (user.role === "doctor") {
    return (
      <div className="min-h-screen pt-[60px] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 text-center max-w-md">
          <div className="text-4xl mb-4">🩺</div>
          <h1 className="text-xl font-bold text-slate-800 mb-2">Doctor profile page</h1>
          <p className="text-sm text-slate-400 mb-5">
            Use the doctor profile section from the doctor dashboard menu.
          </p>
          <button
            onClick={() => setPage("doctor-profile")}
            className="px-6 py-2.5 text-white rounded-xl text-sm font-semibold"
            style={{ background: "linear-gradient(135deg,#1a3f6f,#2874A6)" }}
          >
            Go to Doctor Profile
          </button>
        </div>
      </div>
    );
  }

  const handleFiles = (fileList) => {
    if (!fileList || !fileList.length) return;

    const next = Array.from(fileList).map((file, idx) => ({
      id: Date.now() + idx,
      name: file.name,
      date: new Date().toISOString().split("T")[0],
      type: file.name.toLowerCase().endsWith(".pdf")
        ? "PDF Report"
        : file.name.toLowerCase().match(/\.(jpg|jpeg|png|webp)$/)
        ? "Image Report"
        : "Medical File",
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
    }));

    setReports((prev) => [...next, ...prev]);
  };

  const removeReport = (id) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
  };

  const myQueue = MOCK_QUEUE.find((q) => q.isYou);

  return (
    <div className="min-h-screen pt-[60px]" style={{ background: "#f7f9fc" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-7">
          <h1 className="text-2xl font-bold text-slate-800 mb-1">My Profile</h1>
          <p className="text-slate-400 text-sm">
            Personal details, appointments, queue status, and medical reports
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg"
                  style={{ background: "linear-gradient(135deg,#1a3f6f,#2874A6)" }}
                >
                  {user.name?.[0] || "U"}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800">{user.name}</h2>
                  <p className="text-sm text-slate-400 capitalize">{user.role}</p>
                </div>
              </div>

              <div className="mt-5 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Email</span>
                  <span className="font-medium text-slate-700">{user.email || "—"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Phone</span>
                  <span className="font-medium text-slate-700">{user.phone || "—"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Patient ID</span>
                  <span className="font-medium text-slate-700">MED-P-1027</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="text-blue-600">
                  <I.Queue />
                </div>
                <h3 className="font-bold text-slate-800">Live Queue</h3>
              </div>

              {myQueue ? (
                <div>
                  <div
                    className="rounded-2xl p-5 text-white mb-4"
                    style={{ background: "linear-gradient(135deg,#1a3f6f,#1a6e3c)" }}
                  >
                    <p className="text-xs uppercase tracking-wider opacity-80 mb-1">Your Token</p>
                    <p className="text-4xl font-black tracking-tight">{myQueue.token}</p>
                    <p className="text-sm mt-2 opacity-90">Estimated wait: {myQueue.waitTime}</p>
                  </div>

                  <div className="space-y-2">
                    {MOCK_QUEUE.slice(0, 4).map((q) => (
                      <div
                        key={q.id}
                        className={`flex items-center justify-between p-3 rounded-xl border ${
                          q.isYou
                            ? "bg-blue-50 border-blue-100"
                            : "bg-slate-50 border-slate-100"
                        }`}
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
              ) : (
                <p className="text-sm text-slate-400">No active queue right now.</p>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="text-emerald-600">
                  <I.Calendar />
                </div>
                <h3 className="font-bold text-slate-800">Appointments</h3>
              </div>

              <div className="space-y-3">
                {MOCK_APPOINTMENTS.map((a) => (
                  <div key={a.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-sm font-semibold text-slate-800">{a.doctor}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{a.hospital}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-slate-500">
                        {a.date} · {a.time}
                      </span>
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                          a.status === "Confirmed"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {a.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="flex items-center justify-between gap-4 mb-5">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Medical Reports</h2>
                  <p className="text-sm text-slate-400">
                    Upload and manage your reports here
                  </p>
                </div>
                <button
                  onClick={() => inputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2.5 text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-all"
                  style={{ background: "linear-gradient(135deg,#1a3f6f,#2874A6)" }}
                >
                  <I.Upload />
                  Upload Report
                </button>
              </div>

              <input
                ref={inputRef}
                type="file"
                multiple
                className="hidden"
                accept=".pdf,.png,.jpg,.jpeg,.webp"
                onChange={(e) => handleFiles(e.target.files)}
              />

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(false);
                  handleFiles(e.dataTransfer.files);
                }}
                onClick={() => inputRef.current?.click()}
                className={`rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-all ${
                  dragging
                    ? "border-blue-300 bg-blue-50"
                    : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                }`}
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-white border border-slate-100 flex items-center justify-center mb-3 text-slate-500">
                  <I.Upload />
                </div>
                <p className="text-sm font-semibold text-slate-700">
                  Drop files here or click to upload
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  PDF, JPG, PNG supported
                </p>
              </div>

              <div className="mt-5 space-y-3">
                {reports.map((r) => (
                  <div
                    key={r.id}
                    className="flex items-center justify-between gap-4 p-4 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-lg"
                        style={{
                          background:
                            r.type === "PDF Report" ? "#eef4fb" : "#edf8f1",
                        }}
                      >
                        {r.type === "PDF Report" ? "📄" : "🖼️"}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">
                          {r.name}
                        </p>
                        <p className="text-xs text-slate-400">
                          {r.type} · {r.date} · {r.size}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
                        <I.Eye />
                      </button>
                      <button
                        onClick={() => removeReport(r.id)}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                      >
                        <I.Trash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h3 className="font-bold text-slate-800 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => setPage("hospitals")}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-left hover:shadow-sm transition-all"
                >
                  <div className="text-blue-600 mb-2">
                    <I.Hospital />
                  </div>
                  <p className="text-sm font-semibold text-slate-700">Book Hospital</p>
                  <p className="text-xs text-slate-400 mt-1">Find hospitals and doctors</p>
                </button>

                <button
                  onClick={() => setPage("hospitals")}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-left hover:shadow-sm transition-all"
                >
                  <div className="text-emerald-600 mb-2">
                    <I.Calendar />
                  </div>
                  <p className="text-sm font-semibold text-slate-700">Appointment</p>
                  <p className="text-xs text-slate-400 mt-1">Choose date and time</p>
                </button>

                <button
                  onClick={() => setPage("home")}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-left hover:shadow-sm transition-all"
                >
                  <div className="text-violet-600 mb-2">
                    <I.Home />
                  </div>
                  <p className="text-sm font-semibold text-slate-700">Go Home</p>
                  <p className="text-xs text-slate-400 mt-1">Return to dashboard</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}