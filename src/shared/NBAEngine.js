//import nbaModel from "../../../config/telecom/nbaModel";
//import nbaModel from "../../config/telecom/nbaModel";
//import nbaModel from "../../config/telecom/nbaModel";
//import nbaModel from "../../config/telecom/nbaModel";
import nbaModel from "../config/telecom/nbaModel";


export function evaluateNBA(inputs, baseChurnRate) {
  const baseChurn = baseChurnRate / 100; // expect % from UI
  const baseRevenue = inputs.monthlyCharges || 50;

  const results = nbaModel.actions.map((action) => {
    const impact = nbaModel.impactProfiles[action] || {};

    const newChurnRate = Math.max(0, baseChurn + (impact.churnDelta || 0));
    const newRevenue = baseRevenue + (impact.revenueDelta || 0);
    const cost = impact.cost || 0;

    const score = (baseChurn - newChurnRate) * 100 + newRevenue - cost;

    return {
      action,
      newChurnRate: +(newChurnRate * 100).toFixed(1),
      newRevenue: newRevenue.toFixed(2),
      cost,
      score
    };
  });

  const bestAction = results.reduce((a, b) => (a.score > b.score ? a : b));

  return {
    bestAction,
    allActions: results.sort((a, b) => b.score - a.score),
    baseChurn: baseChurnRate
  };
}
