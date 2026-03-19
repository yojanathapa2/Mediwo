// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { Stethoscope, User, FileText, Calendar, Clock, Heart } from 'lucide-react';
// import Navbar from '../components/Navbar';

// const Home = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const features = [
//     {
//       icon: <FileText className="w-8 h-8" />,
//       title: 'Medical Records',
//       description: 'Upload and manage your medical documents securely'
//     },
//     {
//       icon: <Stethoscope className="w-8 h-8" />,
//       title: 'Doctor Access',
//       description: 'Doctors can view and manage patient records efficiently'
//     },
//     {
//       icon: <Calendar className="w-8 h-8" />,
//       title: 'Appointment Bookings',
//       description: 'Secure your appointment, generate your digital token number, and track your live queue status instantly.',
//       path: '/appointment', // This links to your new feature
//       highlight: true // Optional flag to style it differently
//     },
//     {
//       icon: <Clock className="w-8 h-8" />,
//       title: '24/7 Access',
//       description: 'Access your records anytime, anywhere'
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50">
//       <Navbar />
//       {/* Hero Section */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="text-center mb-16">
//           <div className="flex justify-center mb-6">
//             <Heart className="w-16 h-16 text-blue-600" />
//           </div>
//           <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
//             Welcome to <span className="text-blue-600">Mediwo</span>
//           </h1>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
//             Your trusted Hospital Management System for seamless healthcare management
//           </p>
          
//           {user ? (
//             <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//               <button
//                 onClick={() => navigate('/profile')}
//                 className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-lg hover:shadow-xl text-lg"
//               >
//                 Go to Profile
//               </button>
//               {user.role === 'PATIENT' && (
//                 <button
//                   onClick={() => navigate('/upload')}
//                   className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition duration-200 shadow-lg hover:shadow-xl text-lg"
//                 >
//                   Upload Records
//                 </button>
//               )}
//             </div>
//           ) : (
//             <></>
//           )}
//         </div>

//         {/* Features Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               onClick={() => feature.path && navigate(feature.path)}
//               className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition duration-200 border border-gray-100"
//             >
//               <div className="text-blue-600 mb-4">{feature.icon}</div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
//               <p className="text-gray-600">{feature.description}</p>
//             </div>
//           ))}
//         </div>

//         {/* User Type Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
//           {/* Patient Card */}
//           <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-200">
//             <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
//               <User className="w-24 h-24 text-white opacity-90" />
//             </div>
//             <div className="p-6">
//               <h3 className="text-2xl font-bold text-gray-900 mb-3">For Patients</h3>
//               <p className="text-gray-600 mb-4">
//                 Upload and manage your medical records, track your health history, and share documents with your healthcare providers.
//               </p>
//               {!user && (
//                 <Link
//                   to="/register"
//                   className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
//                 >
//                   Register as Patient
//                 </Link>
//               )}
//             </div>
//           </div>

//           {/* Doctor Card */}
//           <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-200">
//             <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
//               <Stethoscope className="w-24 h-24 text-white opacity-90" />
//             </div>
//             <div className="p-6">
//               <h3 className="text-2xl font-bold text-gray-900 mb-3">For Doctors</h3>
//               <p className="text-gray-600 mb-4">
//                 Access patient records, review medical documents, and provide comprehensive healthcare management for your patients.
//               </p>
//               {!user && (
//                 <Link
//                   to="/register"
//                   className="inline-block px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
//                 >
//                   Register as Doctor
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Additional Info Section */}
//         {user && (
//           <div className="mt-16 bg-blue-50 rounded-2xl p-8 text-center">
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">
//               Welcome back, {user.username || user.name}!
//             </h2>
//             <p className="text-gray-600 text-lg">
//               You are logged in as a <span className="font-semibold text-blue-600">{user.role}</span>
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;

import React from "react";
import { useAuth } from "../context/AuthContext";
import { I } from "../icons/icons";

