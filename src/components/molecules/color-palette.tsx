"use client"

import Image from "next/image";
import clsx from "clsx";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

const ColorPalette = ({
  variant = "lg",
  colors,
}: {
  variant: string;
  colors: any;
}) => {
  const params: any = useSearchParams();
  const pathname = usePathname();
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
          {params.get("color") ?? ""}
        </span>
      </p>
      <div className="flex flex-wrap items-center gap-[16px]">
        {colors.map((item: any, index: number) => {
          const paths = item.split("/");
          const color = paths[paths.length - 1].split(".")[0];
          return (
            <Link
              key={index}
              className={clsx(
                "rounded-full border-[2px] border-dark_gray hover:border-secondary/50 md:cursor-pointer bg-white flex items-center justify-center",
                {
                  "w-[30px] h-[30px]": variant === "sm",
                  "w-[40px] h-[40px]": variant === "lg",
                  "border-secondary": color === params.get("color"),
                }
              )}
              href={{
                pathname,
                query: {
                  color,
                },
              }}
            >
              <Image
                src={item}
                alt=""
                width={1000}
                height={1000}
                className={clsx("rounded-full", {
                  "w-[22px] h-[22px]": variant === "sm",
                  "w-[32px] h-[32px]": variant === "lg",
                })}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ColorPalette;
