import { Skeleton } from "@/components/skeletons/table";

const PriceCountSkeleton = () => {
    return (
        <div className="border-t border-dashed">
      <div className="flex flex-col-reverse md:flex-row justify-between gap-[16px] py-[20px]">
        <div className="flex flex-col gap-[12px]">
          <h5 className="text-[14px] md:text-[16px] font-semibold">
            <Skeleton />
          </h5>
          <ul className="flex flex-col gap-[8px]">
            {[1,2,3,4,5].map((item) => {
              return (
                <li key={item} className="flex items-center gap-[8px]">
                  <div className="w-8 min-h-8 bg-gray-300 animate-pulse rounded-full"></div>
                  <Skeleton />
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex flex-col items-start justify-start md:items-end md:justify-end gap-[8px]">
          <Skeleton />
          <div className="flex flex-col items-start justify-start md:items-end md:justify-end gap-[4px]">
            <Skeleton />
            <Skeleton />
          </div>
          <Skeleton />
          <div className="flex flex-col items-start justify-start md:items-end md:justify-end gap-[4px]">
            <Skeleton />
            <Skeleton />
          </div>
        </div>
      </div>
    </div>
    )
}

export default PriceCountSkeleton