import FeaturedProducts from "@/app/_utils/components/featured";
import Search from "@/app/_utils/components/search";
import WhyChoose from "@/app/_utils/components/whychoose";
import ProductsCarousel from "@/components/molecules/products-carousel";

const Home = () => {
  return (
    <main>
      <Search />
      <FeaturedProducts />
      <WhyChoose />
      <ProductsCarousel h2="Power & Cables" />
    </main>
  );
};

export default Home;
