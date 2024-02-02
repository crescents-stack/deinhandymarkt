import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  CreateOrderActions,
  CreateOrderRequestBody,
  OnApproveActions,
} from "@paypal/paypal-js";

export type TPayloadForPaypal = {
  amount: {
    value: number;
    currency?: string;
  };
};

export const PayButtons = (payload: TPayloadForPaypal) => {
  const [{ isPending, isInitial, isRejected, isResolved, options }] =
    usePayPalScriptReducer();
  // console.log({ isPending, isInitial, isRejected, isResolved, options });

  const handleCreateOrder = async (actions: CreateOrderActions | any) => {
    const id = await actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
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
    console.log(response);
    // return response
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
        // onClick={(data, actions) => {
        //     console.log('click =>', data)
        //     // actions
        // }}
        onError={(data) => console.log("on error =>", data)}
      />
    </div>
  );
};
