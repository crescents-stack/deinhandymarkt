"use client";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ProductsCard from "./products-card";

const Carousel = ({ items }: { items: any }) => {
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
          460: {
            slidesPerView: 2,
          },
          850: {
            slidesPerView: 3,
          },
        }}
      >
        {items.map((item: any) => {
          return (
            <SwiperSlide
              key={item.id}
              className="bg-white border border-dark_gray hover:border-secondary rounded-[8px] rounded-[8px] min-h-[330px] min-[640px]:min-h-[500px] transition ease-in-out duration-500 group"
            >
              <ProductsCard details={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Carousel;
