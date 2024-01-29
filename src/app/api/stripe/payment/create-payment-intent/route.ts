import { NextResponse } from "next/server";

import { Stripe } from "stripe";
// This is your test secret API key.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-08-16"
});

const calculateOrderAmount = (amount: number) => {

  const commissionPercent = 8
  const websiteFees = amount * (commissionPercent / 100)
  const stripeFees = (0.30 + (amount * 0.029))
  const transferAbleAmount = amount - (websiteFees + stripeFees)

  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return {
    websiteFees,
    stripeFees,
    transferAbleAmount,
    amount
  };
};

export async function POST(req: Request) {
  const body = await req.json()
  const { amount = 10 } = body

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(Number(amount)).amount * 100,
    currency: "eur",
    payment_method_types: ["card", "klarna", "paypal"],
    description: "this is description",
    receipt_email: "lal@la.co",
    // customer: "User info here"
    // application_fee_amount: 100,
    // transfer_group: "order-10",
    // transfer_data: {
    //   destination: "acct_1ObFlRD7lH43dX4H"
    // }
    metadata: {
      orderId: null,
      sellerAccountId: null,
      totalAmount: Number(calculateOrderAmount(amount).amount).toFixed(2),
      stripeFees: Number(calculateOrderAmount(amount).stripeFees).toFixed(2),
      platformCharge: Number(calculateOrderAmount(amount).websiteFees).toFixed(2),
      amountWillTransfer: Number(calculateOrderAmount(amount).transferAbleAmount).toFixed(2),
    }
  });

  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
  })

};