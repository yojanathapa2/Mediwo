import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Clock, FileText, Calendar, Stethoscope, ShieldCheck, Zap, MessageSquare, Brain, Heart, User } from 'lucide-react';
import Navbar from '../components/Navbar';

import React from "react";
import { useAuth } from "../context/AuthContext";
import { I } from "../icons/icons";

export default function Home() {
  const { setPage, user } = useAuth();

  const features = [
    {
      icon: <FileText className="w-8 h-8 text-blue-600" />,
      title: 'Unified Health Portfolio (EII)',
      description: 'Instantly upload and securely store all scattered medical documents (reports, prescriptions, scans) to create a single, comprehensive digital record accessible 24/7.',
    },
    {
      icon: <Calendar className="w-8 h-8 text-indigo-600" />,
      title: 'Digital Queue Management',
      description: 'Secure your spot instantly, generate your digital token number, and track your live queue status and estimated wait time directly from your phone.',
      highlight: true // Primary patient benefit feature
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-green-600" />,
      title: 'Adaptive AI Intake (Pre-Consultation)',
      description: 'While you wait, interact with an intelligent, dynamic questionnaire that gathers structured symptoms and history, saving valuable consultation time.',
    },

    {
      icon: <Brain className="w-8 h-8 text-red-600" />,
      title: 'Intelligent Clinical Summary',
      description: 'The AI synthesizes your current symptoms with critical historical data (allergies, failed treatments) into a concise, physician-ready report, reducing diagnostic error risk.',
      highlight: true // Primary doctor benefit feature
    },
    {
      icon: <Stethoscope className="w-8 h-8 text-purple-600" />,
      title: 'AI-Assisted Documentation Co-Pilot',
      description: 'Utilizes medical speech-to-text to draft structured SOAP notes automatically, drastically cutting down on post-consultation charting and administrative work.',
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-600" />,
      title: 'Context-Aware Smart Autocomplete',
      description: 'The system learns from doctor-patient interactions (RL) to provide highly accurate, context-relevant suggestions for medication, codes, and treatment plans.',
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-gray-600" />,
      title: 'Secure & Compliant Data Handling',
      description: 'Ensures enterprise-grade security with end-to-end encryption, strict access control, and adherence to medical privacy standards (e.g., HIPAA feasibility).',
    },
    {
      icon: <Clock className="w-8 h-8 text-pink-600" />,
      title: 'Continuous System Improvement (RL)',
      description: 'The platform self-improves by learning from doctor feedback (acceptance/modification of suggestions) ensuring smarter templates and higher accuracy over time.',
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50">
      {!user && <Navbar />}
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Heart className="w-16 h-16 text-blue-600" />
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

          {user ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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

        {/* User Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Patient Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-200">
            <div className="h-48 bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <User className="w-24 h-24 text-white opacity-90" />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">For Patients</h3>
              <p className="text-gray-600 mb-4">
                Upload and manage your medical records, track your health history, and share documents with your healthcare providers.
              </p>
              {!user && (
                <Link
                  to="/register"
                  className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Register as Patient
                </Link>
              )}
            </div>
          </div>

          {/* Doctor Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-200">
            <div className="h-48 bg-linear-to-br from-green-400 to-green-600 flex items-center justify-center">
              <Stethoscope className="w-24 h-24 text-white opacity-90" />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">For Doctors</h3>
              <p className="text-gray-600 mb-4">
                Access patient records, review medical documents, and provide comprehensive healthcare management for your patients.
              </p>
              {!user && (
                <Link
                  to="/register"
                  className="inline-block px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
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
};

export default Home;
