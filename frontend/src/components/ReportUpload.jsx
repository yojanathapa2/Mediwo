import React, { useRef, useState } from "react";

const ReportUpload = ({ reports, setReports }) => {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleFiles = (files) => {
    if (!files || !files.length) return;

    setUploading(true);

    setTimeout(() => {
      const uploaded = Array.from(files).map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        date: new Date().toISOString().split("T")[0],
        type: file.name.toLowerCase().endsWith(".pdf") ? "PDF Report" : "Image Report",
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`
      }));

      setReports([...uploaded, ...reports]);
      setUploading(false);
    }, 1000);
  };

  const deleteReport = (id) => {
    setReports(reports.filter((report) => report.id !== id));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <h2 className="text-xl font-bold text-slate-800 mb-2">Medical Reports</h2>
      <p className="text-sm text-slate-500 mb-5">
        Upload your prescriptions, lab reports, scans, and other medical documents.
      </p>

      <div
        onClick={() => fileRef.current?.click()}
        className="border-2 border-dashed border-slate-300 hover:border-blue-400 transition rounded-2xl p-10 text-center cursor-pointer bg-slate-50"
      >
        <input
          ref={fileRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        {uploading ? (
          <p className="text-blue-700 font-medium">Uploading reports...</p>
        ) : (
          <>
            <p className="text-lg font-semibold text-slate-700">Click to upload files</p>
            <p className="text-sm text-slate-400 mt-1">PDF, JPG, PNG supported</p>
          </>
        )}
      </div>

      <div className="mt-6 space-y-3">
        {reports.length === 0 ? (
          <p className="text-sm text-slate-400">No medical reports uploaded yet.</p>
        ) : (
          reports.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50"
            >
              <div>
                <p className="font-semibold text-slate-800 text-sm">{report.name}</p>
                <p className="text-xs text-slate-500">
                  {report.type} • {report.date} • {report.size}
                </p>
              </div>

              <button
                onClick={() => deleteReport(report.id)}
                className="px-3 py-2 text-sm rounded-lg text-red-600 hover:bg-red-50 transition"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReportUpload;