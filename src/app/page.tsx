import FeaturedProducts from "@/components/pages/home/featured";
import Search from "@/components/pages/home/search";
import WhyChoose from "@/components/pages/home/whychoose";
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
