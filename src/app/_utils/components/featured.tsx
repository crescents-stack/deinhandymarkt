import { GetProducts } from "@/app/dashboard/products/_utils/actions/actions";
import ProductsCard from "@/components/molecules/products-card";
import { ActionResponseHandler } from "@/lib/error";
import { Suspense } from "react";
import ProductCardSkeletons from "../skeletons/product-cards";
import clsx from "clsx";
import MultiProductImpressionLayout from "../datalayers/multi-product-impression-layout";

const Products = async () => {
  const result = await GetProducts();
  // ;
  ActionResponseHandler(result, "User login", true);
  return result.success && result?.data?.data?.length ? (
    <MultiProductImpressionLayout products={result?.data?.data || []}>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-[10px] sm:gap-[20px] pt-[32px]">
        {result?.data?.data?.slice(0, 4).map((item: any, index: number) => {
          return (
            <div
              key={item._id}
              className={clsx(
                "bg-muted border-[1.3px] border-dark_gray hover:border-secondary hover:scale-[103%] group rounded-[8px] transition ease-in-out duration-300",
                {
                  "lg:col-span-2": index + 1 === 2 || index + 1 === 3,
                  "col-span-1": index + 1 !== 2 || index + 1 !== 3,
                }
              )}
            >
              <ProductsCard details={item} />
            </div>
          );
        })}
      </div>
    </MultiProductImpressionLayout>
  ) : (
    "Something went wrong"
  );
};

const FeaturedProducts = () => {
  return (
    <div className="bg-white">
      <section className="container rounded-[8px]">
        <h1 className="h2">
          <span>Featured</span>&nbsp;iPhone Accessories
        </h1>
        <Suspense fallback={<ProductCardSkeletons />}>
          <Products />
        </Suspense>
      </section>
    </div>
  );
};

export default FeaturedProducts;
