"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";

const FilterBar = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  return (
    <>
      <div
        className="fixed top-[200px] left-[10px] backdrop-blur bg-white/80 p-[8px] rounded-[8px] border z-1 md:cursor-pointer block min-[1080px]:hidden"
        onClick={() => setShowSideBar(true)}
      >
        <Menu className="stroke-[1.3px] stroke-gray-400" />
      </div>
      <div
        className={`min-w-[300px] max-h-[100vh] min-[1080px]:max-h-[200vh] overflow-auto fixed left-0 top-0 min-[1080px]:relative ${
          showSideBar ? "translate-x-[0px]" : "max-[1080px]:translate-x-[-300px]"
        } transition ease-in-out duration-300`}
      >
        <div className="flex flex-col gap-[20px] rounded-[8px] border border-dark_gray backdrop-blur bg-white/80">
          <div className="relative px-[20px] py-[12px] bg-muted rounded-t-[8px] sticky top-0 flex items-center justify-between">
            <p className="text-[16px] [&>span]:text-[16px]">
              Your <span className="font-semibold">Preferences</span>
            </p>
            <X
              className="stroke-gray-400 stroke-[1.3px] block min-[1080px]:hidden"
              onClick={() => setShowSideBar(false)}
            />
          </div>
          <div className="flex flex-col gap-[12px] px-[20px]">
            <h4 className="font-semibold">Product Type</h4>
            <ul className="flex flex-col gap-[8px]">
              {ProductTypes.map((item: any) => {
                const { id, text, slug } = item;
                return (
                  <li
                    key={id}
                    onClick={() => console.log(slug)}
                    className="text-gray-500 hover:text-secondary/50 md:cursor-pointer"
                  >
                    {text}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex flex-col gap-[12px] px-[20px] pb-[20px]">
            <h4 className="font-semibold">iPhone Compatibility</h4>
            <ul className="flex flex-col gap-[8px]">
              {compatibility.map((item: any) => {
                const { id, text, slug } = item;
                return (
                  <li
                    key={id}
                    onClick={() => console.log(slug)}
                    className="text-gray-500 hover:text-secondary/50 md:cursor-pointer"
                  >
                    {text}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterBar;

const ProductTypes = [
  { id: 1, text: "All cases", slug: "all-cases" },
  { id: 2, text: "Chargers", slug: "chargers" },
  { id: 3, text: "Power adapters", slug: "power-adapters" },
  { id: 4, text: "MagSafe", slug: "magsafe" },
  { id: 5, text: "Batteries", slug: "batteries" },
  { id: 6, text: "Camera mounts", slug: "camera-mounts" },
  { id: 7, text: "Cases & covers", slug: "cases-covers" },
  { id: 8, text: "Charging pads", slug: "charging-pads" },
  { id: 9, text: "Charging stations", slug: "charging-stations" },
  { id: 10, text: "Docks", slug: "docks" },
  { id: 11, text: "Game controllers", slug: "game-controllers" },
  { id: 12, text: "Gaming", slug: "gaming" },
  { id: 13, text: "Wireless chargers", slug: "wireless-chargers" },
  { id: 14, text: "Mountains", slug: "mountains" },
];

const compatibility = [
  { id: 1, text: "iPhone 15 Pro", slug: "iphone-15-pro" },
  { id: 2, text: "iPhone 15 Pro Max", slug: "iphone-15-pro-max" },
  { id: 3, text: "iPhone 15", slug: "iphone-15" },
  { id: 4, text: "iPhone 14 Pro", slug: "iphone-14-pro" },
  { id: 5, text: "iPhone 14 Pro Max", slug: "iphone-14-pro-max" },
  { id: 6, text: "iPhone 14", slug: "iphone-14" },
  { id: 7, text: "iPhone 13 Pro", slug: "iphone-13-pro" },
  { id: 8, text: "iPhone 13 Pro Max", slug: "iphone-13-pro-max" },
  { id: 9, text: "iPhone 13", slug: "iphone-13" },
  { id: 10, text: "iPhone 12 Pro", slug: "iphone-12-pro" },
  { id: 11, text: "iPhone 12 Pro Max", slug: "iphone-12-pro-max" },
  { id: 12, text: "iPhone 12", slug: "iphone-12" },
  { id: 13, text: "iPhone 11", slug: "iphone-11" },
  { id: 14, text: "iPhone SE", slug: "iphone-se" },
];
