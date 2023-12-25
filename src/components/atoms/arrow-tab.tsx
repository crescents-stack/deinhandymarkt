"use client";
import clsx from "clsx";


const ArrowTab = ({ step }: { step: any }) => {
  const { id, text, status, updateUrlWithStepIdInQuery } = step;
  
  return (
    <div
      className="flex items-center"
      role="button"
      onClick={() => updateUrlWithStepIdInQuery(id)}
    >
      <div
        className={clsx(
          "h-0 w-0 border-y-[15px] border-l-[12px] border-l-transparent",
          {
            "border-y-secondary": status === "current",
            "border-y-muted": status === "todo",
            "border-y-gray-500": status === "done",
          }
        )}
      />
      <div
        className={clsx("font-semibold py-[5px] px-[12px]", {
          "bg-secondary text-white": status === "current",
          "bg-muted text-gray-700": status === "todo",
          "bg-gray-500 text-white": status === "done",
        })}
      >
        {text}
      </div>
      <div
        className={clsx(
          "h-0 w-0 border-y-[15px] border-y-transparent border-l-[12px] ",
          {
            "border-l-secondary": status === "current",
            "border-l-muted": status === "todo",
            "border-l-gray-500": status === "done",
          }
        )}
      />
    </div>
  );
};

export default ArrowTab;
