// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError('');

//     if (!username || !password) {
//       setError('Please fill in all fields');
//       return;
//     }

//     const success = login(username, password);
//     if (success) {
//       navigate('/profile');
//     } else {
//       setError('Invalid credentials');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
//       <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">Hospital Management</h1>
//           <p className="text-gray-600">Sign in to your account</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
//               {error}
//             </div>
//           )}

//           <div>
//             <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
//               Username
//             </label>
//             <input
//               id="username"
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
//               placeholder="Enter username"
//             />
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
//               placeholder="Enter password"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg"
//           >
//             Sign In
//           </button>
//         </form>

//         <div className="mt-6 text-center">
//           <p className="text-gray-600">
//             Don't have an account?{' '}
//             <Link to="/register" className="text-blue-600 hover:text-blue-700 font-semibold">
//               Register here
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { setPage, setUser } = useAuth();
  const [form, setForm] = useState({ email: "", password: "", role: "patient" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handle = () => {
    if (!form.email || !form.password) {
      setErr("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setErr("");

    setTimeout(() => {
      const name = form.role === "doctor" ? "Dr. Priya Basnet" : "Anish Shrestha";
      setUser({ name, email: form.email, role: form.role });
      setPage(form.role === "doctor" ? "doctor-dashboard" : "home");
    }, 700);
  };

  return (
    <div
      className="min-h-screen pt-[60px] flex items-center justify-center px-4"
      style={{ background: "linear-gradient(160deg,#eaf2fb,#edf8f1)" }}
    >
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl font-black mx-auto mb-4 shadow-xl"
            style={{ background: "linear-gradient(135deg,#1a3f6f,#1a6e3c)" }}
          >
            M
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Welcome back</h1>
          <p className="text-slate-400 text-sm mt-1">Sign in to MEDIWO</p>
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

          <div className="space-y-4">
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
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Enter your password"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>

            {err && (
              <div className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
                {err}
              </div>
            )}
          </div>

          <button
            onClick={handle}
            disabled={loading}
            className="w-full mt-5 py-3 text-white font-semibold rounded-xl text-sm hover:opacity-90 disabled:opacity-50 shadow-md shadow-blue-100 transition-all"
            style={{ background: "linear-gradient(135deg,#1a3f6f,#2874A6)" }}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>

          <p className="text-center text-sm text-slate-400 mt-5">
            Don&apos;t have an account?{" "}
            <button onClick={() => setPage("register")} className="font-semibold text-blue-700">
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}