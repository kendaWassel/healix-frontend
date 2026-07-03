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
  loadingTests,

  supportedTests,
  fetchSupportedTests,
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
        <button
  onClick={fetchSupportedTests}
  className="mb-4 px-5 py-2 bg-[var(--cyan)] text-white rounded-lg font-semibold"
>
  View Supported Tests
</button>

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
        {loadingTests ? (
  <p className="text-[var(--text-color)] mb-3">
    Loading supported tests...
  </p>
):
        supportedTests?.length > 0 && (
<div className="mt-10 bg-white border border-[var(--card-border)] rounded-xl p-6 shadow-sm">

    <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold text-[var(--dark-blue)]">
            Supported Laboratory Tests
        </h2>

        <span className="bg-[#39CCCC22] text-[#0a3460] px-4 py-2 rounded-full font-semibold">
            {supportedTests.length} Tests
        </span>

    </div>

    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">

        {supportedTests.map((test, i) => (

            <div
                key={i}
                className="border border-[var(--card-border)] rounded-lg p-4 text-center hover:border-[#39CCCC] hover:shadow-md transition"
            >

                <h3 className="font-semibold text-[var(--dark-blue)]">
                    {test}
                </h3>

            </div>

        ))}

    </div>

</div>
)}

      </div>
    </div>
  );
}