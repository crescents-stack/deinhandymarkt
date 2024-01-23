const TableSkeleton = () => {
  return (
    <div className="w-full max-w-[100dvw] overflow-hidden">
      <div className="flex flex-col gap-[8px]">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => {
          return (
            <div key={item} className="flex items-center gap-[8px]">
              {[1, 2, 3, 4].map((tdata: any) => {
                return (
                  <div key={tdata} className="px-[16px] py-[4px]">
                    <Skeleton />
                  </div>
                );
              })}
              <div className="px-[16px] py-[4px]">
                <div className="inline-flex gap-[8px]">
                  <Skeleton /> <Skeleton />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TableSkeleton;

export const Skeleton = () => {
  return (
    <div className="bg-gray-200 animate-pulse rounded-[10px] h-10 w-[250px]"></div>
  );
};
