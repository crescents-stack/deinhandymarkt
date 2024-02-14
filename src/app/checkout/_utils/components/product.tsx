import { X } from "lucide-react";
import Carousel from "../../../products/[slug]/_utils/components/carousel";
// import { ProductImages } from "../../../products/[slug]/_utils/components/details";
import ColorPalette from "@/components/molecules/color-palette";
import {
  TCartContextValue,
  useCartContext,
} from "@/lib/contexts/cart-context-provider";
import QuantityCounter from "@/components/molecules/quantity-counter";
import Link from "next/link";
import { useState } from "react";

const Product = ({ details }: { details: TCartContextValue }) => {
  const { _id, name, slug, basePrice, images, thumbnail } = details;
  const { cart, setCart } = useCartContext();
  const [quantity, setQuantity] = useState(details?.quantity ?? 1);

  const RemoveItemFromCart = () => {
    cart.length &&
      setCart(cart.filter((item: TCartContextValue) => item._id !== _id));
  };
  return (
    <div className="relative flex flex-col lg:flex-row items-stretch bg-white border border-muted md:bg-muted rounded-[8px] p-[10px] md:p-[20px] gap-[10px] md:gap-[20px] justify-between">
      <div className="absolute top-0 right-0 m-[5px] z-10">
        <X
          className="stroke-[1.3px] stroke-secondary md:cursor-pointer"
          role="button"
          onClick={RemoveItemFromCart}
        />
      </div>
      <div className="flex flex-col md:flex-row items-stretch gap-[16px] md:gap-[32px]">
        <div className="bg-white rounded-[8px] min-w-[220px] max-w-[220px] mx-auto">
          <Carousel ProductImages={[thumbnail]} variant="sm" />
        </div>
        <div className="flex flex-col justify-between gap-[20px]">
          <div className="flex flex-col gap-[12px]">
            <Link href={`products/${slug}`} className="group">
              <h4 className="text-xl md:text-2xl font-light gap-[20px]">
                {/* iPhone 15 Pro&nbsp; */}
                <span className="text-xl md:text-2xl font-semibold group-hover:text-secondary">
                  {name}
                </span>
                {/* &nbsp; Pacific Blue */}
              </h4>
            </Link>
            <p className="text-[14px] md:text-[20px]">${basePrice}</p>
          </div>
          {/* <ColorPalette variant="sm" /> */}
          <div className="flex flex-col justify-start items-start gap-[16px]">
            <p className="text-[14px] pt-[20px]">
              Sub total&nbsp;
              <span className="text-[14px] font-semibold">
                ${basePrice * quantity}
              </span>
            </p>
            <QuantityCounter
              variant="sm"
              details={details}
              quantity={quantity}
              setQuantity={setQuantity}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
