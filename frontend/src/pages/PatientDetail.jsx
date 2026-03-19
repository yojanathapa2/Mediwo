// import React from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { ArrowLeft, User, Calendar, Phone, Activity, Droplet, FileText, Clock } from 'lucide-react';

// const PatientDetail = () => {
//   const { patientName } = useParams();
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   // Mock patient database - in real app, this would come from an API
//   const mockPatients = {
//     'john-doe': {
//       id: 1,
//       name: 'John Doe',
//       age: 45,
//       gender: 'Male',
//       condition: 'Hypertension',
//       admissionDate: '2024-01-15',
//       status: 'Active',
//       phone: '+1-234-567-8901',
//       email: 'john.doe@email.com',
//       bloodGroup: 'O+',
//       lastVisit: '2024-01-20',
//       address: '123 Main Street, City, State 12345',
//       emergencyContact: 'Jane Doe - +1-234-567-8900',
//       medicalHistory: [
//         { date: '2024-01-20', description: 'Blood pressure check - Normal', doctor: 'Dr. Albert Einstein' },
//         { date: '2024-01-15', description: 'Initial consultation for hypertension', doctor: 'Dr. Albert Einstein' },
//         { date: '2023-12-10', description: 'Routine checkup', doctor: 'Dr. Albert Einstein' }
//       ],
//       medications: [
//         { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', startDate: '2024-01-15' },
//         { name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily', startDate: '2024-01-15' }
//       ],
//       labResults: [
//         { test: 'Blood Pressure', result: '130/85 mmHg', date: '2024-01-20', status: 'Normal' },
//         { test: 'Cholesterol', result: '180 mg/dL', date: '2024-01-20', status: 'Slightly Elevated' },
//         { test: 'Blood Sugar', result: '95 mg/dL', date: '2024-01-20', status: 'Normal' }
//       ]
//     },
//     'jane-smith': {
//       id: 2,
//       name: 'Jane Smith',
//       age: 32,
//       gender: 'Female',
//       condition: 'Diabetes Type 2',
//       admissionDate: '2024-01-20',
//       status: 'Active',
//       phone: '+1-234-567-8902',
//       email: 'jane.smith@email.com',
//       bloodGroup: 'A+',
//       lastVisit: '2024-01-22',
//       address: '456 Oak Avenue, City, State 12346',
//       emergencyContact: 'John Smith - +1-234-567-8901',
//       medicalHistory: [
//         { date: '2024-01-22', description: 'Blood sugar monitoring - Controlled', doctor: 'Dr. Albert Einstein' },
//         { date: '2024-01-20', description: 'Diabetes management consultation', doctor: 'Dr. Albert Einstein' }
//       ],
//       medications: [
//         { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', startDate: '2024-01-20' },
//         { name: 'Insulin Glargine', dosage: '20 units', frequency: 'Once daily at bedtime', startDate: '2024-01-20' }
//       ],
//       labResults: [
//         { test: 'HbA1c', result: '7.2%', date: '2024-01-22', status: 'Controlled' },
//         { test: 'Fasting Blood Sugar', result: '110 mg/dL', date: '2024-01-22', status: 'Good' },
//         { test: 'Cholesterol', result: '195 mg/dL', date: '2024-01-22', status: 'Normal' }
//       ]
//     },
//     'bob-johnson': {
//       id: 3,
//       name: 'Bob Johnson',
//       age: 58,
//       gender: 'Male',
//       condition: 'Cardiac Arrhythmia',
//       admissionDate: '2024-01-18',
//       status: 'Active',
//       phone: '+1-234-567-8903',
//       email: 'bob.johnson@email.com',
//       bloodGroup: 'B+',
//       lastVisit: '2024-01-21',
//       address: '789 Pine Road, City, State 12347',
//       emergencyContact: 'Mary Johnson - +1-234-567-8902',
//       medicalHistory: [
//         { date: '2024-01-21', description: 'ECG monitoring - Irregular rhythm detected', doctor: 'Dr. Albert Einstein' },
//         { date: '2024-01-18', description: 'Cardiac evaluation for arrhythmia', doctor: 'Dr. Albert Einstein' }
//       ],
//       medications: [
//         { name: 'Metoprolol', dosage: '50mg', frequency: 'Twice daily', startDate: '2024-01-18' },
//         { name: 'Warfarin', dosage: '5mg', frequency: 'Once daily', startDate: '2024-01-18' }
//       ],
//       labResults: [
//         { test: 'ECG', result: 'Atrial Fibrillation', date: '2024-01-21', status: 'Abnormal' },
//         { test: 'Echocardiogram', result: 'Normal ejection fraction', date: '2024-01-19', status: 'Normal' }
//       ]
//     }
//   };

