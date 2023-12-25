import { X } from "lucide-react";
import Carousel from "../products/carousel";
import { ProductImages } from "../products/details";
import ColorPalette from "@/components/molecules/color-palette";
import QuantityCounter from "@/components/molecules/quantity-counter";

const Product = () => {
  return (
    <div className="relative flex flex-col lg:flex-row items-stretch bg-white border border-muted md:bg-muted rounded-[8px] p-[10px] md:p-[20px] gap-[10px] md:gap-[20px] justify-between">
      <div className="absolute top-0 right-0 m-[5px] z-10">
        <X className="stroke-[1.3px] stroke-secondary md:cursor-pointer" />
      </div>
      <div className="flex flex-col md:flex-row items-stretch gap-[16px] md:gap-[32px]">
        <div className="bg-white rounded-[8px] min-w-[220px] max-w-[220px] mx-auto">
          <Carousel ProductImages={ProductImages} variant="sm" />
        </div>
        <div className="flex flex-col justify-between gap-[20px]">
          <div className="flex flex-col gap-[12px]">
            <h4 className="text-xl md:text-2xl font-light gap-[20px]">
              iPhone 15 Pro&nbsp;
              <span className="text-xl md:text-2xl font-semibold">
                FineWoven Case with MagSafe
              </span>
              &nbsp; Pacific Blue
            </h4>
            <p className="text-[14px] md:text-[20px]">$59</p>
          </div>
          <ColorPalette variant="sm" />
        </div>
      </div>
      <div className="flex flex-col justify-end items-end gap-[16px]">
        <p className="text-[14px] pt-[20px]">
          Sub total <span className="text-[14px] font-semibold">$177</span>
        </p>
        <QuantityCounter variant="sm" />
      </div>
    </div>
  );
};

export default Product;
