"use client";

import Product from "@/app/checkout/_utils/components/product";
import { Button } from "@/components/ui/button";
import { useCartContext } from "@/lib/contexts/cart-context-provider";
import Link from "next/link";
import { TProductSchema } from "../dashboard/products/_utils/types/types";
import { useEffect } from "react";

function onCheckout(products: any) {
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
    window[`dataLayer`] = window?.dataLayer || [];

    window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
    window.dataLayer.push({
      event: "checkout",
      currencyCode: "AUD",
      ecommerce: {
        items: dataLayerPayload,
      },
    });
  }
}

const CheckoutProducts = () => {
  const { cart } = useCartContext();
  useEffect(() => {
    if (cart.length) {
      onCheckout(cart);
    }
  }, [cart]);
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
