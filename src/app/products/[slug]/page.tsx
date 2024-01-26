import ProductsCarousel from "@/components/molecules/products-carousel";
import Details from "@/app/products/[slug]/_utils/components/details";
import Overview from "@/app/products/[slug]/_utils/components/overview";
import { GetProduct } from "@/app/dashboard/products/_utils/actions/actions";
import { Suspense } from "react";

const ProductDetails = async ({ slug }: { slug: string }) => {
  const response = await GetProduct(slug);
  return response?.success && response?.data ? (
    <>
      <Details details={response?.data} />
      <Overview details={response?.data} />
      <ProductsCarousel h2="You May Also Like" />
    </>
  ) : (
    "No details found!"
  );
};
const Product = ({ params }: { params: { slug: string } }) => {
  // PRINT(params);
  return (
    <Suspense fallback={<>Loading...</>}>
      <ProductDetails slug={params.slug as string} />
    </Suspense>
  );
};

export default Product;
