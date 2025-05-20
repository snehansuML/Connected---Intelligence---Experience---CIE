const nbaModel = {
    actions: [
      "Do Nothing",
      "Offer Discount",
      "Call Customer",
      "Upsell Plan",
      "Cross-Sell Add-on"
    ],
    impactProfiles: {
      "Do Nothing": { churnDelta: 0, revenueDelta: 0, cost: 0 },
      "Offer Discount": { churnDelta: -0.08, revenueDelta: -5, cost: 1 },
      "Call Customer": { churnDelta: -0.10, revenueDelta: 0, cost: 5 },
      "Upsell Plan": { churnDelta: -0.03, revenueDelta: 10, cost: 0 },
      "Cross-Sell Add-on": { churnDelta: -0.02, revenueDelta: 7, cost: 0 }
    },
    descriptions: {
      "Do Nothing": "Take no action and monitor customer behavior.",
      "Offer Discount": "Apply a short-term loyalty discount to retain the user.",
      "Call Customer": "Assign a support agent to check in with the customer.",
      "Upsell Plan": "Offer a higher-tier plan with more benefits.",
      "Cross-Sell Add-on": "Recommend an additional service (e.g., streaming or data bundle)."
    }
  };
  
  export default nbaModel;
  