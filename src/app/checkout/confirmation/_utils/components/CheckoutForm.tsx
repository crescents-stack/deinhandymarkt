/* eslint-disable react-hooks/exhaustive-deps */
import {
  ConfirmOrderPayment,
  PostOrder,
  UpdatePaymentStatus,
} from "@/app/dashboard/orders/_utils/actions/actions";
import { useAuthContext } from "@/lib/contexts/auth-context-provider";
import { useCartContext } from "@/lib/contexts/cart-context-provider";
import { ActionResponseHandler } from "@/lib/error";
import { useContextStore } from "@/lib/hooks/hooks";
import { PRINT } from "@/lib/utils";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { StripePaymentElementOptions } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import React from "react";
import { GetLocationBaseVatWithIPAPI } from "../actions/actions";
import { TCombination } from "@/app/dashboard/products/_utils/types/types";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { cart, setCart } = useCartContext();
  const { auth } = useAuthContext();
  const { getContext, setContext, removeContext } = useContextStore();

  const [message, setMessage] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const updatePaymentStatus = async (orderId: string, paymentId: string) => {
    const paymentMethod = getContext("paymentMethod");
    const result = await ConfirmOrderPayment({
      orderId,
      paymentId,
      paymentMethod,
    });

    ActionResponseHandler(result, "Payment status update");
    removeContext("sessionId");
    setCart([]);
    router.push("/checkout/complete?orderId=" + orderId);
  };

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
      PRINT({ from: "stripe", paymentIntent });
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          // ActionResponseHandler(
          //   { success: true, message: "Payment status update" },
          //   "Payment process"
          // );
          const _id = getContext("sessionId");
          if (_id) {
            updatePaymentStatus(_id, paymentIntent.id);
          }
          break;
        case "processing":
          setMessage("Your payment is processing.");
          ActionResponseHandler(
            { success: true, message: "Your payment is processing." },
            "Payment process"
          );
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          ActionResponseHandler(
            {
              success: false,
              message: "Your payment was not successful, please try again.",
            },
            "Payment process"
          );
          break;
        default:
          setMessage("Something went wrong.");
          ActionResponseHandler(
            { success: false, message: "Something went wrong." },
            "Payment process"
          );
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    const billingDetails = getContext("billingDetails") ?? {};
    const CountPrice = () => {
      let temp = 0;
      cart.forEach((item) => {
        item.attributeCombinations
          ? item.attributeCombinations?.combinations?.forEach(
              (combination: TCombination) => {
                temp += combination.subtotal;
              }
            )
          : (temp += item.price * item.quantity);
      });
      return temp;
    };
    const vat = await GetLocationBaseVatWithIPAPI(CountPrice());

    // @TODO there will be no price and base price Key. But we need to add optional price or, attributeCombinations
    let orderPayload: any = {
      lineItems: [
        ...cart.map((item) => {
          return {
            product: item._id,
            quantity: item.quantity,
            price: item.attributeCombinations
              ? item.attributeCombinations.subtotal
              : item.price,
          };
        }),
      ],
      shippingAddress: billingDetails.delivery,
      billingAddress: billingDetails.billing,
      shippingCost: 0,
      shippingMethod: "DHL",
      tax: vat ?? 0,
    };
    if (auth?.accessToken) {
      orderPayload = { ...orderPayload, uid: auth?.uid };
    }
    PRINT(orderPayload);

    const orderIdInStorage = getContext("sessionId");

    if (!orderIdInStorage) {
      const orderResponse = await PostOrder(orderPayload);
      ActionResponseHandler(orderResponse, "Placing new order");

      if (orderResponse.success) {
        setContext("sessionId", orderResponse.data._id);
      }
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/checkout/confirmation`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message as string);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "tabs",
  };
  // const stripeAddressElementOptions: StripeAddressElementOptions = {
  //   mode: "billing",
  //   fields: {
  //     phone: "auto"
  //   }
  // }

  return (
    <form
      id="payment-form stripe_form"
      onSubmit={handleSubmit}
      // style={{
      //   width: "27vw",
      // }}
      className="w-full"
    >
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      {/* <AddressElement id="payment-element" options={stripeAddressElementOptions} /> */}
      <button
        disabled={isLoading || !stripe || !elements}
        className="stripe_btn"
        id="submit"
      >
        <span id="button-text">
          {isLoading ? (
            <div className="stripe_spinner" id="stripe_spinner"></div>
          ) : (
            "Pay now"
          )}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