//   // Get patient data or use default
//   const patient = mockPatients[patientName] || {
//     name: patientName?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || 'Unknown Patient',
//     age: 'N/A',
//     gender: 'N/A',
//     condition: 'N/A',
//     admissionDate: 'N/A',
//     status: 'Active',
//     phone: 'N/A',
//     email: 'N/A',
//     bloodGroup: 'N/A',
//     lastVisit: 'N/A',
//     address: 'N/A',
//     emergencyContact: 'N/A',
//     medicalHistory: [],
//     medications: [],
//     labResults: []
//   };

//   const getStatusBadge = (status) => {
//     const styles = {
//       Active: 'bg-green-100 text-green-800',
//       Recovered: 'bg-blue-100 text-blue-800',
//       Critical: 'bg-red-100 text-red-800'
//     };
//     return styles[status] || 'bg-gray-100 text-gray-800';
//   };

//   const getResultStatusBadge = (status) => {
//     const styles = {
//       Normal: 'bg-green-100 text-green-800',
//       Good: 'bg-green-100 text-green-800',
//       Controlled: 'bg-blue-100 text-blue-800',
//       'Slightly Elevated': 'bg-yellow-100 text-yellow-800',
//       Abnormal: 'bg-red-100 text-red-800'
//     };
//     return styles[status] || 'bg-gray-100 text-gray-800';
//   };

//   if (!user || user.role !== 'DOCTOR') {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
//           <p className="text-gray-600 mb-4">Only doctors can access this page.</p>
//           <Link to="/patients" className="text-blue-600 hover:underline">Go back to Patients</Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Back Button */}
//         <button
//           onClick={() => navigate('/patients')}
//           className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
//         >
//           <ArrowLeft className="w-5 h-5" />
//           <span>Back to Patients</span>
//         </button>

//         {/* Patient Header Card */}
//         <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
//             <div className="flex items-center gap-6">
//               <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
//                 <User className="w-10 h-10 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-4xl font-bold text-gray-900 mb-2">{patient.name}</h1>
//                 <div className="flex items-center gap-4 flex-wrap">
//                   <span className={`px-4 py-1 rounded-full text-sm font-semibold ${getStatusBadge(patient.status)}`}>
//                     {patient.status}
//                   </span>
//                   <span className="px-4 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800">
//                     {patient.condition}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Patient Info Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             <div className="flex items-start gap-3">
//               <Calendar className="w-5 h-5 text-blue-600 mt-1" />
//               <div>
//                 <p className="text-sm text-gray-600">Age</p>
//                 <p className="text-lg font-semibold text-gray-900">{patient.age} years</p>
//               </div>
//             </div>
//             <div className="flex items-start gap-3">
//               <User className="w-5 h-5 text-blue-600 mt-1" />
//               <div>
//                 <p className="text-sm text-gray-600">Gender</p>
//                 <p className="text-lg font-semibold text-gray-900">{patient.gender}</p>
//               </div>
//             </div>
//             <div className="flex items-start gap-3">
//               <Droplet className="w-5 h-5 text-blue-600 mt-1" />
//               <div>
//                 <p className="text-sm text-gray-600">Blood Group</p>
//                 <p className="text-lg font-semibold text-gray-900">{patient.bloodGroup}</p>
//               </div>
//             </div>
//             <div className="flex items-start gap-3">
//               <Phone className="w-5 h-5 text-blue-600 mt-1" />
//               <div>
//                 <p className="text-sm text-gray-600">Phone</p>
//                 <p className="text-lg font-semibold text-gray-900">{patient.phone}</p>
//               </div>
//             </div>
//             <div className="flex items-start gap-3">
//               <Calendar className="w-5 h-5 text-blue-600 mt-1" />
//               <div>
//                 <p className="text-sm text-gray-600">Admission Date</p>
//                 <p className="text-lg font-semibold text-gray-900">
//                   {patient.admissionDate !== 'N/A' ? new Date(patient.admissionDate).toLocaleDateString() : 'N/A'}
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-start gap-3">
//               <Clock className="w-5 h-5 text-blue-600 mt-1" />
//               <div>
//                 <p className="text-sm text-gray-600">Last Visit</p>
//                 <p className="text-lg font-semibold text-gray-900">
//                   {patient.lastVisit !== 'N/A' ? new Date(patient.lastVisit).toLocaleDateString() : 'N/A'}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {patient.address && patient.address !== 'N/A' && (
//             <div className="mt-6 pt-6 border-t border-gray-200">
//               <p className="text-sm text-gray-600 mb-1">Address</p>
//               <p className="text-lg text-gray-900">{patient.address}</p>
//             </div>
//           )}

