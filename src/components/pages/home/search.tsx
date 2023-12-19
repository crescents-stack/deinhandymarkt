"use client";

import { Button } from "@/components/ui/button";
import { ProductComboBox } from "@/components/ui/products-combobox";
import Image from "next/image";

const Search = () => {
  return (
    <section className="">
      <div className="container flex gap-[40px] px-0">
        <div className="bg-white rounded-[8px] px-[12px] py-[40px] md:p-[40px] w-full grid grid-cols-1 items-center justify-center gap-[40px]">
          <div className="flex flex-col items-center justify-center gap-[16px]">
            <p className="text-center text-[12px] md:text-[16px]">
              Discover over 12,000 items for your daily accessory needs!
            </p>
            <h1 className="text-[16px] md:text-[24px] text-center">
              Germany&apos;s&nbsp;
              <span className="text-[16px] md:text-[24px] font-semibold">
                largest
              </span>
              &nbsp;iphone accessories market
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center mx-auto w-full gap-[12px] sm:gap-[0px]">
            <input
              className="rounded-l-[8px] rounded-r-[8px] sm:rounded-r-[0px] bg-muted px-[10px] py-[4px] md:px-[12px] md:py-[6px] 2xl:px-[16px] 2xl:py-[8px] leading-[19px] flex-1 text-[14px] md:text-[16px] w-full sm:w-auto border border-r-0 border-dark_gray"
              placeholder="Enter product name"
            />
            <Button
              variant={"secondary"}
              className="rounded-r-[8px] rounded-l-[8px] sm:rounded-l-[0px] w-full sm:w-auto border border-secondary"
            >
              Search
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-[12px] sm:gap-[20px]">
            <ProductComboBox
              placeholder="Select a product..."
              options={products}
              name="products"
              onChange={(e: any) => {
                console.log("Combo: ", {
                  name: e.target.mame,
                  value: e.target.value,
                });
              }}
            />
            <ProductComboBox
              placeholder="Select a category..."
              options={category}
              name="category"
              onChange={(e: any) => {
                console.log("Combo: ", {
                  name: e.target.mame,
                  value: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <div className="min-w-[334px] min-h-[310px] bg-[url('/images/home/iphones.png')] bg-cover bg-center hidden lg:block rounded-[8px]"></div>
      </div>
      <div className="container pt-[40px] px-0">
        <div className="bg-white rounded-[8px] flex flex-row flex-wrap items-center justify-center px-[10px] md:px-[40px] py-[40px] gap-[20px] md:gap-auto">
          {SearchProducts.map((item) => {
            const { id, text, image } = item;
            return (
              <div
                key={id}
                className="flex flex-col items-center justify-center gap-[20px] group md:cursor-pointer"
              >
                <Image
                  src={image}
                  alt="iphones"
                  width={1000}
                  height={1000}
                  className="w-[100px] h-[100px] md:w-[150px] md:h-[150px]"
                />
                <p className="font-medium text-center group-hover:text-secondary">
                  {text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Search;

const products = [
  {
    value: "iphone_15_pro_max",
    label: "iPhone 15 Pro Max",
  },
  {
    value: "iphone_15_pro",
    label: "iPhone 15 Pro",
  },
  {
    value: "iphone_14_pro",
    label: "iPhone 14 Pro",
  },
];

const category = [
  {
    value: "iphone_15_pro_max",
    label: "iPhone 15 Pro Max",
  },
  {
    value: "iphone_15_pro",
    label: "iPhone 15 Pro",
  },
  {
    value: "iphone_14_pro",
    label: "iPhone 14 Pro",
  },
];

const SearchProducts = [
  {
    id: 1,
    image: "/images/home/iphone15pro.png",
    text: "iPhone 15 Pro",
    slug: "/iphone-15-pro",
  },
  {
    id: 2,
    image: "/images/home/iphone15.png",
    text: "iPhone 15",
    slug: "/iphone-15",
  },
  {
    id: 3,
    image: "/images/home/iphone14.png",
    text: "iPhone 14",
    slug: "/iphone-14",
  },
  {
    id: 4,
    image: "/images/home/iphone13.png",
    text: "iPhone 13",
    slug: "/iphone-13",
  },
  {
    id: 5,
    image: "/images/home/iphonese.png",
    text: "iPhone SE",
    slug: "/iphone-se",
  },
];
