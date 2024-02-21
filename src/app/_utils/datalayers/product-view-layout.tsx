/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { TProductSchema } from "@/app/dashboard/products/_utils/types/types";
import { ReactElement, useEffect } from "react";

function measuringProductViews(product: any) {
  if (typeof window !== "undefined") {
    window[`dataLayer`] = window?.dataLayer || [];
    // Measure a view of product details. This example assumes the detail view occurs on pageload,
    // and also tracks a standard pageview of the details page.
    window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
    window.dataLayer.push({
      ecommerce: {
        detail: {
          actionField: { list: "Apparel Gallery" }, // 'detail' actions have an optional list property.
          products: [product],
        },
      },
    });
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
