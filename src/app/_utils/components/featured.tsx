import { GetProducts } from "@/app/dashboard/products/_utils/actions/actions";
import ProductsCard from "@/components/molecules/products-card";
import { ActionResponseHandler } from "@/lib/error";
import { Suspense } from "react";

const Products = async () => {
  const result = await GetProducts();
  // PRINT(result);
  ActionResponseHandler(result, "User login", true);
  return result.success && result?.data?.data?.length ? (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-[10px] sm:gap-[20px] pt-[32px]">
      {result?.data?.data?.slice(0,4).map((item: any, index: number) => {
        return (
          <div
            key={item._id}
            className={`bg-muted border border-muted hover:border-secondary group rounded-[8px] ${
              index + 1 === 2 || index+1 === 3 ? "lg:col-span-2" : "col-span-1"
            }`}
          >
            <ProductsCard details={item} />
          </div>
        );
      })}
    </div>
  ) : "Something went wrong";
};

const FeaturedProducts = () => {
  return (
    <div className="bg-white">
      <section className="container rounded-[8px]">
        <h1 className="h2">
          <span>Featured</span>&nbsp;iPhone Accessories
        </h1>
        <Suspense fallback={<>Loading...</>}>
          <Products />
        </Suspense>
      </section>
    </div>
  );
};

export default FeaturedProducts;

