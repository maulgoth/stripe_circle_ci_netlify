const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const axios = require('axios');

exports.handler = async ({ body, headers }) => {
  try {
    axios.defaults.headers.common['Circle-Token'] = process.env.CIRCLE_API_KEY;
    axios.post('https://circleci.com/api/v2/project/github/gatorpazz/consider-herbs/pipeline', {branch: "prods"}
    ).then((response) => {
      return {
        statusCode: 200,
        body: JSON.stringify(response)
      };
    });
  } catch (err) {
    console.log(`Stripe webhook failed with ${err}`);

    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`,
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify({ received: true, temp: "YESWEGOTIT" }),
  };
};