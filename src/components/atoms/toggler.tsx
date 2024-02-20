"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";

const Toggler = ({
  text = "Same as billing address?",
  textSize = "small",
  handler,
  defaultValue
}: {
  text: string;
  textSize: string;
  handler: Function;
  defaultValue?: boolean;
}) => {
  const [active, setActive] = useState(defaultValue);
  return (
    <div
      className="relative inline-flex items-center mb-5 md:cursor-pointer"
      role="button"
      onClick={() => {
        setActive(!active);
        handler(!active);
      }}
    >
      <div
        className={clsx(
          "w-[28px] h-[16px] rounded-full flex items-center transition ease-in-out duration-300 border",
          {
            "bg-secondary border-secondary": active,
            "bg-dark_gray border-dark_gray": !active,
          }
        )}
      >
        <div
          className={clsx(
            "w-[14px] h-[14px] rounded-full bg-white transition ease-in-out duration-300",
            {
              "translate-x-[12.8px]": active,
              "translate-x-[0px]": !active,
            }
          )}
        ></div>
      </div>
      <span
        className={clsx("ms-3 font-medium text-gray-900 dark:text-gray-300", {
          "text-sm": textSize === "small",
          "": textSize !== "small",
        })}
      >
        {text}
      </span>
    </div>
  );
};

export default Toggler;
