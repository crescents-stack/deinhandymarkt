import Image from "next/image";
import Carousel from "./carousel";
import QuantityCounter from "@/components/molecules/quantity-counter";

const Details = () => {
  return (
    <section className="bg-white">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-[40px]">
        <Carousel ProductImages={ProductImages} />
        <div className="flex flex-col gap-[32px]">
          <div className="flex flex-col gap-[20px]">
            <div className="flex flex-col gap-[16px]">
              <p className="text-[12px] md:text-[14px] text-secondary">New</p>
              <h1 className="h2_text text-gray-500">
                iPhone 15 Pro&nbsp;
                <span className="h2_text font-semibold text-primary">
                  FineWoven Case with MagSafe
                </span>
                &nbsp; Pacific Blue
              </h1>
            </div>
            <p className="text-[20px] text-gray-500">$51</p>
          </div>
          <div className="flex flex-col gap-[16px]">
            <p className="text-[14px] md:text-[20px] font-light text-gray-500">
              Color&nbsp;
              <span className="text-[14px] md:text-[20px] font-semibold text-primary">
                Mulberry
              </span>
            </p>
            <div className="flex flex-wrap items-center gap-[16px]">
              {ProductImages.map((item: any) => {
                return (
                  <div
                    key={item.id}
                    className="w-[40px] h-[40px] rounded-full border-[2px] border-dark_gray hover:border-secondary/50 md:cursor-pointer bg-white flex items-center justify-center"
                  >
                    <Image
                      src={item.color}
                      alt=""
                      width={1000}
                      height={1000}
                      className="w-[32px] h-[32px] rounded-full"
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-[16px]">
            <p className="text-[14px] md:text-[20px] font-light text-gray-500">
              Sub total&nbsp;
              <span className="text-[14px] md:text-[20px] font-semibold text-primary">
                $177
              </span>
            </p>
            <QuantityCounter />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Details;

const ProductImages = [
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
