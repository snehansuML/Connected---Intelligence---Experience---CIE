import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList
} from "recharts";

function ChartCard({ title, data, barColor = "#42A5F5" }) {
  return (
    <div className="chart-card">
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} layout="vertical">
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={100} />
          <Tooltip formatter={(value) => `${value}%`} />
          <Bar dataKey="value" fill={barColor}>
            <LabelList
              dataKey="value"
              position="right"
              formatter={(value) => `${value}%`}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartCard;
