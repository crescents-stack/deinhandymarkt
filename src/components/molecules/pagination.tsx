"use client";

import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, setCurrentPage, maxItems = 10 }: any) => {
  return (
    <div className="inline-flex flex-wrap items-center justify-center gap-[4px]">
      <div
        className={clsx(
          "flex items-center justify-center px-[16px] py-[8px] rounded-[10px] text-gray-500",
          { "bg-muted": currentPage > 1 }
        )}
        role="button"
        onClick={() =>
          setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)
        }
      >
        <ChevronLeft className="w-[16px] h-[16px] stroke-[1.3px] stroke-gray-500" />
        Previous
      </div>
      {[currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2].map((item) => {
        return item > 0 && item <= maxItems ? (
          <div
            key={item}
            className={clsx(
              "px-[16px] py-[8px] text-gray-500 rounded-[10px] text-center",
              { "bg-muted text-primary": item === currentPage }
            )}
            role="button"
            onClick={() => setCurrentPage(item)}
          >
            {item}
          </div>
        ) : null;
      })}
      <div
        className={clsx(
          "flex items-center justify-center px-[16px] py-[8px] rounded-[10px] text-gray-500",
          { "bg-muted": currentPage < maxItems }
        )}
        role="button"
        onClick={() =>
          setCurrentPage(currentPage < maxItems ? currentPage + 1 : currentPage)
        }
      >
        Next
        <ChevronRight className="w-[16px] h-[16px] stroke-[1.3px] stroke-gray-500" />
      </div>
    </div>
  );
};

export default Pagination;
