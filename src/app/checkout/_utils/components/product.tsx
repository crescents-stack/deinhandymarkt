"use client";

import { X } from "lucide-react";
import Carousel from "../../../products/[slug]/_utils/components/carousel";
import {
  TCartContextValue,
  useCartContext,
} from "@/lib/contexts/cart-context-provider";
import Link from "next/link";
import { useState } from "react";
import ProductInteractions from "@/app/products/[slug]/_utils/components/product-interactions";

const Product = ({
  details,
  searchParams,
}: {
  details: TCartContextValue;
  searchParams: any;
}) => {
  const { _id, name, slug, images, thumbnail, price } = details;
  const { cart, setCart } = useCartContext();
  const [quantity, setQuantity] = useState(details?.quantity ?? 1);

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
      <div className="flex flex-col md:flex-row items-stretch gap-[16px] md:gap-[32px]">
        <div className="bg-white rounded-[8px] min-w-[220px] max-w-[220px] m-0 md:m-auto">
          <Carousel ProductImages={[thumbnail]} variant="sm" />
        </div>
        <ProductInteractions
          details={details}
          searchParams={searchParams}
          variant="sm"
        />
      </div>
    </div>
  );
};

export default Product;
