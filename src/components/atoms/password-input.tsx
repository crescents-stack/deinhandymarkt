"use client";

import clsx from "clsx";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const PasswordInput = ({name}:{name: string}) => {
  const [showText, setShowText] = useState(false);
  return (
    <div className="relative">
      <input name={name} type={showText ? "text" : "password"} required />
      <Eye
        className={clsx(
          "absolute top-[8px] right-[12px] w-[16px] h-[16px]  hover:stroke-gray-400",
          {
            "hidden stroke-gray-500": !showText,
            "block stroke-gray-300": showText,
          }
        )}
        role="button"
        onClick={() => setShowText(!showText)}
      />
      <EyeOff
        className={clsx(
          "absolute top-[8px] right-[12px] w-[16px] h-[16px]  hover:stroke-gray-400",
          {
            "hidden stroke-gray-500": showText,
            "block stroke-gray-300": !showText,
          }
        )}
        role="button"
        onClick={() => setShowText(!showText)}
      />
    </div>
  );
};

export default PasswordInput;
