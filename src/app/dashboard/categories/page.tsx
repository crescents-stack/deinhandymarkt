import { columns } from "./_utils/components/columns";
import { DataTable } from "@/components/ui/datatable";
import { GetCategories } from "./_utils/actions/actions";
import { Suspense } from "react";
import AllCategoriesSkeleton from "@/components/skeletons/categories";

const Table = async () => {
  const result = await GetCategories();
  return result.success ? (
    <DataTable columns={columns} data={result.data.categories} />
  ) : (
    "No data found!"
  );
};

export default async function DemoPage() {
  return (
    <div className="mx-auto">
      <h2 className="text-[16px] md:text-[20px] font-semibold mb-10">
        Categories
      </h2>
      <Suspense fallback={<AllCategoriesSkeleton />}>
        <Table />
      </Suspense>
    </div>
  );
}
