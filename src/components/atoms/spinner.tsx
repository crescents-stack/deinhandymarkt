"use client";
import clsx from "clsx";
import { SunIcon } from "lucide-react";

const Spinner = () => {
  return null;
  return (
    <div
      className={clsx(
        "fixed top-0 left-0 w-full min-h-[100vh] z-10 flex items-center justify-center transition ease-in-out duration-500"
        // { "scale-0": false, "scale-100": true }
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
