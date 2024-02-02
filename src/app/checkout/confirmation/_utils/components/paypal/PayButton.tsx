"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  CreateOrderActions,
  CreateOrderRequestBody,
  OnApproveActions,
} from "@paypal/paypal-js";
import { useContextStore } from "@/lib/hooks/hooks";
import { useCartContext } from "@/lib/contexts/cart-context-provider";
import {
  PostOrder,
  UpdatePaymentStatus,
} from "@/app/dashboard/orders/_utils/actions/actions";
import { ActionResponseHandler } from "@/lib/error";
import { PRINT } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";

export type TPayloadForPaypal = {
  amount: {
    value: number;
    currency?: string;
  };
};

export const PayButtons = (payload: TPayloadForPaypal) => {
  const { getContext, setContext } = useContextStore();
  const { cart, setCart } = useCartContext();
  const router = useRouter();
  const [{ isPending, isInitial, isRejected, isResolved, options }] =
    usePayPalScriptReducer();
  // console.log({ isPending, isInitial, isRejected, isResolved, options });

  const handleCreateOrder = async (actions: CreateOrderActions | any) => {
    const _id = await preHandlerCreateOrder();

    // console.log(_id);

    const id = await actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          description: _id,
          amount: {
            value: String(payload.amount.value),
            currency_code: payload.amount.currency || "USD",
          },
        },
      ],
    });
    return id;
  };

  const handleError = async (payload: any) => {
    console.log(payload);
  };
  const handleApprove = async (actions: OnApproveActions | any) => {
    const response = await actions.order?.capture();
    const _id = response.purchase_units[0].description;
    if (_id) {
      const result = await UpdatePaymentStatus(_id);
      console.log(result);
      ActionResponseHandler(result, "Payment status update");
      setContext("orderId", _id);
      setCart([]);
      router.push("/checkout/complete?orderId=" + _id);
    }
  };

  const preHandlerCreateOrder = async () => {
    // console.log(actions);
    const billingDetails = getContext("billingDetails") ?? {};
    const orderPayload = {
      lineItems: [
        ...cart.map((item) => {
          return {
            product: item._id,
            quantity: item.quantity,
            price: item.basePrice,
          };
        }),
      ],
      shippingAddress: billingDetails.delivery,
      billingAddress: billingDetails.billing,
      shippingCost: 4.66,
      shippingMethod: "DHL",
      tax: 3.44,
    };
    // PRINT({ title: "Order payload", orderPayload });
    const orderResponse = await PostOrder(orderPayload);
    // PRINT(orderResponse);
    ActionResponseHandler(orderResponse, "Placing new order");
    if (orderResponse.success && typeof window !== "undefined") {
      return orderResponse.data._id;
    }

    return null;
  };
  return (
    <div className="min-w-[300px]">
      {isPending ? <div className="spinner" /> : null}
      <PayPalButtons
        fundingSource="paypal"
        style={{
          color: "black", //blue,black,white
          shape: "rect",
          label: "paypal",
        }}
        createOrder={(data, actions) => handleCreateOrder(actions)}
        onApprove={(data, actions) => handleApprove(actions)}
        onCancel={(data) => console.log("cancel =>", data)}
        // onClick={(data, actions) => preHandlerCreateOrder()}
        onError={(data) => console.log("on error =>", data)}
      />
    </div>
  );
};
