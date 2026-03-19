// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import UserDetailsModal from '../components/UserDetailsModal';

// const Profile = () => {
//   const { user } = useAuth();
//   const location = useLocation();
//   const [showModal, setShowModal] = useState(false);
//   const [patientData, setPatientData] = useState([]);

//   useEffect(() => {
//     // Show modal if user just registered and hasn't completed additional details
//     if (user && !user.additionalDetailsCompleted) {
//       setShowModal(true);
//     }
//   }, [user]);

//   useEffect(() => {
//     // Load patientData from localStorage whenever location changes (navigation to profile)
//     const loadPatientData = () => {
//       const storedPatientData = localStorage.getItem('patientData');
//       if (storedPatientData) {
//         setPatientData(JSON.parse(storedPatientData));
//       } else {
//         setPatientData([]);
//       }
//     };

//     loadPatientData();
//   }, [location.pathname]);


//   if (!user) {
//     return null;
//   }

//   const getRoleBadgeColor = (role) => {
//     switch (role) {
//       case 'DOCTOR':
//         return 'bg-blue-100 text-blue-800';
//       case 'PATIENT':
//         return 'bg-purple-100 text-purple-800';
//       case 'NURSE':
//         return 'bg-green-100 text-green-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   // Determine which image to use based on role
//   const getProfileImage = () => {
//     if (user.role === 'DOCTOR') {
//       return '/images/doctor.jpg';
//     } else if (user.role === 'PATIENT') {
//       return '/images/patient.jpg';
//     }
//     return '/images/patient.jpg'; // default
//   };

//   return (
//     <>
//     {showModal && <UserDetailsModal isOpen={showModal} onClose={() => setShowModal(false)} />}
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* User Profile Card */}
//         <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
//           <div className="flex justify-center items-center gap-6 mb-6">
//             {/* Profile Image */}
//             <div className="flex-shrink-0">
//               <img
//                 src={getProfileImage()}
//                 alt="Profile"
//                 className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 shadow-lg"
//                 onError={(e) => {
//                   e.target.src = 'https://via.placeholder.com/128';
//                 }}
//               />
//             </div>

//             <div className='flex-1 flex justify-between'>
//             <div className="flex flex-col justify-center">
//               <div className="flex items-center space-x-3 mb-2">
//                 <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
//                 <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getRoleBadgeColor(user.role)}`}>
//                   {user.role}
//                 </span>
//               </div>
//               <p className="text-gray-600">{user.position || 'Staff Member'}</p>
//               </div>
//               <div>
//                 <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">Edit Profile</button>
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-4">
//               <div>
//                 <label className="text-sm font-medium text-gray-500">Phone Number</label>
//                 <p className="text-lg text-gray-800">{user.phone || 'N/A'}</p>
//               </div>
//               <div>
//                 <label className="text-sm font-medium text-gray-500">Hospital Name</label>
//                 <p className="text-lg text-gray-800">{user.hospitalName || 'N/A'}</p>
//               </div>
//               {user.birthday && (
//                 <div>
//                   <label className="text-sm font-medium text-gray-500">Birthday</label>
//                   <p className="text-lg text-gray-800">{new Date(user.birthday).toLocaleDateString()}</p>
//                 </div>
//               )}
//               {user.sex && (
//                 <div>
//                   <label className="text-sm font-medium text-gray-500">Sex</label>
//                   <p className="text-lg text-gray-800">{user.sex}</p>
//                 </div>
//               )}
//             </div>

//             <div className="space-y-4">
//               {user.location && (
//                 <div>
//                   <label className="text-sm font-medium text-gray-500">Location</label>
//                   <p className="text-lg text-gray-800">{user.location}</p>
//                 </div>
//               )}
//               {user.nationality && (
//                 <div>
//                   <label className="text-sm font-medium text-gray-500">Nationality</label>
//                   <p className="text-lg text-gray-800">{user.nationality}</p>
//                 </div>
//               )}
//               {user.religion && (
//                 <div>
//                   <label className="text-sm font-medium text-gray-500">Religion</label>
//                   <p className="text-lg text-gray-800">{user.religion}</p>
//                 </div>
//               )}
//               {user.bloodGroup && (
//                 <div>
//                   <label className="text-sm font-medium text-gray-500">Blood Group</label>
//                   <p className="text-lg text-gray-800">{user.bloodGroup}</p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {user.address && (
//             <div className="mt-6 pt-6 border-t border-gray-200">
//               <label className="text-sm font-medium text-gray-500">Address</label>
//               <p className="text-lg text-gray-800">{user.address}</p>
//             </div>
//           )}

//           {user.emergencyContact && (
//             <div className="mt-4">
//               <label className="text-sm font-medium text-gray-500">Emergency Contact</label>
//               <p className="text-lg text-gray-800">{user.emergencyContact}</p>
//             </div>
//           )}
//         </div>

//         {/* Patients Section (for DOCTOR role) */}
//         {user.role === 'DOCTOR' && user.patients && user.patients.length > 0 && (
//           <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
//             <h3 className="text-2xl font-bold text-gray-800 mb-6">My Patients</h3>
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Name
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Age
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Condition
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Admission Date
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {user.patients.map((patient) => (
//                     <tr key={patient.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                         {patient.name}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {patient.age}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
//                           {patient.condition}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {new Date(patient.admissionDate).toLocaleDateString()}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {/* Patient Data Section (Reports/Images) */}
//         {patientData && patientData.length > 0 && (
//           <div className="bg-white rounded-2xl shadow-xl p-8">
//             <h3 className="text-2xl font-bold text-gray-800 mb-6">Patient Reports & Documents</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {patientData.map((item, index) => (
//                 <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition">
//                   <div className="mb-4">
//                     <img
//                       src={item.image}
//                       alt={item.title}
//                       className="w-full h-48 object-cover rounded-lg"
//                       onError={(e) => {
//                         e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
//                       }}
//                     />
//                   </div>
//                   <h4 className="font-semibold text-lg text-gray-800 mb-2">{item.title}</h4>
//                   {item.description && (
//                     <p className="text-sm text-gray-600 mb-2">{item.description}</p>
//                   )}
//                   {item.date && (
//                     <p className="text-xs text-gray-500">Date: {new Date(item.date).toLocaleDateString()}</p>
//                   )}
//                   {item.patientName && (
//                     <p className="text-xs text-gray-500 mt-1">Patient: {item.patientName}</p>
//                   )}
//                   {item.reportType && (
//                     <span className="inline-block mt-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
//                       {item.reportType}
//                     </span>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//       </div>
//       </>
//   );
// };

// export default Profile;


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