const telecomConfig = {
  appTitle: "Teleco Insights",
  logoPath: "/logos/telecom.svg",

  // Sidebar metrics
  sidebar: [
    { title: "Active Customers", key: "activeCustomers", isCurrency: false },
    { title: "Monthly Customer Churn", key: "customerChurn", isCurrency: false },
    { title: "Yearly Charges", key: "yearlyCharges", isCurrency: true },
    { title: "Monthly Charges", key: "monthlyCharges", isCurrency: true },
    { title: "Admin Tickets", key: "adminTickets", isCurrency: false },
    { title: "Tech Tickets", key: "techTickets", isCurrency: false }
     // ✅ NEW LINE
  ],
  

  // Topbar navigation buttons
  topbarButtons: [
    //"Customer Churn",
    "Customer Segments",
    "Customer Risk",
    "Marketing Insights",
    "Market Simulations",
    "Next Best Action",
    "LLM Insights" ,
    "Chart Builder",
    "Batch Prediction"    
    
  ],

  // Chart configuration
  chartConfigs: {
    churnByYear: {
      title: "Churn by Year",
      color: "#FFA726"
    },
    paymentMethod: {
      title: "Payment Method",
      color: "#FB8C00"
    },
    riskLevels: {
      title: "Risk Levels",
      color: "#f44336"
    },
    riskByTenure: {
      title: "Risk by Tenure",
      color: "#6A1B9A"
    },
    segments: {
      demographics: {
        title: "Age Groups",
        color: "#8E24AA"
      },
      gender: {
        title: "Gender Split",
        color: "#3949AB"
      },
      location: {
        title: "Customer Location",
        color: "#1E88E5"
      },
      spending: {
        title: "Spending Patterns (ARPU)",
        color: "#43A047"
      },
      payment_method: {
        title: "Preferred Payment Method",
        color: "#00796B" // teal shade for distinction
      },
      plans: {
        title: "Service Plan Types",
        color: "#FB8C00"
      },
      behavior: {
        title: "Behavioral Segments",
        color: "#F4511E"
      },
      clusters: {
        title: "Cluster Groups (ML)",
        color: "#6D4C41"
      }

    }
  }
};

export default telecomConfig;
