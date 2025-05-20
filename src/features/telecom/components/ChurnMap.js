import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

// TopoJSON file of US states
const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// Sample churn levels by state and type
const churnLevels = {
  California: { prepaid: "High", postpaid: "Medium" },
  Texas: { prepaid: "Medium", postpaid: "Low" },
  Florida: { prepaid: "High", postpaid: "Medium" },
  "New York": { prepaid: "Low", postpaid: "Low" },
  Illinois: { prepaid: "Medium", postpaid: "Medium" },
  Georgia: { prepaid: "High", postpaid: "Medium" },
  Arizona: { prepaid: "Medium", postpaid: "Low" },
  Pennsylvania: { prepaid: "Low", postpaid: "Low" },
  Michigan: { prepaid: "Medium", postpaid: "Medium" },
  "North Carolina": { prepaid: "Medium", postpaid: "Low" },
  Ohio: { prepaid: "Medium", postpaid: "Low" }
};

// Color mapping based on churn level
const getColor = (level) => {
  switch (level) {
    case "High":
      return "#e53935"; // Red
    case "Medium":
      return "#fb8c00"; // Orange
    case "Low":
      return "#43a047"; // Green
    default:
      return "#ccc"; // Grey
  }
};

export default function ChurnMap() {
  const [tooltip, setTooltip] = useState("");
  const [type, setType] = useState("prepaid");
  const [tooltipPos, setTooltipPos] = useState({ x: 20, y: 40 });

  return (
    <div style={{ width: "100%", height: "auto", position: "relative" }}>
      <h3>📍 Geo Churn Map</h3>

      <div style={{ marginBottom: 10 }}>
        <button
          onClick={() => setType("prepaid")}
          style={{
            marginRight: 10,
            background: type === "prepaid" ? "#1976d2" : "#eee",
            color: type === "prepaid" ? "#fff" : "#333",
            padding: "6px 14px",
            border: "none",
            borderRadius: 4,
            fontWeight: type === "prepaid" ? "bold" : "normal",
            cursor: "pointer"
          }}
          aria-pressed={type === "prepaid"}
        >
          Prepaid
        </button>
        <button
          onClick={() => setType("postpaid")}
          style={{
            background: type === "postpaid" ? "#1976d2" : "#eee",
            color: type === "postpaid" ? "#fff" : "#333",
            padding: "6px 14px",
            border: "none",
            borderRadius: 4,
            fontWeight: type === "postpaid" ? "bold" : "normal",
            cursor: "pointer"
          }}
          aria-pressed={type === "postpaid"}
        >
          Postpaid
        </button>
      </div>

      <div style={{ marginBottom: 10 }}>
        <span style={{ background: "#e53935", color: "#fff", padding: "2px 8px", marginRight: 8 }}>High</span>
        <span style={{ background: "#fb8c00", color: "#fff", padding: "2px 8px", marginRight: 8 }}>Medium</span>
        <span style={{ background: "#43a047", color: "#fff", padding: "2px 8px", marginRight: 8 }}>Low</span>
        <span style={{ background: "#ccc", color: "#333", padding: "2px 8px" }}>Unknown</span>
      </div>

      <ComposableMap
        projection="geoAlbersUsa"
        width={980}
        height={500}
        style={{ outline: "none" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const stateName = geo.properties.name;
              const churn = churnLevels[stateName]?.[type];

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={getColor(churn)}
                  stroke="#FFFFFF"
                  onMouseEnter={(evt) => {
                    setTooltip(`${stateName}: ${churn || "Unknown"} churn (${type})`);
                    setTooltipPos({ x: evt.clientX, y: evt.clientY });
                  }}
                  onMouseMove={(evt) => {
                    setTooltipPos({ x: evt.clientX, y: evt.clientY });
                  }}
                  onMouseLeave={() => {
                    setTooltip("");
                  }}
                  style={{
                    default: { outline: "none" },
                    hover: { fill: "#607D8B", outline: "none" },
                    pressed: { outline: "none" }
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {tooltip && (
        <div
          style={{
            position: "fixed",
            top: tooltipPos.y + 10,
            left: tooltipPos.x + 10,
            background: "#fff",
            border: "1px solid #ccc",
            padding: "6px 12px",
            borderRadius: 4,
            pointerEvents: "none",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            zIndex: 999
          }}
        >
          {tooltip}
        </div>
      )}
    </div>
  );
}

