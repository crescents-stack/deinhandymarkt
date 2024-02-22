/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { ReactChildren } from "../types";
import {
  TCartProductSchema,
  TProductSchema,
} from "@/app/dashboard/products/_utils/types/types";
import { useContextStore } from "../hooks/hooks";
import { PRINT } from "../utils";

// value type
export type TCartContextValue = TCartProductSchema;

// context type
export type TCartContext = {
  cart: TCartContextValue[];
  setCart: Dispatch<SetStateAction<TCartContextValue[]>>;
};

// creating context
const CartContext = createContext<TCartContext>({
  cart: [],
  setCart: () => {},
});

// cart update datalayer
// function measuringShoppingCartUpdate(products: any) {
//   if (typeof window !== "undefined") {
//     window[`dataLayer`] = window?.dataLayer || [];

//     window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
//     window.dataLayer.push({
//       event: "updateCart",
//       componentName: "updated_cart",
//       ecommerce: {
//         currencyCode: "AUD",
//         updatedWith: {
//           products: products,
//         },
//       },
//     });
//   }
// }

// context provider
const CartContextProvider = ({ children }: ReactChildren) => {
  // hooks to make persistant: cart context
  const { getContext, setContext } = useContextStore();
  // cart context state
  const [cart, setCart] = useState<TCartContextValue[]>(
    typeof window !== "undefined" && getContext("cart")
      ? getContext("cart")
      : []
  );

  // updating persistancy as cart changes
  useEffect(() => {
    setContext("cart", cart);
    // measuringShoppingCartUpdate(cart);
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
export default CartContextProvider;

// hook
export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartContextProvider");
  }
  return context;
};
