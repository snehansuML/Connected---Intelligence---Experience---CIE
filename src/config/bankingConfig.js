const bankingConfig = {
    appTitle: "Banking CX Dashboard",
    logoPath: "/logos/banking.svg",
  
    // Sidebar metrics
    sidebar: [
      { title: "At-Risk Customers", key: "atRiskCustomers", isCurrency: false },
      { title: "Total Deposits", key: "totalDeposits", isCurrency: true },
      { title: "Active Accounts", key: "activeAccounts", isCurrency: false },
      { title: "Loan Delinquencies", key: "loanDelinquencies", isCurrency: false },
      { title: "Support Tickets", key: "supportTickets", isCurrency: false }
    ],
  
    // Topbar navigation buttons
    topbarButtons: [
      "Customer Risk",
      "Product Usage",
      "Insights",
      "Customer Segments"
    ],
  
    // Chart configuration
    chartConfigs: {
      productUsage: {
        title: "Product Usage by Type",
        color: "#1976D2"
      },
      riskLevels: {
        title: "Risk Levels",
        color: "#D32F2F"
      },
      complaintsByCategory: {
        title: "Complaints by Category",
        color: "#FFA000"
      },
      delinquencyByAge: {
        title: "Delinquency by Age Group",
        color: "#7B1FA2"
      },
      segments: {
        demographics: {
          title: "Age Groups",
          color: "#8E24AA"
        },
        region: {
          title: "Customer Region",
          color: "#1E88E5"
        },
        productMix: {
          title: "Product Mix",
          color: "#43A047"
        },
        tenure: {
          title: "Customer Tenure",
          color: "#FB8C00"
        },
        behavior: {
          title: "Behavioral Segments",
          color: "#F4511E"
        },
        creditScore: {
          title: "Credit Score Bands",
          color: "#6D4C41"
        }
      }
    }
  };
  
  export default bankingConfig;
  