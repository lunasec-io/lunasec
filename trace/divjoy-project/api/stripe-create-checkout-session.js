const express = require("express");
const requireAuth = require("./_require-auth.js");
const { getUser, updateUser } = require("./_db.js");
const stripe = require("./_stripe.js");
const router = express.Router();

router.post("/", requireAuth, async (req, res) => {
  const body = req.body;
  const user = req.user;

  if (!body.priceId) {
    return res.status(400).send({
      status: "error",
      message: "No priceId is defined in request body",
    });
  }

  try {
    let { email, stripeCustomerId } = await getUser(user.uid);

    // If user is not a customer then create a customer in Stripe
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({ email: email });

      await updateUser(user.uid, {
        stripeCustomerId: customer.id,
      });

      stripeCustomerId = customer.id;
    }

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      payment_method_types: ["card"],
      subscription_data: {
        // Use trial period set for this priceId (if there is one)
        trial_from_plan: true,
        // Uncomment to add a coupon code from request body
        //coupon: body.coupon
      },
      line_items: [
        {
          price: body.priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      // Uncomment to allow user to enter a promotional code
      //allow_promotion_codes: true,
      // Uncomment if you need address collection
      //billing_address_collection: "required",
      //shipping_address_collection: { allowed_countries: ['US'] },
      success_url: body.successUrl,
      cancel_url: body.cancelUrl,
    });

    // Return success response
    res.send({ status: "success", data: session });
  } catch (error) {
    console.log("stripe-create-checkout-session error", error);

    // Return error response
    res.send({ status: "error", code: error.code, message: error.message });
  }
});

module.exports = router;
