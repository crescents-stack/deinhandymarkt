"use client"

import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import MessageBox from "./messagePage";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function Wrapper() {

    const options: StripeElementsOptions = {
        appearance: {
            theme: "stripe"
        },
    };

    return (
        <div className="flex items-center justify-center h-screen">

            <Elements options={options} stripe={stripePromise}>
                <MessageBox />
            </Elements>

        </div>
    );
}