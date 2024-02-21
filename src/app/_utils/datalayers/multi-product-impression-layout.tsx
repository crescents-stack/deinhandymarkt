/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { TProductSchema } from "@/app/dashboard/products/_utils/types/types";
import { ReactElement, useEffect } from "react";

function measuringProductImpression(products: any) {
  if (typeof window !== "undefined") {
    window[`dataLayer`] = window?.dataLayer || [];
    // Measures product impressions and also tracks a standard
    // pageview for the tag configuration.
    // Product impressions are sent by pushing an impressions object
    // containing one or more impressionFieldObjects.
    window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
    window.dataLayer.push({
      event: "measuringProductImpression",
      componentName: "multiple_product_cards",
      ecommerce: {
        currencyCode: "USD", // Local currency is optional.
        impressions: products,
      },
    });
  }
}

const MultiProductImpressionLayout = ({
  children,
  products,
}: {
  children: ReactElement;
  products: TProductSchema[];
}) => {
  useEffect(() => {
    measuringProductImpression(products);
  }, []);
  return <>{children}</>;
};

export default MultiProductImpressionLayout;
