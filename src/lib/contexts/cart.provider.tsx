"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { ReactChildren } from "../types";
type CartContents = {
  items: any;
  price: number;
};
type CartContextType = {
  cart: CartContents;
  setCart: Dispatch<SetStateAction<CartContents>>;
};
const cartDefaultValue: CartContents = { items: [], price: 0 };
const CartContext = createContext<CartContextType | null>(null);

const CartProvider = ({ children }: ReactChildren) => {
  const [cart, setCart] = useState<CartContents>(cartDefaultValue);
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCartContext must be used within ContextWrapper");
  }

  return context;
};
