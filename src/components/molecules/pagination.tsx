"use client";

import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const Pagination = () => {
  const maxPages = 6;
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="inline-flex items-center justify-center gap-[4px]">
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
      {[currentPage - 1, currentPage, currentPage + 1].map((item) => {
        return item > 0 && item <= maxPages ? (
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
          { "bg-muted": currentPage < maxPages }
        )}
        role="button"
        onClick={() =>
          setCurrentPage(currentPage < maxPages ? currentPage + 1 : currentPage)
        }
      >
        Next
        <ChevronRight className="w-[16px] h-[16px] stroke-[1.3px] stroke-gray-500" />
      </div>
    </div>
  );
};

export default Pagination;
