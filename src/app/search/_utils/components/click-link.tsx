/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { ReactChildren } from "@/lib/types";
import clsx from "clsx";
import { Sun } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
const winD = typeof window !== "undefined";
const ClickLink = ({ children }: ReactChildren) => {
  const [clicked, setClicked] = useState(false);
  const params = useSearchParams();
  useEffect(() => {
    setClicked(false);
  }, [winD, params]);
  return (
    <div
      onClick={() => setClicked(true)}
      className={clsx("border-0 h-full", {
        "fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur":
          clicked,
      })}
    >
      {clicked ? (
        <div className="flex items-center gap-[8px] bg-white p-4 rounded-[10px] shadow-xl">
          <Sun className="w-[16px] h-[16px] animate-spin stroke-gray-500" />
          <span className="text-gray-500">Searching...</span>
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default ClickLink;
