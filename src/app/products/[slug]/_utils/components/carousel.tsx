"use client";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";
import clsx from "clsx";

const Carousel = ({
  ProductImages,
  variant = "lg",
}: {
  ProductImages: any;
  variant: string;
}) => {
  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={18}
        navigation
        pagination={{ clickable: true }}
        onSwiper={(swiper) => {}}
        onSlideChange={() => {}}
        className="items-stretch"
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
        }}
      >
        {ProductImages.map((item: any, index: number) => {
          return (
            <SwiperSlide
              key={index}
              className={clsx(
                "bg-white rounded-[8px] transition ease-in-out duration-500 group",
                {
                  "min-h-[330px] min-[640px]:min-h-[500px]": variant === "lg",
                  "min-h-[220px]": variant === "sm",
                }
              )}
            >
              <Image
                src={item}
                alt="image"
                width={1000}
                height={1000}
                className="w-full h-full rounded-[8px]"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Carousel;
