import CarouselProductCardSkeletons from "@/app/_utils/skeletons/carousel-product-cards";
import { GetProducts } from "@/app/dashboard/products/_utils/actions/actions";
import ProductsCard from "@/components/molecules/products-card";
import { PRINT } from "@/lib/utils";
import { Suspense } from "react";
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

const ProductsList = ({ searchParams }: { searchParams: string }) => {
  return (
    <div className="text-9xl flex flex-col gap-[20px] justify-stretch items-stretch">
      <ul className="flex items-center justify-start gap-[8px]">
        <li className="px-[12px] py-[6px] bg-muted rounded-[4px] text-gray-500">
          All cases
        </li>
        <li className="px-[12px] py-[6px] bg-muted rounded-[4px] text-gray-500">
          Chargers
        </li>
      </ul>
      <Suspense
        fallback={
          <div className="space-y-[40px]">
            <CarouselProductCardSkeletons />
            <CarouselProductCardSkeletons />
          </div>
        }
      >
        <AllProductList searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default ProductsList;
