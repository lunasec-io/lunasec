require("dotenv").config();
const express = require("express");
const user = require("./user.js");
const item = require("./item.js");
const items = require("./items.js");
const newsletter = require("./newsletter.js");
const stripeCreateBillingSession = require("./stripe-create-billing-session.js");
const stripeWebhook = require("./stripe-webhook.js");
const stripeCreateCheckoutSession = require("./stripe-create-checkout-session.js");

const app = express();

// Get the raw body which is needed by Stripe webhook
const jsonOptions = {
  verify: (req, res, buf) => {
    if (buf && buf.length) {
      req.rawBody = buf.toString("utf8");
    }
  },
};

app.use(express.json(jsonOptions));
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", user);
app.use("/api/item", item);
app.use("/api/items", items);
app.use("/api/newsletter", newsletter);
app.use("/api/stripe-create-billing-session", stripeCreateBillingSession);
app.use("/api/stripe-webhook", stripeWebhook);
app.use("/api/stripe-create-checkout-session", stripeCreateCheckoutSession);

app.listen(8080, function () {
  console.log("Server listening on port 8080");
});
