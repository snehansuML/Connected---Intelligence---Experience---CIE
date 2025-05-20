import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, LabelList } from "recharts";
import { evaluateNBA } from "../../../shared/NBAEngine";
import { evaluateChurn } from "../../../shared/churnEngine";
import nbaModel from "../../../config/telecom/nbaModel";

// Input Panel Component
function InputPanel({ inputs, setInputs, churnRate }) {
  return (
    <div style={{ flex: 1 }}>
      <h3>Customer Profile</h3>
      <label>Monthly Charges: ${inputs.monthlyCharges}</label>
      <input
        type="range"
        min={10}
        max={150}
        value={inputs.monthlyCharges}
        onChange={(e) =>
          setInputs({ ...inputs, monthlyCharges: +e.target.value })
        }
        style={{ width: "100%", accentColor: "#1976d2" }}
        aria-label="Monthly Charges"
      />

      <label>Engagement Score: {inputs.engagementScore}</label>
      <input
        type="range"
        min={0}
        max={100}
        value={inputs.engagementScore}
        onChange={(e) =>
          setInputs({ ...inputs, engagementScore: +e.target.value })
        }
        style={{ width: "100%", accentColor: "#1976d2" }}
        aria-label="Engagement Score"
      />

      <label>Discount: {inputs.discount}%</label>
      <input
        type="range"
        min={0}
        max={30}
        value={inputs.discount}
        onChange={(e) =>
          setInputs({ ...inputs, discount: +e.target.value })
        }
        style={{ width: "100%", accentColor: "#1976d2" }}
        aria-label="Discount"
      />

      <label>Tenure: {inputs.tenure} months</label>
      <input
        type="range"
        min={1}
        max={36}
        value={inputs.tenure}
        onChange={(e) =>
          setInputs({ ...inputs, tenure: +e.target.value })
        }
        style={{ width: "100%", accentColor: "#1976d2" }}
        aria-label="Tenure"
      />

      <label>Risk Level:</label>
      <select
        value={inputs.riskLevel}
        onChange={(e) =>
          setInputs({ ...inputs, riskLevel: e.target.value })
        }
        style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
        aria-label="Risk Level"
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <label>Customer Segment:</label>
      <select
        value={inputs.customerSegment}
        onChange={(e) =>
          setInputs({ ...inputs, customerSegment: e.target.value })
        }
        style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
        aria-label="Customer Segment"
      >
        <option>Budget</option>
        <option>Premium</option>
        <option>Loyal</option>
      </select>

      <p style={{ marginTop: "1rem" }}>
        📉 <strong>Base Churn Rate:</strong> {churnRate}%
      </p>
    </div>
  );
}

// Output Panel Component
function OutputPanel({ result }) {
  if (!result) return null;

  return (

    
    <div style={{ flex: 1 }}>
      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "1.5rem",
          borderRadius: "8px",
        }}
      >
        <h3>🧠 Recommended Action</h3>
        <p style={{ fontSize: "0.95rem", color: "#555" }}>
  {nbaModel.descriptions[result.bestAction.action]}
</p>

        <p>📉 New Churn Rate: {result.bestAction.newChurnRate}%</p>
        <p>💰 Revenue: ${result.bestAction.newRevenue}</p>
        <p>💸 Cost: ${result.bestAction.cost}</p>

        <hr style={{ margin: "1rem 0" }} />
        <h4>📊 All Actions</h4>
        <ul>
          {result.allActions.map((a) => (
            <li key={a.action}>
              {a.action}: {a.newChurnRate}% churn, ${a.newRevenue} revenue
            </li>
          ))}
        </ul>

        {/* Visualization */}
        <div style={{ marginTop: "2rem", height: 250 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={result.allActions}>
              <XAxis dataKey="action" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="newChurnRate" fill="#1976d2" name="Churn Rate (%)">
                <LabelList dataKey="newChurnRate" position="top" />
              </Bar>
              <Bar dataKey="newRevenue" fill="#43a047" name="Revenue ($)">
                <LabelList
                  dataKey="newRevenue"
                  position="top"
                  formatter={(val) => `$${Number(val).toLocaleString()}`}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// Main NBA Recommendation Component
export default function NBARecommendation() {
  const [inputs, setInputs] = useState({
    monthlyCharges: 60,
    engagementScore: 65,
    discount: 10,
    tenure: 12,
    riskLevel: "Medium",
    customerSegment: "Budget",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const churnRate = +(evaluateChurn(inputs) * 100).toFixed(1);

  useEffect(() => {
    setLoading(true);
    setError("");
    try {
      const evaluation = evaluateNBA(inputs, churnRate);
      setResult(evaluation);
    } catch (e) {
      setError("Failed to evaluate NBA. Please check your inputs or try again.");
      setResult(null);
    }
    setLoading(false);
    // eslint-disable-next-line
  }, [JSON.stringify(inputs), churnRate]);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
        🎯 Next Best Action
      </h2>
      <div style={{ display: "flex", gap: "2rem", marginTop: "2rem" }}>
        <InputPanel inputs={inputs} setInputs={setInputs} churnRate={churnRate} />
        <div style={{ flex: 1 }}>
          {loading && <p>Loading recommendations...</p>}
          {error && (
            <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
          )}
          {!loading && !error && <OutputPanel result={result} />}
        </div>
      </div>
    </div>
  );
}
