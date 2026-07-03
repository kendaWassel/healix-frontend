import PatientHeader from "../../../components/headers/PatientHeader";
import UploadSection from "./uploadSection";
import ResultsSection from "./resultsSection";
import { useLabAnalysis } from "./useLabAnalysis";

export default function LabAnalysis() {
  const {
    file,
    setFile,
    report,
    loading,
    error,
    analyze,
  } = useLabAnalysis();

  return (
    <div>
      <PatientHeader />

      <div className="p-6 md:p-8">
        <h1 className="text-3xl font-bold text-[#0a3460] mb-2">
          Lab Analysis
        </h1>

        <p className="text-[var(--text-color)] mb-6">
          Upload your lab report to get insights
        </p>

        <UploadSection
          file={file}
          setFile={setFile}
          onAnalyze={analyze}
          loading={loading}
        />

        {error && (
          <div className="mt-4 text-red-500">{error}</div>
        )}

        <ResultsSection report={report} />
      </div>
    </div>
  );
}