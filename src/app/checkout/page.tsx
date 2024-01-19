import PriceCount from "@/app/checkout/_utils/components/price-count";
import Product from "@/app/checkout/_utils/components/product";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CheckoutProducts = ({ searchParams }: { searchParams: any }) => {
  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-col gap-[10px] md:gap-[20px]">
        <Product />
        <Product />
      </div>
      <PriceCount />
      <div className="pt-[20px] flex justify-end gap-[16px]">
        <Link href="/checkout/billing-address">
          <Button>Next</Button>
        </Link>
      </div>
    </div>
  );
};

export default CheckoutProducts;
