import Carousel from "./carousel";
import { TProductSchema } from "@/app/dashboard/products/_utils/types/types";
import ProductInteractions from "./product-interactions";

const Details = ({ details }: { details: TProductSchema }) => {
  return (
    <section className="bg-white">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-[40px]">
        {details.images.length ? (
          <Carousel
            ProductImages={[details.thumbnail, ...details.images]}
            variant="lg"
          />
        ) : null}
        <div className="flex flex-col gap-[32px] h-full justify-center">
          {/* <ColorPalette variant="lg" /> */}
          <ProductInteractions details={details} />
        </div>
      </div>
    </section>
  );
};

export default Details;
