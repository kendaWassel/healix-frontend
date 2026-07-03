import FAIDCard from "../patientHomePage/Faid/FAIDCard";

export default function ResultsSection({ report }) {
  if (!report) return null;

  return (
    <div className="mt-8">

      <div className="grid md:grid-cols-3 gap-6">
        <div className="border p-4 rounded-lg">
          <h3 className="text-[#0a3460] text-2xl font-bold">
            {report.total_tests_analyzed}
          </h3>
          <p>Tests</p>
        </div>

        <div className="border p-4 rounded-lg">
          <h3 className="text-green-600 text-2xl font-bold">
            {report.normal_count}
          </h3>
          <p>Normal</p>
        </div>

        <div className="border p-4 rounded-lg">
          <h3 className="text-red-500 text-2xl font-bold">
            {report.abnormal_count}
          </h3>
          <p>Abnormal</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {report.conditions?.map((c, i) => (
          <FAIDCard
            key={i}
            item={{
              title: c.condition_name,
              desc: c.description,
            }}
          />
        ))}
      </div>

      <div className="border rounded-xl p-6 mt-6">
        <h3 className="text-[#0a3460] font-bold mb-2">
          Summary
        </h3>
        <p>{report.summary}</p>
      </div>
    </div>
  );
}