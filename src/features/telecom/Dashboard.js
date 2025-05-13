
import React, { useState } from "react";
import telecomConfig from "../../config/telecomConfig";
import SidebarCard from "./components/Sidebar";
import ChartCard from "./components/ChartCard";
import CsvUploader from "./components/CsvUploader";
import GPTInsights from "./components/GPTInsights";
import BatchPrediction from "./components/BatchPrediction";
import ChurnMap from "./components/ChurnMap";
import ChartBuilder from "./components/ChartBuilder_MultiMetric";
import segmentationData from "../../data/segmentationData.json";
import MarketingInsights from "./components/MarketingInsights";

export default function Dashboard() {
  const [activeView, setActiveView] = useState("Marketing Insights");

  const dummyMetrics = {
    customerChurn: 1869,
    yearlyCharges: 16060000,
    monthlyCharges: 456120,
    adminTickets: 3632,
    techTickets: 2955
  };

  const dummyData = {
    paymentMethod: [
      { name: "Credit Card", value: 45 },
      { name: "Bank Transfer", value: 20 }
    ]
  };

  const planRiskLevels = [
    { name: "Prepaid - Low", value: 20 },
    { name: "Prepaid - Med", value: 25 },
    { name: "Prepaid - High", value: 15 },
    { name: "Postpaid - Low", value: 10 },
    { name: "Postpaid - Med", value: 20 },
    { name: "Postpaid - High", value: 10 }
  ];

  const geoRiskLevels = [
    { name: "Urban Complaints", value: 80 },
    { name: "Rural Tenure Risk", value: 20 }
  ];
  const behavioralRiskLevels = [
    { name: "Frequent Complaints", value: 50 },
    { name: "Short Tenure", value: 40 },
    { name: "Low Engagement", value: 10 }
  ];

  const contractRisk = [
    { name: "Month-to-Month", value: 45 },
    { name: "1-Year", value: 30 },
    { name: "2-Year", value: 10 }
  ];

  const billingRisk = [
    { name: "Overcharged", value: 20 },
    { name: "Late Bills", value: 15 },
    { name: "Frequent Queries", value: 10 }
  ];

  const serviceRisk = [
    { name: "Streaming + Data", value: 28 },
    { name: "TV Only", value: 12 },
    { name: "Bundled (Phone + TV + Internet)", value: 8 }
  ];

  const supportRisk = [
    { name: "3+ Complaints", value: 40 },
    { name: "No Complaints", value: 10 },
    { name: "Resolved Quickly", value: 5 }
  ];

  const deviceRisk = [
    { name: "Old Modem (>3 yrs)", value: 18 },
    { name: "Frequent Replacements", value: 12 },
    { name: "New Setup", value: 5 }
  ];

  const additionalTabs = ["Market Simulations", "Chart Builder", "Marketing Insights"];

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f4f6f8" }}>
      <aside style={{ width: "260px", backgroundColor: "#fff", padding: "1rem", boxShadow: "2px 0 8px rgba(0,0,0,0.05)" }}>
        {telecomConfig.sidebar.map((item, index) => (
          <SidebarCard
            key={index}
            title={item.title}
            value={dummyMetrics[item.key]}
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
            {[...telecomConfig.topbarButtons, ...additionalTabs].map((btn, index) => (
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
          {activeView === "Customer Churn" && (
            <>
              <ChartCard title="Churn by Year" data={dummyData.churnByYear} barColor="#FFA726" />
              <ChartCard title="Payment Method" data={dummyData.paymentMethod} barColor="#FB8C00" />
            </>
          )}

          {activeView === "Customer Risk" && (
            <>
              <ChurnMap />
              <ChartCard title="Plan Risk Levels" data={planRiskLevels} barColor="#f44336" />
              <ChartCard title="Geographic Risk" data={geoRiskLevels} barColor="#FB8C00" />
              <ChartCard title="Behavioral Risk" data={behavioralRiskLevels} barColor="#6A1B9A" />
              <ChartCard title="Contract Risk" data={contractRisk} barColor="#1976D2" />
              <ChartCard title="Billing Risk" data={billingRisk} barColor="#C62828" />
              <ChartCard title="Service Risk" data={serviceRisk} barColor="#00897B" />
              <ChartCard title="Support Risk" data={supportRisk} barColor="#7B1FA2" />
              <ChartCard title="Device Risk" data={deviceRisk} barColor="#455A64" />
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

          {activeView === "Marketing Insights" && (
            <MarketingInsights />
          )}

          {activeView === "Batch Prediction" && (
            <div style={{ paddingTop: "2rem", borderTop: "2px solid #ccc", marginTop: "2rem" }}>
              <h3 style={{ marginBottom: "1rem", fontWeight: "bold" }}>Batch Prediction Upload</h3>
              <BatchPrediction />
            </div>
          )}

          {activeView === "Chart Builder" && (
            <ChartBuilder />
          )}
        </main>
      </div>
    </div>
  );
}
