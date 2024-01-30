"use client";

import Image from "next/image";
import BrandLogo from "../assets/brand-logo";
import { Button } from "../ui/button";
import {
  CircleUserRound,
  HelpCircle,
  Menu,
  MessagesSquare,
  ShoppingCart,
  Truck,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import AccountLink from "../../app/dashboard/_utils/components/account-link";
import clsx from "clsx";
import Cart from "../ui/cart";
import { usePathname } from "next/navigation";
import { useAuthContext } from "@/lib/contexts/auth-context-provider";
import { useCartContext } from "@/lib/contexts/cart-context-provider";

const Navbar = () => {
  const { auth } = useAuthContext();
  const [showSideBar, setShowSideBar] = useState(false);
  // const [showCart, setShowCart] = useState(false);
  const { cart } = useCartContext();
  const pathname = usePathname();
  // useEffect(() => {
  //   setShowCart(false);
  // }, [pathname]);
  return (
    <nav className="bg-muted border-b">
      <div className="container flex items-center justify-between gap-[20px] py-[12px]">
        <ul className="hidden lg:flex items-center gap-[20px]">
          {[
            { id: 2, icon: <MessagesSquare />, text: "Customer Services" },
            { id: 3, icon: <HelpCircle />, text: "Help" },
          ].map((item) => {
            const { id, icon, text } = item;
            return (
              <li
                key={id}
                className="flex items-center gap-[8px] [&>svg]:stroke-primary [&>svg]:hover:stroke-secondary [&>svg]:stroke-[1.3px] [&>svg]:w-[14px] [&>svg]:h-[14px] group"
              >
                {icon}
                <span className="group-hover:text-secondary cursor-pointer">
                  {text}
                </span>
              </li>
            );
          })}
        </ul>
        <ul className="flex items-center gap-[4px] md:gap-[8px]">
          {[
            { id: 1, image: "/images/certification/image1.png" },
            { id: 2, image: "/images/certification/ssl.svg" },
            { id: 3, image: "/images/certification/trusted-shops.svg" },
          ].map((item) => {
            const { id, image } = item;
            return (
              <li
                key={id}
                className="w-[20px] h-[20px] md:h-[30px] md:w-[30px] rounded"
              >
                <Image
                  src={image}
                  alt="certification-image"
                  width={1000}
                  height={1000}
                  className="w-full h-full"
                />
              </li>
            );
          })}
        </ul>
        <ul>
          <li className="text-primary text-[8px] md:text-[12px]">
            Order within the next&nbsp;
            <span className="text-secondary font-semibold text-[8px] md:text-[12px]">
              8 hours and 33 minutes
            </span>
          </li>
          <li className="flex items-end gap-[8px]">
            <Truck className="w-[16px] h-[16px] md:w-[24px] md:h-[24px] stroke-[1.3px] stroke-gray-500" />
            <p className="text-gray-500 text-[8px] md:text-[12px]">
              For guaranteed same day shipping.
            </p>
          </li>
        </ul>
      </div>
      <div className="bg-white">
        <div className="container py-[16px] flex items-center justify-between gap-[32px] md:gap-[90px] px-0">
          <Link href="/">
            <BrandLogo className="max-h-[24px] md:max-h-[40px] w-auto" />
          </Link>
          <div className="flex items-center gap-[16px] md:gap-[32px]">
          {/* onClick={() => setShowCart(true)} */}
            <Link className="relative" href="/checkout">
              <ShoppingCart className="stroke-[1.3px] stroke-primary w-[16px] h-[16px] md:w-[24px] md:h-[24px] md:cursor-pointer" />
              <div className="absolute -top-[14px] -right-[8px] bg-secondary text-white pl-[4px] pr-[4px]  rounded-[8px] text-[8px] md:text-[10px] md:font-medium">
                {cart.length}
              </div>
            </Link>
            <div className="hidden md:flex items-center gap-[20px]">
              {!auth ? (
                <>
                  <Link href="/auth/register">
                    <Button>Register</Button>
                  </Link>
                  <Link href="/auth/login">
                    <Button variant="secondary">Login</Button>
                  </Link>
                </>
              ) : (
                <AccountLink white={false} />
              )}
            </div>
            <Menu
              className="flex md:hidden stroke-[1.3px]"
              onClick={() => {
                // setShowCart(false);
                setShowSideBar(true);
              }}
            />
          </div>
        </div>
      </div>
      {/* cart  */}
      {/* <div
        className={`fixed top-0 left-0 z-50 ${
          showCart ? "backdrop-blur translate-y-[0]" : "translate-y-[-500vh]"
        } bg-white/50 w-full h-[100vh] transition ease-in-out duration-500`}
      >
        <div className="bg-white min-h-[50vh]">
          <div className="container py-10">
            <div className="flex justify-end">
              &nbsp;
              <X
                className="md:cursor-pointer stroke-[1.3px] stroke-gray-500"
                onClick={() => setShowCart(false)}
              />
            </div>
            <p
              className={clsx("text-xl md:text-2xl text-gray-500", {
                block: !cart.length,
                hidden: cart.length,
              })}
            >
              Your bag is empty!
            </p>
            <Cart />
          </div>
        </div>
      </div> */}
      {/* top menu */}
      <div
        className={`block md:hidden fixed top-0 left-0 z-50 ${
          showSideBar ? "backdrop-blur translate-y-[0]" : "-translate-y-[100vh]"
        } bg-white/50 w-full h-full transition ease-in-out duration-500`}
      >
        <div className="bg-white w-full pb-10">
          <div className="container flex items-center justify-between gap-[32px] pt-[16px]">
            <BrandLogo className="max-h-[24px] w-auto" />
            <X
              className="stroke-[1.3px] stroke-gray-500"
              onClick={() => setShowSideBar(false)}
            />
          </div>
          <ul className="container flex flex-col items-start gap-[20px] py-[32px]">
            {[
              { id: 1, icon: <CircleUserRound />, text: "Account" },
              { id: 2, icon: <MessagesSquare />, text: "Customer Services" },
              { id: 3, icon: <HelpCircle />, text: "Help" },
            ].map((item) => {
              const { id, icon, text } = item;
              return (
                <li
                  key={id}
                  className="flex items-center gap-[8px] [&>svg]:stroke-primary [&>svg]:hover:stroke-secondary [&>svg]:stroke-[1.3px] [&>svg]:w-[16px] [&>svg]:h-[16px] group [&>span]:text-[12px]"
                >
                  {icon}
                  <span className="group-hover:text-secondary cursor-pointer">
                    {text}
                  </span>
                </li>
              );
            })}
          </ul>
          <div className="container flex items-center gap-[20px]">
            {!auth ? (
              <>
                <Link href="/auth/register">
                  <Button>Register</Button>
                </Link>
                <Link href="/auth/login">
                  <Button variant="secondary">Login</Button>
                </Link>
              </>
            ) : (
              <AccountLink white={false} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
