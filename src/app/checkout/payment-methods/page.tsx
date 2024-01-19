import PriceCount from "../_utils/components/price-count";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PaymentCardData } from "../_utils/data";
import PaymentCard from "@/app/checkout/_utils/components/payment-card";

const PaymentMethods = () => {
  return (
    <div>
      <div className="flex flex-wrap gap-[20px]">
        {PaymentCardData.map((item) => {
          return <PaymentCard key={item.id} item={item} />;
        })}
      </div>
      <PriceCount />
      <div className="pt-[20px] flex justify-end gap-[16px]">
        <Link href="/checkout/billing-address">
          <Button variant="outline">Previous</Button>
        </Link>
        <Link href="/checkout/confirmation">
          <Button>Next</Button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentMethods;
