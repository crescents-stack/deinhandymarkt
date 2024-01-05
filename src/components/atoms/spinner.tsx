"use client";
import { useLoadingContext } from "@/lib/contexts/loading.provider";
import clsx from "clsx";
import { SunIcon } from "lucide-react";

const Spinner = () => {
  const { Loading } = useLoadingContext();
  return (
    <div
      className={clsx(
        "fixed top-0 left-0 w-full min-h-[100vh] z-10 flex items-center justify-center",
        { "scale-0": !Loading, "scale-100": Loading }
      )}
    >
      <div className="backdrop-blur flex items-center justify-center gap-[8px] px-4 py-2 rounded-[10px] border">
        <SunIcon className="w-4 h-4 animate-spin stroke-secondary" />
        <span className="text-secondary">Please wait</span>
      </div>
    </div>
  );
};

export default Spinner;
