/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { useContextStore } from "@/lib/hooks/hooks";
import { TProductSchema } from "@/app/dashboard/products/_utils/types/types";
import { useCartContext } from "@/lib/contexts/cart-context-provider";

function paymentIntent(status: any, products: TProductSchema[]) {
  if (typeof window !== "undefined") {
    
    const dataLayerPayload = products.map((item: TProductSchema) => {
      const { _id, name, price, discount, category, attributes } = item;
      const attributeLables = attributes.map((attribute: any) => {
        const sizes: any = [];
        const colors: string[] = [];
        if (["Colors", "Color", "COLORS", "COLOR"].includes(attribute.label)) {
          attribute.values.forEach((url: any) => {
            const image = url.split("/");
            colors.push(image[image.length - 1].split(".")[0]);
          });
        }
        if (["Sizes", "SIZES", "size", "Size"].includes(attribute.label)) {
          attribute.values.forEach((sizeValue: any) => {
            const value = sizeValue.split(":")[0];
            const sizePrice = parseInt(sizeValue.split(":")[1]);
            sizes.push({
              size: value,
              sizePrice,
            });
          });
        }
        if (sizes.length) {
          return {
            label: attribute.label,
            values: sizes,
          };
        } else if (colors.length) {
          return {
            label: attribute.label,
            values: colors,
          };
        } else {
          return null;
        }
      });
      return {
        _id,
        name,
        price,
        discount,
        category,
        attributes: attributeLables.map((item: any) => item),
      };
    });
    window[`dataLayer`] = window?.dataLayer || [];

    window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
    const datalayer: any = {
      event: "paymentIntent",
      status,
      ecommerce: {
        currencyCode: "AUD",
        items: dataLayerPayload,
      },
    }
    const cookies = window.localStorage.getItem("cookieBanner");
    if(cookies){
      datalayer.cookies = JSON.parse(cookies)
    }
    window.dataLayer.push(datalayer);
  }
}

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export default function PaymentBox({ amount }: { amount: number }) {
  const [clientSecret, setClientSecret] = useState("");
  const { getContext } = useContextStore();
  const { cart } = useCartContext();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/stripe/payment/create-payment-intent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(amount.toFixed(2)),
          method: getContext("paymentMethod") || "card",
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        paymentIntent("success", cart);
      })
      .catch((err) => {
        paymentIntent("error", cart);
      });
  }, []);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  };

  return (
    <div className="flex items-center justify-center min-w-[260px]">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
