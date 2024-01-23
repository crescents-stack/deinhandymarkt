import { columns } from "./_utils/components/columns";
import { DataTable } from "@/components/ui/datatable";
import { GetCategories } from "./_utils/actions/actions";
import { Suspense } from "react";
import TableSkeleton from "@/components/skeletons/table";
import AddCategory from "../../../components/atoms/add-router";

const Table = async () => {
  const result = await GetCategories();
  return result.success ? (
    <DataTable
      columns={columns}
      data={result.data.categories}
      addButton={<AddCategory link="/dashboard/categories/add" />}
    />
  ) : (
    <div className="space-y-10">
      <p>Something went wrong!</p>
    </div>
  );
};

export default async function DemoPage() {
  return (
    <div className="mx-auto">
      <h2 className="text-[16px] md:text-[20px] font-semibold mb-10">
        Categories
      </h2>
      <Suspense fallback={<TableSkeleton />}>
        <Table />
      </Suspense>
    </div>
  );
}
