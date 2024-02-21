/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { TProductSchema } from "@/app/dashboard/products/_utils/types/types";
import { useRouter } from "next/navigation";
import { ReactElement, useEffect } from "react";

function measuringProductClicks(product: any) {
  if (typeof window !== "undefined") {
    window[`dataLayer`] = window?.dataLayer || [];
    // Measures product impressions and also tracks a standard
    // pageview for the tag configuration.
    // Product impressions are sent by pushing an impressions object
    // containing one or more impressionFieldObjects.
    window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
    window.dataLayer.push({
      event: "productClick",
      componentName: "single_product_click",
      ecommerce: {
        click: {
          actionField: { list: "Single Product" }, // Optional list property.
          products: [product],
        },
      },
      //   eventCallback: function () {
      //     document.location = `/products/${product.slug.replaceAll(" ", "").replaceAll("%", "")}`;
      //   },
    });
  }
}

const ProductClickLayout = ({
  children,
  product,
}: {
  children: ReactElement;
  product: TProductSchema;
}) => {
  const router = useRouter();
  return (
    <div
      role="button"
      onClick={() => {
        measuringProductClicks(product);
        router.push(
          `/products/${product.slug.replaceAll(" ", "").replaceAll("%", "")}`
        );
      }}
    >
      {children}
    </div>
  );
};

export default ProductClickLayout;
