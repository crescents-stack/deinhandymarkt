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
import { useAuthContext } from "@/lib/contexts/auth-context-provider";
import { GetLocationBaseVatWithIPAPI } from "../../actions/actions";
import { TCombination } from "@/app/dashboard/products/_utils/types/types";

export type TPayloadForPaypal = {
  amount: {
    value: number;
    currency?: string;
  };
};

export const PayButtons = (payload: TPayloadForPaypal) => {
  const { getContext, setContext } = useContextStore();
  const { cart, setCart } = useCartContext();
  const { auth } = useAuthContext();
  const router = useRouter();
  const [{ isPending, isInitial, isRejected, isResolved, options }] =
    usePayPalScriptReducer();

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
    console.log(new Date().toLocaleTimeString());
    const vat = await GetLocationBaseVatWithIPAPI(
      CountPrice(),
      billingDetails.billing.land
    );

    let orderPayload: any = {
      lineItems: [
        ...cart.map((item) => {
          return {
            product: item._id,
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

  const handleCreateOrder = async (actions: CreateOrderActions | any) => {
    const _id = await preHandlerCreateOrder();

    const id = await actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          description: _id,
          amount: {
            value: String(payload.amount.value),
            currency_code: payload.amount.currency || "AUD",
          },
        },
      ],
    });
    return id;
  };

  const handleError = async (payload: any) => {
    ActionResponseHandler(
      { success: false, message: "Something went wrong!" },
      "Payment status update",
      true
    );
  };
  const handleApprove = async (actions: OnApproveActions | any) => {
    const response = await actions.order?.capture();

    const _id = response.purchase_units[0].description;
    if (_id) {
      const result = await UpdatePaymentStatus(_id);

      ActionResponseHandler(result, "Payment status update");
      setContext("orderId", _id);
      setCart([]);
      router.push("/checkout/complete?orderId=" + _id);
    }
  };

  const preHandlerCreateOrder = async () => {
    // const CountPrice = () => {
    //   let temp = 0;
    //   cart.forEach((item) => {
    //     item.attributeCombinations
    //       ? item.attributeCombinations?.combinations?.forEach(
    //           (combination: TCombination) => {
    //             temp += combination.subtotal;
    //           }
    //         )
    //       : (temp += item.price * item.quantity);
    //   });
    //   return temp;
    // };
    // const billingDetails = getContext("billingDetails") ?? {};
    // const vat = await GetLocationBaseVatWithIPAPI(CountPrice(), billingDetails.billing.land);
    // let orderPayload: any = {
    //   lineItems: [
    //     ...cart.map((item) => {
    //       return {
    //         product: item._id,
    //         quantity: item.quantity,
    //         price: item.attributeCombinations
    //           ? item.attributeCombinations.subtotal
    //           : item.price,
    //       };
    //     }),
    //   ],
    //   shippingAddress: billingDetails.delivery,
    //   billingAddress: billingDetails.billing,
    //   shippingCost: 0,
    //   shippingMethod: "DHL",
    //   tax: vat,
    // };
    let orderPayload = await GetPayload();

    if (auth?.accessToken) {
      orderPayload = { ...orderPayload, uid: auth?.uid };
    }
    // PRINT({ title: "Order payload", orderPayload });
    const orderResponse = await PostOrder(orderPayload);
    // PRINT(orderResponse);
    ActionResponseHandler(orderResponse, "Placing new order", true);
    if (orderResponse.success && typeof window !== "undefined") {
      return orderResponse.data._id;
    }

    return null;
  };
  return (
    <div className="min-w-[260px] max-w-[400px]">
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
