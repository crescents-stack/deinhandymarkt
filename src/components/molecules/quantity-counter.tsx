"use client";

import clsx from "clsx";
import { Minus, Plus } from "lucide-react";

const QuantityCounter = ({
  variant = "lg",
  counter,
  setCounter,
  limit = 10,
}: {
  variant: string;
  counter: number;
  setCounter: Function;
  limit?: number;
}) => {
  return (
    <div className="flex bg-white rounded-[8px]">
      <div
        className={clsx(
          "border border-dark_gray border-r-0 py-[4px] rounded-l-[8px] flex items-center justify-center hover:bg-muted active:scale-[98%] md:cursor-pointer",
          { "px-[16px]": variant === "lg", "px-[10px]": variant === "sm" }
        )}
        onClick={() => counter > 1 && setCounter(counter - 1)}
        role="button"
      >
        <Minus className="w-[16px] h-[16px] stroke-[1.3px] stroke-gray-500" />
      </div>
      <div
        className={clsx(
          "border border-dark_gray py-[4px] flex items-center justify-center text-[16px] font-medium",
          { "px-[30px]": variant === "lg", "px-[16px]": variant === "sm" }
        )}
      >
        {counter}
      </div>
      <div
        className={clsx(
          "border border-dark_gray border-l-0 py-[4px] rounded-r-[8px] flex items-center justify-center hover:bg-muted active:scale-[98%] md:cursor-pointer",
          { "px-[16px]": variant === "lg", "px-[10px]": variant === "sm" }
        )}
        onClick={() => counter < limit && setCounter(counter + 1)}
        role="button"
      >
        <Plus className="w-[16px] h-[16px] stroke-[1.3px] stroke-gray-500" />
      </div>
    </div>
  );
};

export default QuantityCounter;
