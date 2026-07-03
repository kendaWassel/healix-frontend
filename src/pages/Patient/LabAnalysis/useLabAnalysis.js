import { useState } from "react";

export function useLabAnalysis() {
  const [file, setFile] = useState(null);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
const [supportedTests, setSupportedTests] = useState([]);
const [loadingTests, setLoadingTests] = useState(false);

const fetchSupportedTests = async () => {
  setLoadingTests(true);

  try {
const token = localStorage.getItem("token");

const res = await fetch(
  "https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/lab/supported-tests",
  {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "ngrok-skip-browser-warning": "true",
    },
  }
);  
    if (!res.ok) {
      throw new Error("Failed to load supported tests");
    }

    const data = await res.json();
console.log('test: ',data);
    setSupportedTests(data.data || data || []);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoadingTests(false);
  }
};


  const analyze = async (extraData = {}) => {
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
    const token = localStorage.getItem("token");

      Object.entries(extraData).forEach(([k, v]) => {
        if (v) formData.append(k, v);
      });

      const res = await fetch(
        "https://unjuicy-schizogenous-gibson.ngrok-free.dev/api/lab/analyze",
        {
          method: "POST",
          headers: {
            "ngrok-skip-browser-warning": "true",
            "Authorization": `Bearer ${token}`,
          },
          body: formData,
        },
      );

      if (!res.ok) throw new Error("Analysis failed");

      const data = await res.json();
      console.log('analyze: ',data);
      setReport(data.data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  return {
  file,
  setFile,
  report,
  loading,
  error,
  analyze,
  loadingTests,

  supportedTests,
  fetchSupportedTests,
  };
}
