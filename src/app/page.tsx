import FeaturedProducts from "@/components/pages/home/featured";
import PowerAndCables from "@/components/pages/home/power-and-cables";
import Search from "@/components/pages/home/search";
import WhyChoose from "@/components/pages/home/whychoose";

const Home = () => {
  return (
    <main>
      <Search />
      <FeaturedProducts />
      <WhyChoose />
      <PowerAndCables />
    </main>
  );
};

export default Home;
