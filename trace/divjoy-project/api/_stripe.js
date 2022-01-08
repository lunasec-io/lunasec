const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY, {
  // Pin to specific version of the Stripe API
  apiVersion: "2020-08-27",
});

module.exports = stripe;
