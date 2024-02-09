import {
    useElements,
    useStripe
} from "@stripe/react-stripe-js";
import { StripePaymentElementOptions } from "@stripe/stripe-js";
import React from "react";

export default function MessageBox() {
    const stripe = useStripe();

    const [message, setMessage] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            
            switch (paymentIntent?.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);


    const paymentElementOptions: StripePaymentElementOptions = {
        layout: "tabs",
    };

    return (
        <>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
        </>
    );
}