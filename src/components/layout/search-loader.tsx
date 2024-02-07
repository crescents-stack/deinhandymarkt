"use client";
import clsx from "clsx";
import { Sun } from "lucide-react";

const SearchLoader = ({ show }: { show: boolean }) => {
  return (
    <div
      className={clsx(
        "fixed top-0 left-0 min-w-[100vw] min-h-[100vh] bg-white flex items-center justify-center",
        {
          "scale-0": !show,
          "scale-100": show,
        }
      )}
    >
      <div className="flex items-center gap-[8px]">
        <Sun className="w-[16px] h-[16px] animate-spin stroke-gray-500" />
        <span className="text-gray-500">Searching</span>
      </div>
    </div>
  );
};

export default SearchLoader;
