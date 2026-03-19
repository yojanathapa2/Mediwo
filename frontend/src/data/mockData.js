export const MOCK_PATIENT_REPORTS = [
  { id: 1, name: "Blood Test Report.pdf", date: "2025-03-10", type: "Lab Report", size: "1.2 MB" },
  { id: 2, name: "Chest X-Ray.jpg", date: "2025-02-28", type: "Radiology", size: "3.8 MB" },
  { id: 3, name: "ECG Report.pdf", date: "2025-01-15", type: "Cardiology", size: "0.9 MB" },
];

export const MOCK_APPOINTMENTS = [
  {
    id: 1,
    doctor: "Dr. Priya Basnet",
    hospital: "Norvic International Hospital",
    date: "2025-03-22",
    time: "09:00 AM",
    token: "A-017",
    status: "Confirmed",
  },
  {
    id: 2,
    doctor: "Dr. Anjali Thapa",
    hospital: "TUTH",
    date: "2025-02-14",
    time: "01:00 PM",
    token: "B-043",
    status: "Completed",
  },
];

export const MOCK_QUEUE = [
  { id: 1, patient: "Ram Prasad Khanal", token: "A-012", status: "In Progress", waitTime: "Now" },
  { id: 2, patient: "Sunita Devi Shrestha", token: "A-013", status: "Waiting", waitTime: "~5 min" },
  { id: 3, patient: "Mohan Bahadur Thapa", token: "A-014", status: "Waiting", waitTime: "~12 min" },
  { id: 4, patient: "Gita Kumari Rai", token: "A-015", status: "Waiting", waitTime: "~18 min" },
  { id: 5, patient: "Bishnu Prasad Koirala", token: "A-016", status: "Waiting", waitTime: "~25 min" },
  { id: 6, patient: "Anish Shrestha", token: "A-017", status: "Waiting", waitTime: "~30 min", isYou: true },
];