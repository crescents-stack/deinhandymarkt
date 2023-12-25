import Image from "next/image";

const TopBanner = () => {
  return (
    <div className="bg-secondary py-[12px]">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-[8px] md:gap-[90px] px-0">
        <div>
          <p className="text-white text-[8px] md:text-[12px] text-center md:text-left">
            Lorem ipsum dolor sit amet consectetur. Ut bibendum scelerisque
            turpis volutpat odio. At malesuada sed eget leo risus. Tortor eget
            placerat volutpat tellus. Interdum diam dapibus sed volutpat amet
            tincidunt
          </p>
        </div>
        <div className="flex items-center justify-center md:justify-end gap-[8px] md:gap-[20px] max-w-[315px]">
          <Image
            src="/images/payments/klarna.svg"
            alt="klarna-image"
            width={1000}
            height={1000}
            className="h-[12px] md:h-[16px] w-auto"
          />
          <Image
            src="/images/payments/paypal.svg"
            alt="paypal-image"
            width={1000}
            height={1000}
            className="h-[12px] md:h-[16px] w-auto"
          />
          <Image
            src="/images/payments/stripe.svg"
            alt="stripe-image"
            width={1000}
            height={1000}
            className="h-[12px] md:h-[16px] w-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
