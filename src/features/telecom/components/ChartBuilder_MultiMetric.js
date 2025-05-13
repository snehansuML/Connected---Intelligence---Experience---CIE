
import React, { useEffect, useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import {
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie,
  XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const metrics = [
  { id: "acquired_pct", label: "Acquisition (%)" },
  { id: "churned_pct", label: "Churned (%)" },
  { id: "retained_pct", label: "Retained (%)" },
  { id: "retention_rate_pct", label: "Retention Rate (%)" },
  { id: "engagement_score", label: "Engagement Score" },
  { id: "discount_usage_pct", label: "Discount Usage (%)" }
];

const dimensions = [
  { id: "channel", label: "Channel" },
  { id: "campaign", label: "Campaign" },
  { id: "customer_segment", label: "Customer Segment" },
  { id: "payment_channel", label: "Payment Channel" },
  { id: "region", label: "Region" }
];

function DraggableItem({ id, label }) {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        padding: "0.5rem",
        marginBottom: "0.5rem",
        backgroundColor: "#f0f0f0",
        borderRadius: "4px",
        cursor: "grab"
      }}
    >
      {label}
    </div>
  );
}

function DropZone({ id, label, values }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      style={{
        border: "2px dashed #ccc",
        backgroundColor: isOver ? "#e3f2fd" : "#f9f9f9",
        padding: "1rem",
        minHeight: "80px",
        marginBottom: "1rem",
        borderRadius: "6px"
      }}
    >
      <strong>{label}</strong><br />
      {values.length > 0 ? values.join(", ") : "None"}
    </div>
  );
}

export default function ChartBuilder() {
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [selectedDimension, setSelectedDimension] = useState(null);
  const [sampleData, setSampleData] = useState(null);
  const [chartType, setChartType] = useState("bar");

  useEffect(() => {
    fetch("/data/marketing_dashboard_data_percent.json")
      .then(res => res.json())
      .then(setSampleData)
      .catch(err => console.error("❌ Failed to load data", err));
  }, []);

  const handleDragEnd = (event) => {
    const { over, active } = event;
    if (!over) return;
    if (over.id === "drop-metric") {
      setSelectedMetrics((prev) => [...new Set([...prev, active.id])]);
    }
    if (over.id === "drop-dimension") {
      setSelectedDimension(active.id);
    }
  };

  let chartData = [];
  if (sampleData && selectedDimension) {
    switch (selectedDimension) {
      case "channel":
        chartData = sampleData.channel_performance;
        break;
      case "campaign":
        chartData = sampleData.campaign_effectiveness;
        break;
      case "customer_segment":
        chartData = sampleData.segment_performance;
        break;
      case "payment_channel":
        chartData = sampleData.payment_channel_performance;
        break;
      case "region":
        chartData = sampleData.region_performance;
        break;
      default:
        chartData = [];
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", height: "90vh", fontFamily: "sans-serif" }}>
        <div style={{ width: "300px", padding: "1rem", borderRight: "1px solid #ccc" }}>
          <h3>📊 Drag Fields</h3>
          <h4>Metrics</h4>
          {metrics.map((m) => (
            <DraggableItem key={m.id} id={m.id} label={m.label} />
          ))}
          <h4 style={{ marginTop: "2rem" }}>Dimensions</h4>
          {dimensions.map((d) => (
            <DraggableItem key={d.id} id={d.id} label={d.label} />
          ))}
        </div>

        <div style={{ flex: 1, padding: "2rem" }}>
          <DropZone id="drop-metric" label="📉 Drop Metrics Here" values={selectedMetrics} />
          <DropZone id="drop-dimension" label="📊 Drop Dimension Here" values={selectedDimension ? [selectedDimension] : []} />

          <div style={{ marginBottom: "1rem" }}>
            <label><strong>Chart Type:</strong></label>{" "}
            <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
              <option value="bar">Bar</option>
              <option value="line">Line</option>
            </select>
          </div>

          {selectedMetrics.length > 0 && selectedDimension && chartData.length > 0 && (
            <>
              <h4>📈 Chart Preview</h4>
              <ResponsiveContainer width="100%" height={300}>
                {chartType === "bar" && (
                  <BarChart data={chartData}>
                    <XAxis dataKey={selectedDimension} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {selectedMetrics.map((metric, idx) => (
                      <Bar key={metric} dataKey={metric} fill={["#4CAF50", "#FF9800", "#F44336", "#2196F3", "#9C27B0"][idx % 5]} />
                    ))}
                  </BarChart>
                )}
                {chartType === "line" && (
                  <LineChart data={chartData}>
                    <XAxis dataKey={selectedDimension} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {selectedMetrics.map((metric, idx) => (
                      <Line key={metric} type="monotone" dataKey={metric} stroke={["#4CAF50", "#FF9800", "#F44336", "#2196F3", "#9C27B0"][idx % 5]} />
                    ))}
                  </LineChart>
                )}
              </ResponsiveContainer>
            </>
          )}
        </div>
      </div>
    </DndContext>
  );
}
