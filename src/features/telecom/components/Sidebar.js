import React from "react";

export default function SidebarCard({ title, value, isCurrency }) {
  const formatValue = () => {
    if (isCurrency) return `$${value.toLocaleString()}`;
    return value.toLocaleString();
  };

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        marginBottom: "1rem",
        padding: "1rem",
        borderRadius: "10px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        textAlign: "center"
      }}
    >
      <h4 style={{ marginBottom: "0.5rem", color: "#1976d2" }}>{title}</h4>
      <div style={{ fontSize: "1.4rem", fontWeight: "bold" }}>{formatValue()}</div>
    </div>
  );
}
