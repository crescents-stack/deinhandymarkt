import ProductsCarousel from "@/components/molecules/products-carousel";
import Details from "@/components/pages/products/details";
import Overview from "@/components/pages/products/overview";

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
