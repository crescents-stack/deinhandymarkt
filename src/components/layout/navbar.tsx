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
import { useState } from "react";
import Link from "next/link";
import { useUserContext } from "@/lib/contexts/user.provider";
import AccountLink from "../pages/dashboard/account-link";

const Navbar = () => {
  const { UserData } = useUserContext();
  const [showSideBar, setShowSideBar] = useState(false);
  const [showCart, setShowCart] = useState(false);
  return (
    <nav className="bg-muted border-b">
      <div className="container flex items-center justify-between gap-[20px] py-[12px]">
        <ul className="hidden lg:flex items-center gap-[20px]">
          {[
            { id: 1, icon: <CircleUserRound />, text: "Account" },
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
            <div className="relative" onClick={() => setShowCart(true)}>
              <ShoppingCart className="stroke-[1.3px] stroke-primary w-[16px] h-[16px] md:w-[24px] md:h-[24px] md:cursor-pointer" />
              <div className="absolute -top-[14px] -right-[8px] bg-secondary text-white pl-[4px] pr-[4px] pt-[2px] rounded-[8px] text-[8px] md:text-[10px] md:font-medium">
                99+
              </div>
            </div>
            <div className="hidden md:flex items-center gap-[20px]">
              {!UserData ? (
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
                setShowCart(false);
                setShowSideBar(true);
              }}
            />
          </div>
        </div>
      </div>
      {/* cart  */}
      <div
        className={`fixed top-0 left-0 z-50 ${
          showCart ? "backdrop-blur translate-y-[0]" : "translate-y-[-100vh]"
        } bg-white/50 w-full h-full transition ease-in-out duration-500`}
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
            <p className="text-xl md:text-2xl text-gray-500">
              Your bag is empty!
            </p>
            <Link href="/checkout/checkout?stepId=1">Test Checkout Page</Link>
          </div>
        </div>
      </div>
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
            {!UserData ? (
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
