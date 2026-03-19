
import React, { useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { HOSPITALS } from "../data/hospitals";
import { DOCTORS } from "../data/doctors";
import { I } from "../icons/icons";

function Badge({ label, color = "gray" }) {
  const styles = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-emerald-50 text-emerald-700",
    orange: "bg-amber-50 text-amber-700",
    purple: "bg-purple-50 text-purple-700",
    gray: "bg-slate-100 text-slate-600",
  };

  return (
    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${styles[color]}`}>
      {label}
    </span>
  );
}

function HospitalsView() {
  const { setPage, setSelHospital } = useAuth();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const filtered = useMemo(() => {
    return HOSPITALS.filter((h) => {
      const matchSearch =
        h.name.toLowerCase().includes(search.toLowerCase()) ||
        h.location.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === "All" || h.type === typeFilter;
      return matchSearch && matchType;
    });
  }, [search, typeFilter]);

  return (
    <div className="min-h-screen pt-[60px]" style={{ background: "#f7f9fc" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-7">
          <h1 className="text-2xl font-bold text-slate-800 mb-1">Find a Hospital</h1>
          <p className="text-slate-400 text-sm">Book appointments at hospitals across Nepal</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-4 mb-6 shadow-sm flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              <I.Search />
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search hospitals..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
            />
          </div>

          <div className="flex gap-2">
            {["All", "Government", "Private"].map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  typeFilter === t
                    ? "text-white shadow-sm"
                    : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                }`}
                style={
                  typeFilter === t
                    ? { background: "linear-gradient(135deg,#1a3f6f,#2874A6)" }
                    : {}
                }
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {filtered.map((h) => (
            <div
              key={h.id}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-lg transition-all"
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: h.type === "Government" ? "#eef4fb" : "#edf8f1" }}
                  >
                    <span className="text-lg">{h.type === "Government" ? "🏛️" : "🏥"}</span>
                  </div>
                  <Badge label={h.type} color={h.type === "Government" ? "blue" : "green"} />
                </div>

                <h3 className="text-lg font-bold text-slate-800 mb-1">{h.name}</h3>

                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
                  <I.MapPin />
                  <span>{h.location}</span>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <span className="flex items-center gap-1 text-xs font-semibold text-yellow-500">
                    <I.Star />
                    <span className="text-slate-700">{h.rating}</span>
                  </span>
                  <span className="text-slate-200">|</span>
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <I.Clock />~{h.waitTime}
                  </div>
                  <span className="text-slate-200">|</span>
                  <span className="text-xs text-slate-400">{h.totalDoctors} doctors</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {h.specialties.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="text-xs px-2.5 py-1 rounded-full bg-slate-50 text-slate-500 border border-slate-100"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="px-5 pb-5">
                <button
                  onClick={() => {
                    setSelHospital(h);
                    setPage("book-appointment");
                  }}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg,#1a3f6f,#2874A6)" }}
                >
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BookAppointmentView() {
  const { selHospital, setPage, setBookingResult } = useAuth();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [step, setStep] = useState(1);

  const doctors = selHospital ? DOCTORS[selHospital.id] || [] : [];

  if (!selHospital) {
    return (
      <div className="min-h-screen pt-[60px] flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500 mb-4">No hospital selected.</p>
          <button
            onClick={() => setPage("hospitals")}
            className="px-5 py-2.5 rounded-xl text-white font-semibold"
            style={{ background: "linear-gradient(135deg,#1a3f6f,#2874A6)" }}
          >
            Go to Hospitals
          </button>
        </div>
      </div>
    );
  }

  const handleConfirm = () => {
    if (!selectedDoctor || !selectedSlot || !selectedDate) return;

    setBookingResult({
      hospital: selHospital,
      doctor: selectedDoctor,
      date: selectedDate,
      time: selectedSlot,
      token: "A-017",
      queueAhead: 5,
      estimatedWait: "30 min",
      room: "Cardio OPD - 3",
    });

    setPage("queue-confirmation");
  };

  return (
    <div className="min-h-screen pt-[60px]" style={{ background: "#f7f9fc" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <button
          onClick={() => setPage("hospitals")}
          className="text-sm text-blue-700 font-medium hover:underline mb-5"
        >
          ← Back to Hospitals
        </button>

        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm mb-6">
          <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Selected Hospital</p>
          <h1 className="text-2xl font-bold text-slate-800">{selHospital.name}</h1>
          <p className="text-sm text-slate-400 mt-1">{selHospital.location}</p>
        </div>

        <div className="flex items-center gap-3 mb-6">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= s ? "text-white" : "bg-slate-100 text-slate-400"
                }`}
                style={step >= s ? { background: "linear-gradient(135deg,#1a3f6f,#2874A6)" } : {}}
              >
                {s}
              </div>
              {s < 3 && <div className="w-10 h-[2px] bg-slate-200"></div>}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h2 className="font-bold text-slate-800 mb-4">Choose Doctor</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {doctors.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDoctor(d)}
                  className={`text-left p-5 rounded-2xl border transition-all ${
                    selectedDoctor?.id === d.id
                      ? "border-blue-200 bg-blue-50"
                      : "border-slate-100 bg-white hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-slate-800">{d.name}</h3>
                      <p className="text-sm text-slate-500">{d.specialty}</p>
                    </div>
                    <Badge label={d.available ? "Available" : "Offline"} color={d.available ? "green" : "gray"} />
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{d.experience}</span>
                    <span className="font-semibold text-slate-700">{d.fee}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-end mt-5">
              <button
                onClick={() => selectedDoctor && setStep(2)}
                className="px-5 py-2.5 rounded-xl text-white font-semibold disabled:opacity-50"
                disabled={!selectedDoctor}
                style={{ background: "linear-gradient(135deg,#1a3f6f,#2874A6)" }}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h2 className="font-bold text-slate-800 mb-4">Choose Date & Time</h2>

            <div className="mb-5">
              <label className="block text-sm font-medium text-slate-600 mb-2">Appointment Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full md:w-[280px] px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-3">Available Slots</label>
              <div className="flex flex-wrap gap-3">
                {selectedDoctor?.slots?.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                      selectedSlot === slot
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium"
              >
                Back
              </button>

              <button
                onClick={() => selectedDate && selectedSlot && setStep(3)}
                disabled={!selectedDate || !selectedSlot}
                className="px-5 py-2.5 rounded-xl text-white font-semibold disabled:opacity-50"
                style={{ background: "linear-gradient(135deg,#1a3f6f,#2874A6)" }}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h2 className="font-bold text-slate-800 mb-4">Confirm Appointment</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-xs text-slate-400 mb-1">Hospital</p>
                <p className="font-semibold text-slate-700">{selHospital.name}</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-xs text-slate-400 mb-1">Doctor</p>
                <p className="font-semibold text-slate-700">{selectedDoctor?.name}</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-xs text-slate-400 mb-1">Date</p>
                <p className="font-semibold text-slate-700">{selectedDate || "—"}</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-xs text-slate-400 mb-1">Time</p>
                <p className="font-semibold text-slate-700">{selectedSlot || "—"}</p>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium"
              >
                Back
              </button>

              <button
                onClick={handleConfirm}
                className="px-5 py-2.5 rounded-xl text-white font-semibold"
                style={{ background: "linear-gradient(135deg,#1a3f6f,#2874A6)" }}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function QueueConfirmationView() {
  const { bookingResult, setPage } = useAuth();

  if (!bookingResult) {
    return (
      <div className="min-h-screen pt-[60px] flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500 mb-4">No booking found.</p>
          <button
            onClick={() => setPage("hospitals")}
            className="px-5 py-2.5 rounded-xl text-white font-semibold"
            style={{ background: "linear-gradient(135deg,#1a3f6f,#2874A6)" }}
          >
            Go to Hospitals
          </button>
        </div>
      </div>
    );
  }

  const b = bookingResult;

  return (
    <div className="min-h-screen pt-[60px]" style={{ background: "#f7f9fc" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div
          className="rounded-3xl p-6 text-white shadow-xl mb-6"
          style={{ background: "linear-gradient(135deg,#1a3f6f,#1a6e3c)" }}
        >
          <div className="flex items-center justify-between gap-4 mb-5">
            <div>
              <p className="text-xs uppercase tracking-wider opacity-80 mb-1">Appointment Confirmed</p>
              <h1 className="text-2xl font-bold">Queue Token Generated</h1>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center">
              <I.Check />
            </div>
          </div>

          <div className="rounded-2xl bg-white/10 p-5 mb-5">
            <p className="text-xs uppercase tracking-wider opacity-80 mb-1">Your Token</p>
            <p className="text-5xl font-black tracking-tight">{b.token}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-xl bg-white/10 p-4">
              <p className="text-xs opacity-80 mb-1">Queue Ahead</p>
              <p className="font-bold text-lg">{b.queueAhead}</p>
            </div>
            <div className="rounded-xl bg-white/10 p-4">
              <p className="text-xs opacity-80 mb-1">Estimated Wait</p>
              <p className="font-bold text-lg">{b.estimatedWait}</p>
            </div>
            <div className="rounded-xl bg-white/10 p-4">
              <p className="text-xs opacity-80 mb-1">Room</p>
              <p className="font-bold text-lg">{b.room}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6">
          <h2 className="font-bold text-slate-800 mb-4">Booking Details</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Hospital</span>
              <span className="font-medium text-slate-700">{b.hospital.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Doctor</span>
              <span className="font-medium text-slate-700">{b.doctor.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Specialty</span>
              <span className="font-medium text-slate-700">{b.doctor.specialty}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Date</span>
              <span className="font-medium text-slate-700">{b.date}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Time</span>
              <span className="font-medium text-slate-700">{b.time}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setPage("profile")}
            className="flex-1 py-3 rounded-xl text-white font-semibold"
            style={{ background: "linear-gradient(135deg,#1a3f6f,#2874A6)" }}
          >
            Go to Profile
          </button>
          <button
            onClick={() => setPage("hospitals")}
            className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 font-medium"
          >
            Book Another
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Appointment() {
  const { page } = useAuth();

  if (page === "book-appointment") return <BookAppointmentView />;
  if (page === "queue-confirmation") return <QueueConfirmationView />;
  return <HospitalsView />;
}