//           {patient.emergencyContact && patient.emergencyContact !== 'N/A' && (
//             <div className="mt-4">
//               <p className="text-sm text-gray-600 mb-1">Emergency Contact</p>
//               <p className="text-lg text-gray-900">{patient.emergencyContact}</p>
//             </div>
//           )}
//         </div>

//         {/* Medical History */}
//         {patient.medicalHistory && patient.medicalHistory.length > 0 && (
//           <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
//               <FileText className="w-6 h-6 text-blue-600" />
//               Medical History
//             </h2>
//             <div className="space-y-4">
//               {patient.medicalHistory.map((entry, index) => (
//                 <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
//                   <div className="flex justify-between items-start mb-1">
//                     <p className="font-semibold text-gray-900">{entry.description}</p>
//                     <span className="text-sm text-gray-500">
//                       {new Date(entry.date).toLocaleDateString()}
//                     </span>
//                   </div>
//                   <p className="text-sm text-gray-600">Dr. {entry.doctor}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Medications */}
//         {patient.medications && patient.medications.length > 0 && (
//           <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
//               <Activity className="w-6 h-6 text-blue-600" />
//               Current Medications
//             </h2>
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Medication
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Dosage
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Frequency
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Start Date
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {patient.medications.map((med, index) => (
//                     <tr key={index} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                         {med.name}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                         {med.dosage}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                         {med.frequency}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                         {new Date(med.startDate).toLocaleDateString()}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {/* Lab Results */}
//         {patient.labResults && patient.labResults.length > 0 && (
//           <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
//               <Activity className="w-6 h-6 text-blue-600" />
//               Lab Results
//             </h2>
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Test
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Result
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Date
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Status
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {patient.labResults.map((result, index) => (
//                     <tr key={index} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                         {result.test}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                         {result.result}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                         {new Date(result.date).toLocaleDateString()}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getResultStatusBadge(result.status)}`}>
//                           {result.status}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PatientDetail;


import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { I } from "../icons/icons";

export default function PatientDetail() {
  const { user, selPatient, setPage } = useAuth();
  const [notes, setNotes] = useState("");

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

  const summary = {
    chiefComplaint: selPatient.issue || "General consultation",
    duration: "2–3 days",
    severity: "Moderate",
    allergies: "No known drug allergies",
    history: "Previous intermittent symptoms, no major prior admissions reported.",
    aiSummary:
      "The patient reports symptoms relevant to the selected consultation. Structured intake suggests moderate urgency and likely need for physician review. Uploaded reports and history should be reviewed before final assessment.",
  };

  const reports = [
    { id: 1, name: "Blood Test Report.pdf", type: "Lab Report", date: "2025-03-10", size: "1.2 MB" },
    { id: 2, name: "ECG Report.pdf", type: "Cardiology", date: "2025-03-02", size: "0.8 MB" },
  ];

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

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h3 className="font-bold text-slate-800 mb-4">Actions</h3>
              <div className="space-y-3">
                <button
                  className="w-full text-left p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-all"
                >
                  <p className="text-sm font-semibold text-slate-700">Mark Consultation Started</p>
                  <p className="text-xs text-slate-400 mt-1">Update patient consultation status</p>
                </button>

                <button
                  className="w-full text-left p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-all"
                >
                  <p className="text-sm font-semibold text-slate-700">Call Next Patient</p>
                  <p className="text-xs text-slate-400 mt-1">Move queue forward after this case</p>
                </button>

                <button
                  onClick={() => setPage("patients")}
                  className="w-full text-left p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-all"
                >
                  <p className="text-sm font-semibold text-slate-700">Back to Patients</p>
                  <p className="text-xs text-slate-400 mt-1">Return to patient list</p>
                </button>
              </div>
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
}