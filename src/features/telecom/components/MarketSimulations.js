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

  useEffect(() => {
    const churnRate =
      18 -
      inputs.discount * 0.3 +
      (inputs.riskLevel === "High" ? 4 : inputs.riskLevel === "Medium" ? 2 : 0);

    const revenue = inputs.monthlyCharges * (1 - churnRate / 100);
    const cltv = inputs.monthlyCharges * inputs.tenure;
    const retention = 100 - churnRate;

    setResults({
      churnRate: churnRate.toFixed(1),
      revenue: revenue.toFixed(0),
      cltv: cltv.toFixed(0),
      retention: retention.toFixed(1)
    });
  }, [inputs]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">📊 Market Simulations</h2>

      <div className="grid grid-cols-2 gap-8">
        {/* Inputs Panel */}
        <div className="bg-white shadow p-6 rounded">
          <h3 className="font-semibold text-lg mb-4">Inputs</h3>

          <label>Customer Segment</label>
          <select
            value={inputs.customerSegment}
            onChange={(e) =>
              setInputs({ ...inputs, customerSegment: e.target.value })
            }
          >
            <option>Budget</option>
            <option>Premium</option>
            <option>Loyal</option>
          </select>

          <label>Monthly Charges: ${inputs.monthlyCharges}</label>
          <input
            type="range"
            min={20}
            max={100}
            value={inputs.monthlyCharges}
            onChange={(e) =>
              setInputs({ ...inputs, monthlyCharges: +e.target.value })
            }
          />

          <label>Tenure (months): {inputs.tenure}</label>
          <input
            type="range"
            min={1}
            max={36}
            value={inputs.tenure}
            onChange={(e) =>
              setInputs({ ...inputs, tenure: +e.target.value })
            }
          />

          <label>Risk Level</label>
          <select
            value={inputs.riskLevel}
            onChange={(e) =>
              setInputs({ ...inputs, riskLevel: e.target.value })
            }
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <label>Engagement Score: {inputs.engagementScore}</label>
          <input
            type="range"
            min={0}
            max={100}
            value={inputs.engagementScore}
            onChange={(e) =>
              setInputs({ ...inputs, engagementScore: +e.target.value })
            }
          />

          <label>Discount Offered: {inputs.discount}%</label>
          <input
            type="range"
            min={0}
            max={30}
            value={inputs.discount}
            onChange={(e) =>
              setInputs({ ...inputs, discount: +e.target.value })
            }
          />
        </div>

        {/* Results Panel */}
        <div className="bg-white shadow p-6 rounded">
          <h3 className="font-semibold text-lg mb-4">Simulated Results</h3>
          <p>
            <strong>Churn Rate:</strong> {results.churnRate}%
          </p>
          <p>
            <strong>Revenue:</strong> ${results.revenue}
          </p>
          <p>
            <strong>Customer Lifetime Value:</strong> ${results.cltv}
          </p>
          <p>
            <strong>Retention Rate:</strong> {results.retention}%
          </p>
        </div>
      </div>
    </div>
  );
}
