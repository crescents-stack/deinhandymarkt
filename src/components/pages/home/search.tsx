"use client";

import { Button } from "@/components/ui/button";
import { ProductComboBox } from "@/components/ui/products-combobox";

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

const Search = () => {
  return (
    <section className="container flex gap-[40px]">
      <div className="bg-white rounded-[8px] px-[12px] py-[40px] md:p-[40px] w-full grid grid-cols-1 items-center justify-center gap-[40px]">
        <div className="flex flex-col items-center justify-center gap-[16px]">
          <p className="text-center text-xs md:text-base">
            Discover over 12,000 items for your daily toner and ink needs!
          </p>
          <h1 className="text-[16px] md:text-[20px] text-center">
            Germany&apos;s&nbsp;
            <span className="text-[16px] md:text-[20px] font-semibold">
              largest
            </span>&nbsp;
            toner and ink specialist
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center mx-auto w-full gap-[12px] sm:gap-[0px]">
          <input
            className="rounded-l-[8px] rounded-r-[8px] sm:rounded-r-[0px] bg-muted px-[12px] py-[6px] md:px-[16px] md:py-[8px] 2xl:px-[24px] 2xl:py-[12px] leading-[19px] flex-1 text-[14px] md:text-[16px] w-full sm:w-auto"
            placeholder="Enter product name"
          />
          <Button
            variant={"secondary"}
            className="rounded-r-[8px] rounded-l-[8px] sm:rounded-l-[0px] w-full sm:w-auto"
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
    </section>
  );
};

export default Search;
