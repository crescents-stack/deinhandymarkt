import { Skeleton } from "@/components/skeletons/table";

const ProductDetailsSkeleton = () => {
  return (
    <div className="bg-white py-[90px]">
      <section className="section">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-[40px]">
          <Skeleton className="w-full min-h-[70vh] border bg-black" />
          <div className="space-y-[32px] my-auto">
            <div className="space-y-[20px]">
              <Skeleton />
              <Skeleton />
            </div>
            <div className="space-y-[20px]">
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </div>
          </div>
        </div>
      </section>
      <div className="w-full h-[400px] flex items-stretch">
        <Skeleton className="w-full" />
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
