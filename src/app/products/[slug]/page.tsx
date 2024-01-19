import ProductsCarousel from "@/components/molecules/products-carousel";
import Details from "@/app/products/[slug]/_utils/components/details";
import Overview from "@/app/products/[slug]/_utils/components/overview";

const Product = () => {
  return (
    <>
      <Details />
      <Overview />
      <ProductsCarousel h2="You May Also Like" />
    </>
  );
};

export default Product;
