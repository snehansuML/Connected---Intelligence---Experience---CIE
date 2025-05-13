import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function Chart({ title, data, barColor = "#1976d2", height = 300 }) {
  return (
    <div
      className="chart-card"
      style={{
        backgroundColor: "#fff",
        borderRadius: "10px",
        padding: "1rem",
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        marginBottom: "2rem"
      }}
    >
      <h3 style={{ marginBottom: "1rem", color: "#333" }}>{title}</h3>

      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill={barColor} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
