import ProductClickLayout from "@/app/_utils/datalayers/product-click-layout";
import { TProductSchema } from "@/app/dashboard/products/_utils/types/types";
import { IntlFormatter } from "@/lib/utils";
import Image from "next/image";

const ProductsCard = ({ details }: { details: TProductSchema }) => {
  const { name, thumbnail, price, attributes } = details;
  const colors: string[] =
    attributes.filter((item: { label: string }) =>
      ["color", "colors", "Color", "Colors", "COLORS"].includes(item.label)
    )[0]?.values || [];
  return (
    <ProductClickLayout product={details}>
      <div className="flex flex-col items-center justify-center gap-[10px] sm:gap-[20px] px-[10px] md:px-[40px] py-[40px]">
        <Image
          unoptimized
          src={thumbnail}
          alt="product-thumbnail"
          width={1000}
          height={1000}
          className="max-w-[100px] sm:max-w-[222px] mx-auto"
        />
        <div className="flex flex-col items-center justify-center gap-[16px]">
          {/* <p className="text-secondary text-[12px] md:text-[14px]">{arrival}</p> */}

          <h4 className="text-center max-w-[300px] mx-auto text-[12px] md:text-[14px] font-bold group-hover:text-secondary group-hover:underline">
            {name}
          </h4>

          <p>{IntlFormatter.format(price)}</p>
        </div>

        {colors.length ? (
          <div className="flex flex-wrap items-center justify-center gap-[2px] sm:gap-[4px] md:gap-[8px]">
            {colors.map((item: string, index: number) => {
              return (
                <div
                  key={index}
                  className="w-[10px] h-[10px] sm:w-[16px] sm:h-[16px] rounded-full"
                >
                  <Image
                    src={item}
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
    </ProductClickLayout>
  );
};

export default ProductsCard;
