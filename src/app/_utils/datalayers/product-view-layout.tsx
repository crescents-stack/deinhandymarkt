/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { TProductSchema } from "@/app/dashboard/products/_utils/types/types";
import { ReactElement, useEffect } from "react";

function measuringProductViews(product: any) {
  if (typeof window !== "undefined") {
    const { _id, name, price, discount, category, attributes } = product;
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
    const datalayerPayload = {
      _id,
      name,
      price,
      discount,
      category,
      attributes: attributeLables.map((item: any) => item),
    };
    window[`dataLayer`] = window?.dataLayer || [];

    window.dataLayer.push({ ecommerce: null });

    const datalayer: any = {
      event: "productView",
      currencyCode: "AUD",
      ecommerce: {
        items: [datalayerPayload],
      },
    };
    
    const cookies = window.localStorage.getItem("cookieBanner");
    if (cookies) {
      datalayer.cookies = JSON.parse(cookies);
    }

    window.dataLayer.push(datalayer);
  }
}

const ProductViewLayout = ({
  children,
  product,
}: {
  children: ReactElement;
  product: TProductSchema[];
}) => {
  useEffect(() => {
    measuringProductViews(product);
  }, []);
  return <>{children}</>;
};

export default ProductViewLayout;
