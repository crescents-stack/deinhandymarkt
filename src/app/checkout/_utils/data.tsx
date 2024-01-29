import Stripe from "@/app/checkout/_utils/assets/stripe";
import PayPal from "@/app/checkout/_utils/assets/paypal";
import Klarna from "@/app/checkout/_utils/assets/klarna";
export const PaymentCardData = [
  {
    id: 1,
    icon: <Klarna className="w-[100px]" />,
    method: "klarna",
    text: "Lorem ipsum dolor sit amet consectetur. Ut bibendum scelerisque turpis volutpat odio.",
  },
  // {
  //   id: 2,
  //   icon: <PayPal className="w-[100px]" />,
  //   method: "paypal",
  //   text: "Lorem ipsum dolor sit amet consectetur. Ut bibendum scelerisque turpis volutpat odio.",
  // },
  {
    id: 3,
    icon: <Stripe className="w-[100px]" />,
    method: "card",
    text: "Lorem ipsum dolor sit amet consectetur. Ut bibendum scelerisque turpis volutpat odio.",
  },
];