export default function Home() {
  const { setPage, user } = useAuth();

  const features = [
    {
      icon: "🏥",
      title: "Hospital Booking",
      desc: "Browse government and private hospitals, check availability, and book in seconds.",
      action: () => setPage("hospitals"),
      cta: "Browse Hospitals",
      color: "#1a3f6f",
      lightBg: "#eaf0f8",
    },
    {
      icon: "🩺",
      title: "Doctor Appointments",
      desc: "Choose your specialist, pick a convenient time slot, and get a confirmed booking.",
      action: () => setPage("hospitals"),
      cta: "Book a Doctor",
      color: "#1a6e3c",
      lightBg: "#e8f5ee",
    },
    {
      icon: "📋",
      title: "Medical Report Upload",
      desc: "Securely upload lab reports, X-rays, and health documents from your profile.",
      action: () => (user ? setPage("profile") : setPage("login")),
      cta: "Upload Reports",
      color: "#0e6b88",
      lightBg: "#e4f3f8",
    },
    {
      icon: "🎫",
      title: "Live Queue Status",
      desc: "Track your token number and estimated wait time in real-time from anywhere.",
      action: () => (user ? setPage("profile") : setPage("login")),
      cta: "Check Queue",
      color: "#7c3d8f",
      lightBg: "#f3eaf8",
    },
  ];

  return (
    <div className="min-h-screen pt-[60px]" style={{ background: "#f7f9fc" }}>
      <section
        className="flex flex-col items-center justify-center text-center px-6 py-28 relative overflow-hidden"
        style={{
          minHeight: "88vh",
          background: "linear-gradient(160deg,#eaf2fb 0%,#edf8f1 60%,#f7f9fc 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle, #b8d0e8 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        ></div>

        <div className="relative z-10 flex flex-col items-center">
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center text-white text-4xl font-black shadow-2xl mb-8 select-none"
            style={{
              background: "linear-gradient(135deg,#1a3f6f 0%,#1a6e3c 100%)",
              boxShadow: "0 20px 60px rgba(26,63,111,0.25)",
            }}
          >
            M
          </div>

          <h1
            className="font-black text-5xl sm:text-7xl tracking-tighter mb-3 select-none"
            style={{ color: "#1a3f6f", letterSpacing: "-0.05em", lineHeight: 1 }}
          >
            MEDIWO
          </h1>
          <p
            className="text-base sm:text-lg font-medium mb-2"
            style={{ color: "#1a6e3c", letterSpacing: "0.15em" }}
          >
            MEDICAL WORKFLOW OPTIMIZATION
          </p>
          <p className="text-slate-500 text-sm sm:text-base max-w-sm mt-2 leading-relaxed">
            Connecting patients to healthcare — seamlessly, securely, and with dignity.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 mt-10">
            {user ? (
              <button
                onClick={() => setPage("hospitals")}
                className="flex items-center gap-2 px-8 py-3.5 text-white font-semibold rounded-2xl text-sm hover:opacity-90 transition-all shadow-lg shadow-blue-200"
                style={{ background: "linear-gradient(135deg,#1a3f6f,#2874A6)" }}
              >
                Go to Hospitals <I.Arrow />
              </button>
            ) : (
              <>
                <button
                  onClick={() => setPage("register")}
                  className="flex items-center gap-2 px-8 py-3.5 text-white font-semibold rounded-2xl text-sm hover:opacity-90 transition-all shadow-lg shadow-blue-200"
                  style={{ background: "linear-gradient(135deg,#1a3f6f,#2874A6)" }}
                >
                  Get Started <I.Arrow />
                </button>
                <button
                  onClick={() => setPage("login")}
                  className="px-8 py-3.5 font-semibold rounded-2xl text-sm border-2 transition-all hover:bg-white"
                  style={{ color: "#1a3f6f", borderColor: "#b8d0e8" }}
                >
                  Sign In
                </button>
              </>
            )}
          </div>

          {!user && (
            <div className="flex items-center gap-4 mt-6 text-sm text-slate-400">
              <button
                onClick={() => setPage("register")}
                className="flex items-center gap-1.5 hover:text-slate-600 transition-colors"
              >
                <span>👤</span> Register as Patient
              </button>
              <span className="text-slate-200">·</span>
              <button
                onClick={() => setPage("register")}
                className="flex items-center gap-1.5 hover:text-slate-600 transition-colors"
              >
                <span>🩺</span> Register as Doctor
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <h2
            className="text-2xl font-bold text-slate-800 mb-2"
            style={{ letterSpacing: "-0.02em" }}
          >
            Everything in one place
          </h2>
          <p className="text-slate-400 text-sm">Click any feature to get started</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {features.map((f) => (
            <button
              key={f.title}
              onClick={f.action}
              className="group text-left p-6 rounded-2xl border border-slate-100 bg-white hover:shadow-xl hover:border-slate-200 transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ background: f.lightBg }}
                >
                  {f.icon}
                </div>
                <span className="p-2 rounded-lg bg-slate-50 text-slate-300 group-hover:bg-blue-50 group-hover:text-blue-500 transition-all">
                  <I.Arrow />
                </span>
              </div>
              <h3 className="font-bold text-slate-800 mb-1.5" style={{ fontSize: 15 }}>
                {f.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">{f.desc}</p>
              <span
                className="text-xs font-semibold px-3 py-1.5 rounded-full inline-block transition-colors"
                style={{ background: f.lightBg, color: f.color }}
              >
                {f.cta} →
              </span>
            </button>
          ))}
        </div>
      </section>

      <footer className="py-8 text-center border-t border-slate-100">
        <div className="flex items-center justify-center gap-2 mb-1.5">
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-xs font-black"
            style={{ background: "linear-gradient(135deg,#1a3f6f,#1a6e3c)" }}
          >
            M
          </div>
          <span className="font-black text-sm text-slate-700">MEDIWO</span>
        </div>
        <p className="text-slate-400 text-xs">
          © 2025 MEDIWO — Medical Workflow Optimization · Nepal
        </p>
      </footer>
    </div>
  );
}
