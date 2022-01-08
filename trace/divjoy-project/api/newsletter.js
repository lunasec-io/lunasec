const express = require("express");
const Mailchimp = require("mailchimp-api-v3");
const router = express.Router();

const mailchimpClient = new Mailchimp(process.env.MAILCHIMP_API_KEY);
const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

router.post("/", (req, res) => {
  const body = req.body;

  return mailchimpClient
    .request({
      method: "POST",
      path: "/lists/" + audienceId + "/members",
      body: {
        email_address: body.email,
        // Set status to "subscribed" to disable double-opt-in
        status: "pending",
      },
    })
    .then((result) => {
      res.send({ status: "success" });
    })
    .catch((error) => {
      console.log("newsletter error", error);

      // If error due to email already in list then return success response
      // rather than an error (the user doesn't need to know).
      if (error.title === "Member Exists") {
        return res.send({ status: "success" });
      }

      res.send({ status: "error" });
    });
});

module.exports = router;
