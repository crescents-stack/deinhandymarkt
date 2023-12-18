import Image from "next/image";

const ProductsCard = ({ details }: { details: any }) => {
  const { title, image, arrival, price, colors } = details;
  return (
    <div className="flex flex-col items-center justify-center gap-[10px] sm:gap-[20px] px-[10px] md:px-[40px] py-[40px]">
      <Image
        src={image}
        alt="product-image"
        width={1000}
        height={1000}
        className="max-w-[100px] sm:max-w-[222px] mx-auto"
      />
      <div className="flex flex-col items-center justify-center gap-[16px]">
        <p className="text-secondary text-[12px] md:text-[14px]">{arrival}</p>
        <h4 className="text-center max-w-[300px] mx-auto text-[12px] md:text-[14px] font-bold">
          {title}
        </h4>
        <p>${price}.00</p>
      </div>

      {colors ? (
        <div className="flex flex-wrap items-center justify-center gap-[2px] sm:gap-[4px] md:gap-[8px]">
          {colors.map((item: any) => {
            return (
              <div key={item.id} className="w-[10px] h-[10px] sm:w-[16px] sm:h-[16px] rounded-full">
                <Image
                  src={item.image}
                  alt="color"
                  width={500}
                  height={500}
                  className="w-[10px] h-[10px] sm:w-[16px] sm:h-[16px] rounded-full"
                />
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default ProductsCard;
