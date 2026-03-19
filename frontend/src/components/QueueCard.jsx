import React from "react";

const QueueCard = ({ booking }) => {
  if (!booking) return null;

  return (
    <div
      className="rounded-3xl overflow-hidden shadow-2xl text-white"
      style={{ background: "linear-gradient(135deg,#1a3f6f 0%,#1a6e3c 100%)" }}
    >
      <div className="p-7">
        <p className="text-xs uppercase tracking-wider opacity-70 font-semibold">MEDIWO Queue Token</p>
        <p className="text-sm opacity-90 mt-1">{booking.hospital.name}</p>

        <div className="text-center py-6">
          <p className="text-xs uppercase tracking-wider opacity-70 mb-2">Your Token</p>
          <h2 className="text-6xl font-black">{booking.token}</h2>
        </div>

        <div className="grid grid-cols-3 gap-3 pt-5 border-t border-white/20">
          <div className="text-center">
            <p className="text-xs opacity-70">Doctor</p>
            <p className="text-sm font-semibold mt-1">{booking.doctor.name}</p>
          </div>
          <div className="text-center border-x border-white/20">
            <p className="text-xs opacity-70">Time</p>
            <p className="text-sm font-semibold mt-1">{booking.slot}</p>
          </div>
          <div className="text-center">
            <p className="text-xs opacity-70">Wait Time</p>
            <p className="text-sm font-semibold mt-1">~30 min</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueueCard;