import { Skeleton } from "@/components/skeletons/table";
import clsx from "clsx";

const CarouselProductCardSkeletons = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-[10px] sm:gap-[20px] pt-[32px]">
      {[1, 2, 3].map((item: any) => {
        return (
          <div
            key={item}
            className={clsx(
              "border border-muted rounded-[8px] min-h-[330px] min-[640px]:min-h-[500px] flex items-stretch justify-stretch",
              { "hidden lg:flex": item === 2 },
              { "hidden sm:flex": item === 3 }
            )}
          >
            <Skeleton className="w-full" />
          </div>
        );
      })}
    </div>
  );
};

export default CarouselProductCardSkeletons;
