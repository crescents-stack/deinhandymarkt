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

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/lib/contexts/auth-context-provider";
import { GetLocationBaseVatWithIPAPI } from "../../actions/actions";
import {
  TCombination,
  TProductSchema,
} from "@/app/dashboard/products/_utils/types/types";

// const measuringOrderCreate = (status: string, data: any) => {
//   if (typeof window !== "undefined") {
//     const dataLayerPayload = products.map((item: TProductSchema) => {
//       const { _id, name, price, discount, category, attributes } = item;
//       const attributeLables = attributes.map((attribute: any) => {
//         const sizes: any = [];
//         const colors: string[] = [];
//         if (["Colors", "Color", "COLORS", "COLOR"].includes(attribute.label)) {
//           attribute.values.forEach((url: any) => {
//             const image = url.split("/");
//             colors.push(image[image.length - 1].split(".")[0]);
//           });
//         }
//         if (["Sizes", "SIZES", "size", "Size"].includes(attribute.label)) {
//           attribute.values.forEach((sizeValue: any) => {
//             const value = sizeValue.split(":")[0];
//             const sizePrice = parseInt(sizeValue.split(":")[1]);
//             sizes.push({
//               size: value,
//               sizePrice,
//             });
//           });
//         }
//         if (sizes.length) {
//           return {
//             label: attribute.label,
//             values: sizes,
//           };
//         } else if (colors.length) {
//           return {
//             label: attribute.label,
//             values: colors,
//           };
//         } else {
//           return null;
//         }
//       });
//       return {
//         _id,
//         name,
//         price,
//         discount,
//         category,
//         attributes: attributeLables.map((item: any) => item),
//       };
//     });
//     window[`dataLayer`] = window?.dataLayer || [];

//     window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
//     window.dataLayer.push({
//       event: "orderCreate",
//       componentName: "created_order",
//       ecommerce: {
//         currencyCode: "AUD",
//         items:
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
        shipping: data.deliveryAddress,
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
      if (result.success) {
        measuringPaymentStatus("success", result.data, cart);
      } else {
        measuringPaymentStatus("failed", result.data, cart);
      }
      setContext("orderId", _id);
      setCart([]);
      router.push("/checkout/complete?orderId=" + _id);
    }
  };

  const preHandlerCreateOrder = async () => {
    let orderPayload = await GetPayload();

    if (auth?.accessToken) {
      orderPayload = { ...orderPayload, uid: auth?.uid };
    }

    const orderResponse = await PostOrder(orderPayload);

    ActionResponseHandler(orderResponse, "Placing new order", true);
    if (orderResponse.success && typeof window !== "undefined") {
      // measuringOrderCreate("success", orderResponse.data);
      return orderResponse.data._id;
    } else {
      // measuringOrderCreate("failed", orderResponse.data);
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
