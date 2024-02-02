import { Skeleton } from "@/components/skeletons/table";
import clsx from "clsx";

const CarouselProductCardSkeletons = () => {
  return (
    <div className="grid grid-cols-2 min-[1000px]:grid-cols-3 min-[1080px]:grid-cols-2 min-[1330px]:grid-cols-3 gap-[10px] sm:gap-[20px]">
      {[1, 2, 3, 4, 5, 6].map((item: any) => {
        return (
          <div
            key={item}
            className={clsx(
              "min-h-[280px] min-[640px]:min-h-[500px] flex items-stretch justify-stretch"
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
