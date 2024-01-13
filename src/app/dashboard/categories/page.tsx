import AllCategories from "@/components/pages/dashboard/category/datatable";
import AllCategoriesSkeleton from "@/components/skeletons/categories";
import { Suspense } from "react";

const Page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <Suspense fallback={<AllCategoriesSkeleton />}>
      <AllCategories searchParams={searchParams} />
    </Suspense>
  );
};

export default Page;
