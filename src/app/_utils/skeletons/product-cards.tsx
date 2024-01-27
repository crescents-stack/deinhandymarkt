import { Skeleton } from "@/components/skeletons/table";
import clsx from "clsx";

const ProductCardSkeletons = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-[10px] sm:gap-[20px] pt-[32px]">
      {[1, 2, 3, 4].map((item: any, index: number) => {
        return (
          <div
            key={item}
            className={clsx(
              "border border-muted rounded-[8px] min-h-[382px] flex items-stretch justify-stretch",
              {
                "lg:col-span-2": index + 1 === 2 || index + 1 === 3,
                "col-span-1": index + 1 !== 2 || index + 1 !== 3,
              }
            )}
          >
            <Skeleton className="w-full" />
          </div>
        );
      })}
    </div>
  );
};

export default ProductCardSkeletons;
