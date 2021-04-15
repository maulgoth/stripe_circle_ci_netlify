// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const fetch = require("node-fetch");

exports.handler = async ({ body, headers }) => {
  try {
    fetch("https://circleci.com/api/v2/project/github/gatorpazz/consider-herbs/pipeline", {
      body: {"branch": "prods"},
      headers: {
        Authorization: process.env.CIRCLE_KEY,
        "Content-Type": "application/json"
      },
      method: "POST"
    })
  } catch (err) {
    console.log(`Stripe webhook failed with ${err}`);

    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`,
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify({ received: true }),
  };
};