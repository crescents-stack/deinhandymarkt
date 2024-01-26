import { GetProducts } from "@/app/dashboard/products/_utils/actions/actions";
import Carousel from "@/components/molecules/carousel";

import { ActionResponseHandler } from "@/lib/error";
import { Suspense } from "react";

const Products = async () => {
  const result = await GetProducts();
  ActionResponseHandler(result, "User login", true);
  return result.success && result?.data?.data?.length ? (
    <Carousel items={result?.data?.data?.slice(0, 6)} />
  ) : (
    "Something went wrong"
  );
};

const ProductsCarousel = ({ h2 = "Power & Cables" }: { h2: string }) => {
  return (
    <div className="bg-white">
      <section className="container rounded-[8px]">
        <h2 className="max-w-[500px] h2 pb-[32px]" style={{ fontWeight: 600 }}>
          {h2}
        </h2>
        <Suspense fallback={<div>Loading...</div>}>
          <Products />
        </Suspense>
      </section>
    </div>
  );
};

export default ProductsCarousel;