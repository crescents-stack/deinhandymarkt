/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { TProductSchema } from "@/app/dashboard/products/_utils/types/types";
import AddToCart from "@/components/molecules/add-to-cart";
import QuantityCounter from "@/components/molecules/quantity-counter";
import {
  TCartContextValue,
  useCartContext,
} from "@/lib/contexts/cart-context-provider";
// import { PRINT } from "@/lib/utils";
import clsx from "clsx";
import { useState } from "react";

const ProductInteractions = ({ details }: { details: TProductSchema }) => {
  const { price, attributes, name } = details;
  const [basePrice, setBasePrice] = useState(price || 0);
  const { cart, setCart } = useCartContext();

  // sizes
  const sizesAttribute: any = attributes.filter((attribute: any) =>
    ["Sizes", "sizes", "Size", "size"].includes(attribute.label)
  )[0];
  const sizes: any = [];
  if (sizesAttribute?.values) {
    sizesAttribute.values.forEach((sizeValue: any) => {
      const value = sizeValue.split(":")[0];
      const sizePrice = parseInt(sizeValue.split(":")[1]);
      sizes.push({
        value,
        sizePrice,
      });
    });
  }
  const DetailsToPass: TCartContextValue = {
    ...details,
    basePrice,
    quantity: cart.filter((item) => item._id === details._id)[0]?.quantity ?? 1,
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-col gap-[20px] pb-10">
        <div className="flex flex-col gap-[16px]">
          {/* <p className="text-[12px] md:text-[14px] text-secondary">New</p> */}
          <h1 className="h2_text text-gray-500">
            {/* iPhone 15 Pro&nbsp; */}
            <span className="h2_text font-semibold text-primary">
              {/* FineWoven Case with MagSafe */}
              {name}
            </span>
            {/* &nbsp; Mulberry */}
          </h1>
        </div>
        <p className="text-[20px] text-gray-500">${basePrice}</p>
      </div>
      {sizes?.length ? (
        <div className="flex flex-wrap items-center gap-4">
          {sizes?.map(
            (size: { value: string; sizePrice: number }, index: number) => {
              return (
                <div
                  key={index}
                  className={clsx(
                    "px-4 py-2 text-base bg-muted inline-flex border-[2px] rounded-[10px] transition ease-in-out duration-300",
                    {
                      "border-muted hover:border-dark_gray":
                        size.sizePrice !== basePrice,
                      "border-secondary hover:border-secondary/80":
                        size.sizePrice === basePrice,
                    }
                  )}
                  role="button"
                  onClick={() => {
                    setCart(
                      cart.map((item) => {
                        return item._id === details._id
                          ? {
                              ...item,
                              basePrice: size.sizePrice,
                            }
                          : item;
                      })
                    );
                    setBasePrice(size.sizePrice);
                  }}
                >
                  {size.value.replace("m", " meter")}
                </div>
              );
            }
          )}
        </div>
      ) : null}
      <p className="text-[14px] md:text-[20px] font-light text-gray-500">
        Sub total&nbsp;
        <span className="text-[14px] md:text-[20px] font-semibold text-primary">
          $
          {basePrice *
            (cart.filter((item) => item._id === details._id)[0]?.quantity ?? 1)}
        </span>
      </p>
      <QuantityCounter variant="lg" details={DetailsToPass} />
      <AddToCart whichToAdd={DetailsToPass} />
    </div>
  );
};

export default ProductInteractions;
