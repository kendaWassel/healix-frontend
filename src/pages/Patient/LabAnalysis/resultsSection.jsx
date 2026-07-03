import FAIDCard from "../patientHomePage/Faid/FAIDCard";

const severityColors = {
  normal: "bg-green-100 text-green-700",
  mild: "bg-yellow-100 text-yellow-700",
  moderate: "bg-orange-100 text-orange-700",
  severe: "bg-red-100 text-red-700",
  critical: "bg-red-600 text-white",
};

export default function ResultsSection({ report }) {
  if (!report) return null;

  return (
    <div className="mt-10 space-y-8">

      {/* Summary cards */}

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

        <div className="rounded-xl border border-[var(--card-border)] bg-white p-6 shadow-sm">
          <p className="text-[var(--text-color)]">Tests Analyzed</p>

          <h2 className="text-4xl font-bold text-[var(--dark-blue)] mt-2">
            {report.total_tests_analyzed}
          </h2>
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-white p-6 shadow-sm">
          <p className="text-[var(--text-color)]">Normal</p>

          <h2 className="text-4xl font-bold text-green-600 mt-2">
            {report.normal_count}
          </h2>
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-white p-6 shadow-sm">
          <p className="text-[var(--text-color)]">Abnormal</p>

          <h2 className="text-4xl font-bold text-red-500 mt-2">
            {report.abnormal_count}
          </h2>
        </div>

        <div className="rounded-xl border border-[var(--card-border)] bg-white p-6 shadow-sm">

          <p className="text-[var(--text-color)]">
            Severity
          </p>

          <span
            className={`inline-block mt-3 px-4 py-2 rounded-full font-semibold capitalize ${
              severityColors[report.overall_severity]
            }`}
          >
            {report.overall_severity}
          </span>

        </div>

      </div>

      {/* Summary */}

      <div className="bg-white border border-[var(--card-border)] rounded-xl p-6 shadow-sm">

        <h2 className="text-2xl font-bold text-[var(--dark-blue)] mb-4">
          Analysis Summary
        </h2>

        <p className="text-[var(--text-color)] whitespace-pre-line leading-8">
          {report.summary}
        </p>

      </div>

      {/* Conditions */}

      {report.conditions?.length > 0 && (

        <div>

          <h2 className="text-2xl font-bold text-[var(--dark-blue)] mb-6">
            Possible Conditions
          </h2>

          <div className="grid lg:grid-cols-2 gap-6">

            {report.conditions.map((condition, index) => (

              <div
                key={index}
                className="border border-[var(--card-border)] rounded-xl p-6 shadow-sm bg-white"
              >
                <div className="flex justify-between items-center mb-4">

                  <h3 className="text-xl font-bold text-[var(--dark-blue)]">
                    {condition.condition_name}
                  </h3>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      severityColors[condition.severity]
                    }`}
                  >
                    {condition.severity}
                  </span>

                </div>

                <p className="text-[var(--text-color)] leading-7">
                  {condition.description}
                </p>

                <div className="mt-5">

                  <div className="flex justify-between mb-2">

                    <span>Confidence</span>

                    <span>
                      {Math.round(condition.confidence * 100)}%
                    </span>

                  </div>

                  <div className="h-2 rounded-full bg-gray-200">

                    <div
                      className="h-2 rounded-full bg-[var(--cyan)]"
                      style={{
                        width: `${condition.confidence * 100}%`,
                      }}
                    />

                  </div>

                </div>

                {condition.recommendations?.length > 0 && (

                  <div className="mt-5">

                    <h4 className="font-semibold text-[var(--dark-blue)] mb-2">
                      Recommendations
                    </h4>

                    <ul className="list-disc pl-5 space-y-2 text-[var(--text-color)]">

                      {condition.recommendations.map((r, i) => (

                        <li key={i}>{r}</li>

                      ))}

                    </ul>

                  </div>

                )}

              </div>

            ))}

          </div>

        </div>

      )}

      {/* Detailed Results */}

      <div className="border border-[var(--card-border)] rounded-xl bg-white shadow-sm overflow-hidden">

        <div className="p-6 border-b">

          <h2 className="text-2xl font-bold text-[var(--dark-blue)]">
            Test Results
          </h2>

        </div>

        <table className="w-full">

          <thead className="bg-[#f7f9fb]">

            <tr>

              <th className="text-left p-4">Test</th>

              <th className="text-left p-4">Value</th>

              <th className="text-left p-4">Status</th>

            </tr>

          </thead>

          <tbody>

            {report.test_results.map((test, i) => (

              <tr
                key={i}
                className="border-t"
              >

                <td className="p-4 font-medium">
                  {test.test_name}
                </td>

                <td className="p-4">
                  {test.value} {test.unit}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      test.status === "normal"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {test.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}