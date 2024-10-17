/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";
import {
  TCartContextValue,
  useCartContext,
} from "@/lib/contexts/cart-context-provider";
import QuantityCounter from "../molecules/quantity-counter";

const Cart = () => {
  const { cart } = useCartContext();

  return (
    <div className="pt-[50px]">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[20px] pb-[20px] max-h-[60vh] overflow-auto">
        {cart.length
          ? cart.map((item: any) => {
              return <SingleProductCard key={item._id} details={item} />;
            })
          : null}
      </div>
      {cart.length ? (
        <Link href="/checkout">
          <Button variant={"secondary"}>Test Checkout Page</Button>
        </Link>
      ) : null}
    </div>
  );
};

export default Cart;

const SingleProductCard = ({ details }: { details: any }) => {
  const { _id, thumbnail, slug, name, price, basePrice } = details;
  const { cart, setCart } = useCartContext();

  const RemoveItemFromCart = (_id: string) => {
    cart.length &&
      setCart(cart.filter((item: TCartContextValue) => item._id !== _id));
  };

  return (
    <div className="flex items-center gap-[12px] border border-muted hover:border-secondary p-[4px] rounded-[10px] relative group">
      <X
        className="stroke-[1px] absolute top-0 right-0 m-1 w-4 h-4"
        role="button"
        onClick={() => {
          RemoveItemFromCart(_id as string);
        }}
      />
      <div className="w-[100px] h-[100px] bg-muted rounded-[10px] relative">
        <Image
          unoptimized
          src={thumbnail}
          alt=""
          fill
          quality={100}
          style={{ objectFit: "contain", objectPosition: "center" }}
        />
      </div>
      <div className="flex flex-col gap-[12px]">
        <Link
          className="font-bold pr-[20px] group-hover:text-secondary"
          href={`/products/${slug}`}
        >
          {name}
        </Link>
        <p className="inline-flex items-center gap-[2px]">
          <span className="font-medium">${basePrice}</span>
          <X className="w-3 h-3 stroke-[1px] stroke-primary" />
          {cart.filter((item) => item._id === details?._id)[0]?.quantity || 1} =
          $
          {basePrice *
            cart.filter((item) => item._id === details?._id)[0]?.quantity || 1}
        </p>
        <QuantityCounter variant="sm" details={details} />
      </div>
    </div>
  );
};
