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

const Carousel = ({ ProductImages }: { ProductImages: any }) => {
  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={18}
        navigation
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
        className="items-stretch"
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
        }}
      >
        {ProductImages.map((item: any) => {
          return (
            <SwiperSlide
              key={item.id}
              className="bg-muted min-h-[330px] min-[640px]:min-h-[500px] transition ease-in-out duration-500 group"
            >
              <Image
                src={item.image}
                alt="image"
                width={1000}
                height={1000}
                className="w-full h-full"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Carousel;
