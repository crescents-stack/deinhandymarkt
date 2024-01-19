import Image from "next/image";
import { ProductImages } from "../../app/products/[slug]/_utils/components/details";
import clsx from "clsx";

const ColorPalette = ({ variant = "lg" }: { variant: string }) => {
  return (
    <div className="flex flex-col gap-[16px]">
      <p
        className={clsx("font-light text-gray-500", {
          "text-[14px] md:text-[18px]": variant === "sm",
          "text-[14px] md:text-[20px]": variant === "lg",
        })}
      >
        Color&nbsp;
        <span
          className={clsx("font-semibold text-primary", {
            "text-[14px] md:text-[18px]": variant === "sm",
            "text-[14px] md:text-[20px]": variant === "lg",
          })}
        >
          Mulberry
        </span>
      </p>
      <div className="flex flex-wrap items-center gap-[16px]">
        {ProductImages.map((item: any) => {
          return (
            <div
              key={item.id}
              className={clsx(
                "rounded-full border-[2px] border-dark_gray hover:border-secondary/50 md:cursor-pointer bg-white flex items-center justify-center",
                {
                  "w-[30px] h-[30px]": variant === "sm",
                  "w-[40px] h-[40px]": variant === "lg",
                }
              )}
            >
              <Image
                src={item.color}
                alt=""
                width={1000}
                height={1000}
                className={clsx("rounded-full", {
                  "w-[22px] h-[22px]": variant === "sm",
                  "w-[32px] h-[32px]": variant === "lg",
                })}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ColorPalette;
