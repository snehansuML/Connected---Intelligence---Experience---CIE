import React from "react";
import { useNavigate } from "react-router-dom";
import { verticals } from "../config/verticals";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f4f6f8", padding: "3rem" }}>
      <h1 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "1rem", color: "#0f62fe" }}>
        Connected Intelligence Experiences - CIE
      </h1>
      <p style={{ textAlign: "center", fontSize: "1.1rem", marginBottom: "2rem" }}>
        Select a vertical to explore customer insights
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "2rem"
        }}
      >
        {verticals.map((v) => (
          <div
            key={v.id}
            style={{
              padding: "2rem",
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              width: "250px",
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
            onClick={() => navigate(v.path)}
          >
            {v.logo && (
              <img src={v.logo} alt={v.label} style={{ width: "60px", marginBottom: "1rem" }} />
            )}
            <h3 style={{ marginBottom: "0.5rem", color: "#1976d2" }}>{v.label}</h3>
            <p style={{ fontSize: "0.9rem", color: "#555" }}>{v.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
