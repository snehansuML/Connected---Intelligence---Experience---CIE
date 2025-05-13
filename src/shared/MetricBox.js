import React from "react";

export default function MetricBox({
  title,
  value,
  isCurrency = false,
  icon = null,
  change = null,
  changeType = "neutral" // "positive", "negative", or "neutral"
}) {
  const formatValue = () => {
    if (isCurrency) return `$${Number(value).toLocaleString()}`;
    return Number(value).toLocaleString();
  };

  const getChangeColor = () => {
    if (changeType === "positive") return "green";
    if (changeType === "negative") return "red";
    return "#666";
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "1rem",
        borderRadius: "10px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        minWidth: "180px",
        textAlign: "center"
      }}
    >
      {icon && <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{icon}</div>}
      <h4 style={{ marginBottom: "0.25rem", fontSize: "1rem", color: "#444" }}>{title}</h4>
      <div style={{ fontSize: "1.4rem", fontWeight: "bold", color: "#0f62fe" }}>
        {formatValue()}
      </div>
      {change !== null && (
        <div style={{ marginTop: "0.25rem", fontSize: "0.85rem", color: getChangeColor() }}>
          {change > 0 ? "▲" : change < 0 ? "▼" : "●"} {Math.abs(change)}%
        </div>
      )}
    </div>
  );
}
