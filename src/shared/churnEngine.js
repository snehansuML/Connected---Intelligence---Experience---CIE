export function evaluateChurn(inputs) {
    const {
      engagementScore = 60,
      discount = 10,
      tenure = 12,
      riskLevel = "Medium",
      customerSegment = "Budget"
    } = inputs;
  
    // Base model logic (logistic regression style)
    let z =
      -1.0 + // intercept
      engagementScore * -0.02 +
      discount * -0.05 +
      tenure * -0.04;
  
    // Risk level adjustments
    const riskAdjust = {
      High: 0.5,
      Medium: 0.2,
      Low: -0.3
    };
    z += riskAdjust[riskLevel] || 0;
  
    // Segment adjustments
    const segmentAdjust = {
      Budget: 0.2,
      Premium: -0.4,
      Loyal: -0.6
    };
    z += segmentAdjust[customerSegment] || 0;
  
    const churnProbability = 1 / (1 + Math.exp(-z)); // sigmoid
    return churnProbability; // e.g. 0.178
  }
  