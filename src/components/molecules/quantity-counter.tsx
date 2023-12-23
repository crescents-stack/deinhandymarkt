"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const QuantityCounter = () => {
  const [counter, setCounter] = useState(1);
  return (
    <div className="flex">
      <div
        className="border border-dark_gray border-r-0 px-[16px] py-[8px] rounded-l-[8px] flex items-center justify-center hover:bg-muted active:scale-[98%] md:cursor-pointer"
        onClick={() => counter > 1 && setCounter(counter - 1)}
        role="button"
      >
        <Minus className="w-[16px] h-[16px] stroke-[1.3px] stroke-gray-500" />
      </div>
      <div className="border border-dark_gray px-[30px] py-[8px] flex items-center justify-center text-[16px] font-medium">
        {counter}
      </div>
      <div
        className="border border-dark_gray border-l-0 px-[16px] py-[8px] rounded-r-[8px] flex items-center justify-center hover:bg-muted active:scale-[98%] md:cursor-pointer"
        onClick={() => setCounter(counter + 1)}
        role="button"
      >
        <Plus className="w-[16px] h-[16px] stroke-[1.3px] stroke-gray-500" />
      </div>
    </div>
  );
};

export default QuantityCounter;
