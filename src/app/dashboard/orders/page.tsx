import { columns } from "./_utils/components/columns";
import { DataTable } from "@/components/ui/datatable";
import { Suspense } from "react";
import TableSkeleton from "@/components/skeletons/table";
import { ActionResponseHandler } from "@/lib/error";
import { GetOrders } from "./_utils/actions/actions";
import { PRINT } from "@/lib/utils";

const Table = async () => {
  const result = await GetOrders();
  ActionResponseHandler(result, "Orders data", true);
  PRINT(result);
  // return null;
  return result.success ? (
    <DataTable
      columns={columns}
      data={result.data}
      // addButton={<AddCategory link="/dashboard/categories/add" text="Add new category"/>}
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
      <h2 className="text-[16px] md:text-[20px] font-semibold mb-10">Orders</h2>
      <Suspense fallback={<TableSkeleton />}>
        <Table />
      </Suspense>
    </div>
  );
}
