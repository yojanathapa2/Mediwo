import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Building2, 
  Stethoscope, 
  Heart, 
  Bone, 
  Baby, 
  Ear, 
  Activity,
  User,
  Star,
  Calendar,
  Clock,
  CheckCircle,
  ChevronRight,
  Users,
  Hash,
  CreditCard,
  ArrowLeft,
  ShieldCheck,
  Wallet,
  MapPin,
  Printer
} from 'lucide-react';
import { Link } from 'react-router-dom';

// --- MOCK DATA ---
const HOSPITALS = [
  { id: 1, name: 'T.U. Teaching Hospital', location: 'Maharajgunj', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400' },
  { id: 2, name: 'Bir Hospital', location: 'Tundikhel', image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=400' },
  { id: 3, name: 'Nepal Mediciti', location: 'Lalitpur', image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400' },
  { id: 4, name: 'HAMS Hospital', location: 'Dhumbarahi', image: 'https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?w=400' },
  { id: 5, name: 'B&B Hospital', location: 'Gwarko', image: 'https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?w=400' },
  { id: 6, name: 'Norvic Hospital', location: 'Thapathali', image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400' },
  { id: 7, name: 'Patan Hospital', location: 'Lagankhel', image: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=400' },
  { id: 8, name: 'Alka Hospital', location: 'Jawalakhel', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400' }
];

const SPECIALIZATIONS = [
  { id: 1, name: 'General Physician', icon: Stethoscope, color: 'bg-blue-500' },
  { id: 2, name: 'Dietician', icon: Activity, color: 'bg-emerald-500' },
  { id: 3, name: 'ENT', icon: Ear, color: 'bg-purple-500' },
  { id: 4, name: 'Cardiology', icon: Heart, color: 'bg-rose-500' },
  { id: 5, name: 'Orthopedics', icon: Bone, color: 'bg-orange-500' },
  { id: 6, name: 'Pediatrics', icon: Baby, color: 'bg-pink-500' },
  { id: 7, name: 'Dermatology', icon: User, color: 'bg-teal-500' },
  { id: 8, name: 'Gynecology', icon: Activity, color: 'bg-indigo-500' }
];

const DOCTORS = [
  { id: 1, name: 'Dr. Rajesh Sharma', rating: 4.8, experience: '15 years', consultationFee: 1500 },
  { id: 2, name: 'Dr. Sita Poudel', rating: 4.9, experience: '12 years', consultationFee: 1200 },
  { id: 3, name: 'Dr. Anil Thapa', rating: 4.7, experience: '10 years', consultationFee: 1000 }
];

const PAYMENT_METHODS = [
  { id: 1, name: 'eSewa', color: 'bg-[#60BB46]', textColor: 'text-[#60BB46]', logo: '💚' },
  { id: 2, name: 'Khalti', color: 'bg-[#5C2D91]', textColor: 'text-[#5C2D91]', logo: '💜' },
  { id: 3, name: 'Fonepay', color: 'bg-[#ED1C24]', textColor: 'text-[#ED1C24]', logo: '❤️' }
];

const getNextSevenDays = () => {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push({
      id: i,
      date: date.getDate(),
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      fullDate: date
    });
  }
  return days;
};

// Steps Labels Configuration
const STEPS = [
  { id: 1, label: 'Facility' },
  { id: 2, label: 'Specialist' },
  { id: 3, label: 'Schedule' },
  { id: 4, label: 'Payment' },
  { id: 5, label: 'Token' }
];

export default function HospitalBookingFlow() {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const dates = getNextSevenDays();
  const tokenNumberRandom = `# A-${Math.floor(Math.random() * 100)}`

  const handlePaymentSubmit = () => {
    if (!selectedPayment) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      
      // Store appointment data in localStorage
      const appointmentData = {
        id: Date.now(), // Unique ID for the appointment
        tokenNumber:tokenNumberRandom, // You can generate this dynamically
        patientName: user?.name || user?.username || 'Guest User',
        hospital: selectedHospital,
        specialization: selectedSpecialization,
        doctor: selectedDoctor,
        date: selectedDate,
        paymentMethod: selectedPayment,
        consultationFee: selectedDoctor?.consultationFee,
        bookingDate: new Date().toISOString(),
        status: 'confirmed'
      };
      
      // Get existing appointments or initialize empty array
      const existingAppointments = JSON.parse(localStorage.getItem('appointmentData') || '[]');
      existingAppointments.push(appointmentData);
      localStorage.setItem('appointmentData', JSON.stringify(existingAppointments));
      
      setStep(5);
    }, 1500);
  };

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

            {/* Digital Token Card */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden relative">
              {/* Top Decorative Bar (Purplish-blue) */}
              <div className="h-3 w-full bg-indigo-600" />
              
              <div className="p-8">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Token Number</h3>
                    {/* Distinct Color: Gradient Text */}
                    <p className="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-500">
                      {tokenNumberRandom}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-bold mb-2 border border-teal-100">
                      <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" /> LIVE STATUS
                    </div>
                    <p className="text-slate-400 text-xs font-medium">Updated: Just now</p>
                  </div>
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

                {/* Patient Details */}
                <div className="space-y-3">
                   <div className="flex justify-between text-sm">
                     <span className="text-slate-500 font-medium">Patient Name</span>
                     <span className="font-bold text-slate-900">Guest User</span>
                   </div>
                   <div className="flex justify-between text-sm">
                     <span className="text-slate-500 font-medium">Doctor</span>
                     <span className="font-bold text-slate-900">{selectedDoctor?.name}</span>
                   </div>
                   <div className="flex justify-between text-sm">
                     <span className="text-slate-500 font-medium">Date</span>
                     <span className="font-bold text-slate-900">
                       {selectedDate?.day}, {selectedDate?.month} {selectedDate?.date}
                     </span>
                   </div>
                </div>
              </div>
              
              {/* Bottom Action Bar */}
              <div className="bg-slate-50 p-4 border-t border-slate-200 flex gap-3">
                <button onClick={() => window.print()} className="flex-1 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-100 transition-all flex items-center justify-center gap-2 text-sm">
                  <Printer size={16} /> Save Ticket
                </button>
                <Link to='/profile' onClick={()=>{}} className="flex-1 py-3 bg-blue-800 text-center text-shadow-cyan-50 rounded-xl font-bold hover:bg-indigo-700 transition-all text-sm shadow-lg shadow-indigo-100">
                  Done
                </Link>
              </div>
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