
export type TSteps = {id: number, text: string, path: string}
export const steps: TSteps[] = [
    {
      id: 1,
      text: "Checkout",
      path: "/checkout"
    },
    {
      id: 2,
      text: "Billing Address",
      path: "/checkout/billing-address"
    },
    {
      id: 3,
      text: "Payment Methods",
      path: "/checkout/payment-methods"
    },
    {
      id: 4,
      text: "Confirmation",
      path: "/checkout/confirmation"
    },
    {
      id: 5,
      text: "Complete",
      path: "/checkout/complete"
    },
  ];