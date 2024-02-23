"use client";

import { GetCategories } from "@/app/dashboard/categories/_utils/actions/actions";
import ClickLink from "@/app/search/_utils/components/click-link";
import { ProductComboBox } from "@/components/ui/products-combobox";
import { ActionResponseHandler } from "@/lib/error";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export type TComboOptions = { label: string; value: string };

const Search = () => {
  const [categories, setCategories] =
    useState<TComboOptions[]>(defaultCategories);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchtext, setSearchText] = useState("");

  const FetchCategories = async () => {
    const response = await GetCategories();
    ActionResponseHandler(response, "Fetching categories", true);
    if (response.success) {
      const tempArr: TComboOptions[] = [];
      response.data.categories.map(
        (category: { name: string; slug: string }) => {
          tempArr.push({
            label: category.name,
            value: category.slug,
          });
        }
      );
      setCategories(tempArr);
      // setCategories(response.data)
    }
  };

  useEffect(() => {
    FetchCategories();
  }, []);
  return (
    <section>
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
          <div className="grid grid-cols-1 sm:flex sm:flex-row items-center justify-center w-full gap-[12px] sm:gap-[0px]">
            <input
              className="inline-flex rounded-l-[8px] rounded-r-[8px] sm:rounded-r-[0px] bg-muted px-[16px] py-[7px] leading-[19px] flex-1 text-[14px] md:text-[16px] w-full sm:w-auto border border-r sm:border-r-0 border-dark_gray"
              placeholder="Enter product name"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <div className="">
            <ClickLink>
              <Link
                className="inline-flex min-[640px]:inline-block items-center justify-center rounded-r-[8px] rounded-l-[8px] sm:rounded-l-[0px] w-full flex-1 min-[640px]:flex-none border border-secondary px-[16px] py-[4px] text-[14px] md:text-[16px] bg-secondary text-white text-center active:scale-[98%]"
                href={{
                  pathname: "/search",
                  query: {
                    search: searchtext ?? "",
                    category: selectedCategory ?? "",
                    tags: selectedProduct?.replaceAll("_", " ") ?? "",
                  },
                }}
              >
                Search
              </Link>
            </ClickLink>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-[12px] sm:gap-[20px]">
            <ProductComboBox
              placeholder="Select a product..."
              options={products}
              name="products"
              onChange={(e: any) => {
                setSelectedProduct(e.target.value);
              }}
            />
            <ProductComboBox
              placeholder="Select a category..."
              options={categories}
              name="category"
              onChange={(e: any) => {
                setSelectedCategory(e.target.value);
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
              <Link
                key={id}
                className="flex flex-col items-center justify-center gap-[20px] group md:cursor-pointer"
                href={{
                  pathname: "/search",
                  query: {
                    search: text,
                    category: selectedCategory ?? "",
                    tags: selectedProduct?.replaceAll("_", " ") ?? "",
                  },
                }}
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
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Search;

const products: TComboOptions[] = [
  {
    value: "iphone_15_pro_max",
    label: "iPhone 15 Pro Max",
  },
  {
    value: "iphone_15_pro",
    label: "iPhone 15 Pro",
  },
  {
    value: "iphone_15_plus",
    label: "iPhone 15 plus",
  },
  {
    value: "iphone_15",
    label: "iPhone 15",
  },
  {
    value: "iphone_14_pro_max",
    label: "iPhone 14 Pro Max",
  },
  {
    value: "iphone_14_pro",
    label: "iPhone 14 Pro",
  },
  {
    value: "iphone_14",
    label: "iPhone 14",
  },
  {
    value: "iphone_12_pro",
    label: "iPhone 14 Pro",
  },
  {
    value: "iphone_12",
    label: "iPhone 12",
  },
];

const defaultCategories: TComboOptions[] = [
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
    slug: "iphone-15-pro",
  },
  {
    id: 2,
    image: "/images/home/iphone15.png",
    text: "iPhone 15",
    slug: "iphone-15",
  },
  {
    id: 3,
    image: "/images/home/iphone14.png",
    text: "iPhone 14",
    slug: "iphone-14",
  },
  {
    id: 4,
    image: "/images/home/iphone13.png",
    text: "iPhone 13",
    slug: "iphone-13",
  },
  {
    id: 5,
    image: "/images/home/iphonese.png",
    text: "iPhone SE",
    slug: "iphone-se",
  },
];
