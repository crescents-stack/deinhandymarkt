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

const Navbar = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  return (
    <nav className="sticky top-0 bg-muted">
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
                className="flex items-center gap-[8px] [&>svg]:stroke-primary [&>svg]:hover:stroke-secondary [&>svg]:stroke-[1.3px] group"
              >
                {icon}
                <span className="group-hover:text-secondary cursor-pointer">
                  {text}
                </span>
              </li>
            );
          })}
        </ul>
        <ul className="flex items-center gap-[8px]">
          {[
            { id: 1, image: "/images/certification/image1.png" },
            { id: 2, image: "/images/certification/ssl.svg" },
            { id: 3, image: "/images/certification/trusted-shops.svg" },
          ].map((item) => {
            const { id, image } = item;
            return (
              <li
                key={id}
                className="w-[15px] h-[15px] md:h-[30px] md:w-[30px] rounded"
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
      <div className="shadow-lg bg-white">
        <div className="container py-[16px] flex items-center justify-between gap-[32px] md:gap-[90px]">
          <BrandLogo className="max-h-[40px] w-auto" />
          <div className="flex items-center gap-[16px] md:gap-[32px]">
            <div className="relative">
              <ShoppingCart className="stroke-[1.3px] stroke-primary w-[16px] h-[16px] md:w-[24px] md:h-[24px]" />
              <div className="absolute -top-[12px] -right-[8px] bg-secondary text-white pl-[4px] pr-[2px] pt-[2px] rounded-[8px] text-[8px] md:text-[10px] font-medium md:font-semibold">
                99+
              </div>
            </div>
            <div className="hidden md:flex items-center gap-[20px]">
              <Button>Register</Button>
              <Button variant="secondary">Login</Button>
            </div>
            <Menu
              className="flex md:hidden stroke-[1.3px]"
              onClick={() => setShowSideBar(true)}
            />
          </div>
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 ${
          showSideBar ? "backdrop-blur translate-x-[0]" : "translate-x-[100vw]"
        } bg-white/50 w-full h-full transition ease-in-out duration-500`}
      >
        <div className="bg-white w-[90%] h-full ml-auto p-[8px]">
          <div className="flex items-center justify-between gap-[32px]">
            <BrandLogo className="max-h-[24px]" />
            <X
              className="stroke-[1.3px]"
              onClick={() => setShowSideBar(false)}
            />
          </div>
          <ul className="flex flex-col items-start gap-[20px] py-[32px]">
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
          <div className="flex items-center gap-[20px]">
              <Button>Register</Button>
              <Button variant="secondary">Login</Button>
            </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
