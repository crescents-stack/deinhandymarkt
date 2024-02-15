import ProductsCarousel from "@/components/molecules/products-carousel";
import Details from "@/app/products/[slug]/_utils/components/details";
import Overview from "@/app/products/[slug]/_utils/components/overview";
import { GetProduct } from "@/app/dashboard/products/_utils/actions/actions";
import ProductDetailsSkeleton from "@/app/products/[slug]/_utils/skeletons/product-details";
import { Suspense } from "react";
import { ActionResponseHandler } from "@/lib/error";

const ProductDetails = async ({ slug, searchParams }: { slug: string, searchParams: any }) => {
  const response = await GetProduct(slug);
  ActionResponseHandler(response, "Product Details", true);
  return response?.success && response?.data ? (
    <>
      <Details details={response?.data} searchParams={searchParams}/>
      <Overview details={response?.data} />
    </>
  ) : (
    "No details found!"
  );
};
const Product = ({ params, searchParams }: { params: { slug: string }, searchParams: any }) => {
  return (
    <>
      <Suspense fallback={<ProductDetailsSkeleton />}>
        <ProductDetails slug={params.slug as string} searchParams={searchParams}/>
      </Suspense>
      <ProductsCarousel h2="You May Also Like" />
    </>
  );
};

export default Product;
