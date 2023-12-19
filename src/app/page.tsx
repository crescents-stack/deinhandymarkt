import FeaturedProducts from "@/components/pages/home/featured";
import Search from "@/components/pages/home/search";
import WhyChoose from "@/components/pages/home/whychoose";

const Home = () => {
  return (
    <main>
      <Search />
      <FeaturedProducts />
      <WhyChoose />
    </main>
  );
};

export default Home;
