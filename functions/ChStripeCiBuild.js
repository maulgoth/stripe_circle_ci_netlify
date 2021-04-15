const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const axios = require('axios');

exports.handler = async ({ body, headers }) => {
  try {
    // check the webhook to make sure it’s valid
    // const stripeEvent = stripe.webhooks.constructEvent(
    //   body,
    //   headers['stripe-signature'],
    //   process.env.STRIPE_WEBHOOK_SECRET
    // );

    // only do stuff if this is a successful Stripe Checkout purchase
    // if (stripeEvent.type === 'price.updated') {

    axios.defaults.headers.common['Circle-Token'] = process.env.CIRCLE_API_KEY;
    axios.post('https://circleci.com/api/v2/project/github/gatorpazz/consider-herbs/pipeline'
    );
    
    // }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (err) {
    console.log(`Stripe webhook failed with ${err}`);

    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`,
    };
  }
};