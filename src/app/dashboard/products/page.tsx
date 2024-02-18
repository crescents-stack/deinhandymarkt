import { DataTable } from "@/components/ui/datatable";
import { Suspense } from "react";
import TableSkeleton from "@/components/skeletons/table";
import AddRouter from "@/components/atoms/add-router";
import { GetProducts } from "./_utils/actions/actions";
import { productColumns } from "./_utils/components/columns";
import { ActionResponseHandler } from "@/lib/error";

const Table = async () => {
  const result = await GetProducts();
  ActionResponseHandler(result, "Customer data", true);
  return result.success ? (
    <DataTable
      columns={productColumns}
      data={result?.data?.data || []}
      addButton={
        <AddRouter link="/dashboard/products/add" text="Add new products" />
      }
    />
  ) : (
    <div className="space-y-10">
      <p>Something went wrong!</p>
    </div>
  );
};

export default async function Page() {
  return (
    <div className="mx-auto">
      <h2 className="text-[16px] md:text-[20px] font-semibold mb-10">
        All products
      </h2>
      <Suspense fallback={<TableSkeleton />}>
        <Table />
      </Suspense>
    </div>
  );
}
