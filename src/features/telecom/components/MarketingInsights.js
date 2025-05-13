
import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line
} from "recharts";

const COLORS = ["#4CAF50", "#FF9800", "#F44336", "#2196F3", "#9C27B0"];

export default function MarketingInsights() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/data/marketing_dashboard_data_percent.json")
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error("Failed to load marketing data:", err));
  }, []);

  if (!data) return <p>Loading marketing insights...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📊 Marketing Insights Dashboard</h2>

      {/* Acquisition & Churn by Channel */}
      <h3>Acquisition & Churn by Channel</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data.channel_performance}>
          <XAxis dataKey="channel" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="acquired_pct" fill="#4CAF50" name="Acquisition (%)" />
          <Bar dataKey="churned_pct" fill="#F44336" name="Churn (%)" />
        </BarChart>
      </ResponsiveContainer>

      {/* Monthly Acquisition & Churn */}
      <h3>Monthly Acquisition & Churn</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data.monthly_marketing_performance}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="acquired_pct" stroke="#4CAF50" name="Acquisition (%)" />
          <Line type="monotone" dataKey="churned_pct" stroke="#F44336" name="Churn (%)" />
        </LineChart>
      </ResponsiveContainer>

      {/* Attribution by Source */}
      <h3>Attribution by Source</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data.attribution_summary}>
          <XAxis dataKey="source" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="acquired_pct" fill="#2196F3" name="Acquisition (%)" />
          <Bar dataKey="retained_pct" fill="#4CAF50" name="Retained (%)" />
          <Bar dataKey="churned_pct" fill="#F44336" name="Churned (%)" />
        </BarChart>
      </ResponsiveContainer>

      {/* Segment Performance */}
      <h3>Acquisition & Churn Rate by Segment</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data.segment_performance}>
          <XAxis dataKey="customer_segment" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="acquired_pct" fill="#2196F3" name="Acquired (%)" />
          <Bar dataKey="churned_pct" fill="#F44336" name="Churned (%)" />
        </BarChart>
      </ResponsiveContainer>

      {/* Campaign Effectiveness */}
      <h3>Campaign Performance</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data.campaign_effectiveness}>
          <XAxis dataKey="campaign" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="acquired_pct" fill="#4CAF50" name="Acquired (%)" />
          <Bar dataKey="churned_pct" fill="#F44336" name="Churned (%)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
