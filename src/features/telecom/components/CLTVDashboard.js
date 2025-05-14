import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from "recharts";

export default function CLTVDashboard() {
  const [cltvData, setCltvData] = useState([]);

  useEffect(() => {
    fetch("/data/marketing_dashboard_data_percent.json")
      .then((res) => res.json())
      .then((data) => {
        const processed = data.segment_performance.map((segment) => {
          const cltv = Math.round(
            (segment.avg_arpu * segment.avg_tenure_months) / 100
          );
          return {
            segment: segment.customer_segment,
            arpu: segment.avg_arpu,
            tenure: segment.avg_tenure_months,
            cltv,
          };
        });
        setCltvData(processed);
      });
  }, []);

  const avgCLTV = cltvData.length
    ? (cltvData.reduce((sum, d) => sum + d.cltv, 0) / cltvData.length).toFixed(2)
    : 0;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-2">📈 CLTV by Customer Segment</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 shadow rounded">
          <p className="text-sm text-gray-600">Average CLTV</p>
          <p className="text-xl font-semibold text-green-600">${avgCLTV}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          
          <p className="text-md font-medium">segment_performance</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={cltvData} layout="vertical" margin={{ left: 80 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="segment" type="category" />
          <Tooltip />
          <Bar dataKey="cltv" fill="#1976d2">
            <LabelList dataKey="cltv" position="right" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
