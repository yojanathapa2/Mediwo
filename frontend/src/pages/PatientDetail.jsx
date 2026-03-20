import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, User, Calendar, Phone, Activity, Droplet, FileText, Clock } from 'lucide-react';

const API_URL = process.env.VITE_API_URL || 'http://127.0.0.1:8000';

const PatientDetail = () => {
  const { patientId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await fetch(`${API_URL}/patients/${patientId}`);
        if (response.ok) {
          const data = await response.json();
          setPatient(data);
        } else {
          // Handle patient not found, e.g., redirect or show an error
          navigate('/patients');
        }
      } catch (error) {
        console.error('Failed to fetch patient details:', error);
      }
    };

    if (user && user.role === 'DOCTOR') {
      fetchPatient();
    }
  }, [user, patientId, navigate]);


  const getStatusBadge = (status) => {
    const styles = {
      Active: 'bg-green-100 text-green-800',
      Recovered: 'bg-blue-100 text-blue-800',
      Critical: 'bg-red-100 text-red-800'
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  if (!user || user.role !== "doctor") {
    return (
      <div className="min-h-screen pt-[60px] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 text-center max-w-md">
          <div className="text-4xl mb-4">🩺</div>
          <h1 className="text-xl font-bold text-slate-800 mb-2">Doctor access only</h1>
          <p className="text-sm text-slate-400 mb-5">
            Sign in as a doctor to open patient details.
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

  if (!selPatient) {
    return (
      <div className="min-h-screen pt-[60px] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 text-center max-w-md">
          <div className="text-4xl mb-4">👤</div>
          <h1 className="text-xl font-bold text-slate-800 mb-2">No patient selected</h1>
          <p className="text-sm text-slate-400 mb-5">
            Please choose a patient from the patient list first.
          </p>
          <button
            onClick={() => setPage("patients")}
            className="px-6 py-2.5 text-white rounded-xl text-sm font-semibold"
            style={{ background: "linear-gradient(135deg,#1a3f6f,#2874A6)" }}
          >
            Go to Patients
          </button>
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading patient details...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-[60px]" style={{ background: "#f7f9fc" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-7 flex items-center justify-between gap-4">
          <div>
            <button
              onClick={() => setPage("patients")}
              className="text-sm text-blue-700 font-medium hover:underline mb-2"
            >
              ← Back to Patients
            </button>
            <h1 className="text-2xl font-bold text-slate-800">{selPatient.name}</h1>
            <p className="text-slate-400 text-sm">
              Token {selPatient.token} · {selPatient.age} yrs · {selPatient.gender}
            </p>
          </div>

          <span
            className={`text-xs px-3 py-1.5 rounded-full font-semibold ${
              selPatient.priority === "Medium"
                ? "bg-amber-50 text-amber-700"
                : "bg-emerald-50 text-emerald-700"
            }`}
          >
            {selPatient.priority} Priority
          </span>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="text-violet-600">
                  <I.Sparkle />
                </div>
                <h2 className="font-bold text-slate-800">AI Intake Summary</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-xs text-slate-400 mb-1">Chief Complaint</p>
                  <p className="text-sm font-semibold text-slate-700">{summary.chiefComplaint}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-xs text-slate-400 mb-1">Duration</p>
                  <p className="text-sm font-semibold text-slate-700">{summary.duration}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-xs text-slate-400 mb-1">Severity</p>
                  <p className="text-sm font-semibold text-slate-700">{summary.severity}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-xs text-slate-400 mb-1">Allergies</p>
                  <p className="text-sm font-semibold text-slate-700">{summary.allergies}</p>
                </div>
              </div>

              <div className="rounded-2xl bg-blue-50 border border-blue-100 p-5">
                <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-2">
                  Clinical Summary
                </p>
                <p className="text-sm text-slate-700 leading-relaxed">{summary.aiSummary}</p>
              </div>

              <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-xs text-slate-400 mb-1">Relevant History</p>
                <p className="text-sm text-slate-700 leading-relaxed">{summary.history}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h2 className="font-bold text-slate-800 mb-4">Uploaded Reports</h2>
              <div className="space-y-3">
                {reports.map((r) => (
                  <div
                    key={r.id}
                    className="flex items-center justify-between gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-11 h-11 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-lg">
                        📄
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">{r.name}</p>
                        <p className="text-xs text-slate-400">
                          {r.type} · {r.date} · {r.size}
                        </p>
                      </div>
                    </div>

                    <button className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
                      <I.Eye />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h2 className="font-bold text-slate-800 mb-4">Doctor Notes</h2>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={6}
                placeholder="Write consultation notes, findings, and plan here..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none"
              />
              <div className="flex justify-end mt-4">
                <button
                  className="px-5 py-2.5 text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-all"
                  style={{ background: "linear-gradient(135deg,#1a3f6f,#2874A6)" }}
                >
                  Save Notes
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h3 className="font-bold text-slate-800 mb-4">Patient Snapshot</h3>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Name</span>
                  <span className="font-medium text-slate-700">{selPatient.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Age</span>
                  <span className="font-medium text-slate-700">{selPatient.age} yrs</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Gender</span>
                  <span className="font-medium text-slate-700">{selPatient.gender}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Token</span>
                  <span className="font-medium text-blue-700">{selPatient.token}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Last Visit</span>
                  <span className="font-medium text-slate-700">{selPatient.lastVisit}</span>
                </div>
              </div>
            </div>

        {/* Medications */}
        {patient.medications && patient.medications.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Activity className="w-6 h-6 text-blue-600" />
              Current Medications
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Medication
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dosage
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Frequency
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Start Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {patient.medications.map((med, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {med.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrawrap text-sm text-gray-600">
                        {med.dosage}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {med.frequency}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Date(med.startDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="text-emerald-600">
                  <I.Queue />
                </div>
                <h3 className="font-bold text-slate-800">Queue Status</h3>
              </div>

              <div
                className="rounded-2xl p-5 text-white"
                style={{ background: "linear-gradient(135deg,#1a3f6f,#1a6e3c)" }}
              >
                <p className="text-xs uppercase tracking-wider opacity-80 mb-1">Current Token</p>
                <p className="text-4xl font-black tracking-tight">{selPatient.token}</p>
                <p className="text-sm mt-2 opacity-90">Patient is waiting for consultation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;
