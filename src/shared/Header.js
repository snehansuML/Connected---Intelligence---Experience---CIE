import React from "react";

export default function Header({ title, logoPath, onLogout, buttons = [], onSelect }) {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#ffffff",
        padding: "1rem 2rem",
        borderBottom: "1px solid #ddd",
        boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {logoPath && (
          <img src={logoPath} alt="Logo" style={{ height: "50px", objectFit: "contain" }} />
        )}
        <h1 style={{ fontSize: "1.5rem", color: "#0f62fe", margin: 0 }}>{title}</h1>
      </div>

      <div style={{ display: "flex", gap: "1rem" }}>
        {buttons.map((label, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(label)}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#e3f2fd",
              border: "1px solid #1976d2",
              color: "#1976d2",
              borderRadius: "6px",
              cursor: "pointer"
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
              borderRadius: "6px",
              padding: "0.5rem 1rem"
            }}
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
