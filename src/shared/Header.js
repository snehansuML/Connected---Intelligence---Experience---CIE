import React from "react";

export default function Header({ title, onLogout, buttons = [], onSelect }) {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#0f2c5f",
        padding: "0.75rem 1rem",
        borderBottom: "1px solid #ddd",
        boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
      }}
    >
      {/* 👇 TITLE ONLY — LOGO REMOVED */}
      <h1 style={{ fontSize: "1.2rem", color: "#ffffff", margin: 0 }}>
        Telecom Insights
      </h1>

      {/* Spacer to push buttons to right */}
      <div style={{ flexGrow: 1 }}></div>

      {/* Right-Aligned Buttons */}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        {buttons.map((label, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(label)}
            style={{
              padding: "0.4rem 0.75rem",
              backgroundColor: "#ff9800",
              border: "none",
              color: "#fff",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.8rem",
              fontWeight: "bold"
            }}
          >
            {label}
          </button>
        ))}

        {onLogout && (
          <button
            onClick={onLogout}
            style={{
              backgroundColor: "#f44336",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              padding: "0.4rem 0.75rem",
              fontSize: "0.8rem",
              fontWeight: "bold"
            }}
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
