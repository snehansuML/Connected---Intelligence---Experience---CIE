import React, { useState } from "react";

export default function CsvUploader() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = (event) => {
      const lines = event.target.result.split("\n").slice(0, 5); // preview first 5 lines
      setPreview(lines);
    };
    reader.readAsText(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first.");

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await fetch("https://churn-dashboard-final.onrender.com/api/batch_predict", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      setResults(data.predictions || []);
    } catch (err) {
      console.error("Upload error:", err);
      alert("❌ Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chart-card">
      <h3>Batch Prediction Upload</h3>
      <input type="file" accept=".csv" onChange={handleFileChange} />

      {preview.length > 0 && (
        <div style={{ marginTop: "1rem", fontFamily: "monospace" }}>
          <strong>Preview:</strong>
          <pre>{preview.join("\n")}</pre>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={loading}
        style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
      >
        {loading ? "Uploading..." : "Run Prediction"}
      </button>

      {results.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h4>Results:</h4>
          <ul>
            {results.map((res, i) => (
              <li key={i}>{JSON.stringify(res)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
