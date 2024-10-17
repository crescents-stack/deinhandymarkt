import ProductsCarousel from "@/components/molecules/products-carousel";
import Overview from "@/app/products/[slug]/_utils/components/overview";
import { GetProduct } from "@/app/dashboard/products/_utils/actions/actions";
import ProductDetailsSkeleton from "@/app/products/[slug]/_utils/skeletons/product-details";
import { Suspense } from "react";
import { ActionResponseHandler } from "@/lib/error";
import ProductInteractions from "./_utils/components/product-interactions";
import ProductViewLayout from "@/app/_utils/datalayers/product-view-layout";

const ProductDetails = async ({ slug }: { slug: string }) => {
  const response = await GetProduct(slug);
  ActionResponseHandler(response, "Product Details", true);
  return response?.success && response?.data ? (
    <ProductViewLayout product={response?.data || {}}>
      <>
        <section className="bg-white">
          <ProductInteractions details={response?.data} variant="lg" />
        </section>
        <Overview details={response?.data} />
        <ProductsCarousel
          h2="You May Also Like"
          queryString={response.data.category.slug}
        />
      </>
    </ProductViewLayout>
  ) : (
    "No details found!"
  );
};
const Product = ({ params }: { params: { slug: string } }) => {
  return (
    <>
      <Suspense fallback={<ProductDetailsSkeleton />}>
        <ProductDetails slug={params.slug as string} />
      </Suspense>
    </>
  );
};

export default Product;
