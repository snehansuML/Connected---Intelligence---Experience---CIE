
import React, { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const metrics = [
  { id: "acquisition_pct", label: "Acquisition (%)" },
  { id: "churned_pct", label: "Churned (%)" },
  { id: "retained_pct", label: "Retained (%)" }
];

const data = [
  { month: "Jan", acquisition_pct: 10, churned_pct: 5, retained_pct: 5 },
  { month: "Feb", acquisition_pct: 20, churned_pct: 7, retained_pct: 13 },
  { month: "Mar", acquisition_pct: 30, churned_pct: 10, retained_pct: 20 }
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
        background: "#f0f0f0",
        marginBottom: "0.5rem",
        borderRadius: "4px",
        cursor: "grab"
      }}
    >
      {label}
    </div>
  );
}

function DropZone({ id, label, onDrop, value }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      style={{
        border: "2px dashed #2196f3",
        background: isOver ? "#e3f2fd" : "#f9f9f9",
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
  const [selectedMetric, setSelectedMetric] = useState(null);

  const handleDragEnd = (event) => {
    const { over, active } = event;
    if (over?.id === "drop-metric") {
      setSelectedMetric(active.id);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", gap: "2rem" }}>
        <div style={{ width: "250px" }}>
          <h4>Drag Metric</h4>
          {metrics.map((m) => (
            <DraggableItem key={m.id} id={m.id} label={m.label} />
          ))}
        </div>

        <div style={{ flex: 1 }}>
          <DropZone id="drop-metric" label="Drop Metric Here" value={selectedMetric} />

          {selectedMetric && (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={selectedMetric} fill="#FB8C00" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </DndContext>
  );
}
