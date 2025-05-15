const simulationModel = {
  intercept: 0.700,
  coefficients: {
    monthlyCharges: 0.048,
    tenure: -0.140,
    engagementScore: -0.020,
    discount: -0.110
  },
  categoricalAdjustments: {
    riskLevel: {
      Low: -1.377,
      Medium: -0.506,
      High: 0
    },
    customerSegment: {
      Loyal: -1.825,
      Premium: -0.995,
      Budget: 0
    }
  }
};


export default simulationModel;
