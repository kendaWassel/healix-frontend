import { useRef } from "react";

export default function UploadSection({ file, setFile, onAnalyze, loading }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const triggerFileUpload = () => {
    fileInputRef.current.click();
  };
return (
    <div className="border border-[var(--card-border)] rounded-xl p-6 bg-white">

      <h2 className="text-xl font-bold text-[#0a3460] mb-4">
        Upload Lab Report
      </h2>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".csv,.xlsx,.xls,.pdf"
      />

      <button
        onClick={triggerFileUpload}
        className="px-5 py-2 bg-[var(--cyan)] text-white rounded-lg font-semibold mr-3"
      >
        Upload File
      </button>

      <button
        onClick={() => onAnalyze()}
        disabled={!file || loading}
        className="px-6 py-2 bg-[#0a3460] text-white rounded-lg font-semibold disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Analyze Report"}
      </button>

      {file && (
        <p className="mt-3 text-[var(--text-color)] text-sm">
          Selected file: <span className="font-medium">{file.name}</span>
        </p>
      )}

    </div>
  );
}