
import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Upload() {
  const { setPage } = useAuth();

  return (
    <div className="min-h-screen pt-[60px] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 text-center max-w-md">
        <div className="text-4xl mb-4">📋</div>
        <h1 className="text-xl font-bold text-slate-800 mb-2">Upload moved to Profile</h1>
        <p className="text-sm text-slate-400 mb-5">
          In the Claude UI, medical report upload is inside the patient profile.
        </p>
        <button
          onClick={() => setPage("profile")}
          className="px-6 py-2.5 text-white rounded-xl text-sm font-semibold"
          style={{ background: "linear-gradient(135deg,#1a3f6f,#2874A6)" }}
        >
          Go to Profile
        </button>
      </div>
    </div>
  );
}