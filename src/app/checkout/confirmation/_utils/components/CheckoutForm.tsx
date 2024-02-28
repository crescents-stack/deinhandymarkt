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
import {
  TCombination,
  TProductSchema,
} from "@/app/dashboard/products/_utils/types/types";

// const measuringOrderCreate = (status: string, data: any) => {
//   if (typeof window !== "undefined") {
//     window[`dataLayer`] = window?.dataLayer || [];

//     window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
//     window.dataLayer.push({
//       event: "orderCreate",
//       componentName: "created_order",
//       ecommerce: {
//         currencyCode: "AUD",
//         updatedWith: {
//           status: status,
//           payload: data,
//         },
//       },
//     });
//   }
// };

const measuringPaymentStatus = (
  status: string,
  data: any,
  products: TProductSchema[]
) => {
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
    const payload = { ...data };
    const transactionID = payload._id;
    delete payload.lineItems;
    delete payload.activities;
    delete payload.shippingAddress;
    delete payload.billingAddress;
    delete payload._id;
    payload.items = dataLayerPayload;
    window[`dataLayer`] = window?.dataLayer || [];

    window.dataLayer.push({ ecommerce: null });

    const datalayer: any = {
      event: "purchase",
      componentName: "purchase",
      billingAddress: {
        billing: data.billingAddress,
        shipping: data.shippingAddress,
      },
      ecommerce: {
        currencyCode: "AUD",
        transactionId: transactionID,
        ...payload,
      },
    };
    const cookies = window.localStorage.getItem("cookieBanner");
    if (cookies) {
      datalayer.cookies = JSON.parse(cookies);
    }

    window.dataLayer.push(datalayer);
  }
};

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { cart, setCart } = useCartContext();
  const { auth } = useAuthContext();
  const { getContext, setContext, removeContext } = useContextStore();

  const [message, setMessage] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const GetPayload = async () => {
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

    const vat = await GetLocationBaseVatWithIPAPI(
      CountPrice(),
      billingDetails.billing.land
    );

    let orderPayload: any = {
      lineItems: [
        ...cart.map((item) => {
          return {
            product: item._id,
            name: item.name,
            quantity: item.quantity,
            price: item.attributeCombinations
              ? item.attributeCombinations.subtotal
              : item.price,
            attributeCombinations: item.attributeCombinations,
          };
        }),
      ],
      shippingAddress: billingDetails.delivery,
      billingAddress: billingDetails.billing,
      shippingCost: 0,
      shippingMethod: "DHL",
      tax: vat ?? 0,
    };

    return orderPayload;
  };

  const updatePaymentStatus = async (orderId: string, paymentId: string) => {
    const paymentMethod = getContext("paymentMethod");
    const result = await ConfirmOrderPayment({
      orderId,
      paymentId,
      paymentMethod,
    });

    ActionResponseHandler(result, "Payment status update");
    console.log(result.data);
    if (result.success) {
      measuringPaymentStatus("success", result.data, cart);
    } else {
      measuringPaymentStatus("failed", result.data, cart);
    }
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

    let orderPayload = await GetPayload();

    if (auth?.accessToken) {
      orderPayload = { ...orderPayload, uid: auth?.uid };
    }

    const orderIdInStorage = getContext("sessionId");
    if (!orderIdInStorage) {
      const orderResponse = await PostOrder(orderPayload);
      ActionResponseHandler(orderResponse, "Placing new order");

      if (orderResponse.success) {
        // measuringOrderCreate("success", orderResponse.data);
        setContext("sessionId", orderResponse.data._id);
      }
      // else {
      //   measuringOrderCreate("failed", orderPayload);
      // }
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/checkout/confirmation`,
      },
    });

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
