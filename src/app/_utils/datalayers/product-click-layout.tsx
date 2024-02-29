/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { TProductSchema } from "@/app/dashboard/products/_utils/types/types";
import { useRouter } from "next/navigation";
import { ReactElement, useEffect, useRef } from "react";
import { useInView } from "framer-motion"

// function measuringProductClicks(product: any) {
//   const {name, price, category} = product
//   if (typeof window !== "undefined") {
//     window[`dataLayer`] = window?.dataLayer || [];
//     // Measures product impressions and also tracks a standard
//     // pageview for the tag configuration.
//     // Product impressions are sent by pushing an impressions object
//     // containing one or more impressionFieldObjects.
//     window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
//     window.dataLayer.push({
//       event: "productView",
//       componentName: "single_product_view",
//       ecommerce: {
//         click: {
//           actionField: { list: "Single Product" }, // Optional list property.
//           products: [{name, price, category}],
//         },
//       },
//     });
//   }
// }

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
        // measuringProductClicks(product);
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
