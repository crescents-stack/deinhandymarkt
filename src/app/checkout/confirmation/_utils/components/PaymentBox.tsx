/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { useContextStore } from "@/lib/hooks/hooks";
import { PRINT } from "@/lib/utils";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export default function PaymentBox({ amount }: { amount: number }) {
  const [clientSecret, setClientSecret] = useState("");
  const { getContext } = useContextStore();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    PRINT(parseFloat(amount.toFixed(2)))
    fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/stripe/payment/create-payment-intent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(amount.toFixed(2)),
          method: getContext("paymentMethod") ?? "card",
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  };

  return (
    <div className="flex items-center justify-center ">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}