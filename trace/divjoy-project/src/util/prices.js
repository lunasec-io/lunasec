// Map our custom plan IDs ("basic", "premium", etc) to Stripe price IDs
const stripePriceIds = {
  starter: process.env.REACT_APP_STRIPE_PRICE_STARTER,
  pro: process.env.REACT_APP_STRIPE_PRICE_PRO,
  business: process.env.REACT_APP_STRIPE_PRICE_BUSINESS,
};

// Get Stripe priceId
export function getStripePriceId(planId) {
  return stripePriceIds[planId];
}

// Get friendly plan ID ("basic", "premium", etc) by Stripe plan ID
// Used in auth.js to include planId in the user object
export function getFriendlyPlanId(stripePriceId) {
  return Object.keys(stripePriceIds).find(
    (key) => stripePriceIds[key] === stripePriceId
  );
}
