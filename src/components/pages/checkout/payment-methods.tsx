import Klarna from "@/components/assets/payment/klarna";
import PriceCount from "./price-count";
import PayPal from "@/components/assets/payment/paypal";
import Stripe from "@/components/assets/payment/stripe";
import PaymentCard from "./payment-card";
import CheckoutNextButton from "@/components/atoms/checkout-next-button";

const PaymentMethods = () => {
  return (
    <div>
      <div className="flex flex-wrap gap-[20px]">
        {paymentCardData.map((item) => {
          return <PaymentCard key={item.id} item={item} />;
        })}
      </div>
      <PriceCount />
      <div className="pt-[20px] flex justify-end">
        <CheckoutNextButton variant="both" />
      </div>
    </div>
  );
};

export default PaymentMethods;

export const paymentCardData = [
  {
    id: 1,
    icon: <Klarna className="w-[100px]" />,
    text: "Lorem ipsum dolor sit amet consectetur. Ut bibendum scelerisque turpis volutpat odio.",
  },
  {
    id: 2,
    icon: <PayPal className="w-[100px]" />,
    text: "Lorem ipsum dolor sit amet consectetur. Ut bibendum scelerisque turpis volutpat odio.",
  },
  {
    id: 3,
    icon: <Stripe className="w-[100px]" />,
    text: "Lorem ipsum dolor sit amet consectetur. Ut bibendum scelerisque turpis volutpat odio.",
  },
];
