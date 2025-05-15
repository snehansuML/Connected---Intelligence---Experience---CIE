
import React, { useState, useEffect } from "react";
import telecomConfig from "../../config/telecomConfig";
import SidebarCard from "./components/Sidebar";
import ChartCard from "./components/ChartCard";
import CsvUploader from "./components/CsvUploader";
import GPTInsights from "./components/GPTInsights";
import BatchPrediction from "./components/BatchPrediction";
import ChurnMap from "./components/ChurnMap";
import ChartBuilder from "./components/ChartBuilder";
import MarketingInsights from "./components/MarketingInsights";
import MarketSimulations from "./components/MarketSimulations";

export default function Dashboard() {
  const [activeView, setActiveView] = useState("Customer Segments");
  const [riskData, setRiskData] = useState({});
  const [segmentationData, setSegmentationData] = useState({});

  useEffect(() => {
    fetch("/data/riskProfiles.json")
      .then(res => res.json())
      .then(setRiskData)
      .catch(err => console.error("Failed to load riskProfiles.json", err));

    fetch("/data/segmentationData.json")
      .then(res => res.json())
      .then(setSegmentationData)
      .catch(err => console.error("Failed to load segmentationData.json", err));
  }, []);

  const [metrics, setMetrics] = useState({});

useEffect(() => {
  fetch("/data/Metrics.json")
    .then(res => res.json())
    .then(setMetrics)
    .catch(err => console.error("Failed to load Metrics.json", err));
}, []);

 
  const riskColors = {
    "Plan Risk Levels": "#f44336",
    "Geographic Risk": "#FB8C00",
    "Behavioral Risk": "#6A1B9A",
    "Contract Risk": "#1976D2",
    "Billing Risk": "#C62828",
    "Service Risk": "#00897B",
    "Support Risk": "#7B1FA2",
    "Device Risk": "#455A64"
  };

  //const additionalTabs = ["Market Simulations","Batch Prediction", "Chart Builder", "Marketing Insights"];
  {telecomConfig.topbarButtons.map((btn, index) => (
    <button
      key={index}
      onClick={() => setActiveView(btn)}
      style={{
        backgroundColor: activeView === btn ? "#ffd699" : "#fb8c00",
        color: "white",
        padding: "0.5rem 1rem",
        border: "none",
        borderRadius: "4px",
        fontWeight: "bold",
        cursor: "pointer"
      }}
    >
      {btn}
    </button>
  ))}
  
  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f4f6f8" }}>
      <aside style={{ width: "260px", backgroundColor: "#fff", padding: "1rem", boxShadow: "2px 0 8px rgba(0,0,0,0.05)" }}>
        {telecomConfig.sidebar.map((item, index) => (
          <SidebarCard
            key={index}
            title={item.title}
            value={metrics[item.key]}
            isCurrency={item.isCurrency}
          />
        ))}
      </aside>
  
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <header style={{ backgroundColor: "#003366", padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", color: "white" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <img src={telecomConfig.logoPath} alt="Logo" style={{ height: "60px" }} />
            <h1 style={{ fontSize: "1.5rem" }}>{telecomConfig.appTitle}</h1>
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {[...telecomConfig.topbarButtons].map((btn, index) => (
              <button
                key={index}
                onClick={() => setActiveView(btn)}
                style={{
                  backgroundColor: activeView === btn ? "#ffd699" : "#fb8c00",
                  color: "white",
                  padding: "0.5rem 1rem",
                  border: "none",
                  borderRadius: "4px",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
              >
                {btn}
              </button>
            ))}
            <button
              onClick={() => window.location.href = "/login"}
              style={{
                backgroundColor: "#f44336",
                color: "white",
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "4px",
                fontWeight: "bold"
              }}
            >
              Logout
            </button>
          </div>
        </header>

        <main style={{ flex: 1, padding: "1.5rem", overflowY: "auto" }}>
      
          {activeView === "Customer Risk" && (
            <>
              <ChurnMap />
              {Object.entries(riskData).map(([title, data], index) => (
                <ChartCard
                  key={index}
                  title={title}
                  data={data}
                  
                  barColor={riskColors[title] || "#FB8C00"}
                />
              ))}
            </>
          )}

          {activeView === "LLM Insights" && (
            <>
              <GPTInsights />
              <div style={{ backgroundColor: "#fff", padding: "1rem", borderRadius: "8px", marginTop: "1.5rem" }}>
                <h3 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>Example Insights</h3>
                <ul style={{ paddingLeft: "1.25rem", lineHeight: "1.6" }}>
                  <li>🔍 High churn seen in month-to-month customers</li>
                  <li>👩 Female customers churn slightly less than 👨 males</li>
                  <li>⚠️ Most complaints are from streaming & TV users</li>
                  <li>🧠 Long-tenure customers have lowest churn risk</li>
                </ul>
              </div>
            </>
          )}

{activeView === "Customer Segments" && (
  <>
    <h3 style={{ marginBottom: "1rem", fontWeight: "bold" }}>Customer Segments</h3>
    {Object.entries(telecomConfig.chartConfigs.segments).map(([key, config], index) => (
      <ChartCard
        key={index}
        title={config.title}
        data={segmentationData[key]}
        barColor={config.color}
      />
    ))}
  </>
)}

          {activeView === "Marketing Insights" && <MarketingInsights />}
          {activeView === "Batch Prediction" && (
            <div style={{ paddingTop: "2rem", borderTop: "2px solid #ccc", marginTop: "2rem" }}>
              <h3 style={{ marginBottom: "1rem", fontWeight: "bold" }}>Batch Prediction Upload</h3>
              <BatchPrediction />
            </div>
          )}
          {activeView === "Market Simulations" && (
  <MarketSimulations />
)}



          {activeView === "Chart Builder" && <ChartBuilder />}
        </main>
      </div>
    </div>
  );
}
