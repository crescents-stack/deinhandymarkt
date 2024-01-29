import { NextResponse } from "next/server";

import { Stripe } from "stripe";
// This is your test secret API key.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16"
});

export async function POST(req: Request) {
  const body = await req.json()
  const { amount = 10, method = "card" } = body

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: "aud",
    payment_method_types: [method],
    description: "this is description",
    receipt_email: "lal@la.co",
    // customer: "User info here"
  });

  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
  })

};