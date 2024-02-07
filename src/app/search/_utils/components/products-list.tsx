import CarouselProductCardSkeletons from "@/app/_utils/skeletons/carousel-product-cards";
import { GetProducts } from "@/app/dashboard/products/_utils/actions/actions";
import ProductsCard from "@/components/molecules/products-card";
import { PRINT } from "@/lib/utils";
import { X } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import ClickLink from "./click-link";
// import { products } from "../../../../components/molecules/products-carousel";

const AllProductList = async ({ searchParams }: { searchParams: any }) => {
  const queryString = `search=${searchParams?.search ?? ""}&category=${
    searchParams?.category ?? ""
  }&tags=${searchParams?.tags ?? ""}`;
  const response = await GetProducts(queryString);
  PRINT(queryString);

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
  const categoriesInURL = searchParams.category ?? "";
  const tagsInURL = searchParams.tags ?? "";
  const searchInURL = searchParams.search ?? "";
  return (
    <div className="w-full space-y-8">
      <ul className="space-x-4 flex flex-wrap items-center">
        {categoriesInURL.length || tagsInURL.length ? (
          <ClickLink>
            <Link
              href={{
                pathname: "/search",
                query: {
                  search: "",
                  category: "",
                  tags: "",
                },
              }}
              className="inline-block"
            >
              <li className="inline-block px-[12px] py-[6px] bg-secondary/5 rounded-[4px] text-secondary font-semibold hover:bg-secondary hover:text-white transition ease-in-out duration-500">
                Remove All
              </li>
            </Link>
          </ClickLink>
        ) : null}
        {categoriesInURL.length ? (
          <li className="inline-block px-[12px] py-[6px] bg-muted rounded-[4px] text-gray-500">
            {categoriesInURL.split(",").map((category: string) => {
              return (
                <ClickLink key={category}>
                  <div className="flex flex-row items-center gap-2">
                    <span className="capitalize">{category}</span>
                    <Link
                      href={{
                        pathname: "/search",
                        query: {
                          search: searchInURL,
                          category: categoriesInURL.replaceAll(category, ""),
                          tags: tagsInURL,
                        },
                      }}
                      className="inline-block"
                    >
                      <X className="w-4 h-4" />
                    </Link>
                  </div>
                </ClickLink>
              );
            })}
          </li>
        ) : null}
        {tagsInURL.length ? (
          <li className="inline-block px-[12px] py-[6px] bg-muted rounded-[4px] text-gray-500">
            {tagsInURL.split(",").map((tag: string) => {
              return (
                <ClickLink key={tag}>
                  <div key={tag} className="flex flex-row items-center gap-2">
                    <span className="capitalize">{tag}</span>
                    <Link
                      href={{
                        pathname: "/search",
                        query: {
                          search: searchInURL,
                          category: categoriesInURL,
                          tags: tagsInURL.replaceAll(tag, ""),
                        },
                      }}
                      className="inline-block"
                    >
                      <X className="w-4 h-4" />
                    </Link>
                  </div>
                </ClickLink>
              );
            })}
          </li>
        ) : null}
      </ul>
      <Suspense fallback={<CarouselProductCardSkeletons />}>
        <AllProductList searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default ProductsList;
