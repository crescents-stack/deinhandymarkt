import Carousel from "./carousel";
import { TProductSchema } from "@/app/dashboard/products/_utils/types/types";
import ProductInteractions from "./product-interactions";

const Details = ({
  details,
  searchParams,
}: {
  details: TProductSchema;
  searchParams: any;
}) => {
  const color = searchParams.color;
  let colorImages: string[] = [];
  if (color) {
    colorImages = [...details.images.filter((image) => image.includes(color))];
  } else {
    colorImages = [details.thumbnail, ...details.images.slice(0, 4)];
  }
  return (
    <section className="bg-white">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-[40px]">
        {details.images.length ? (
          <Carousel ProductImages={[...colorImages]} variant="lg" />
        ) : null}
        <div className="flex flex-col gap-[32px] h-full justify-center items-center">
          <ProductInteractions details={details} searchParams={searchParams} variant="lg"/>
        </div>
      </div>
    </section>
  );
};

export default Details;
