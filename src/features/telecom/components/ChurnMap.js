import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

// TopoJSON file of US states
const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// Sample churn levels by state name
const churnLevels = {
  California: "High",
  Texas: "Medium",
  Florida: "High",
  "New York": "Low",
  Illinois: "Medium",
  Georgia: "High",
  Arizona: "Medium",
  Pennsylvania: "Low",
  Michigan: "Medium",
  "North Carolina": "Medium",
  Ohio: "Medium"
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
  return (
    <div style={{ width: "100%", height: "auto" }}>
      <h3>📍 Geo Churn Map </h3>
      <ComposableMap projection="geoAlbersUsa" width={980} height={500}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const stateName = geo.properties.name;
              const churn = churnLevels[stateName];

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={getColor(churn)}
                  stroke="#FFFFFF"
                  onMouseEnter={() => {
                    console.log(`${stateName}: ${churn || "Unknown"} churn`);
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
    </div>
  );
}
