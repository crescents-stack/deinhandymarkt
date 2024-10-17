import CarouselProductCardSkeletons from "@/app/_utils/skeletons/carousel-product-cards";
import { GetProducts } from "@/app/dashboard/products/_utils/actions/actions";
import Carousel from "@/components/molecules/carousel";

import { ActionResponseHandler } from "@/lib/error";
import { Suspense } from "react";

const Products = async ({ queryString }: { queryString: string }) => {
  const result = await GetProducts(
    `category=${queryString || "charger,cable,adapter"}`
  );
  ActionResponseHandler(result, "User login", true);
  return result.success && result?.data?.data?.length ? (
    <Carousel items={result?.data?.data?.slice(0, 6)} />
  ) : (
    "Something went wrong"
  );
};

const ProductsCarousel = ({
  h2 = "Power & Cables",
  queryString,
}: {
  h2: string;
  queryString?: string;
}) => {
  return (
    <div className="bg-white">
      <section className="container rounded-[8px]">
        <h2 className="max-w-[500px] h2 pb-[32px]" style={{ fontWeight: 600 }}>
          {h2}
        </h2>
        <Suspense fallback={<CarouselProductCardSkeletons />}>
          <Products queryString={queryString as string} />
        </Suspense>
      </section>
    </div>
  );
};

export default ProductsCarousel;
