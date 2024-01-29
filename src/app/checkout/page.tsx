"use client"

import PriceCount from "@/app/checkout/_utils/components/price-count";
import Product from "@/app/checkout/_utils/components/product";
import { Button } from "@/components/ui/button";
import { useCartContext } from "@/lib/contexts/cart-context-provider";
import Link from "next/link";

const CheckoutProducts = () => {
  const {cart} = useCartContext();
  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-col gap-[10px] md:gap-[20px]">
        {
          cart.map((item) => {
            return (
              <Product key={item._id} details={item}/>
            )
          })
        }
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
