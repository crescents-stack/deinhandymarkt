"use client";

import Product from "@/app/checkout/_utils/components/product";
import { Button } from "@/components/ui/button";
import { useCartContext } from "@/lib/contexts/cart-context-provider";
import Link from "next/link";

const CheckoutProducts = () => {
  const { cart } = useCartContext();
  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-col gap-[10px] md:gap-[20px]">
        {cart.length ? (
          cart.map((item) => {
            return <Product key={item._id} details={item} />;
          })
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 px-10 py-32 [&>*]:text-center">
            <h3 className="text-[16px] md:text-[20px] font-semibold">
              No items added!
            </h3>
            <p>
              Please add some items from&nbsp;
              <Link href="/search" className="underline hover:text-secondary">
                product list
              </Link>
            </p>
          </div>
        )}
      </div>
      {cart.length ? (
        <>
          {/* <PriceCount /> */}
          <div className="pt-[20px] flex justify-end gap-[16px]">
            <Link href="/checkout/billing-address">
              <Button>Next</Button>
            </Link>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default CheckoutProducts;
