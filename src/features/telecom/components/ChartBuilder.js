import React, { useEffect, useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import {
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
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

function DropZone({ id, label, value }) {
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
      {value || "None"}
    </div>
  );
}

export default function ChartBuilder() {
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [selectedDimension, setSelectedDimension] = useState(null);
  const [sampleData, setSampleData] = useState(null);
  const [chartType, setChartType] = useState("bar");
  const [filterValue, setFilterValue] = useState(null);

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
      setSelectedMetrics((prev) =>
        prev.includes(active.id) ? prev : [...prev, active.id]
      );
    }
    if (over.id === "drop-dimension") {
      setSelectedDimension(active.id);
      setFilterValue(null);
    }
  };

  let rawData = [];
  if (sampleData && selectedDimension) {
    switch (selectedDimension) {
      case "channel": rawData = sampleData.channel_performance; break;
      case "campaign": rawData = sampleData.campaign_effectiveness; break;
      case "customer_segment": rawData = sampleData.segment_performance; break;
      case "payment_channel": rawData = sampleData.payment_channel_performance; break;
      case "region": rawData = sampleData.region_performance; break;
      default: rawData = [];
    }
  }

  const dimensionValues = Array.from(new Set(rawData.map(row => row[selectedDimension])));
  const chartData = rawData.filter(row =>
    filterValue ? row[selectedDimension] === filterValue : true
  );

  const chartColors = ["#FB8C00", "#42A5F5", "#66BB6A", "#AB47BC"];

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
          <DropZone
            id="drop-metric"
            label="📉 Drop Metrics Here"
            value={selectedMetrics.length > 0 ? selectedMetrics.join(", ") : "None"}
          />
          <DropZone
            id="drop-dimension"
            label="📊 Drop Dimension Here"
            value={selectedDimension || "None"}
          />

          {selectedDimension && dimensionValues.length > 1 && (
            <div style={{ marginBottom: "1rem" }}>
              <label><strong>Filter by {selectedDimension}:</strong></label>{" "}
              <select
                value={filterValue || ""}
                onChange={(e) => setFilterValue(e.target.value || null)}
              >
                <option value="">All</option>
                {dimensionValues.map((val) => (
                  <option key={val} value={val}>{val}</option>
                ))}
              </select>
            </div>
          )}

          <div style={{ marginBottom: "1rem" }}>
            <label><strong>Chart Type:</strong></label>{" "}
            <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
              <option value="bar">Bar</option>
              <option value="line">Line</option>
              <option value="pie">Pie</option>
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
                    {selectedMetrics.map((metric, i) => (
                      <Bar key={metric} dataKey={metric} fill={chartColors[i % chartColors.length]} />
                    ))}
                  </BarChart>
                )}
                {chartType === "line" && (
                  <LineChart data={chartData}>
                    <XAxis dataKey={selectedDimension} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {selectedMetrics.map((metric, i) => (
                      <Line
                        key={metric}
                        type="monotone"
                        dataKey={metric}
                        stroke={chartColors[i % chartColors.length]}
                      />
                    ))}
                  </LineChart>
                )}
                {chartType === "pie" && selectedMetrics.length === 1 && (
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey={selectedMetrics[0]}
                      nameKey={selectedDimension}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#FB8C00"
                      label
                    />
                    <Tooltip />
                  </PieChart>
                )}
              </ResponsiveContainer>
            </>
          )}
        </div>
      </div>
    </DndContext>
  );
}
