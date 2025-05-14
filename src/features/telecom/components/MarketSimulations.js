import React, { useState, useEffect } from "react";

export default function MarketSimulations() {
  const [inputs, setInputs] = useState({
    customerSegment: "Premium",
    monthlyCharges: 70,
    tenure: 24,
    riskLevel: "Low",
    engagementScore: 80,
    discount: 10
  });

  const [results, setResults] = useState({
    churnRate: 0,
    revenue: 0,
    cltv: 0,
    retention: 0
  });

  const [previousResults, setPreviousResults] = useState(null);

  useEffect(() => {
    const churnRate =
      18 -
      inputs.engagementScore * 0.03 -
      inputs.discount * 0.5 - inputs.tenure * 0.3 +
      (inputs.riskLevel === "High"
        ? 4
        : inputs.riskLevel === "Medium"
        ? 2
        : 0) +
        (inputs.customerSegment === "Premium"
            ? 4
            : inputs.customerSegment === "Budget"
            ? 2
            : 0);

    const revenue = inputs.monthlyCharges * (1 - churnRate / 100);
    const cltv = inputs.monthlyCharges * inputs.tenure;
    const retention = 100 - churnRate;

    setPreviousResults(results);

    setResults({
      churnRate: churnRate.toFixed(1),
      revenue: revenue.toLocaleString(undefined, { maximumFractionDigits: 0 }),
      cltv: cltv.toLocaleString(undefined, { maximumFractionDigits: 0 }),
      retention: retention.toFixed(1)
    });
  }, [inputs]);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      {/* Blue banner */}
      <div style={{ backgroundColor: "#003366", color: "#fff", padding: "1rem 2rem" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: "bold" }}>Market Simulations</h2>
      </div>

      {/* Two-column layout */}
      <div style={{ display: "flex", gap: "2rem", padding: "2rem" }}>
        {/* Left Panel – Inputs */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#fff",
            padding: "1.5rem",
            borderRadius: "12px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
          }}
        >
          <h3 style={{ fontWeight: "bold", marginBottom: "1rem" }}>Inputs</h3>

          <label>Customer Segment</label>
          <select
            value={inputs.customerSegment}
            onChange={(e) =>
              setInputs({ ...inputs, customerSegment: e.target.value })
            }
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
          >
            <option>Budget</option>
            <option>Premium</option>
            <option>Loyal</option>
          </select>

          <label>
            Monthly Charges: <strong>${inputs.monthlyCharges}</strong>
          </label>
          <input
            type="range"
            min={20}
            max={100}
            value={inputs.monthlyCharges}
            onChange={(e) =>
              setInputs({ ...inputs, monthlyCharges: +e.target.value })
            }
            style={{ width: "100%" }}
          />

          <label>
            Tenure (months): <strong>{inputs.tenure}</strong>
          </label>
          <input
            type="range"
            min={1}
            max={36}
            value={inputs.tenure}
            onChange={(e) =>
              setInputs({ ...inputs, tenure: +e.target.value })
            }
            style={{ width: "100%" }}
          />

          <label>Risk Level</label>
          <select
            value={inputs.riskLevel}
            onChange={(e) =>
              setInputs({ ...inputs, riskLevel: e.target.value })
            }
            style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <label>
            Engagement Score: <strong>{inputs.engagementScore}</strong>
          </label>
          <input
            type="range"
            min={0}
            max={100}
            value={inputs.engagementScore}
            onChange={(e) =>
              setInputs({ ...inputs, engagementScore: +e.target.value })
            }
            style={{ width: "100%" }}
          />

          <label>
            Discount Offered: <strong>{inputs.discount}%</strong>
          </label>
          <input
            type="range"
            min={0}
            max={30}
            value={inputs.discount}
            onChange={(e) =>
              setInputs({ ...inputs, discount: +e.target.value })
            }
            style={{ width: "100%" }}
          />
        </div>

        {/* Right Panel – Results */}
        <div style={{ flex: 2, display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[
            { key: "churnRate", label: "Churn Rate", isPercent: true },
            { key: "cltv", label: "Customer Lifetime Value", isPercent: false },
            { key: "revenue", label: "Revenue", isPercent: false },
            { key: "retention", label: "Retention Rate", isPercent: true }
          ].map((item, i) => {
            const current = results[item.key];
            const previous = previousResults?.[item.key];

            const getDeltaDisplay = (current, previous, isPercent = false) => {
              if (!previous) return null;
              const curr = parseFloat(current.toString().replace(/,/g, ""));
              const prev = parseFloat(previous.toString().replace(/,/g, ""));
              const delta = curr - prev;
              const arrow = delta > 0 ? "↑" : delta < 0 ? "↓" : "→";
              const color = delta > 0 ? "#007f00" : delta < 0 ? "#b91c1c" : "#666";
              const formatted = isPercent
                ? `${Math.abs(delta).toFixed(1)}%`
                : Math.abs(delta).toLocaleString();
              return { arrow, color, formatted };
            };

            const delta = getDeltaDisplay(current, previous, item.isPercent);

            return (
              <div
                key={i}
                style={{
                  backgroundColor: "#fff",
                  padding: "1rem",
                  borderRadius: "12px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                }}
              >
                <p style={{ fontSize: "0.95rem", color: "#444", fontWeight: 500 }}>
                  {item.label}
                </p>
                <p style={{ fontSize: "2rem", fontWeight: 700, color: "#000" }}>
                  {item.isPercent ? `${current}%` : `$${current}`}
                </p>
                {delta && (
                  <p style={{ color: delta.color, fontSize: "1rem", fontWeight: 600 }}>
                    {delta.arrow} {delta.formatted}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
