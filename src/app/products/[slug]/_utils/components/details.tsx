import Carousel from "./carousel";
import { TProductSchema } from "@/app/dashboard/products/_utils/types/types";
import ProductInteractions from "./product-interactions";

const Details = ({
  details,
}: {
  details: TProductSchema;
}) => {
  const CarouselImages = [];
  CarouselImages.push({
    id: 1,
    image: details.thumbnail,
  });
  details.images.forEach((image, index) => {
    CarouselImages.push({
      id: index + 2,
      image,
    });
  });
  return (
    <section className="bg-white">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-[40px]">
        {CarouselImages.length ? (
          <Carousel ProductImages={CarouselImages} variant="lg" />
        ) : null}
        <div className="flex flex-col gap-[32px] h-full justify-center">
          
          {/* <ColorPalette variant="lg" /> */}
          <ProductInteractions details={details}/>
        </div>
      </div>
    </section>
  );
};

export default Details;