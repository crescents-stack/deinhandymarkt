import CarouselProductCardSkeletons from "@/app/_utils/skeletons/carousel-product-cards";
import { GetProducts } from "@/app/dashboard/products/_utils/actions/actions";
import ProductsCard from "@/components/molecules/products-card";

import { X } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import ClickLink from "./click-link";
import FilterList from "./filter-list";
// import { products } from "../../../../components/molecules/products-carousel";

const AllProductList = async ({ searchParams }: { searchParams: any }) => {
  const queryString = `search=${searchParams?.search ?? ""}&category=${
    searchParams?.category ?? ""
  }&tags=${searchParams?.tags ?? ""}`;
  const response = await GetProducts(queryString);
  // PRINT(queryString);

  return response.success ? (
    <div className="grid grid-cols-2 min-[1000px]:grid-cols-3 min-[1080px]:grid-cols-2 min-[1330px]:grid-cols-3 gap-[10px] sm:gap-[20px]">
      {response?.data?.data?.length
        ? response?.data?.data?.map((item: any) => {
            return (
              <div
                key={item._id}
                className="group bg-white hover:bg-muted border border-dark_gray rounded-[8px]"
              >
                <ProductsCard details={item} />
              </div>
            );
          })
        : "No product found!"}
    </div>
  ) : (
    "Something went wrong"
  );
};

const ProductsList = ({ searchParams }: { searchParams: any }) => {
  return (
    <div className="w-full space-y-8">
      <FilterList searchParams={searchParams}/>
      {/* <ul className="space-x-4 flex flex-wrap items-center">
        {categoriesInURL.length || tagsInURL.length ? (
          <div className="inline-block">
            <ClickLink>
              <div
                href={{
                  pathname: "/search",
                  query: {
                    search: "",
                    category: "",
                    tags: "",
                  },
                }}
                className="inline-block"
                role="button"
              >
                <li className="inline-block px-[12px] py-[6px] bg-secondary/5 rounded-[4px] text-secondary font-semibold hover:bg-secondary hover:text-white transition ease-in-out duration-500">
                  Get all
                </li>
              </div>
            </ClickLink>
          </div>
        ) : null}
        {categoriesInURL.length ? (
          <li className="flex flex-wrap gap-4">
            {categoriesInURL.split(",").map((category: string) => {
              return category.trim() ? (
                <div className="inline-block">
                  <ClickLink key={category}>
                    <div className="px-[12px] py-[6px] bg-muted rounded-[4px] text-gray-500 inline-flex flex-row items-center gap-2">
                      <span className="capitalize">{category}</span>
                      <Link
                        href={{
                          pathname: "/search",
                          query: {
                            search: searchInURL,
                            category: categoriesInURL
                              .split(",")
                              .filter((item: string) => item !== category)
                              .join(","),
                            tags: tagsInURL,
                          },
                        }}
                        className="inline-block"
                      >
                        <X className="w-4 h-4" />
                      </Link>
                    </div>
                  </ClickLink>
                </div>
              ) : null;
            })}
          </li>
        ) : null}
        {tagsInURL.length ? (
          <li className="flex flex-wrap gap-4">
            {tagsInURL.split(",").map((tag: string) => {
              return tag.trim() ? (
                <ClickLink key={tag}>
                  <div
                    key={tag}
                    className="px-[12px] py-[6px] bg-muted rounded-[4px] text-gray-500 inline-flex flex-row items-center gap-2"
                  >
                    <span className="capitalize">{tag}</span>
                    <Link
                      href={{
                        pathname: "/search",
                        query: {
                          search: searchInURL,
                          category: categoriesInURL,
                          tags: categoriesInURL
                            .split(",")
                            .filter((item: string) => item !== tag)
                            .join(","),
                        },
                      }}
                      className="inline-block"
                    >
                      <X className="w-4 h-4" />
                    </Link>
                  </div>
                </ClickLink>
              ) : null;
            })}
          </li>
        ) : null}
      </ul> */}
      <Suspense fallback={<CarouselProductCardSkeletons />}>
        <AllProductList searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default ProductsList;
