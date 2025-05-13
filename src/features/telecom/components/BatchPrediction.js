// BatchPrediction.js (React Component with CSV upload, chart, and download)
import React, { useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function BatchPrediction() {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResults([]);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://churn-api-jfyz.onrender.com/api/batch_predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResults(response.data);
      setError(null); // ✅ Clear error if success
    } catch (err) {
      setError('Prediction failed. Check file and server.');
      console.error(err);
    }
  };

  const handleDownload = () => {
    if (results.length === 0) return;
    const header = Object.keys(results[0]).join(',');
    const csvRows = results.map(row => Object.values(row).join(','));
    const csvContent = [header, ...csvRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'predictions.csv';
    link.click();
  };

  const chartData = {
    labels: results.map((_, i) => `Row ${i + 1}`),
    datasets: [
      {
        label: 'Churn Probability',
        data: results.map(row => row.churn_probability),
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
    ],
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Batch Churn Prediction</h2>
      <input type="file" accept=".csv" onChange={handleFileChange} className="mb-2" />
      <div className="space-x-2">
        <button onClick={handleUpload} className="bg-blue-600 text-white px-4 py-2 rounded">Upload & Predict</button>
        <button onClick={handleDownload} className="bg-green-600 text-white px-4 py-2 rounded">Download CSV</button>
      </div>

      {error && <div className="text-red-500 mt-4">{error}</div>}

      {results.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold">Prediction Results:</h3>

          <div className="my-4">
            <Line data={chartData} />
          </div>

          <table className="table-auto mt-2 border border-collapse">
            <thead>
              <tr>
                {Object.keys(results[0]).map((key) => (
                  <th key={key} className="border px-2 py-1">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((val, i) => (
                    <td key={i} className="border px-2 py-1">{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default BatchPrediction;
