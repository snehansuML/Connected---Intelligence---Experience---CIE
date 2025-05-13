import React from "react";
import { useParams } from "react-router-dom";

// Import vertical dashboards
import TelecomDashboard from "../features/telecom/Dashboard";
// Future verticals (add as needed)
import BankingDashboard from "../features/banking/Dashboard";
import RetailDashboard from "../features/retail/Dashboard";

export default function VerticalRouter() {
  const { vertical } = useParams();

  // Match vertical to dashboard component
  switch (vertical) {
    case "telecom":
      return <TelecomDashboard />;
    case "banking":
      return <BankingDashboard />;
    case "retail":
      return <RetailDashboard />;
    
    default:
      return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h2>🚧 Vertical not available</h2>
          <p>{vertical} is not yet configured. Please check back later.</p>
        </div>
      );
  }
}
