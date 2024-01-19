"use client";

// import { useCartContext } from "@/lib/contexts/cart.provider";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";

const Cart = () => {
  // const { cart, setCart } = useCartContext();
  return (
    <div className="pt-[50px]">
      {/* <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[20px] pb-[20px] max-h-[60vh] overflow-auto">
        {cart.items.length
          ? cart.items.map((item: any) => {
              const { id, image, slug, title, price, quantity, color } = item;
              
              return (
                <div
                  key={id}
                  className="flex items-center gap-[12px] border p-[4px] rounded-[10px] relative"
                >
                  <X
                    className="stroke-[1px] absolute top-0 right-0 m-1"
                    role="button"
                    onClick={() => {
                      setCart({
                        ...cart.items,
                        items: [
                          ...cart.items.filter((item: any) => item.id !== id),
                        ],
                      });
                    }}
                  />
                  <div className="w-[100px] h-[100px] bg-muted rounded-[10px] relative">
                    <Image
                      src={image}
                      alt=""
                      fill
                      quality={100}
                      style={{ objectFit: "contain", objectPosition: "center" }}
                    />
                  </div>
                  <div className="flex flex-col gap-[12px]">
                    <p className="font-bold pr-[20px]">{title}</p>
                    <p className="inline-flex items-center gap-[2px]">
                      <span className="font-medium">${price}</span>
                      <X className="w-3 h-3 stroke-[1px] stroke-primary" />
                      {quantity} = ${price * quantity}
                    </p>
                    <div className="inline-flex items-center gap-[12px]">
                      <p>Color</p>
                      <Image
                        src="/images/home/featured-accessories/silicon-case-color-variants/orange-sorbet.svg"
                        alt="color"
                        width={500}
                        height={500}
                        className="w-[10px] h-[10px] sm:w-[16px] sm:h-[16px] rounded-full"
                      />
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
      {cart.items.length ? (
        <Link href="/checkout/checkout?stepId=1">
          <Button variant={"secondary"}>Test Checkout Page</Button>
        </Link>
      ) : null} */}
    </div>
  );
};

export default Cart;
