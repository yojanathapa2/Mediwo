// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Register = () => {
//   const [ formData, setFormData ] = useState({
//     username: '',
//     password: '',
//     name: '',
//     phone: '',
//     role: ''
//   });
//   const [ error, setError ] = useState('');
//   const { register } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [ e.target.name ]: e.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError('');

//     if (!formData.username || !formData.password || !formData.name || !formData.phone || !formData.role) {
//       setError('Please fill in all required fields');
//       return;
//     }

//     const success = register(formData);
//     if (success) {
//       navigate('/profile');
//     } else {
//       setError('Registration failed');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
//       <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
//           <p className="text-gray-600">Register for Hospital Management System</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
//               {error}
//             </div>
//           )}

//           <div>
//             <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
//               Username *
//             </label>
//             <input
//               id="username"
//               name="username"
//               type="text"
//               value={formData.username}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
//               placeholder="Enter username"
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//               Password *
//             </label>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
//               placeholder="Enter password"
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
//               Full Name *
//             </label>
//             <input
//               id="name"
//               name="name"
//               type="text"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
//               placeholder="Enter full name"
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
//               Phone Number *
//             </label>
//             <input
//               id="phone"
//               name="phone"
//               type="tel"
//               value={formData.phone}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
//               placeholder="Enter phone number"
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
//               Role *
//             </label>
//             <select
//               id="role"
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
//               required
//             >
//               <option value="">Select role</option>
//               <option value="DOCTOR">Doctor</option>
//               <option value="PATIENT">Patient</option>
//             </select>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg"
//           >
//             Register
//           </button>
//         </form>

//         <div className="mt-6 text-center">
//           <p className="text-gray-600">
//             Already have an account?{' '}
//             <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
//               Sign in here
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;


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