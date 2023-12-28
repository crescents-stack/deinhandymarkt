import Carousel from "./carousel";
import QuantityCounter from "@/components/molecules/quantity-counter";
import ColorPalette from "@/components/molecules/color-palette";
import AddToCart from "@/components/molecules/add-to-cart";


const Details = () => {
  return (
    <section className="bg-white">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-[40px]">
        <Carousel ProductImages={ProductImages} variant="lg" />
        <div className="flex flex-col gap-[32px] h-full justify-between">
          <div className="flex flex-col gap-[20px]">
            <div className="flex flex-col gap-[16px]">
              <p className="text-[12px] md:text-[14px] text-secondary">New</p>
              <h1 className="h2_text text-gray-500">
                iPhone 15 Pro&nbsp;
                <span className="h2_text font-semibold text-primary">
                  FineWoven Case with MagSafe
                </span>
                &nbsp; Mulberry
              </h1>
            </div>
            <p className="text-[20px] text-gray-500">$51</p>
          </div>
          <ColorPalette variant="lg" />
          <div className="flex flex-col gap-[16px]">
            <p className="text-[14px] md:text-[20px] font-light text-gray-500">
              Sub total&nbsp;
              <span className="text-[14px] md:text-[20px] font-semibold text-primary">
                $177
              </span>
            </p>
            <QuantityCounter variant="lg"/>
          </div>
          <AddToCart />
        </div>
      </div>
    </section>
  );
};

export default Details;

export const ProductImages = [
  {
    id: 1,
    color: "/images/products/mulberry-color.jpeg",
    slug: "/images/products/mulberry.jpeg",
    image: "/images/products/mulberry.jpeg",
  },
  {
    id: 2,
    color: "/images/products/evergreen-color.jpeg",
    slug: "/images/products/evergreen.jpeg",
    image: "/images/products/evergreen.jpeg",
  },
  {
    id: 3,
    color: "/images/products/taupe-color.jpeg",
    slug: "/images/products/taupe.jpeg",
    image: "/images/products/taupe.jpeg",
  },
  {
    id: 4,
    color: "/images/products/pacificblue-color.jpeg",
    slug: "/images/products/pacificblue.jpeg",
    image: "/images/products/pacificblue.jpeg",
  },
  {
    id: 5,
    color: "/images/products/black-color.jpeg",
    slug: "/images/products/black.jpeg",
    image: "/images/products/black.jpeg",
  },
];
