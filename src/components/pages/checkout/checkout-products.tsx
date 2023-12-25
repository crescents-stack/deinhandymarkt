import Product from "./product";
import PriceCount from "./price-count";
import CheckoutNextButton from "@/components/atoms/checkout-next-button";

const CheckoutProducts = () => {
  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-col gap-[10px] md:gap-[20px]">
        <Product />
        <Product />
      </div>
      <PriceCount />
      <div className="flex justify-end">
        <CheckoutNextButton variant="one"/>
      </div>
    </div>
  );
};

export default CheckoutProducts;
