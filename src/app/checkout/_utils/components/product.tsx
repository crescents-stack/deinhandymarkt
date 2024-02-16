"use client";

import { X } from "lucide-react";
import {
  TCartContextValue,
  useCartContext,
} from "@/lib/contexts/cart-context-provider";

import ProductInteractions from "@/app/products/[slug]/_utils/components/product-interactions";

const Product = ({ details }: { details: TCartContextValue }) => {
  const { _id } = details;
  const { cart, setCart } = useCartContext();

  const RemoveItemFromCart = () => {
    cart.length &&
      setCart(cart.filter((item: TCartContextValue) => item._id !== _id));
  };
  return (
    <div className="relative flex flex-col lg:flex-row items-stretch bg-white border border-muted md:bg-muted rounded-[8px] p-[10px] md:p-[20px] gap-[10px] md:gap-[20px] justify-between">
      <div className="absolute top-0 right-0 m-[5px] z-10">
        <X
          className="stroke-[1.3px] stroke-secondary md:cursor-pointer"
          role="button"
          onClick={RemoveItemFromCart}
        />
      </div>
      <ProductInteractions details={details} variant="sm" />
    </div>
  );
};

export default Product;
