"use client";

import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const Pagination = ({ maxItems = 10 }: any) => {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentPage = parseInt(params.get("paginatedAt")!) || 1;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const param = new URLSearchParams(params);
      param.set(name, value);

      return param.toString();
    },
    [params]
  );

  const updateUrlWithStepIdInQuery = (id: number) => {
      router.push(pathname + "?" + createQueryString("paginatedAt", id.toString()));
  };
  return (
    <div className="inline-flex flex-wrap items-center justify-center gap-[4px]">
      <div
        className={clsx(
          "flex items-center justify-center px-[16px] py-[8px] rounded-[10px] text-gray-500",
          { "bg-muted": currentPage > 1 }
        )}
        role="button"
        onClick={() =>
          updateUrlWithStepIdInQuery(currentPage > 1 ? currentPage - 1 : currentPage)
        }
      >
        <ChevronLeft className="w-[16px] h-[16px] stroke-[1.3px] stroke-gray-500" />
        Previous
      </div>
      {[
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
      ].map((item) => {
        return item > 0 && item <= maxItems ? (
          <div
            key={item}
            className={clsx(
              "px-[16px] py-[8px] text-gray-500 rounded-[10px] text-center",
              { "bg-muted text-primary": item === currentPage }
            )}
            role="button"
            onClick={() => updateUrlWithStepIdInQuery(item)}
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
          updateUrlWithStepIdInQuery(currentPage < maxItems ? currentPage + 1 : currentPage)
        }
      >
        Next
        <ChevronRight className="w-[16px] h-[16px] stroke-[1.3px] stroke-gray-500" />
      </div>
    </div>
  );
};

export default Pagination;
