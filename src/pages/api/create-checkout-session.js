// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, email } = req.body;

  const transformedItems = items.map((item) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        images: [item.image],
        name: item.title,
      },
      unit_amount: item.price * 100,
    },
    description: item.description,
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_rates: ['shr_1IwjGYE2D5GmTFNtaikVFRf3'],
    shipping_address_collection: {
      allowed_countries: ['US', 'CA', 'GB'],
    },
    line_items: transformedItems,
    mode: 'payment',
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item) => item.image)),
    },
  });

  res.status(200).json({ id: session.id });
};

// Use this to test the API and create a session ID
// curl -X POST -is "http://localhost:3000/api/create-checkout-session" -d ""
