import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  LabelList
} from "recharts";

function ClusterScatterChart({ data }) {
  return (
    <div className="chart-card">
      <h3>Cluster Visualization: ARPU vs Complaints</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
          <CartesianGrid />
          <XAxis dataKey="arpu" name="ARPU" unit="$" />
          <YAxis dataKey="complaints" name="Complaints" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Legend />
          <Scatter name="Clusters" data={data} fill="#8884d8">
            <LabelList dataKey="cluster" position="top" />
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ClusterScatterChart;
